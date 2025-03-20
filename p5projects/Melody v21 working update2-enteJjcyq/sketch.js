let synth;
let circles = [];
let baseOctave = 4;
let rows = 3; // Number of octaves (rows)
let notes = ["C", "D", "E", "F", "G", "A", "B"];
let resetButton;
let reverb, delay;

function setup() {
  createCanvas(windowWidth, windowHeight);
  synth = new Tone.PolySynth(Tone.Synth, {
    envelope: {
      attack: 0.5,
      decay: 0.2,
      sustain: 0.7,
      release: 1.5
    }
  }).toDestination();

  reverb = new Tone.Reverb({ decay: 4, wet: 0.5 }).toDestination();
  synth.connect(reverb);

  delay = new Tone.FeedbackDelay("8n", 0.4).toDestination();
  synth.connect(delay);

  resetButton = createButton('Reset');
  resetButton.position(20, 20);
  resetButton.mousePressed(resetCircles);

  let xSpacing = width / (notes.length + 1);
  let ySpacing = height / (rows + 1);
  for (let r = 0; r < rows; r++) {
    for (let i = 0; i < notes.length; i++) {
      let baseX = (i + 1) * xSpacing;
      let baseY = (r + 1) * ySpacing;
      let x = baseX + random(-20, 20);
      let y = baseY + random(-20, 20);
      let noteName = notes[i] + (baseOctave + r);
      circles.push({ x: x, y: y, r: 30, note: noteName, active: false, fragments: [], cracks: 0 });
    }
  }
}

function draw() {
  background(0);
  noStroke();
  for (let c of circles) {
    if (c.active) {
      fill(255);
    } else {
      fill(150, 150, 200);
    }
    ellipse(c.x, c.y, c.r * 2, c.r * 2);

    // Draw crack effect
    stroke(255, 80);
    for (let i = 0; i < c.cracks; i++) {
      let angle = random(TWO_PI);
      let length = random(5, 15);
      let x1 = c.x + cos(angle) * (c.r / 2);
      let y1 = c.y + sin(angle) * (c.r / 2);
      let x2 = x1 + cos(angle) * length;
      let y2 = y1 + sin(angle) * length;
      line(x1, y1, x2, y2);
    }

    // Draw shattered fragments
    noStroke();
    for (let frag of c.fragments) {
      fill(255, frag.opacity);
      ellipse(frag.x, frag.y, frag.size, frag.size);
      frag.x += frag.vx;
      frag.y += frag.vy;
      frag.size *= 0.95;
      frag.opacity -= 2;
    }
    c.fragments = c.fragments.filter(frag => frag.size > 2 && frag.opacity > 10);
  }
}

function mousePressed() {
  for (let c of circles) {
    let d = dist(mouseX, mouseY, c.x, c.y);
    if (d < c.r) {
      if (!c.active) {
        c.active = true;
        Tone.start();
        let detune = random(-5, 5);
        synth.triggerAttack(c.note, undefined, 0.8 + detune / 100);
        createShatterEffect(c);
        applyChanceNotes(c);
      } else {
        c.active = false;
        synth.triggerRelease(c.note);
      }
    }
  }
}

function createShatterEffect(circle) {
  circle.cracks = min(circle.cracks + 2, 10);
  let numFragments = floor(random(5, 10));
  for (let i = 0; i < numFragments; i++) {
    circle.fragments.push({
      x: circle.x + random(-10, 10),
      y: circle.y + random(-10, 10),
      size: random(5, 15),
      vx: random(-1, 1),
      vy: random(-1, 1),
      opacity: 255
    });
  }
}

function applyChanceNotes(originalCircle) {
  if (random() < 0.3) {
    let randomCircle = random(circles);
    if (!randomCircle.active) {
      randomCircle.active = true;
      let detune = random(-5, 5);
      synth.triggerAttack(randomCircle.note, undefined, 0.8 + detune / 100);
      createShatterEffect(randomCircle);
    }
  }
}

function resetCircles() {
  for (let c of circles) {
    if (c.active) {
      synth.triggerRelease(c.note);
      c.active = false;
    }
    c.fragments = c.fragments.filter(frag => frag.opacity > 20); // Retains some memory of past clicks
    c.cracks = 0;
  }
}

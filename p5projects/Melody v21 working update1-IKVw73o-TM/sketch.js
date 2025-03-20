// introduce randomeness

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
      attack: 0.5, // Smooth fade-in
      decay: 0.2,
      sustain: 0.3,
      release: 1.5 // Long release for ambient effect
    }
  }).toDestination();

  // Add reverb for spatial effect
  reverb = new Tone.Reverb({ decay: 4, wet: 0.2 }).toDestination();
  synth.connect(reverb);

  // Add delay for echo effect
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
      circles.push({ x: x, y: y, r: 30, note: noteName, active: false, fragments: [] });
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

    // Draw shattered fragments if present
    for (let frag of c.fragments) {
      fill(255, 100);
      ellipse(frag.x, frag.y, frag.size, frag.size);
      frag.x += frag.vx;
      frag.y += frag.vy;
      frag.size *= 0.95;
    }
    c.fragments = c.fragments.filter(frag => frag.size > 2);
  }
}

function mousePressed() {
  for (let c of circles) {
    let d = dist(mouseX, mouseY, c.x, c.y);
    if (d < c.r) {
      if (!c.active) {
        c.active = true;
        Tone.start();
        synth.triggerAttack(c.note);
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
  let numFragments = floor(random(5, 10));
  for (let i = 0; i < numFragments; i++) {
    circle.fragments.push({
      x: circle.x + random(-10, 10),
      y: circle.y + random(-10, 10),
      size: random(5, 15),
      vx: random(-1, 1),
      vy: random(-1, 1)
    });
  }
}

function applyChanceNotes(originalCircle) {
  if (random() < 0.3) { // 30% chance to trigger an extra note
    let randomCircle = random(circles);
    if (!randomCircle.active) {
      randomCircle.active = true;
      synth.triggerAttack(randomCircle.note);
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
    c.fragments = []; // Clear all fragments
  }
}
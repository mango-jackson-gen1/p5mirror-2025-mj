let synth;
let circles = [];
let baseOctave = 3; // Lower starting octave for more contrast
let rows = 3; // Number of octaves (rows)
let notes = ["C", "D", "E", "F", "G", "A", "B"];
let chords = [
  ["C3", "E3", "G3"],
  ["F3", "A3", "C4"],
  ["G3", "B3", "D4"],
  ["A3", "C4", "E4"],
  ["C4", "E4", "G4"],
  ["F4", "A4", "C5"],
  ["G4", "B4", "D5"]
];
let resetButton;
let reverb, delay, noise;

function setup() {
  createCanvas(windowWidth, windowHeight);
  synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: "sine" },
    envelope: { attack: 0.01, decay: 0.01, sustain: 0.2, release: 0.2 }
  }).toDestination();

  reverb = new Tone.Reverb({ decay: 0.1, wet: 0.01 }).toDestination();
  // delay = new Tone.FeedbackDelay("8n", 0.1).toDestination();
  // noise = new Tone.Noise("brown").start();
  // let noiseFilter = new Tone.Filter(800, "lowpass").toDestination();
  // noise.connect(noiseFilter);
  // noiseFilter.wet = 0.1; // Adjust background noise intensity

  synth.connect(reverb);
  // synth.connect(delay);

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
      let chord = chords[(i + r * notes.length) % chords.length];
      circles.push({ x: x, y: y, r: 30, chord: chord, active: false, fragments: [], cracks: 0 });
    }
  }
}

function draw() {
  background(0);
  noStroke();
  for (let c of circles) {
    if (c.active) {
      fill(random(200, 255), random(100, 255), random(150, 255));
    } else {
      fill(150, 150, 200);
    }
    ellipse(c.x, c.y, c.r * 2, c.r * 2);

    // Dynamic cracking effect
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

    // Animated shattered fragments
    noStroke();
    for (let frag of c.fragments) {
      fill(random(200, 255), random(100, 255), random(150, 255), frag.opacity);
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
        synth.triggerAttack(c.chord, undefined, random(0.6, 1.2));
        createShatterEffect(c);
        applyChanceNotes(c);
      } else {
        c.active = false;
        synth.triggerRelease(c.chord);
      }
    }
  }
}

function createShatterEffect(circle) {
  circle.cracks = min(circle.cracks + 2, 10);
  let numFragments = floor(random(8, 15));
  for (let i = 0; i < numFragments; i++) {
    circle.fragments.push({
      x: circle.x + random(-15, 15),
      y: circle.y + random(-15, 15),
      size: random(5, 20),
      vx: random(-2, 2),
      vy: random(-2, 2),
      opacity: 255
    });
  }
}

function applyChanceNotes(originalCircle) {
  if (random() < 0.5) {
    let randomCircle = random(circles);
    if (!randomCircle.active) {
      randomCircle.active = true;
      synth.triggerAttack(randomCircle.chord, undefined, random(0.2, 0.4));
      createShatterEffect(randomCircle);
    }
  }
}

function resetCircles() {
  for (let c of circles) {
    if (c.active) {
      synth.triggerRelease(c.chord);
      c.active = false;
    }
    c.fragments = c.fragments.filter(frag => frag.opacity > 20);
    c.cracks = 0;
  }
}


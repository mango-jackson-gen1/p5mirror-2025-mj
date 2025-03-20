let synth;
let circles = [];
let baseOctave = 4;
let rows = 3; // Number of octaves (rows)
let notes = ["C", "D", "E", "F", "G", "A", "B"];
let resetButton;

function setup() {
  createCanvas(windowWidth, windowHeight);
  synth = new Tone.PolySynth(Tone.Synth).toDestination();

  resetButton = createButton('Reset');
  resetButton.position(20, 20);
  resetButton.mousePressed(resetCircles);

  let xSpacing = width / (notes.length + 1); // Base spacing for notes in a row
  let ySpacing = height / (rows + 1); // Base spacing for rows
  for (let r = 0; r < rows; r++) { // For each octave row
    for (let i = 0; i < notes.length; i++) {
      let baseX = (i + 1) * xSpacing;
      let baseY = (r + 1) * ySpacing;
      let x = baseX + random(-20, 20); // Add jitter for organic variation
      let y = baseY + random(-20, 20);
      let noteName = notes[i] + (baseOctave + r); // e.g., "C4", "D4" for row 0; "C5" for row 1
      circles.push({ x: x, y: y, r: 30, note: noteName, active: false });
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
      } else {
        c.active = false;
        synth.triggerRelease(c.note);
      }
    }
  }
}

function resetCircles() {
  for (let c of circles) {
    if (c.active) {
      synth.triggerRelease(c.note);
      c.active = false;
    }
  }
}

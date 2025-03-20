// Tone.js setup: piano-like synth for expressive triads
const synth = new Tone.PolySynth(Tone.Synth, {
  oscillator: { type: "triangle" },
  envelope: { attack: 0.05, release: 0.3 }
}).toDestination();

// Chords (triads) that harmonize beautifully in C Major
const chords = [
  ["C4", "E4", "G4"],
  ["F3", "A3", "C4"],
  ["G3", "B3", "D4"],
  ["A3", "C4", "E4"]
];

// Colors corresponding to each chord
const colors = ["#FFB703", "#FB8500", "#8ECAE6", "#219EBC"];

let activeChord = -1;

function setup() {
  createCanvas(500, 400);
  textAlign(CENTER, CENTER);
  textSize(16);
}

function draw() {
  background(20);

  fill(255);
  text("Press keys 1-4 to play piano chords", width / 2, 50);

  for (let i = 0; i < chords.length; i++) {
    let x = map(i, 0, chords.length - 1, 100, width - 100);
    let y = height / 2;

    fill(i === activeChord ? "#FFD700" : colors[i]);
    ellipse(x, y, 70, 70);

    fill(255);
    text(i + 1, x, y);
  }
}

function keyPressed() {
  let index = parseInt(key) - 1;
  if (index >= 0 && index < chords.length) {
    synth.triggerAttackRelease(chords[index], "2n");
    activeChord = index;
  }
}

function keyReleased() {
  activeChord = -1;
}

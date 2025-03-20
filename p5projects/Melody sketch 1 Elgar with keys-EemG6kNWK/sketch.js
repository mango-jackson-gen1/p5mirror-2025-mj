const synth = new Tone.Synth().toDestination();

// Accurate Elgar Cello Concerto opening notes (du Pré’s line)
const melody = ["E2", "G2", "E3", "D3", "C3", "B2", "E2", "G2", "F#2", "E2"];

// Dark-to-light color gradient to represent emotional intensity
const colors = ["#102027", "#37474F", "#90A4AE", "#B0BEC5", "#CFD8DC", "#B0BEC5", "#90A4AE", "#546E7A", "#37474F", "#102027"];

let activeNote = -1;

function setup() {
  createCanvas(700, 400);
  textAlign(CENTER, CENTER);
  textSize(16);
}

function draw() {
  background(20);

  fill(255);
  text("Press keys 1–0 in sequence for Elgar’s Cello Concerto line", width / 2, 30);

  for (let i = 0; i < melody.length; i++) {
    let x = map(i, 0, melody.length - 1, 50, width - 50);
    let y = noteHeight(melody[i]);

    fill(i === activeNote ? "#FFD700" : colors[i]);
    ellipse(x, y, 50, 50);

    fill(255);
    let keyLabel = (i + 1) % 10;
    text(keyLabel, x, y);
    text(melody[i], x, y + 30);
  }
}

function noteHeight(note) {
  let midi = Tone.Frequency(note).toMidi();
  return map(midi, 35, 55, height - 80, 100);
}

function keyPressed() {
  let index = parseInt(key) - 1;
  if (key === '0') index = 9; // key '0' corresponds to the last note

  if (index >= 0 && index < melody.length) {
    activeNote = index;
    synth.triggerAttackRelease(melody[index], "2n");
  }
}

function keyReleased() {
  activeNote = -1;
}

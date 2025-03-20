// Ryoji Ikeda inspired audiovisual minimalism

const synth = new Tone.Synth({
  oscillator: { type: "sine" },
  envelope: { attack: 0.01, release: 0.3 }
}).toDestination();

const notes = ["A2", "A3", "E4", "A4", "C#5", "E5"];

let currentNote = "";
let visualY = 0;

function setup() {
  createCanvas(600, 300);
  background(0);
  Tone.Transport.scheduleRepeat(playNote, "4n");
  Tone.Transport.start();
}

function draw() {
  background(0, 20); // fade effect for smooth visuals
  stroke(255);
  strokeWeight(map(visualY, 50, height - 50, 1, 8));
  line(0, visualY, width, visualY);

  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  text("Ryoji Ikeda Inspired Audiovisual Minimalism", width / 2, 20);
  text(currentNote, width / 2, height - 20);
}

function playNote(time) {
  currentNote = notes[Math.floor(Math.random() * notes.length)];
  synth.triggerAttackRelease(currentNote, "8n", time);
  visualY = map(Tone.Frequency(currentNote).toFrequency(), 110, 660, height - 50, 50);
}


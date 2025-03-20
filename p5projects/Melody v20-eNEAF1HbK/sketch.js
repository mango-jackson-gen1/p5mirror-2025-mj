let synth;
let notes = ['C4', 'E4', 'G4', 'B4', 'C5', 'B3', 'G4', 'E4'];
let noteIndex = 0;
let lastNoteTime = 0;
let interval = 400; // milliseconds per note

function setup() {
  createCanvas(600, 600);
  synth = new Tone.Synth().toDestination();
  Tone.Transport.scheduleRepeat(playNote, '8n');
  Tone.Transport.start();
}

function playNote(time) {
  let note = notes.shift();
  synth.triggerAttackRelease(note, '8n', time);
  notes.push(note);
}

function draw() {
  background(0);
  drawVisual();
}

function draw() {
  background(0);
  
  let lineCount = 50;
  for (let i = 0; i < height; i += height / lineCount) {
    let brightness = map(i, 0, height, 0, 255);
    stroke(brightness);
    strokeWeight(2);
    line(0, i, width, i);
  }

  let elapsed = millis() - lastNoteTime;
  if (elapsed >= interval) {
    lastNoteTime = millis();
    noteIndex = (noteIndex + 1) % notes.length;
  }

  // Animation tied to note index
  let y = map(noteIndex, 0, notes.length, 0, height);
  noStroke();
  fill(255, 150);
  rect(0, y - height / lineCount / 2, width, height / lineCount);
}

function drawVisual() {
  let lineCount = 60;
  for (let i = 0; i < lineCount; i++) {
    let alpha = map(sin(frameCount * 0.05 + i * 0.2), -1, 1, 50, 255);
    stroke(255, alpha);
    strokeWeight(3);
    let y = map(i, 0, lineCount - 1, 0, height);
    line(0, y, width, y);
  }
}

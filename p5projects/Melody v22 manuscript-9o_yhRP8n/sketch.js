// Bach's Goldberg Aria inspired interactive visualization (Illuminated Manuscript style)

let sampler;
let melodyPart;
let currentNote = -1;

const notes = [
  { note: "G4", dur: "4n" },
  { note: "A4", dur: "8n" },
  { note: "B4", dur: "8n" },
  { note: "C5", dur: "4n" },
  { note: "D5", dur: "4n" },
  { note: "B4", dur: "4n" },
  { note: "G4", dur: "4n" },
  { note: "A4", dur: "8n" },
  { note: "F#4", dur: "8n" },
  { note: "G4", dur: "2n" }
];

function preload() {
  sampler = new Tone.Sampler({
    urls: { C4: "C4.mp3" },
    baseUrl: "https://tonejs.github.io/audio/salamander/",
  }).toDestination();
}

function setup() {
  createCanvas(600, 400);
  textAlign(CENTER, CENTER);
  textSize(16);
  noLoop();

  Tone.loaded().then(() => {
    const melodyPart = new Tone.Part((time, value) => {
      sampler.triggerAttackRelease(value.note, value.dur, time);
      Tone.Draw.schedule(() => {
        currentNote = notes.indexOf(value);
        redraw();
      }, time);
    }, notes).start(0);

    Tone.Transport.bpm.value = 60;

    canvas.addEventListener('click', async () => {
      await Tone.start();
      Tone.Transport.start();
      loop();
    }, { once: true });
  });
}

function setup() {
  createCanvas(600, 400);
  background(240, 230, 210);
  fill(100, 50, 50);
  text("Click anywhere to begin Bach’s Aria", width / 2, height / 2);
}

function draw() {
  background(240, 230, 210, 50);

  drawIlluminatedBorders();

  for (let i = 0; i < notes.length; i++) {
    const x = map(i, 0, notes.length - 1, 100, width - 100);
    const pitchHeight = map(Tone.Frequency(notes[i].note).toMidi(), 65, 80, 300, 100);

    fill(i === currentNote ? "#FF4500" : "#8ECAE6");
    stroke(50);
    rect(x - 20, pitchHeight, 20, height - pitchHeight - 100);
  }

  fill(50);
  text("Click anywhere to play Bach’s Aria motif", width / 2, 30);
}

function draw() {
  background(240, 230, 210, 20);
  drawIllumination();

  for (let i = 0; i < notes.length; i++) {
    const x = map(i, 0, notes.length - 1, 100, width - 100);
    const pitchHeight = map(Tone.Frequency(notes[i].note).toMidi(), 65, 80, 200, 50);

    if (i === currentNote) {
      fill("#FF4500");
    } else {
      fill("#4682B4");
    }

    rect(x - 15, pitchHeight, 30, height - pitchHeight - 100);
  }
}

Tone.Transport.scheduleRepeat((time) => {
  currentNote++;
  if (currentNote >= notes.length) currentNote = 0;
}, "4n");

function drawIlluminationBorders() {
  stroke(180, 150, 50);
  strokeWeight(4);
  noFill();
  rect(20, 20, width - 40, height - 40);

  noStroke();
  fill(100, 150, 200);
  ellipse(40, 40, 30);
  ellipse(width - 40, height - 40, 30, 30);
  ellipse(width - 40, 40, 15, 15);
  ellipse(40, height - 40, 20, 20);
}

// Sync visuals with audio notes
Tone.Transport.scheduleRepeat((time) => {
  currentNote++;
  if (currentNote >= notes.length) {
    currentNote = -1;
    Tone.Transport.stop();
  }
}, "4n");

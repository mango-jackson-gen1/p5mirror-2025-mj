const synth = new Tone.Synth({
  oscillator: { type: "triangle" }, // slightly richer cello-like tone
  envelope: { attack: 0.01, decay: 0.2, release: 0.2 }
}).toDestination();

const notes = ["A3", "B3", "C4", "D4", "E4", "F3", "G3"];
const rhythms = ["8n", "8n", "4n", "8n", "8n"]; // expressive rhythm pattern

let melodyPart = new Tone.Part((time, note) => {
  synth.triggerAttackRelease(note.pitch, note.duration, time);
}, []);

// Generate a more emotional melody sequence over 10 seconds


function generateMelody() {
  let time = 0;
  while (time < 10) {
    let pitch = random(notes);
    let duration = random(rhythms);
    melodyPart.add(time, { pitch: pitch, duration: duration });
    time += Tone.Time(durationToSeconds(duration)); 
}

generateMelody();
melodyPart.start(0);

function setup() {
  createCanvas(400, 200);
  let btn = createButton("Play Emotional Melody");
  btn.mousePressed(async () => {
    await Tone.start();
    Tone.Transport.start();
  });
  btn.position(width / 2 - 50, height / 2);
}

function draw() {
  background(30);
  fill(255);
  textAlign(CENTER, CENTER);
  text("Click the button to hear the emotional melody", width / 2, 50);
}

// Generate melody with varied pitches and durations
function generateMelody() {
  let totalTime = 0;
  while (totalTime < 10) {
    let pitch = random(notes);
    let duration = random(["8n", "4n", "8n"]);
    melodyPart.add(totalTime, { pitch, duration });
    totalTime += Tone.Time(duration).toSeconds();
  }
}


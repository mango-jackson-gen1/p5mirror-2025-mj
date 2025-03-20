// Create a synthesizer with a cello-like tone
const synth = new Tone.Synth({
  oscillator: { type: "triangle" },
  envelope: { attack: 0.01, decay: 0.2, release: 0.2 }
}).toDestination();

// Define available notes and rhythms
const notes = ["A3", "B3", "C4", "D4", "E4", "F3", "G3"];
const rhythms = ["8n", "8n", "4n", "8n", "8n"]; // expressive rhythm pattern

// Create a part to schedule the notes
let melodyPart = new Tone.Part((time, note) => {
  synth.triggerAttackRelease(note.pitch, note.duration, time);
}, []);

// Helper function to select a random item from an array
function random(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Generate a more emotional melody sequence over 10 seconds
function generateMelody() {
  melodyPart.clear(); // Clear any existing notes
  let totalTime = 0;
  
  while (totalTime < 10) {
    let pitch = random(notes);
    let duration = random(rhythms);
    melodyPart.add(totalTime, { pitch, duration });
    totalTime += Tone.Time(duration).toSeconds();
  }
  
  melodyPart.start(0);
}

// p5.js setup function
function setup() {
  createCanvas(400, 200);
  let btn = createButton("Play Emotional Melody");
  btn.mousePressed(async () => {
    await Tone.start();
    Tone.Transport.start();
    generateMelody();
  });
  btn.position(width / 2 - 50, height / 2);
}

// p5.js draw function
function draw() {
  background(30);
  fill(255);
  textAlign(CENTER, CENTER);
  text("Click the button to hear the emotional melody", width / 2, 50);
}


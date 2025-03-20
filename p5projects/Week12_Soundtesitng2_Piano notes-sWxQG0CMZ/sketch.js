let osc;
let notes = []; // Array to store frequencies of the specified notes

function setup() {
  noCanvas();
  
  // Initialize the oscillator
  osc = new p5.Oscillator();
  osc.setType('triangle');
  osc.amp(0.5);
  osc.start();

  // Define the frequencies for C4, D, E, F, G, A4, B4
  notes = [
    261.63, // C4
    293.66, // D
    329.63, // E
    349.23, // F
    392.00, // G
    440.00, // A4
    493.88  // B4
  ];
}

function draw() {
  if (frameCount % 30 === 0) { // Change frequency every 30 frames
    let randomNote = notes[int(random(0, notes.length))]; // Pick a random note
    osc.freq(randomNote); // Set the oscillator frequency to the selected note
  }
}


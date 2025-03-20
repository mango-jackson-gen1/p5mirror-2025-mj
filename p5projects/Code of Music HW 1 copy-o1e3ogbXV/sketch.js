let puddle;
let tremoloOsc; // Oscillator for the tremolo effect
let amplitudeModulator;
function preload() {
  puddle = loadSound("sound/puddle.wav");
}

function setup() {
  noCanvas();
  puddle.loop();
}

function setup() {
  noCanvas();

  // Create a tremolo oscillator
  tremoloOsc = new p5.Oscillator();
  tremoloOsc.freq(4); // Frequency of the tremolo effect (4 Hz)
  tremoloOsc.setType("sine");
  tremoloOsc.start();

  // Create an amplitude modulator
  amplitudeModulator = new p5.Amplitude();
  amplitudeModulator.setInput(tremoloOsc); // Use the tremolo oscillator to control amplitude

  // Play the sound file with amplitude modulation
  puddle.disconnect(); // Disconnect default output
  puddle.amp(amplitudeModulator.getLevel()); // Apply tremolo effect
  puddle.loop(); // Loop the sound file
}

function draw() {
  // Update the amplitude modulation dynamically
  let modLevel = map(tremoloOsc.getLevel(), -1, 1, 0, 1);
  puddle.amp(modLevel);
}

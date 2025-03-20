let osc;

let ratios = [];
// Western Diatonic Major Ratios
//ratios = [1, 1.125, 1.25, 1.34, 1.5, 1.67, 1.875, 2];
// Western Diatonic Minor Ratios
//ratios = [1, 1.125, 1.2, 1.34, 1.5, 1.6, 1.875, 2];
// Pentatonic Scale
//ratios = [1, 1.125, 1.25, 1.5, 1.67, 2];
// Arabic / Indian Scale
ratios = [1, 1.067, 1.25, 1.34, 1.5, 1.6, 1.875, 2];

function setup() {
  createCanvas(400, 400);
  osc = new p5.Oscillator();
  osc.setType("sine");
  osc.freq(0);
  osc.start();
}

function draw() {}

// Base frequency
let BASE = 300;

// Time variable for noise() and sin()
let t = 0;

function keyPressed() {
  
  //// Random algorithms
  //let f = random(200, 400);
  
  //// Randomly choose a note from scale
  //let f = random(ratios) * BASE;
  
  // Move along the curve at different rates
  t+= random(1) > 0.3 ? 1 : 0.2;
  
  // Move along noise curve
  //let r = noise(t) * 8;
  
  // Move along sine wave
  let r = (sin(t) + 1) * 4;
  
  // Calculate the frequency
  let f = ratios[floor(r)] * BASE;
  
  // Change the frequency of oscillator
  osc.freq(f);
  
  // Display frequency
  background(220);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(floor(f), width / 2, height / 2);
}

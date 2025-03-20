// Sound file
let sound;
// Note ratios
let ratios = [1, 1.125, 1.25, 1.334, 1.5, 1.667, 1.875, 2];

// Load the sound file
function preload(){
 sound = loadSound('bell.wav'); 
}
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}

// On each keypress
// Adjust rate of playback to a new frequency relationship
// Play the sound
function keyPressed() {
  let f = random(ratios);
  sound.rate(f);
  sound.play();
}
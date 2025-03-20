// The Code of Music
// NYU ITP/IMA Fall 2024
// Luisa Pereira

// Starter code for the Melody chapter

// Create a Synth instrument, which can play specific frequencies
const synth = new Tone.Synth();
synth.toDestination();

let fMin = 80;
let fMax =1300;

function mousePressed() {
  // Trigger (play) a 100Hz tone
  let frequency = yToF(mouseY);
  let velocity = mouseX/width;
  synth.triggerAttack(frequency, veloctiy);
}

function yToF(y){
  // return map(y, 0, height, fMin, fMax);
  let turns =2;
  console.log(frequency);
  
  //height and 0 are reversed, meaning the bottom of the screen (y = height) maps to 0, and the top (y = 0) maps to turns

  let steps = map(y, height, 0,0,turns);
  return fMin * Math.pow(2, steps);
  
}


function mouseReleased() {
  // Release (stop playing) the tone
  synth.triggerRelease();
}

// Create p5.js' setup function - this is just to make sure p5.js is initialized 
// and the event handlers we defined above (mousePressed, mouseReleased) are called
function setup() {
  createCanvas(200,200);
}

function draw(){
  background(0);
}


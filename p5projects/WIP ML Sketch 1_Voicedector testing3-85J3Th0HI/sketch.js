// to revise & improve on user experience
/*
1 show confidence score to the user? 

2 why the labelling is so sensitive, flickering between the two

3 


*/

// Teachable Machine
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/TeachableMachine/3-teachable-audio
// https://editor.p5js.org/codingtrain/sketches/e3nrNMG7A


// Storing the label
let label = "waiting...";

// Classifier and model url
let classifier;
let modelURL = 'https://teachablemachine.withgoogle.com/models/LTtzSUx7_/';

// STEP 1: Load the model!
function preload() {
  classifier = ml5.soundClassifier(modelURL + 'model.json');
}

function setup() {
  createCanvas(640, 520);
  
  classifier.classifyStart(gotResults);

  // STEP 2: Start classifying (will listen to mic by default)
  // classifyAudio();
}

// STEP 2 classify!
// function classifyAudio() {
//   classifier.classify(gotResults);
// }

function draw() {
  background(0);

  // STEP 4: Draw the label
  // textSize(32);
  textAlign(CENTER, CENTER);
  // fill(255);
  // text(label, width/2, height - 16);

  // Background noise is headphones
  let emoji = "🎤";
  // Pick an emoji based on label
  if (label == "Lonely") {
    emoji = "😢";
  } else if (label == "Billie") {
    emoji = "👱‍♀️";
  }

  // Draw the emoji
  textSize(256);
  text(emoji, width / 2, height / 2);
}

// STEP 3: Get the classification!
function gotResults(results) {
  // Store the label
  label = results[0].label;
  console.log(label);
}

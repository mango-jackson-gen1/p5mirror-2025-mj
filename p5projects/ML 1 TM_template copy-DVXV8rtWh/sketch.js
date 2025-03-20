// Add some header info
// For TM template code

// Video
let video;

let label = 'waiting';

let classifier;
// STEP 1: Load the model!
function preload(){
  classifier = ml5.soundClassifier('https://teachablemachine.withgoogle.com/models/LTtzSUx7_/');
}


function setup() {
  createCanvas(640, 520);
  // Create the video
  video = createCapture(VIDEO);
  video.hide();

  // STEP 2: Start classifying
}

// STEP 2 classify!

function draw() {
  background(0);
  
  // Draw the video
  image(video, 0, 0);

  // STEP 4: Draw the label
}


// STEP 3: Get the classification!

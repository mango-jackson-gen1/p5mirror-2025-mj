// referenced sketches:
// https://editor.p5js.org/ml5/sketches/K0sjaEO19
// https://editor.p5js.org/ml5/sketches/ImageClassification_VideoSound

// Thank you for Jack B. Du for this example!

// A variable to initialize the Image Classifier
let classifier;

// A variable to hold the video we want to classify
let video;

// Variable for displaying the results on the canvas
let label = "Model loading...";

let myVoice = new p5.Speech();

function preload() {
  classifier = ml5.imageClassifier("MobileNet", { flipped: true });
}

function setup() {
  createCanvas(640, 480);
  background(255);

  // Using webcam feed as video input, hiding html element to avoid duplicate with canvas
  video = createCapture(VIDEO, { flipped: true });
  video.size(640, 480);
  video.hide();
  // Call the classifyVideo function to start classifying the video
  classifyVideo();
}

function draw() {
  // Each video frame is painted on the canvas
  image(video, 0, 0);

  // Printing class with the highest probability on the canvas
  fill(255);
  textSize(32);
  text(label, 20, 50);
}

// Get a prediction for the current video frame
function classifyVideo() {
  classifier.classify(video, gotResult);
}

// Callback function for when classification has finished
function gotResult(results) {
  // Update label variable which is displayed on the canvas
  label = results[0].label;
  myVoice.speak(`I see ${label}`);
  classifyVideo();
}

//Study notes 
/*1 drag and drop directly
  canvas.drop(gotFile);
  
2 adjust size of the image to fit the canvas area
  
  
  
*/
// referenced sketches:
// https://editor.p5js.org/ml5/sketches/pjPr6XmPY
// https://editor.p5js.org/ima_ml/sketches/rnm3SJmMd

// Thank you for Jack B. Du for this example!

// Initialize the Image Classifier method with MobileNet. A callback needs to be passed.
let classifier;

// A variable to hold the image we want to classify
let img;

// Variables for displaying the results on the canvas
let label = "";
let confidence = "";

function preload() {
  classifier = ml5.imageClassifier("MobileNet");
}

function setup() {
  let canvas = createCanvas(400, 400);
//1 drag and drop directly
  canvas.drop(gotFile);
  background(0);
  fill(255);
  noStroke();
  textSize(24);
  textAlign(CENTER);
  text("Drag an image file onto the canvas.", width / 2, height / 2);
}

function imageReady() {
  image(img, 0, 0, width, height);
}

function gotFile(file) {
  if (file.type === "image") {
    img = createImg(file.data, imageReady).hide();
    classifier.classify(img, gotResult);
  } else {
    console.log("Not an image file!");
  }
}

// Callback function for when classification has finished
function gotResult(results) {
  // The results are in an array ordered by confidence
  console.log(results);

  // Display the results on the canvas
  fill(255);
  stroke(0);
  textSize(18);
  textAlign(LEFT);
  label = "Label: " + results[0].label;
  confidence = "Confidence: " + nf(results[0].confidence, 0, 2);
  text(label, 10, 360);
  text(confidence, 10, 380);
}

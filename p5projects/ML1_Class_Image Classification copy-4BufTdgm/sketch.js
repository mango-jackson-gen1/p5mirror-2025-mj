let classifier;
let img;
let label = "waiting...";

function preload() {
  //1 specify the model you want to use
  classifier = ml5.imageClassifier("MobileNet");
 //2 what you are feeding to the ml
  img = loadImage("dan_and_gloria.jpg");
}

// !!!!
// 4 Console.log to understand what is the output of data structure
function gotResults(results) {
  console.log(results);
  label = results[0].label;
}

function setup() {
  createCanvas(400, 400);
  //3 call classify to start analyzing
  classifier.classify(img, gotResults);
}

function draw() {
  background(220);
  image(img, 0, 0, width, height);

  rectMode(CENTER);
  fill(0);
  rect(200, 200, 400, 50);
  textSize(32);
  fill(255);
  textAlign(CENTER, CENTER);
  noStroke();
  text(label, 200, 200);
}

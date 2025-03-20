// Based on:
// https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd

// Variable to hold the COCO-SSD model
let cocoSsdModel;

// A variable to hold the image we want to detect objects in
let img;

// Variable to hold the detection results
let detections = [];

let cocoModel;
let detectedObjects = [];

function preload() {
  // Load the image to detect objects
  img = loadImage("images/kitten.jpg");
}

async function setup() {
  createCanvas(img.width, img.height);
  cocoModel = await cocoSsd.load();
  detectedObjects = await cocoModel.detect(img.canvas);
  console.log(detectedObjects);
}

function draw() {
  background(0);
  image(img, 0, 0);
  for (let i = 0; i < detectedObjects.length; i++) {
    let { bbox, score, class: label } = detectedObjects[i];
    let [x, y, w, h] = bbox;
    // Draw bounding box
    stroke(0, 255, 0);
    fill(255, 10);
    rect(x, y, w, h);
    noStroke();
    fill(0);
    textSize(16);
    text(`${label} (${nf(score * 100, 0, 2)}%)`, x + 5, y + 15);
  }
}

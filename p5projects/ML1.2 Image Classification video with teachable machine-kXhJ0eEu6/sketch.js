let classifier;
let video;
let label = "waiting...";

function preload() {
  classifier = ml5.imageClassifier(
    "https://teachablemachine.withgoogle.com/models/MaIU7-VK_/",
    { flipped: true }
  );
}

// flipped left and right of the cam in the data set too!


function gotResults(results) {
  console.log(results);
  label = results[0].label;
}

function setup() {
  createCanvas(640, 480);
// flipped left and right of the cam
  video = createCapture(VIDEO, { flipped: true });
  video.hide();
  classifier.classifyStart(video, gotResults);
}

function draw() {
  background(220);
  image(video, 0, 0, width, height);

  rectMode(CENTER);
  fill(0);
  rect(width / 2, height - 50, width, 50);
  textSize(32);
  fill(255);
  textAlign(CENTER, CENTER);
  noStroke();
  text(label, width / 2, height - 50);

  if (label == "Train Whistle") {
    background(255, 0, 255, 100);
  }
}

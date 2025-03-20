let charon;
function preload() {
  charon = loadImage("charon.jpg");
}
function setup() {
  createCanvas(400, 400);
  charon.loadPixels();
  background(0);
  noStroke();
  rectMode(CENTER);
}
function draw() {
  // set fill to color in image at mouse position
  // with a lower alpha to make it painterly
  fill(charon.get(mouseX, mouseY), 128);
  rect(mouseX, mouseY, 40, 10);
}
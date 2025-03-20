let angle = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  stroke(255);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  let minDimension = min(width, height);
  
  strokeWeight(minDimension * 0.015);

  let xStart = width * 0.25;
  let xEnd = width * 0.75;
  let x = map(sin(angle), -1, 1, xStart, xEnd);

  let y = height * 0.5;
  let diam = minDimension * 0.3;

  circle(x, y, diam);
  
  rectMode(CENTER);
  rect(y, x,200, 50);
  rect(y, x+100,200, 50);


  angle += 0.05;
}
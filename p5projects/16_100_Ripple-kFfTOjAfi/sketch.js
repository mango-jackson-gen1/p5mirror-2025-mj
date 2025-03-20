let d = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  blendMode(BLEND);
  background("#d1a428");

  stroke("#d1a428");
  noFill();
  strokeWeight(20);

  d += 10; // Increase this value to make circles grow faster

  blendMode(EXCLUSION);

  square(width / 2, height / 2, d);
  circle(0, height / 2, d);
  circle(width, height / 2, d);
}


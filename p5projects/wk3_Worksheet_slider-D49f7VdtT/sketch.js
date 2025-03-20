let sliderX;

function setup() {
  createCanvas(400, 400);
  sliderX = width / 5; // Initial position of the slider ball
}

function draw() {
  background(220);

  // Draw the slider line
  stroke(241, 91, 181);
  strokeWeight(20);
  line(width / 5, 3 * height / 4, 4 * width / 5, 3 * height / 4);

  // Check if the mouse is pressed and within slider bounds
  if (mouseIsPressed && mouseX >= width / 5 && mouseX <= 4 * width / 5) {
    sliderX = mouseX; // Continuously update the slider ball position
  }

  // Draw the sliding ball
  stroke(0, 187, 249);
  strokeWeight(1);
  fill(0, 187, 249);
  ellipse(sliderX, 3 * height / 4, 20, 20);
}


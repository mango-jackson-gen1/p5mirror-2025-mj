var x = 120;
var y = 60;
var radius = 12;

function setup() {
  createCanvas(240, 120);
  ellipseMode(RADIUS);
}

function draw() {
  background(204);
  
  // Calculate the distance between the mouse and the center of the circle
  var d = dist(mouseX, mouseY, x, y);

  // Check if the distance is less than the radius of the circle
  if (d < radius) {
    radius++; // Increase the radius when the mouse is inside the circle
    fill(0);  // Fill the circle with black color
  } else {
    fill(255); // Fill the circle with white color
  }

  // Draw the circle
  ellipse(x, y, radius, radius);
}

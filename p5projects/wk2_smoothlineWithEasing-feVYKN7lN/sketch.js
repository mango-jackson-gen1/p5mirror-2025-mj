var x = 0;
var y = 0;
var px = 0;
var py = 0;
var easing = 0.05;

function setup() {
  createCanvas(480, 120);
  stroke(0, 102); // Set the stroke color
}

function draw() {
  // Easing to update x position
  var targetX = mouseX;
  x += (targetX - x) * easing;

  // Easing to update y position
  var targetY = mouseY;
  y += (targetY - y) * easing;

  // Calculate the weight of the line based on the distance between current and previous positions
  var weight = dist(x, y, px, py);
  strokeWeight(weight);

  // Draw a line from the previous position to the current position
  line(px, py, x, y);

  // Update the previous position with the current position
  // this is important!
  px = x;
  py = y;
}

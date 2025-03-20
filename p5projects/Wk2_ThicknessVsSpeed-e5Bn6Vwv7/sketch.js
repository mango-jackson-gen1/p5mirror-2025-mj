function setup() {
  createCanvas(400, 400);
  stroke(0, 102); // Set stroke color with some transparency
}

function draw() {
  // Calculate distance between current and previous mouse positions
  let weight = dist(mouseX, mouseY, pmouseX, pmouseY);

  // Set the stroke weight based on the distance
  strokeWeight(weight);

  // Draw a line from the previous mouse position to the current position
  line(mouseX, mouseY, pmouseX, pmouseY);
}

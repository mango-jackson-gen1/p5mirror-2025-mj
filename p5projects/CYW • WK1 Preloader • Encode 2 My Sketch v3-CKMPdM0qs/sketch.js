let position;
let velocity;
let acceleration;

function setup() {
  createCanvas(600, 400);
  noFill();

  // Initialize position at the center
  position = createVector(width / 2, height / 2);

  // Velocity determines how fast the circle moves
  velocity = createVector(0, 0);

  // Acceleration determines the change in velocity
  acceleration = createVector(0, 0);
}

function draw() {
  background(100, 20);

  strokeWeight(5);

  // Create a force that moves the circle side-to-side
  let forceMagnitude = 0.5;
  let sideForce = createVector(sin(frameCount * 0.05), 0);
  sideForce.mult(forceMagnitude);

  // Apply the side force to the acceleration
  applyForce(sideForce);

  // Update the velocity by adding acceleration
  velocity.add(acceleration);

  // Update the position by adding velocity
  position.add(velocity);

  // Reset acceleration to zero after applying forces
  acceleration.mult(0);

  // Limit the velocity to keep the movement smooth
  velocity.limit(5);

  // Set color based on horizontal movement
  let sinVal = sin(frameCount * 0.05);
  let r = map(sinVal, -1, 1, 255, 173);
  let g = map(sinVal, -1, 1, 182, 216);
  let b = map(sinVal, -1, 1, 193, 230);

  stroke(r, g, b);

  // Draw the circle
  let diam = 50;
  circle(position.x, position.y, diam);

  // Keep the circle within the canvas bounds
  if (position.x > width || position.x < 0) {
    velocity.x *= -1;
  }
}

// Function to add forces to acceleration
function applyForce(force) {
  acceleration.add(force);
}


// Declare a variable for the horizontal position of the ball
let x;

// Declare a variable for the horizontal speed of the ball
let xspeed = 1;

function setup() {
  createCanvas(400, 400);
  // Initialize the position in the center
  x = width / 2;
}

function draw() {
  background(220);

  // Move the ball ball, either right or left
  x += xspeed;
  
  // Simplified Version:
  // When the ball is at either left or right border
  //Flip once 
  //This condition happens only in one frame
  
  if (x <= 0 || x >= width) {
    // Flip the sign of the direction
    xspeed *= -1;
  }

  // Draw the ball
  ellipse(x, height / 2, 50, 50);
}

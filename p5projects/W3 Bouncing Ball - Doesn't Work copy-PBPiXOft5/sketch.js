// Declare a variable for the horizontal position of the ball
let x;

function setup() {
  createCanvas(400, 400);
  // Initialize the position in the center
  x = width / 2;
}

function draw() {
  background(220);

  
  // When I'm at the left border
  if (x == 0) {
    // Go right
    x++;
  }

  // When I'm at the right border
  if (x == width) {
    console.log("YAY I've reached the right side!", x);
    // Go left
    x--;
    console.log("Now I'm going left.", x);
  }

  // Draw the ball
  ellipse(x, height / 2, 50, 50);
}

// Variables for circle positions and speeds
let x;
let y;
let xspeed = 3;
let yspeed = 3;
let corner1;
let corner2;

function setup() {
  // Create a canvas with flexible size
  createCanvas(600, 700); // Change this as needed
  
  // Initialize positions relative to the canvas dimensions
  x = width / 2;
  y = height / 2;
  corner1 = width / 2;
  corner2 = height / 2;
}

function draw() {
  background(207, 191, 247);

  // Ball moving to the right
  noStroke();
  fill(139, 128, 249);
  ellipse(x, height / 2, 50, 50);
  x += xspeed;
  
  // Ball moving upwards
  fill(207, 177, 183);
  ellipse(width / 2, y, 50, 50);
  y -= yspeed;
  
  // Ball moving diagonally towards the top-right corner
  fill(108, 212, 255);
  ellipse(corner1, corner2, 50, 50);
  corner1 += xspeed;
  corner2 -= xspeed *(height/width);

  // Ball moving left
  fill(255, 128, 128);
  ellipse(width - x, height / 2, 50, 50); // Moving left symmetrically from the right edge
}


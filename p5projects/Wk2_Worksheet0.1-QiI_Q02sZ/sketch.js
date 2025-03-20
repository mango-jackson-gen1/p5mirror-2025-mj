// Declare a variable for the x or horizontal position of the circle
let x;
// Declare a variable for the y or vertical position of the circle
let y;
// Declare a variable to describe the relationship between the width and height of the canvas.
let w2h;
// Declare a variable for how fast the circle will travel horizontally.
let xspeed;
// Declare and initialize a variable for how fast the circle will travel vertically.
let yspeed = 2;

function setup() {
  createCanvas(800, 400);
  // Calculate the relationship between the width and height of the canvas...width = ? * height
  w2h = width/height; // 800/400 = 2
  
  // Initialize x to be in the middle
  x = width/2;
  y = height/2;
  
  // Calculate the xspeed relative to the yspeed and the aspect ratio of the canvas
  xspeed = yspeed * w2h; // 1 * 2
}

function draw() {
  
  // Draw the background
  background(220);
  
  // Use x and y
  ellipse(x, y, 50, 50);
  
  // Update x and y
  x+=xspeed;
  y+=yspeed;
  
  // Print out the value of x
  //console.log(x);
  
}
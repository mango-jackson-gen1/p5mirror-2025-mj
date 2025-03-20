// Declare variables for the location and size of the rectangle.
let x, y, w, h;

function setup() {
  createCanvas(712, 400);
  
  // Position and size the rectangle relative to the canvas
  x = 0.37* width;
  y = 0.34* height;
  w = .13 * width;
  h = .12 * height;
}

function draw() {
  background(220);
  
  // Define the relationship between the x,y,w,h of the rectangle and its 4 sides
  let left = x - w/2;
  let right = x + w/2;
  let topp = y - h/2;
  let bottom = y + h/2;
  
  // Draw the rectangle
  line(left, topp, right, topp);
  line(right, topp, right, bottom);
  line(right, bottom, left, bottom);
  line(left, bottom, left, topp);
  
  // Move the rectangle 1/10th of the way towards the mouse
  x += (mouseX-x)/10;
  y += (mouseY-y)/10;
  
}
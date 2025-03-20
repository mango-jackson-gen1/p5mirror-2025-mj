
function setup() {
  createCanvas(400, 400);
  // Arguments for rect 1
  // e.g. rect(topRightX, topRightY, bottomLeftX, bottomLeftY);
  rect(1,1,10,10);
  // Arguments for rect 2
  rect();
  // Come up with as many as you can think of!
  rectMode(CENTER);
  fill(200);
  rect(40,40, 40, 60)
  
  rectMode(RADIUS)
  fill(255, 0, 0);
  rect(40,40, 12, 25);
  
// Two corners method 
  rectMode(CORNERS)
  fill(0, 255, 0);
  rect(40,40, 90, 80);
  
  
  
  rect();
  rect();
  rect();
  rect();
}

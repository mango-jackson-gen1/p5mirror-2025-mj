let r = 25; // radius
let lightStatus = true; // current light status
let insideCircle = false; // current mouse position
let previouslyInsideCircle = false; // previous mouse position

function setup() {
  createCanvas(250, 250);
}

function draw() {
  background(220);

  // CHECK IF MOUSE IS INSIDE THE CIRCLE
  // Check the distance between the mouse and the center
  d = dist(width / 2, height / 2, mouseX, mouseY);
  // If it is in the circle, change insideCircle to true, else false
  if (d < r) {
    insideCircle = true;
  } else {
    insideCircle = false;
  }
  
  // CHECK IF THE MOUSE "JUST ENTERED", IT IS PREVIOUSLY OUTSIDE OF THE CIRCLE
  if (insideCircle && !previouslyInsideCircle) {
    // If the light is on, turn it off, else turn it on
    lightStatus = !lightStatus;
    if (lightStatus) {
      fill(255);
    } else {
      fill(0);
    }
  }

  ellipse(width / 2, height / 2, r * 2);
  // Change the previouslyInsideCircle variable to match the current status
  previouslyInsideCircle = insideCircle;
}

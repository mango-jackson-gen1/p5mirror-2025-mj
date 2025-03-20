// Keep track of whether light is on
let isOn = false;

// Keep track of whether I've left the room
let hasLeft = true;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  // Check to see if I'm in the room
  if(mouseX > width/2) {
    // Check to see if I've left the room
    if(hasLeft) {
      // I've now officially not left the room - This take away my ability to toggle the light in the next frame.
      hasLeft = false;
      // Toggle the light switch
      isOn = !isOn;
    }
  } else {
    // I've now officially left the room - This re-enables my ability to toggle the light in the next frame.
    hasLeft = true;
  } 
  
  // Check to see if the light is on
  if(isOn) {
    fill('red');
  }
  else {
   fill('black');
  }
  
  // Draw the rectangle
  rect(width/2, 0, width/2, height);
}
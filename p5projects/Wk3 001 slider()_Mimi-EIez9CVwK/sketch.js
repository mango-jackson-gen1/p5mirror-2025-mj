let x;
let canSlide = false;

function setup() {
  createCanvas(400, 400);
  x = 0;
}

function draw() {
  background(220);

  // Draw the slider range as a horizontal rectangle
  rect(0, height / 2 - 10, width, 20);

  // Check if the mouse is pressed
  if (mouseIsPressed) {
    // Check if the mouse is within the range of the slider
    if (mouseX > 0 && mouseX < width && mouseY > height / 2 - 10 && mouseY < height / 2 + 10) {
      canSlide = true; // Enable sliding
    }
  } else {
    canSlide = false; // Disable sliding when the mouse is released
  }

  // Update x to follow the mouse if sliding is enabled
  if (canSlide) {
    x = mouseX;
  }

  // Constrain x to stay within the canvas boundaries
  x = constrain(x, 0, width);

  // Draw the draggable circle
  //When canSlide is false, the line if (canSlide) x = mouseX; does not execute, so the x variable is not updated with mouseX. As a result, the value of x remains the same as it was the last time canSlide was true.

  ellipse(x, height / 2, 50, 50);
}


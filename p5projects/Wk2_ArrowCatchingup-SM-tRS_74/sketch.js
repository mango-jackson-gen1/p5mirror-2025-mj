var x;
var offset = 10;

function setup() {
  createCanvas(240, 120);
  x = width / 2;
}

function draw() {
  background(204);

  // Move the line based on the mouse's x position
  if (mouseX > x) {
    x += 0.5;
    offset = -10;
    console.log("x: " + x + ", mouseX: " + mouseX + ", offset: " + offset); // Log the values of x, mouseX, and offset
  } else if (mouseX < x) {
    x -= 0.5;
    offset = 10;
  }

  // Draw a vertical line at the current 'x' position
  line(x, 0, x, height);

  // Draw an arrow pointing left or right depending on "offset" value
  line(mouseX, mouseY, mouseX + offset, mouseY - 10);
  line(mouseX, mouseY, mouseX + offset, mouseY + 10);
  line(mouseX, mouseY, mouseX + offset * 3, mouseY);
}


// The line is catching up to the arrow! Speed!
// Arrow's Offset Value: The offset is set to -10. This negative offset value shifts the arrow lines to the left relative to the mouse's current position. This is because, in this case, the goal is to show an arrow pointing towards the left, indicating that the vertical line needs to catch up with the mouse on the right.

function setup() {
  createCanvas(600, 400); // You can change the canvas size as needed
}

function draw() {
  background(220);

  // Calculate rectangle dimensions
  let rectWidth = width / 2;
  let rectHeight = height / 2;

  // Calculate top-left corner for centering the rectangle
  let rectX = (width - rectWidth) / 2;
  let rectY = (height - rectHeight) / 2;

  // Draw the rectangle
  rect(rectX, rectY, rectWidth, rectHeight);
}

let randomDisplacement = 15;
let rotateMultiplier = 20;
let offset = 4;
let squareSize = 40;

function setup() {
  // Create canvas with the same size as the window
  let size = windowWidth;
  createCanvas(size, size);
  strokeWeight(2);
  noFill();
  rectMode(CENTER);
}

function draw() {
  background(255);
  
  // Match the original loops, drawing squares across the canvas
  for (let i = squareSize*2; i <= width - squareSize*2; i += squareSize) {
    for (let j = squareSize; j <= height - squareSize; j += squareSize) {
      // Calculate random rotation
      let rotationSign;
      if (Math.random() < 0.5) {
        rotationSign = -1;
      } else {
        rotationSign = 1;
      }
      let rotateAmt = j / width * Math.PI / 180 * rotationSign * Math.random() * rotateMultiplier;
      
      // Calculate random displacement
      let translationSign;
      if (Math.random() < 0.5) {
        translationSign = -1;
      } else {
        translationSign = 1;
      }
      let translateAmt = j / width * translationSign * Math.random() * randomDisplacement;
      
      push(); // Similar to context.save()
      translate(i + translateAmt + offset, j + offset);
      rotate(rotateAmt);
      rect(0, 0, squareSize, squareSize); // In p5, rect with rectMode(CENTER) places (0,0) at center
      pop(); // Similar to context.restore()
    }
  }
  
  // Call noLoop to prevent animation (draw only once)
  // This matches the behavior of the original code
  noLoop();
}

// This function allows for resizing the window
function windowResized() {
  let size = windowWidth;
  resizeCanvas(size, size);
  loop(); // Allow drawing again after resize
}
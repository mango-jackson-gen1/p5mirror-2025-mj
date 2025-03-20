function setup() {
  createCanvas(800, 600);
  background(30); // dark charcoal background
  stroke(230, 200); // pale gray strokes with slight transparency
  strokeWeight(1.2);
  noFill();

  let numRows = 7;
  let loopsPerRow = 30;
  let verticalSpacing = height / (numRows + 1);

  for (let row = 0; row < numRows; row++) {
    let y = (row + 1) * verticalSpacing + random(-10, 10);
    drawLoopRow(y, loopsPerRow);
  }

  noLoop(); // Draw once
}

function drawLoopRow(y, loops) {
  beginShape();
  for (let i = 0; i <= loops; i++) {
    let x = map(i, 0, loops, 100, width - 100);
    let loopRadius = random(8, 27);
    
    // Create looping circles to form continuous scribbles
    for (let angle = 0; angle <= TWO_PI; angle += PI / 10) {
      let offsetX = cos(angle) * loopRadius + random(-2, 2);
      let offsetY = sin(angle) * loopRadius + random(-1, 1);
      vertex(x + offsetX, y + offsetY);
    }
  }
  endShape();
  noLoop();
}

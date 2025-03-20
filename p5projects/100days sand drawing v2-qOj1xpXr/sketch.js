function setup() {
  createCanvas(800, 600);
  background(30); // dark charcoal background
  stroke(230, 200); // pale gray strokes with slight transparency
  strokeWeight(3);
  noFill();

  let numRows = 12;
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
    let x = map(i, 0, loops, 50, width - 50);
    let loopRadius = random(15, 25);
    
    // Create looping circles to form continuous scribbles
    for (let angle = 0; angle <= TWO_PI; angle += PI / 10) {
      let offsetX = cos(angle) * loopRadius + random(-2, 2);
      let offsetY = sin(angle) * loopRadius + random(-2, 2);
      vertex(x + offsetX, y + offsetY);
    }
  }
  endShape();
}

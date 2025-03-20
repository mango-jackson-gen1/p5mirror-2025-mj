function setup() {
  createCanvas(800, 600);
  background(30); // dark charcoal background
  stroke(235, 220); // soft white strokes with slight transparency
  strokeWeight(1.5);
  noFill();
  noLoop();

  let numRows = 7;
  let loopsPerRow = 8;

  for (let row = 0; row < numRows; row++) {
    let yBase = map(row, 0, numRows - 1, 50, height - 50);
    drawOrganicScribbleRow(yBase, loopsPerRow, row);
  }
}

function drawOrganicScribbleRow(yBase, loops, rowIndex) {
  beginShape();

  let noiseXOff = random(1000);
  let noiseYOff = random(2000);

  for (let i = 0; i <= loops; i++) {
    // Horizontal spacing with noise
    let x = map(i, 0, loops, 50, width - 50);
    let xNoise = map(noise(noiseXOff + i * 0.1, rowIndex * 0.2), 0, 1, -20, 20);
    
    // Vertical positioning with noise for natural variability
    let yNoise = map(noise(noiseYOff + i * 0.1, rowIndex * 0.2), 0, 1, -30, 30);

    let loopRadiusX = map(noise(noiseXOff + i * 0.05), 0, 1, 10, 25);
    let loopRadiusY = map(noise(noiseYOff + i * 0.05), 0, 1, 15, 35);

    // Organic looping pattern
    for (let angle = 0; angle <= TWO_PI; angle += PI / 12) {
      let offsetX = cos(angle) * loopRadiusX;
      let offsetY = sin(angle) * loopRadiusY;
      let finalX = x + xNoise + offsetX;
      let finalY = yBase + yNoise + offsetY;
      vertex(finalX, finalY);
    }
  }

  endShape();
}

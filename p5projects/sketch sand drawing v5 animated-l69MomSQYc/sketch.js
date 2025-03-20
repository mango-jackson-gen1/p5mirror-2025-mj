function setup() {
  createCanvas(800, 600);
  background(30); // Initial dark background
  strokeWeight(1.2);
  noFill();
  frameRate(0.57); // Adjust this number (lower = slower, higher = faster)

}

function draw() {
  background(30, 15); // Slight transparency creates sand-trail effect

  let numRows = 14;
  for (let row = 0; row < numRows; row++) {
    let yBase = map(row, 0, numRows - 1, 60, height - 60);
    drawOrganicSplineRow(yBase, row);
  }
}

function drawOrganicSplineRow(yBase, rowIndex) {
  let noiseXOff = random(1000);
  const margin = 50;
  let x = margin;

  while (x < width - margin) {
    if (random() < 0.3) {
      x += random(30, 70);
      continue;
    }

    let splineLength = random(50, 120);

    if (x + splineLength > width - margin) {
      splineLength = (width - margin) - x;
    }

    beginShape();

    let pointsInSpline = floor(random(5, 12));

    for (let i = 0; i <= pointsInSpline; i++) {
      let t = i / pointsInSpline;

      let offsetX = map(noise(noiseXOff + (x + t * splineLength) * 0.005, rowIndex * 0.2, t), 0, 1, -20, 20);
      let offsetY = map(noise(noiseXOff + yBase * 0.005, rowIndex, t), 0, 1, -30, 30);

      let finalX = x + t * splineLength + offsetX;
      let finalY = yBase + offsetY;

      // Sand-like transparency with noise
      stroke(235, noise(rowIndex * 0.1, x * 0.01, t * 5) * 120);
      curveVertex(finalX, finalY);
    }

    endShape();

    x += splineLength + random(10, 40);
  }
}

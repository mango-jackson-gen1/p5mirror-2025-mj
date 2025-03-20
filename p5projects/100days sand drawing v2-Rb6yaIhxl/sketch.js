let points = [];
let numPoints = 10;

function setup() {
  createCanvas(700, 700);
  background(245, 240, 230); // Paper-like background
  noLoop();

  // Generate random points around a circle with slight randomness
  for (let i = 0; i < numPoints; i++) {
    let angle = map(i, 0, numPoints, 0, TWO_PI);
    let r = random(100, 250);
    let x = width / 2 + r * cos(angle);
    let y = height / 2 + r * sin(angle);
    points.push({ x, y });
  }
}

function draw() {
  // Draw paint droplets in background
  drawPaintDroplets(400);

  // Draw multiple layers of gestural splines
  for (let pass = 0; pass < 120; pass++) {
    stroke(random(20, 60), random(20, 70)); // muted charcoal-grey, subtle alpha
    strokeWeight(random(1, 3));
    noFill();
    beginShape();

    let t = frameCount * 0.01 + pass * 0.05;

    // Duplicate first and last point for smooth closure
    let first = points[0];
    let last = points[points.length - 1];

    curveVertex(first.x + offsetX(first, t), first.y + offsetY(first, t));

    for (let i = 0; i < points.length; i++) {
      let p = points[i];
      curveVertex(p.x + offsetX(p, t), p.y + offsetY(p, t));
    }

    curveVertex(last.x + offsetX(last, t), last.y + offsetY(last, t));
    curveVertex(first.x + offsetX(first, t), first.y + offsetY(first, t));

    endShape(CLOSE);
  }
}

// Function to create random scattered paint droplets
function drawPaintDroplets(numDroplets) {
  noStroke();
  for (let i = 0; i < numDroplets; i++) {
    let x = random(width);
    let y = random(height);
    let size = random(3, 8);
    fill(random(50, 80), random(40, 100)); // subtle gray droplets with transparency
    ellipse(x, y, size, size);
  }
}

// Offset functions using noise for smooth organic gestures
function offsetX(p, t) {
  return map(noise(p.x * 0.005, p.y * 0.005, t), 0, 1, -40, 40);
}

function offsetY(p, t) {
  return map(noise(p.y * 0.005, p.x * 0.005, t + 100), 0, 1, -40, 40);
}

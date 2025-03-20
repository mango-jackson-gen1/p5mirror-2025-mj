let points = [];

function setup() {
  createCanvas(800, 800);
  generatePoints(500);
  background(255);
}

function generatePoints(n) {
  points = [];
  for (let i = 0; i < n; i++) {
    let angle = random(TWO_PI);
    let radius = random(20, 350);
    points.push(createVector(width / 2 + cos(angle) * radius, height / 2 + sin(angle) * radius));
  }
}

function draw() {
  background(255); // Clears canvas each frame for clear visibility
  stroke(0, 80); // darker strokes for better visibility
  noFill();

  points.forEach(p => {
    p.x += random(-0.5, 0.5);
    p.y += random(-0.5, 0.5);
  });

  for (let i = 0; i < points.length - 2; i += 2) {
    beginShape();
    curveVertex(points[i].x, points[i].y);
    curveVertex(points[i + 1].x, points[i + 1].y);
    curveVertex(points[i + 2].x, points[i + 2].y);
    endShape();
  }
}
function keyPressed() {
  if (key === 's') save('drawing.png');
}

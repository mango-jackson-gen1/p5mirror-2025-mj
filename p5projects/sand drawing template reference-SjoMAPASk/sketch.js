let points = [];

function setup() {
  createCanvas(800, 800);
  background(20);
  noLoop();
  initSnek(5, 500);
}

function initSnek(verticesPerPath, numPaths) {
  points = [];
  for (let i = 0; i < numPaths; i++) {
    let midX = width / 2 + random(-300, 300);
    let midY = height / 2 + random(-300, 300);
    let path = [];
    for (let v = 0; v < verticesPerPath; v++) {
      let angle = map(v, 0, verticesPerPath, 0, TWO_PI);
      path.push(createVector(midX + cos(angle) * 20, midY + sin(angle) * 20));
    }
    points.push(path);
  }
}

function draw() {
  stroke(255, 50);
  strokeWeight(1);
  noFill();

  points.forEach(path => {
    beginShape();
    path.forEach(pt => {
      curveVertex(pt.x, pt.y);
    });
    endShape(CLOSE);
  });

  applyForces();
}

function applyForces() {
  for (let iter = 0; iter < 100; iter++) {
    points.forEach(path => {
      path.forEach(pt => {
        pt.x += random(-0.1, 0.1);
        pt.y += random(-0.1, 0.1);
      });
    });

    points.forEach(path => {
      beginShape();
      path.forEach(pt => {
        curveVertex(pt.x, pt.y);
      });
      endShape(CLOSE);
    });
  }
}

function keyPressed() {
  if (key === 's') save('drawing.png');
}

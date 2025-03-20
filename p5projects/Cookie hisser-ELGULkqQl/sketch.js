function setup() {
  createCanvas(600, 600);
  background(255);
  stroke(0);
  noFill();

  let centerX = width / 2;
  let centerY = height / 2;
  let radius = 200;
  
  // Outer jittery ring
  beginShape();
  for (let angle = 0; angle < TWO_PI; angle += 0.05) {
    let offset = random(-20, 20); // controls jaggedness
    let r = radius + offset;
    let x = centerX + r * cos(angle);
    let y = centerY + r * sin(angle);
    vertex(x, y);
  }
  endShape(CLOSE);

  // Optional: inner dashed circle (as per the original sketch)
  stroke(0);
  drawingContext.setLineDash([10, 10]);
  ellipse(centerX, centerY, radius * 1.5);
  drawingContext.setLineDash([]);
}

function draw() {
  // Static sketch, no continuous drawing needed.
  noLoop();
}



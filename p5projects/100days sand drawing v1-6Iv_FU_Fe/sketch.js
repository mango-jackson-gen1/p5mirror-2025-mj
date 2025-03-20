let points = [];
let numPoints = 8; // Increase for more complexity
let noiseScale = 0.005; // Adjust for subtle or dramatic variation

function setup() {
  createCanvas(600, 600);
  background(10);
  noFill();
  
  // Generate initial points arranged in a circle
  for (let i = 0; i < numPoints; i++) {
    let angle = map(i, 0, numPoints, 0, TWO_PI);
    let r = 200;
    let x = width / 2 + r * cos(angle);
    let y = height / 2 + r * sin(angle);
    points.push({x, y});
  }

  strokeWeight(1.3);
}

function draw() {
  background(10, 15); // Slight transparency to build layers

  // Multiple passes for depth
  for (let pass = 0; pass < 80; pass++) {
    stroke(255, noise(pass * 0.1) * 50); // Transparency controlled by noise
    beginShape();
    
    let t = frameCount * 0.01 + pass;

    // Closing the spline smoothly
    let first = points[0];
    let last = points[points.length - 1];
    curveVertex(
      first.x + noise(first.x * noiseScale, first.y * noiseScale, t) * 30,
      first.y + noise(first.y * noiseScale, first.x * noiseScale, t) * 30
    );

// noise(first.x * noiseScale, first.y * noiseScale, t)
//Perlin noise (noise) to smoothly alter the position of each point (p) in your curve over time (t).
//noise(x, y, z) returns a smooth, continuous random-like value between 0 and 1.

    // Noise-driven curve points
    for (let i = 0; i < points.length; i++) {
      let p = points[i];
      let offsetX = map(noise(p.x * noiseScale, p.y * noiseScale, t), 0, 1, -30, 30);
      let offsetY = map(noise(p.y * noiseScale, p.x * noiseScale, t + 50), 0, 1, -30, 30);
      curveVertex(p.x + offsetX, p.y + offsetY);
    }

    curveVertex(
      last.x + noise(last.x * noiseScale, last.y * noiseScale, t) * 30,
      last.y + noise(last.y * noiseScale, last.x * noiseScale, t) * 30
    );
    curveVertex(
      first.x + noise(first.x * noiseScale, first.y * noiseScale, t) * 30,
      first.y + noise(first.y * noiseScale, first.x * noiseScale, t) * 30
    );

    endShape(CLOSE);
  }

  noLoop(); // Stops after one full render
}

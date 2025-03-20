// Paint stain effect using an off-screen graphics layer (trails)

let particles = [];
let gravity = 0.3;
let rectX, rectY, rectW, rectH;

// Off-screen graphics buffer to store permanent trails
let trailLayer;

function setup() {
  createCanvas(400, 500);

  // Create the permanent stain trail layer
  trailLayer = createGraphics(width, height);
  trailLayer.clear(); // Start with a clear canvas

  // Define rectangle as the paint source
  rectW = width / 2;
  rectH = height / 10;
  rectX = width / 2;
  rectY = height / 4;

  // Create initial droplets falling from the rectangle edges
  particles.push(new Particle(rectX - rectW / 2, rectY + rectH / 2));
  particles.push(new Particle(rectX + rectW / 2, rectY + rectH / 2));
}

function draw() {
  background(220);

  // Draw rectangle paint source
  rectMode(CENTER);
  fill(150, 0, 0);
  rect(rectX, rectY, rectW, rectH);

  // Update and draw each particle
  for (let p of particles) {
    p.update();
    p.drawTrail();  // Draw permanent trail
    p.display();    // Draw particle itself
  }

  // Display the permanent trail layer
  image(trailLayer, 0, 0);
}

// Particle class clearly structured
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.prevX = x;
    this.prevY = y;
    this.vy = 0;
    this.size = 8;
  }

  update() {
    this.prevX = this.x;
    this.prevY = this.y;

    // Apply gravity
    this.vy += gravity;
    this.y += this.vy;

    // Check collision with bottom and simulate friction
    if (this.y >= height - this.size / 2) {
      this.y = height - this.size / 2;
      this.vy *= -0.2;  // friction effect
      
      // Stop completely if velocity is minimal
      if (abs(this.vy) < 0.1) {
        this.vy = 0;
      }
    }
  }

  // Draw the droplet particle
  display() {
    fill(150, 0, 0);
    ellipse(this.x, this.y, this.size);
  }

  // Draw permanent trail on the off-screen graphics layer
  drawTrail() {
    trailLayer.stroke(150, 0, 0, 100); // semi-transparent stain
    trailLayer.strokeWeight(2);
    trailLayer.line(this.prevX, this.prevY, this.x, this.y);
  }
}

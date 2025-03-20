// Particle dropping example using classes

let particleLeft, particleRight;
let gravity = 0.3;
let rectX, rectY, rectW, rectH;

function setup() {
  createCanvas(400, 400);
  
  // Rectangle dimensions and position
  rectW = width / 2;
  rectH = height / 10;
  rectX = width / 2;
  rectY = height / 4;

  // Create two Particle instances at left and right rectangle edges
  particleLeft = new Particle(rectX - rectW / 2, rectY + rectH / 2);
  particleRight = new Particle(rectX + rectW / 2, rectY + rectH / 2);
}

function draw() {
  background(220);

  // Draw the rectangle (paint source)
  rectMode(CENTER);
  fill(150, 0, 0);
  rect(rectX, rectY, rectW, rectH);

  // Update and show particles
  particleLeft.update();
  particleLeft.show();

  particleRight.update();
  particleRight.show();
}

// Particle class definition
class Particle {
  // Constructor initializes properties
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vy = 0;
    this.size = 10;
  }

  // Update particle position and apply friction at bottom
  update() {
    // Gravity increases downward velocity
    this.vy += gravity;
    this.y += this.vy;

    // Collision with canvas bottom applies friction effect
    if (this.y >= height - this.size / 2) {
      this.y = height - this.size / 2;
      this.vy *= -0.2; // friction slows down particle
      
      // Stop completely if velocity is minimal
      if (abs(this.vy) < 0.1) {
        this.vy = 0;
      }
    }
  }

  // Display the particle on canvas
  show() {
    fill(150, 0, 0);
    ellipse(this.x, this.y, this.size);
  }
}

let walkers = [];
let numWalkers = 20;

function setup() {
  createCanvas(800, 600);
  background(20);
  for (let i = 0; i < numWalkers; i++) {
    walkers.push(
      new Walker(
        random(width),
        random(height),
        color(random(100, 255), random(100, 255), random(100, 255), 50)
      )
    );
  }
}

function draw() {
  // Add a semi-transparent background to create a fading trail effect
  blendMode(HARD_LIGHT);
  fill(10,10);
  rect(0, 0, width, height);
  for (let walker of walkers) {
    walker.step();
    walker.show();
  }
}

class Walker {
  constructor(x, y, col) {
    this.x = x;
    this.y = y;
    this.col = col;
    this.noiseOffsetX = random(1000);
    this.noiseOffsetY = random(1000);
    this.stepSize = random(2, 5); 
  }

  show() {
    noStroke();
    fill(this.col);
    ellipse(this.x, this.y, 10, 10);

    // Draw a gradient trail
    for (let i = 0; i < 5; i++) {
      fill(red(this.col), green(this.col), blue(this.col), 10 - i * 2);
      ellipse(this.x, this.y, 20 - i * 4, 20 - i * 4);
    }
  }

  step() {
    // Use Perlin noise for smooth, organic movement
    this.x += map(noise(this.noiseOffsetX), 0, 1, -this.stepSize, this.stepSize);
    this.y += map(noise(this.noiseOffsetY), 0, 1, -this.stepSize, this.stepSize);
    this.noiseOffsetX += 0.01;
    this.noiseOffsetY += 0.01;

    // LIMIT
    if (this.x > width) this.x = 0;
    if (this.x < 0) this.x = width;
    if (this.y > height) this.y = 0;
    if (this.y < 0) this.y = height;

    // Occasionally change color and step size
    if (random(1) < 0.02) {
      this.col = color(random(100, 255), random(100, 255), random(100, 255), 50);
      this.stepSize = random(2, 5);
    }
  }
}
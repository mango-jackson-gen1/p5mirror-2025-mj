// Dripping Paint Simulation in p5.js (Orange Paint Color)

let particles = [];
let gravity = 0.2;
let streaks;
let reservoirHeight = 30;
let dripColor;

function setup() {
  createCanvas(400, 400);
  dripColor = color(255, 140, 0); // ✅ Updated to orange paint

  // Create off-screen layer for permanent paint streaks
  streaks = createGraphics(width, height);
  streaks.clear();
}

function draw() {
  background(255);

  // Draw permanent streaks layer
  image(streaks, 0, 0);

  // Draw paint reservoir (top rectangle)
  noStroke();
  fill(dripColor);
  rect(0, 0, width, 30);

  // Randomly create new drip particles
  if (random(1) < 0.02) {
    spawnParticle(random(width), 30);
  }

  // Update and display particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();

    // Remove particle if fully faded or off-canvas
    if (particles[i].alpha <= 0 || particles[i].y > height) {
      particles.splice(i, 1);
    }
  }
}

// Spawn new droplet particle
function spawnParticle(x, y) {
  particles.push(new Particle(x, y));
}

// Particle class for each paint droplet
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = random(0, 1);
    this.ay = 0.2;
    this.size = random(3, 6);
    this.alpha = random(180, 255);
    this.noiseOffset = random(1000);
    this.canBreak = true;
  }

  update() {
    // Gravity
    this.vy = (this.vy || 0) + gravity;

    // Horizontal sway using noise
    let noiseForce = map(noise(this.noiseOffset), 0, 1, -0.1, 0.1);
    this.vx = (this.vx || 0) + noiseForce;
    this.noiseOffset += 0.01;

    // Update position
    let prevX = this.x;
    let prevY = this.y;
    this.x += this.vx;
    this.y += this.vy;

    // Permanent trail drawn to streaks layer
    streaks.stroke(red(dripColor), green(dripColor), blue(dripColor), 150);
    streaks.strokeWeight(this.size);
    streaks.line(prevX, prevY, this.x, this.y);

    // Gradual fading
    this.alpha -= 2;
    this.alpha = max(this.alpha, 0);

    // Break apart occasionally
    if (this.canBreak && random(1) < 0.005) this.breakApart();
  }

  display() {
    noStroke();
    fill(red(dripColor), green(dripColor), blue(dripColor), this.alpha);
    ellipse(this.x, this.y, this.size, this.size * 2);
  }

  breakApart() {
    this.canBreak = false;
    for (let n = 0; n < 2; n++) {
      let p = new Particle(this.x, this.y);
      p.size = this.size * 0.6;
      p.alpha = this.alpha * 0.8;
      p.canBreak = false;
      p.vx = this.vx + random(-1, 1);
      p.vy = this.vy * random(0.5, 1);
      particles.push(p);
    }
    this.alpha = 0;
  }
}

function mousePressed() {
  // Click to add more particles
  for (let i = 0; i < 3; i++) {
    spawnParticle(random(width), 30);
  }
}

// Wind force
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    particles.forEach(p => p.vx -= random(0.5, 1));
  } else if (keyCode === RIGHT_ARROW) {
    particles.forEach(p => p.vx += random(0.5, 1));
  }
}

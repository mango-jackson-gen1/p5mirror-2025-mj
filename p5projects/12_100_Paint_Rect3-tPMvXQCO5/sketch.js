// Function to check if particle should settle (stop moving)
  checkSettling() {
    // Distance to check for particle collisions
    const collisionDistance = this.size * 0.8;
    
    // Check if particle reached bottom
    if (this.pos.y >= height - this.size/2) {
      this.settled = true;
      this.settledPos = this.pos.copy();
      this.pos.y = height - this.size/2; // Place exactly on bottom
      return;
    }
    
    // Check collision with other settled particles
    // Only check if close to bottom part of screen (optimization)
    if (this.pos.y > height * 0.7) {
      for (let firework of fireworks) {
        for (let particle of firework.particles) {
          // Skip self or non-settled particles
          if (particle === this || !particle.settled) continue;
          
          // Check distance
          const d = dist(this.pos.x, this.pos.y + this.size/2, 
                         particle.pos.x, particle.pos.y - particle.size/2);
          
          if (d < collisionDistance) {
            this.settled = true;
            this.settledPos = this.pos.copy();
            // Move up slightly to sit on top of the other particle
            this.pos.y = particle.pos.y - this.size;
            return;
          }
        }
      }
    }
  }let fireworks = [];
let settledParticles = []; // Store settled particles
let gravity;
let rectX, rectY, rectW, rectH;
let frameInterval = 60; // Control how often fireworks appear

function setup() {
  createCanvas(400, 400);
  
  // Define gravity as a vector
  gravity = createVector(0, 0.2);
  
  // Define rectangle position & size (centered)
  rectW = width / 2;
  rectH = height / 10;
  rectX = width / 2;
  rectY = height / 4;
}

function draw() {
  background(20); // Dark background
  
  // Draw the rectangle (paint source)
  rectMode(CENTER);
  fill(150, 0, 0); // Dark red rectangle
  noStroke(); // Remove border
  rect(rectX, rectY, rectW, rectH);
  
  // Create new fireworks from the center of the rectangle at intervals
  if (frameCount % frameInterval === 0) {
    // Center point of the rectangle
    let centerX = rectX;
    let centerY = rectY + rectH / 2; // Bottom center of the rectangle
    
    // Create particles flowing left and right
    fireworks.push(new Firework(centerX, centerY, "both"));
  }
  
  // Update and display fireworks
  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();
    if (fireworks[i].done()) {
      fireworks.splice(i, 1);
    }
  }
}

class Firework {
  constructor(x, y, side) {
    this.particles = [];
    this.side = side; // "left", "right", or "both"
    
    // Create explosion directly at the starting point
    this.explode(x, y);
  }
  
  done() {
    return this.particles.length === 0;
  }
  
  update() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].applyForce(gravity);
      this.particles[i].update();
      if (this.particles[i].done()) {
        this.particles.splice(i, 1);
      }
    }
  }
  
  explode(x, y) {
    // Create particles distributed across a wider area
    for (let i = 0; i < 60; i++) {
      // Calculate a random position along the bottom of the rectangle
      // Use a portion of the rectangle width (e.g., middle 1/3)
      const spreadWidth = rectW * 0.6; // 60% of rectangle width
      const randomOffset = random(-spreadWidth/2, spreadWidth/2);
      const particleX = x + randomOffset;
      
      // Determine direction based on position relative to center
      const direction = particleX < rectX ? "left" : "right";
      
      const p = new Particle(particleX, y, direction);
      this.particles.push(p);
    }
  }
  
  show() {
    for (let particle of this.particles) {
      particle.show();
    }
  }
}

class Particle {
  constructor(x, y, side) {
    this.pos = createVector(x, y);
    this.history = []; // Store previous positions
    this.lifespan = random(50, 90); // Longer lifespan for extended trails
    this.acc = createVector(0, 0);
    this.settled = false; // Track if particle has settled at bottom
    this.settledPos = null; // Final resting position
    this.size = random(3, 6); // Size variation for particles
    
    // Set velocity based on which side the particle comes from
    if (side === "left") {
      // Left side particles - move left and down with more speed for longer trails
      this.vel = createVector(random(-3, -0.8), random(0.8, 4));
      this.vel.x += random(-0.5, 0.5);
      this.vel.y += random(-0.3, 0.3);
    } else {
      // Right side particles - move right and down with more speed for longer trails
      this.vel = createVector(random(0.8, 3), random(0.8, 4));
      this.vel.x += random(-0.5, 0.5);
      this.vel.y += random(-0.3, 0.3);
    }
  }
  
  applyForce(force) {
    this.acc.add(force);
  }
  
  update() {
    // If particle is settled, don't update position
    if (this.settled) {
      // Slowly decrease lifespan for settled particles
      this.lifespan -= 0.05;
      return;
    }
    
    // Store current position in history
    this.history.push(this.pos.copy());
    
    // Keep more positions to create longer trails
    if (this.history.length > random(15, 25)) {
      this.history.shift(); // Remove the oldest position
    }
    
    // Apply physics
    this.vel.mult(0.98); // Reduced damping for longer movement
    this.lifespan -= 1;
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0); // Reset acceleration
    
    // Check for bottom contact or contact with other settled particles
    this.checkSettling();
  }
  
  done() {
    // Particles stay much longer after settling
    if (this.settled) {
      return this.lifespan < 0;
    }
    return this.lifespan < 0;
  }
  
  show() {
    // If settled, just draw the particle without trail
    if (this.settled) {
      const alpha = map(this.lifespan, 0, 90, 0, 255);
      fill(150, 0, 0, alpha);
      noStroke();
      ellipse(this.pos.x, this.pos.y, this.size);
      return;
    }
    
    // For moving particles, draw trail and point
    // Reduce opacity as particle ages
    const alpha = map(this.lifespan, 0, 60, 0, 255);
    
    // Draw trail
    noFill();
    stroke(150, 0, 0, alpha); // Same dark red as rectangle
    strokeWeight(2);
    beginShape();
    for (let p of this.history) {
      vertex(p.x, p.y);
    }
    endShape();
    
    // Draw endpoint
    strokeWeight(4);
    point(this.pos.x, this.pos.y);
  }
}

// Add fireworks on mouse click if inside the rectangle
function mousePressed() {
  if (mouseX > rectX - rectW/2 && mouseX < rectX + rectW/2 &&
      mouseY > rectY - rectH/2 && mouseY < rectY + rectH/2) {
    
    // Create fireworks from the center point
    let fireworkX = rectX; // Center X of rectangle
    let fireworkY = rectY + rectH / 2; // Bottom center of rectangle
    
    // Use the wider distribution point
    fireworks.push(new Firework(fireworkX, fireworkY, "both"));
  }
}
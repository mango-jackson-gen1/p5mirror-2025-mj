//JESSIE ZHAI
//NOC-WEEK3-VECTOR

let bubbles = [];
let video;
let handPose;
let hands = [];
let colors;

function preload() {
  handPose = ml5.handPose({ flipped: true });
}

function setup() {
  createCanvas(640, 480);

  colors = [
    color("#1c55aa"), color("#707726"), color("#da3648"),
    color("#76ab7b"), color("#f9d85b"), color("#ee725e"),
    color("#e8922f"), color("#f7d0cb"), color("#589cce")
  ];

  video = createCapture(VIDEO, { flipped: true });
  video.size(640, 480);
  video.hide();

  handPose.detectStart(video, gotHands);

  for (let i = 0; i < 8; i++) {
    let bubble = new Bubble(random(width), -50, 50);
    bubbles.push(bubble);
  }
}

function gotHands(results) {
  hands = results;
}

function draw() {
  image(video, 0, 0, width, height);

  // Iterate over each detected hand
  hands.forEach(hand => {
    let index = hand.index_finger_tip;
    let thumb = hand.thumb_tip;
    let x = (index.x + thumb.x) * 0.5;
    let y = (index.y + thumb.y) * 0.5;
    
    let distance = dist(index.x, index.y, thumb.x, thumb.y);

    bubbles.forEach(bubble => {
      let d2 = dist(index.x, index.y, bubble.pos.x, bubble.pos.y);
      if (d2 <= bubble.radius / 2 && !bubble.colorChanged) {
        bubble.color = lightenColor(bubble.color);
        bubble.colorChanged = true;
      }

      if (bubble.dragging) {
        bubble.pos.x = x;
        bubble.pos.y = y;
        bubble.setSize(distance);
        if (distance > 200) {
          bubble.startFlying();
        }
      } else if (d2 <= bubble.radius / 2) {
        bubble.dragging = true;
      }
    });
  });

  // Release all bubbles if no hands are detected
  if (hands.length === 0) {
    bubbles.forEach(bubble => bubble.dragging = false);
  }

  for (let i = bubbles.length - 1; i >= 0; i--) {
    let bubble = bubbles[i];
    if (!bubble.dragging) bubble.update();
    bubble.display();
    bubble.updateParticles();

    if (bubble.allPetalsOffCanvas()) {
      bubbles.splice(i, 1);
    }
  }

  while (bubbles.length < 8) {
    let bubble = new Bubble(random(width), -50, 50);
    bubbles.push(bubble);
  }
}

class Bubble {
  constructor(x, y, radius) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-2, 2), random(6, 10));
    this.radius = radius;
    this.gravity = 0.95;
    this.color = random(colors);
    this.originalColor = this.color;
    this.touched = false;
    this.colorChanged = false;
    this.dragging = false;
    this.flying = false;
    this.petalOffsets = Array.from({ length: 10 }, () => createVector(random(-3, 3), random(-3, 3)));
    this.petalSpeeds = Array.from({ length: 10 }, () => random(5, 10)); 
    this.particles = new ParticleSystem();
  }

  update() {
    if (!this.flying) {
      this.pos.add(this.vel);
      this.vel.mult(this.gravity);

      if (this.vel.mag() < 1) {
        this.vel.setMag(1);
      }

      if (this.pos.y > height + this.radius) {
        this.pos.y = -this.radius;
        this.vel = createVector(random(-2, 2), random(6, 10));
      }
    }
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    fill(this.color);
    this.drawFlower();
    pop();
  }

  setSize(newSize) {
    this.radius = newSize;
  }

  startFlying() {
    this.flying = true;
    this.addParticles();
  }

  drawFlower() {
    let scaleFactor = this.radius / 50;

    for (let r1 = 0; r1 < 10; r1++) {
      push();
      if (this.flying) {
        this.petalOffsets[r1].x += this.petalSpeeds[r1] * cos(PI / 5 * r1);
        this.petalOffsets[r1].y += this.petalSpeeds[r1];
        translate(this.petalOffsets[r1].x * scaleFactor, this.petalOffsets[r1].y * scaleFactor);
      } else {
        translate(0, 20 * scaleFactor);
      }
      noStroke();
      ellipse(0, 0, 10 * scaleFactor, 30 * scaleFactor);
      pop();
      rotate(PI / 5);
    }
  }

  addParticles() {
    for (let i = 0; i < 5; i++) {
      this.particles.addParticle(this.pos.x, this.pos.y);
    }
  }

  updateParticles() {
    this.particles.run();
  }

  allPetalsOffCanvas() {
    return this.petalOffsets.every(offset => {
      let petalX = this.pos.x + offset.x * (this.radius / 100);
      let petalY = this.pos.y + offset.y * (this.radius / 100);
      return petalY > height || petalX < 0 || petalX > width;
    });
  }
}

function ParticleSystem() {
  this.particles = [];
}

ParticleSystem.prototype.addParticle = function(x, y) {
  this.particles.push(new Particle(createVector(x, y)));
};

ParticleSystem.prototype.run = function() {
  for (let i = this.particles.length - 1; i >= 0; i--) {
    let p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};

function Particle(position) {
  this.position = position.copy();
  let angle = random(TWO_PI);
  let speed = random(1, 2);
  this.velocity = createVector(cos(angle) * speed, sin(angle) * speed);
  this.acceleration = createVector(0, 0.03);
  this.lifespan = 255;
}

Particle.prototype.run = function() {
  this.update();
  this.display();
};

Particle.prototype.update = function() {
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
};

Particle.prototype.display = function() {
  stroke(255, this.lifespan);
  strokeWeight(1);
  fill(255, this.lifespan);
  ellipse(this.position.x, this.position.y, 1, 1);
};

Particle.prototype.isDead = function() {
  return this.lifespan < 0;
};

function lightenColor(c) {
  let r = red(c) + (255 - red(c)) * 0.3;
  let g = green(c) + (255 - green(c)) * 0.3;
  let b = blue(c) + (255 - blue(c)) * 0.3;
  return color(r, g, b);
}
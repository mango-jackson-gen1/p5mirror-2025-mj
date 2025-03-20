// Hand Pose Drawing with Particle Effect for Pinch Gesture
// Integrating ml5 HandPose with Particle Emitters

let video;
let handPose;
let hands = [];
let emitters = [];

function preload() {
  handPose = ml5.handPose({ flipped: true });
}

function gotHands(results) {
  hands = results;
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO, { flipped: true });
  video.hide();
  handPose.detectStart(video, gotHands);

  background(0);
}

function draw() {
  clear();
  image(video, 0, 0);
  blendMode(ADD);

  if (hands.length > 0) {
    for (let hand of hands) {
      if (hand.handedness === 'Right') {
        let index = hand.index_finger_tip;
        let thumb = hand.thumb_tip;
        let pinchDistance = dist(index.x, index.y, thumb.x, thumb.y);

        if (pinchDistance < 20) { // If pinching
          let emitter = new Emitter((index.x + thumb.x) / 2, (index.y + thumb.y) / 2);
          emitters.push(emitter);
        }
      }
    }
  }

  // Run all active emitters
  for (let i = emitters.length - 1; i >= 0; i--) {
    emitters[i].run();
    if (emitters[i].isExpired() || emitters[i].isEmpty()) {
      emitters.splice(i, 1);
    }
  }
}

class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = p5.Vector.random2D().mult(random(0.5, 1.2));
    this.lifetime = 120; // Lasts for ~2 seconds at 60 FPS
  }

  update() {
    this.position.add(this.velocity);
    this.lifetime -= 2; // Smooth decay
  }

  show() {
    noStroke();
    fill(255, 255, 0, map(this.lifetime, 120, 0, 255, 0)); // Fade effect
    ellipse(this.position.x, this.position.y, 4);
  }

  isDead() {
    return this.lifetime <= 0;
  }
}

class Emitter {
  constructor(x, y) {
    this.origin = createVector(x, y);
    this.particles = [];
    this.startTime = millis(); // Store creation time
    this.lifetime = 2000; // Lasts 2 seconds
  }

  addParticle() {
    if (this.particles.length < 7) { // Controlled emission
      this.particles.push(new Particle(this.origin.x, this.origin.y));
    }
  }

  run() {
    this.addParticle();
    for (let i = this.particles.length - 1; i >= 0; i--) {
      let p = this.particles[i];
      p.update();
      p.show();
      if (p.isDead()) {
        this.particles.splice(i, 1);
      }
    }
  }

  isExpired() {
    return millis() - this.startTime > this.lifetime;
  }

  isEmpty() {
    return this.particles.length === 0;
  }
}

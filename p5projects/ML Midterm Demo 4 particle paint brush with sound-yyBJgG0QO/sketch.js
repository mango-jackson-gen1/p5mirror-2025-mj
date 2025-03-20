let video;
let handPose;
let hands = [];
let emitters = [];
// Tone.js audio setup
let kit;
let isPlaying = false;
let pausedTime = 0;
let startTime = 0;
let pinching = false;  // Track pinching state between frames

function preload() {
  handPose = ml5.handPose({ flipped: true });
  kit = new Tone.Player("music/sample.mp3").toDestination();
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO, { flipped: true });
  video.size(width, height);
  video.hide();
  handPose.detectStart(video, gotHands);
}

function gotHands(results) {
  hands = results;
}

function draw() {
  clear();
  image(video, 0, 0);
  
  let isPinchingNow = false;
  let pinchX, pinchY;

  if (hands.length > 0) {
    for (let hand of hands) {
      if (hand.handedness === 'Right') {
        let index = hand.index_finger_tip;
        let thumb = hand.thumb_tip;
        let d = dist(index.x, index.y, thumb.x, thumb.y);
        
        if (d < 20) { 
          isPinchingNow = true;
          pinchX = (index.x + thumb.x) / 2;
          pinchY = (index.y + thumb.y) / 2;
          
          // Create emitter only when pinching starts
          if (!pinching) {
            let emitter = new Emitter(pinchX, pinchY);
            emitters.push(emitter);
          } else {
            // Update last emitter position if continuing to pinch
            if (emitters.length > 0) {
              emitters[emitters.length-1].updatePosition(pinchX, pinchY);
            }
          }
          
          // Handle audio start
          if (!isPlaying && kit.state !== 'started') {
            Tone.loaded().then(() => {
              kit.start(undefined, pausedTime);
              startTime = kit.context.currentTime - pausedTime;
              isPlaying = true;
            });
          }
        }
      }
    }
  }
  
  // Update pinching state for next frame
  pinching = isPinchingNow;
  
  if (!isPinchingNow && isPlaying) {
    pausedTime = kit.context.currentTime - startTime;
    kit.stop();
    isPlaying = false;
  }

  // Apply blend mode before drawing particles
  blendMode(ADD);
  
  for (let i = emitters.length - 1; i >= 0; i--) {
    emitters[i].run();
    if (emitters[i].isExpired()) {
      emitters.splice(i, 1);
    }
  }
  
  // Reset blend mode back to default after drawing particles
  blendMode(BLEND);
}

class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = p5.Vector.random2D().mult(random(0.5, 1.2));
    this.lifetime = 120;
  }
  
  update() {
    this.position.add(this.velocity);
    this.lifetime -= 2;
  }
  
  show() {
    noStroke();
    fill(255, this.lifetime);
    ellipse(this.position.x, this.position.y, 10);
  }
  
  isDead() {
    return this.lifetime <= 0;
  }
}

class Emitter {
  constructor(x, y) {
    this.origin = createVector(x, y);
    this.particles = [];
    this.startTime = millis();
    this.lifetime = 2000;
  }
  
  updatePosition(x, y) {
    this.origin.x = x;
    this.origin.y = y;
  }
  
  addParticle() {
    this.particles.push(new Particle(this.origin.x, this.origin.y));
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
}


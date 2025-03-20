// Dynamic Touch Interface inspired by Buchla 200e and Michel Waisvisz
// A multi-dimensional kinesthetic input system

// Sound sources
let kit = new Tone.Players({
  "drone": "samples/c2.mp3",
  "bell": "samples/d3.mp3",
  "texture": "samples/d3plus.mp3",
  "perc": "samples/d4.mp3",
  "voice": "samples/g2.mp3"
});

// Effects chain
const reverb = new Tone.Reverb({
  decay: 4,
  wet: 0.5
}).toDestination();

const delay = new Tone.PingPongDelay({
  delayTime: 0.25,
  feedback: 0.3,
  wet: 0.3
}).connect(reverb);

const filter = new Tone.Filter({
  type: "lowpass",
  frequency: 1000,
  rolloff: -24
}).connect(delay);

// Connect players to effects
kit.connect(filter);

// Touch zones
let touchZones = [];
let activeZones = [false, false, false, false, false];
const soundNames = ["drone", "bell", "texture", "perc", "voice"];

// Continuous controller values
let pressure = 0;
let xAxis = 0;
let yAxis = 0;
let velocity = 0;
let lastPos = {x: 0, y: 0};

// Visual elements
let particles = [];
const MAX_PARTICLES = 100;
let colors = [
  [255, 60, 60],   // red
  [60, 255, 180],  // cyan
  [180, 60, 255],  // purple
  [255, 180, 60],  // orange
  [60, 180, 255]   // blue
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Create touch zones - distribute across the canvas
  const zoneWidth = width / 5;
  for (let i = 0; i < 5; i++) {
    touchZones.push({
      x: i * zoneWidth + zoneWidth/2,
      y: height/2,
      radius: height * 0.15,
      index: i
    });
  }
  
  // Set up Tone.js
  Tone.Master.volume.value = -10;
  
  // Instructions
  textAlign(CENTER, CENTER);
  
  // Start audio context on user interaction
  document.addEventListener('touchstart', initAudio);
  document.addEventListener('mousedown', initAudio);
}

function initAudio() {
  if (Tone.context.state !== 'running') {
    Tone.context.resume();
  }
}

function draw() {
  // Create gradient background that responds to overall activity
  const activityLevel = activeZones.filter(Boolean).length / 5;
  background(
    20 + activityLevel * 20, 
    20 + activityLevel * 10, 
    40 + activityLevel * 30
  );
  
  // Draw particles
  updateParticles();
  
  // Draw touch zones
  for (let i = 0; i < touchZones.length; i++) {
    const zone = touchZones[i];
    
    // Calculate breathing animation
    const breathe = sin(frameCount * 0.05 + i) * 5;
    const radius = zone.radius + breathe;
    
    // Draw zone
    push();
    if (activeZones[i]) {
      // Active zone
      fill(colors[i][0], colors[i][1], colors[i][2], 100);
      stroke(colors[i][0], colors[i][1], colors[i][2]);
      strokeWeight(3);
    } else {
      // Inactive zone
      noFill();
      stroke(255, 100);
      strokeWeight(1);
    }
    
    // Main touch circle
    ellipse(zone.x, zone.y, radius * 2);
    
    // Label
    fill(255, activeZones[i] ? 255 : 150);
    noStroke();
    textSize(16);
    text(soundNames[i], zone.x, zone.y);
    
    // Show controller values for active zones
    if (activeZones[i]) {
      textSize(12);
      text(`pressure: ${round(pressure * 100)}%`, zone.x, zone.y + 20);
      text(`x: ${round(xAxis * 100)}%`, zone.x, zone.y + 40);
      text(`y: ${round(yAxis * 100)}%`, zone.x, zone.y + 60);
    }
    pop();
  }
  
  // Instructions
  fill(255, 180);
  textSize(16);
  text("Touch or click and drag across the zones to create sound", width/2, height - 50);
  text("Speed, pressure (drag distance), and position affect the sound", width/2, height - 25);
}

function mousePressed() {
  checkZones(mouseX, mouseY, true);
  lastPos = {x: mouseX, y: mouseY};
}

function mouseDragged() {
  // Calculate velocity (speed of movement)
  const dx = mouseX - lastPos.x;
  const dy = mouseY - lastPos.y;
  const dist = sqrt(dx*dx + dy*dy);
  velocity = constrain(dist / 30, 0, 1);
  
  // Map mouse position to controller values
  pressure = constrain(dist / 100, 0, 1);
  xAxis = constrain(mouseX / width, 0, 1);
  yAxis = constrain(mouseY / height, 0, 1);
  
  // Check for touches on zones
  checkZones(mouseX, mouseY, false);
  
  // Create particles
  if (frameCount % 3 === 0) {
    createParticle(mouseX, mouseY);
  }
  
  // Update sound parameters based on movement
  updateSoundParameters();
  
  lastPos = {x: mouseX, y: mouseY};
  return false; // Prevent default
}

function mouseReleased() {
  // Release all zones when mouse is released
  for (let i = 0; i < activeZones.length; i++) {
    if (activeZones[i]) {
      releaseZone(i);
    }
  }
}

function checkZones(x, y, isInitialTouch) {
  for (let i = 0; i < touchZones.length; i++) {
    const zone = touchZones[i];
    const d = dist(x, y, zone.x, zone.y);
    
    if (d < zone.radius) {
      if (!activeZones[i] || isInitialTouch) {
        activateZone(i);
      }
    } else if (activeZones[i] && isInitialTouch) {
      releaseZone(i);
    }
  }
}

function activateZone(index) {
  activeZones[index] = true;
  
  // Start the sound with current parameters
  const sound = kit.player(soundNames[index]);
  
  // Set initial parameters
  sound.playbackRate = map(xAxis, 0, 1, 0.5, 2);
  sound.volume.value = map(pressure, 0, 1, -20, 0);
  
  // Start the sound
  sound.start();
  
  // Generate more particles on activation
  for (let i = 0; i < 10; i++) {
    createParticle(touchZones[index].x, touchZones[index].y);
  }
}

function releaseZone(index) {
  activeZones[index] = false;
  
  // Fade out the sound
  const sound = kit.player(soundNames[index]);
  sound.volume.rampTo(-60, 0.3); 
  
  // Stop the sound after fade
  setTimeout(() => {
    sound.stop();
  }, 300);
}

function updateSoundParameters() {
  // Update global effects based on controller values
  filter.frequency.value = map(yAxis, 0, 1, 200, 10000);
  reverb.wet.value = map(pressure, 0, 1, 0.2, 0.8);
  delay.delayTime.value = map(xAxis, 0, 1, 0.1, 1.0);
  
  // Update individual sounds
  for (let i = 0; i < activeZones.length; i++) {
    if (activeZones[i]) {
      const sound = kit.player(soundNames[i]);
      
      // Each sound responds differently to the controllers
      switch(i) {
        case 0: // drone
          sound.playbackRate = map(xAxis, 0, 1, 0.5, 1.5);
          sound.volume.value = map(pressure, 0, 1, -30, -5);
          break;
        case 1: // bell
          sound.playbackRate = map(xAxis, 0, 1, 0.8, 1.2);
          sound.volume.value = map(velocity, 0, 1, -25, 0);
          break;
        case 2: // texture
          sound.playbackRate = map(yAxis, 0, 1, 1.5, 0.5);  
          sound.volume.value = map(pressure, 0, 1, -25, -5);
          break;
        case 3: // perc
          if (velocity > 0.3 && frameCount % 10 === 0) {
            sound.stop();
            sound.start();
          }
          sound.playbackRate = map(xAxis, 0, 1, 0.8, 1.5);
          sound.volume.value = map(velocity, 0, 1, -30, -10);
          break;
        case 4: // voice
          sound.playbackRate = map(yAxis, 0, 1, 0.7, 1.3);
          sound.volume.value = map(pressure, 0, 1, -25, -8);
          break;
      }
    }
  }
}

function createParticle(x, y) {
  // Find which zone this particle belongs to
  let closestZone = 0;
  let minDist = Infinity;
  
  for (let i = 0; i < touchZones.length; i++) {
    if (activeZones[i]) {
      const d = dist(x, y, touchZones[i].x, touchZones[i].y);
      if (d < minDist) {
        minDist = d;
        closestZone = i;
      }
    }
  }
  
  // Create particle with color from closest active zone
  if (particles.length < MAX_PARTICLES) {
    particles.push({
      x: x,
      y: y,
      vx: random(-2, 2) * velocity,
      vy: random(-2, 2) * velocity,
      size: random(10, 50) * pressure,
      color: colors[closestZone],
      life: 255,
      decay: random(2, 5)
    });
  }
}

function updateParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    
    // Move
    p.x += p.vx;
    p.y += p.vy;
    
    // Fade
    p.life -= p.decay;
    
    // Draw
    noStroke();
    fill(p.color[0], p.color[1], p.color[2], p.life);
    ellipse(p.x, p.y, p.size);
    
    // Remove dead particles
    if (p.life <= 0) {
      particles.splice(i, 1);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  
  // Update touch zone positions
  const zoneWidth = width / 5;
  for (let i = 0; i < 5; i++) {
    touchZones[i].x = i * zoneWidth + zoneWidth/2;
    touchZones[i].y = height/2;
    touchZones[i].radius = height * 0.15;
  }
}
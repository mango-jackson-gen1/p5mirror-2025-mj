// Sequencer with Particle Effects
let bpm = 60;
let timeSignature = [4,4];
let nMeasures = 4;
function nSteps(){
  return nMeasures*timeSignature[0];
}
let currentStep;
let cells = [];
// Sound
let kit;
let drumNames = ["1a4plus", "2c2", "3d3", "4d3plus","5d4","6g2"];
let nTracks = drumNames.length;
kit = new Tone.Players(
    {
      "1a4plus" : "/samples/505/1a4plus.mp3",
      "2c2" : "/samples/505/2c2.mp3",
      "3d3" : "/samples/505/3d3.mp3",
      "4d3plus" : "/samples/505/4d3plus.mp3",
      "5d4" : "/samples/505/5d4.mp3",
      "6g2" : "/samples/505/6g2.mp3"
    }
);
kit.toDestination();
Tone.Transport.scheduleRepeat(onBeat, "4n");
// Audio playback loop - this triggers when the rotating cursor hits active cells
function onBeat(time){
  let pos = Tone.Transport.position.split(":");
  let measure = int(pos[0]);
  let beat = int(pos[1]);
  currentStep = (measure*timeSignature[0] + beat) % nSteps();
  
  // Play sounds for active cells in the current step
  for(let track = 0; track < nTracks; track++){
    if(cells[track][currentStep]){
      let hh = kit.player(drumNames[track]);
      hh.start(time);
      
      // Create particles at the active cell's position when it plays
      createParticlesAtCell(track, currentStep, 5);
    }
  }
}

// --- PARTICLE SYSTEM ---
let particles = [];
const MAX_PARTICLES = 200; // Increased maximum particles
// Create color array in RGB format for particles with higher brightness for black background
let particleColors = [
  [255, 186, 132],   // #ffba84 - brighter
  [200, 164, 123],   // #967249 - brighter
  [169, 200, 204],   // #77969A - brighter
  [50, 142, 225],    // #005CAF - brighter
  [88, 119, 111],    // #26453D - brighter
  [88, 80, 121]      // #261E47 - brighter
];

// Movement tracking for particle behavior
let particle_velocity = 0;
let pressure = 0;
let lastPos = {x: 0, y: 0};

// Graphics
let w = 60;
let gray;
let colors = ["#ffba84", "#967249", "#77969A", "#005CAF", "#26453D","#261E47"];

function setup() {
  createCanvas(480, 480);
  cellWidth = width / nSteps();
  cellHeight = height / nTracks;
  gray = color(178, 178, 188);
  
  // Initialize all sequencer cells. ON: 1. OFF: 0.
  for(let track = 0; track < nTracks; track++){
    cells[track] = [];
    for(let step = 0; step < nSteps(); step++){
        cells[track][step] = 0;
    }
  }
  
  // Initialize particle system with default parameters
  initParticleSystem();
  
  // Set initial pressure to ensure particles have some size
  pressure = 0.3;
}

function draw() {
  // Black background for better particle visibility
  background(10);
  
  let w = 60;
  let d = width / nTracks; // diameter unit
  let a = TWO_PI / nSteps(); // angle unit
  let prevAngle = 0;
  let angle;
  
  // Draw the sequencer
  for (let step = 1; step <= nSteps(); step++) { 
    for (let track = nTracks; track > 0; track--) { 
        let diameter = d * track;
        angle = a * step;
        
        // Set transparent gray stroke for grid lines - lighter for black background
        stroke(180, 180, 180, 100);
        
        if(cells[track-1][step-1] == 1){
          // Use the color from the colors array
          fill(colors[track-1]);
        }
        else{
          // Use dark gray for inactive cells on black background
          fill(40);
        }
        arc(width/2, height/2, diameter, diameter, prevAngle, angle, PIE); 
    }
    prevAngle = angle;
  }
  
  // Highlight current step - more visible on black background
  fill(0, 200, 200, 80);
  arc(width/2, height/2, width, width, a*currentStep, a*(currentStep+1));
  
  // Update and draw particles
  updateAndDrawParticles();
}

function mousePressed(){
  lastPos = {x: mouseX, y: mouseY}; // Initialize last position for particle tracking
  
  // 1. mouseX, mouseY (relative to top-left corner) => x, y (relative to center of canvas)
  let x = mouseX - width/2;
  let y = mouseY - height/2;
  
  // 2. x, y => polar coordinates
  let d = sqrt(pow(x, 2) + pow(y,2)); //pithagoras
  // atan2 gives us an angle in the right quadrant, between -PI and +PI
  let a = atan2(y, x);
  // transform negative counterclockwise angles into positive clockwise angles
  if(a < 0){
    a = TWO_PI + a;
  }
  
  // Determine which cell the mouse is on
  let radioUnit = (width / 2) / nTracks; // diameter unit
  let angleUnit = TWO_PI / nSteps(); // angle unit
  
  let i = floor(a / angleUnit);
  let j = floor(d / radioUnit);
  
  // Only process if within bounds
  if (j < nTracks && i < nSteps()) {
    // Toggle cell on/off
    cells[j][i] = !cells[j][i];
    
    // Create a small visual feedback with particles, but don't play sound yet
    createParticleBurst(mouseX, mouseY, 5, j);
  }
}

function mouseDragged() {
  // Update particle motion parameters
  updateParticleMotion(mouseX, mouseY);
  
  // Create particles while dragging (every other frame for more particles)
  if (frameCount % 2 === 0) {
    // Find which track the mouse is over for color matching
    let x = mouseX - width/2;
    let y = mouseY - height/2;
    let d = sqrt(pow(x, 2) + pow(y,2));
    let radioUnit = (width / 2) / nTracks;
    let j = floor(d / radioUnit);
    
    // Use the track color if within bounds, otherwise use the first color
    let colorIndex = (j < nTracks) ? j : 0;
    createParticle(mouseX, mouseY, colorIndex);
  }
  
  return false; // Prevent default
}

// Once all audio files have been loaded, start the Tone playhead
Tone.loaded().then(function(){
  console.log("loaded");
  Tone.Transport.start();
});

// --- PARTICLE SYSTEM FUNCTIONS ---

// Initialize the particle system
function initParticleSystem() {
  lastPos = {x: mouseX, y: mouseY};
}

// Update and draw all particles
function updateAndDrawParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    
    // Move
    p.x += p.vx;
    p.y += p.vy;
    
    // Fade
    p.life -= p.decay;
    
    // Draw with a glow effect for better visibility on black background
    noStroke();
    
    // Draw a larger, more transparent version for glow
    fill(p.color[0], p.color[1], p.color[2], p.life * 0.3);
    ellipse(p.x, p.y, p.size * 1.5);
    
    // Draw the main particle
    fill(p.color[0], p.color[1], p.color[2], p.life);
    ellipse(p.x, p.y, p.size);
    
    // Remove dead particles
    if (p.life <= 0) {
      particles.splice(i, 1);
    }
  }
}

// Calculate motion parameters based on mouse movement
function updateParticleMotion(x, y) {
  // Calculate velocity (speed of movement)
  const dx = x - lastPos.x;
  const dy = y - lastPos.y;
  const dist = sqrt(dx*dx + dy*dy);
  particle_velocity = constrain(dist / 30, 0, 1);
  
  // Calculate pressure based on distance moved
  pressure = constrain(dist / 100, 0, 1);
  
  // Ensure minimum pressure for visible particles
  pressure = max(pressure, 0.3);
  
  // Update last position
  lastPos = {x: x, y: y};
}

// Create a single particle
function createParticle(x, y, colorIndex = 0) {
  // Create particle with specified or default color
  if (particles.length < MAX_PARTICLES) {
    const particleSizeMultiplier = 4; // Increased for better visibility
    
    particles.push({
      x: x,
      y: y,
      vx: random(-2, 2) * particle_velocity,
      vy: random(-2, 2) * particle_velocity,
      size: random(0.2, 7) * (pressure + 0.2) * particleSizeMultiplier,
      color: particleColors[colorIndex % particleColors.length],
      life: 255,
      decay: random(2, 5)
    });
  }
}

// Create multiple particles at once
function createParticleBurst(x, y, numParticles, colorIndex = 0) {
  for (let i = 0; i < numParticles; i++) {
    createParticle(x, y, colorIndex);
  }
}

// Create particles at a specific sequencer cell
function createParticlesAtCell(track, step, numParticles) {
  // Calculate the position of the cell in polar coordinates
  let a = TWO_PI / nSteps(); // angle unit
  let d = width / nTracks; // diameter unit
  
  // Calculate center angle for this step
  let midAngle = a * step + (a / 2);
  
  // Calculate radius for this track
  let radius = (d * (track + 0.5)) / 2;
  
  // Convert to Cartesian coordinates
  let x = width/2 + cos(midAngle) * radius;
  let y = height/2 + sin(midAngle) * radius;
  
  // Create particles at this position
  createParticleBurst(x, y, numParticles, track);
}
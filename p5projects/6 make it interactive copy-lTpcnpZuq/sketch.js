// ml5.js Real-Time Body Pose Detection Example with Interactive Drum Pad

let video;
let bodyPose;
let poses = [];

let w = 60; // Grid cell size
let cols = 4; // Number of steps
let rows = 2; // Number of drum tracks (snare & kick)

var cells = [
  [0, 1, 0, 1], // Snare pattern
  [1, 0, 1, 0]  // Kick pattern
];

// Load sound samples
const kit = new Tone.Players({
  "kick": "samples/505/kick.mp3", 
  "snare": "samples/snare.mp3"
});
kit.toDestination();

// Start audio transport loop
Tone.Transport.scheduleRepeat(playBeat, "4n");

// Function to play beat sequence
function playBeat(time) {
  if (kit.loaded) {
    let beat = Tone.Transport.position.split(":")[1];
    if (cells[0][beat] == 1) kit.player("snare").start(time);
    if (cells[1][beat] == 1) kit.player("kick").start(time);
  }
}

// Load MoveNet pose detection model
function preload() {
  bodyPose = ml5.bodyPose("MoveNet", { flipped: true });
}

function setup() {
  createCanvas(640, 480);
  
  // Capture live video for reference
  video = createCapture(VIDEO);
  video.hide();
  
  // Start pose detection
  bodyPose.detectStart(video, gotPoses);

  // Start audio transport when sounds are loaded
  Tone.loaded().then(() => {
    console.log("Audio Loaded");
    Tone.Transport.start();
  });
}

// Store detected poses
function gotPoses(results) {
  poses = results;
}

function draw() {
  // Display camera feed behind drum pad
  image(video, 0, 0, width, height);

  // Draw drum grid overlay
  drawDrumPad();

  if (poses.length > 0) {
    let nose = poses[0].nose;
    
    // Draw nose position indicator
    fill(236, 1, 90);
    noStroke();
    circle(nose.x, nose.y, 48);

    // Check if nose is within a drum pad cell
    checkDrumPadTrigger(nose.x, nose.y);
  }
}

// Draw the drum pad grid
function drawDrumPad() {
  for (let step = 0; step < cols; step++) {
    for (let track = 0; track < rows; track++) {
      fill(cells[track][step] == 1 ? 100 : 255);
      rect(step * w, track * w, w, w);
    }
  }

  // Highlight active beat
  let beat = Tone.Transport.position.split(":")[1];
  fill(0, 200, 200, 50);
  rect(beat * w, 0, w, w * rows);
}

// Detect when the nose is in a drum pad cell
function checkDrumPadTrigger(x, y) {
  let col = floor(x / w);
  let row = floor(y / w);

  if (col >= 0 && col < cols && row >= 0 && row < rows) {
    if (cells[row][col] == 0) {
      cells[row][col] = 1;
      triggerSound(row);
    }
  }
}

// Trigger corresponding sound
function triggerSound(row) {
  if (row == 0) kit.player("snare").start();
  if (row == 1) kit.player("kick").start();
}

let bpm = 60;
let timeSignature = [4, 4];
let nMeasures = 2;
let currentStep = 0;
let cells = [];
let kit;
let drumNames = ["hho", "hh", "snare", "kick"];
let nTracks = drumNames.length;
let cellSize = 60;

// ML5.js pose tracking variables
let video;
let bodyPose;
let poses = [];
let lerpedX = 0;
let lerpedY = 0;

// Calculate total steps in the sequencer
function getTotalSteps() {
  return nMeasures * timeSignature[0];
}

// Load drum sounds
kit = new Tone.Players({
  "kick": "/samples/505/kick.mp3",
  "snare": "/samples/505/snare.mp3",
  "hh": "/samples/505/hh.mp3",
  "hho": "/samples/505/hho.mp3",
});
kit.toDestination();
Tone.Transport.scheduleRepeat(playStep, "4n");

function preload() {
  bodyPose = ml5.bodyPose("MoveNet", { flipped: true });
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO, { flipped: true });
  video.hide();
  bodyPose.detectStart(video, gotPoses);
  
  // Initialize sequencer cells
  for (let track = 0; track < nTracks; track++) {
    cells[track] = new Array(getTotalSteps()).fill(0);
  }
}

function draw() {
  background(255);
  image(video, 0, 0, width, height / 2); // Display the camera feed
  drawSequencer();
  
  if (poses.length > 0) {
    let pose = poses[0];
    let x = pose.nose.x;
    let y = pose.nose.y;

    // Smooth interpolation to reduce jitter
    lerpedX = lerp(lerpedX, x, 0.3);
    lerpedY = lerp(lerpedY, y, 0.3);

    // Draw a circle at the smoothed nose position
    fill(255, 0, 0);
    circle(lerpedX, lerpedY, 20);
    checkGridPosition(lerpedX, lerpedY);
  }
}

function drawSequencer() {
  let startY = height / 2;
  
  // Draw cells
  for (let step = 0; step < getTotalSteps(); step++) {
    for (let track = 0; track < nTracks; track++) {
      fill(cells[track][step] ? "#707070" : "#ccc");
      rect(step * cellSize, startY + track * cellSize, cellSize, cellSize);
    }
  }
  
  // Draw grid lines
  stroke(180);
  for (let i = 0; i <= nTracks; i++) {
    line(0, startY + i * cellSize, width, startY + i * cellSize);
  }
  for (let i = 0; i <= getTotalSteps(); i++) {
    line(i * cellSize, startY, i * cellSize, height);
  }
  
  // Highlight the current step
  if (Tone.Transport.state === "started") {
    fill(234, 30, 83, 60);
    noStroke();
    rect(currentStep * cellSize, startY, cellSize, height / 2);
  }
}

function checkGridPosition(x, y) {
  let step = floor(x / cellSize);
  let track = floor((y - height / 2) / cellSize);
  if (step >= 0 && step < getTotalSteps() && track >= 0 && track < nTracks) {
    cells[track][step] = 1;
  }
}

// Play drum sounds on the active steps
function playStep(time) {
  currentStep = (currentStep + 1) % getTotalSteps();
  for (let track = 0; track < nTracks; track++) {
    if (cells[track][currentStep]) {
      kit.player(drumNames[track]).start(time);
      cells[track][currentStep] = 0; // Reset cell after playing to reduce flicker
    }
  }
}

function gotPoses(results) {
  poses = results;
}

Tone.loaded().then(() => {
  console.log("Loaded");
  Tone.Transport.start();
});

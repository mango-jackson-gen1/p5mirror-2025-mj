// ml5.js Real-Time Body Pose Detection with Interactive Drum Pad

let video;
let bodyPose;
let poses = [];

let w = 60; // Grid cell size
let cols; // Number of steps
let rows; // Number of drum tracks

let bpm = 60;
let timeSignature = [4, 4];
let nMeasures = 2;
function nSteps() {
  return nMeasures * timeSignature[0];
}
let currentStep;

let cells = [];

// Sound Setup
let kit;
let drumNames = ["hho", "hh", "snare", "kick"];
let nTracks = drumNames.length;
kit = new Tone.Players({
  "kick": "/samples/505/kick.mp3",
  "snare": "/samples/505/snare.mp3",
  "hh": "/samples/505/hh.mp3",
  "hho": "/samples/505/hho.mp3",
});
kit.toDestination();
Tone.Transport.scheduleRepeat(onBeat, "4n");

// Pose Detection
function preload() {
  bodyPose = ml5.bodyPose("MoveNet", { flipped: true });
}

function gotPoses(results) {
  poses = results;
}

function setup() {
  createCanvas(480, 240);
  video = createCapture(VIDEO, { flipped: true });
  video.hide();
  bodyPose.detectStart(video, gotPoses);

  cols = nSteps();
  rows = nTracks;

  // Initialize all sequencer cells
  for (let track = 0; track < rows; track++) {
    cells[track] = [];
    for (let step = 0; step < cols; step++) {
      cells[track][step] = 0;
    }
  }
}

function draw() {
  image(video, 0, 0); // Display camera behind drum pad

  let cellWidth = width / cols;
  let cellHeight = height / rows;

  fill(100);
  noStroke();

  // Draw grid cells
  for (let step = 0; step < cols; step++) {
    for (let track = 0; track < rows; track++) {
      if (cells[track][step] == 1) {
        fill(150);
      } else {
        fill(255);
      }
      rect(step * cellWidth, track * cellHeight, cellWidth, cellHeight);
    }
  }

  // Highlight current step
  fill(0, 200, 200, 50);
  rect(currentStep * cellWidth, 0, cellWidth, height);

  // Draw nose position & detect interactions
  if (poses.length > 0) {
    let pose = poses[0];
    let noseX = pose.nose.x;
    let noseY = pose.nose.y;

    // Draw circle at detected nose position
    fill(236, 1, 90);
    noStroke();
    circle(noseX, noseY, 48);

    // Determine which cell the nose is over
    let i = floor(noseX / cellWidth);
    let j = floor(noseY / cellHeight);

    if (i >= 0 && i < cols && j >= 0 && j < rows) {
      if (cells[j][i] == 0) {
        cells[j][i] = 1; // Toggle ON
      } else {
        cells[j][i] = 0; // Toggle OFF
      }
    }
  }
}

// Audio playback loop
function onBeat(time) {
  let pos = Tone.Transport.position.split(":");
  let measure = int(pos[0]);
  let beat = int(pos[1]);

  currentStep = (measure * timeSignature[0] + beat) % nSteps();

  for (let track = 0; track < nTracks; track++) {
    if (cells[track][currentStep]) {
      let drum = kit.player(drumNames[track]);
      drum.start(time);
    }
  }
}

// Start the Tone.js Transport
Tone.loaded().then(function () {
  console.log("Audio Loaded");
  Tone.Transport.start();
});

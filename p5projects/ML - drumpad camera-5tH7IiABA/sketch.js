let bpm = 60;
let timeSignature = [4, 4];
let numMeasures = 2;
let numSteps = numMeasures * timeSignature[0];
let currentStep = 0;

let drumNames = ["hho", "hh", "snare", "kick"];
let numTracks = drumNames.length;
let cells = Array.from({ length: numTracks }, () => Array(numSteps).fill(0));

// Load drum sounds
let kit = new Tone.Players({
  "kick": "/samples/505/kick.mp3",
  "snare": "/samples/505/snare.mp3",
  "hh": "/samples/505/hh.mp3",
  "hho": "/samples/505/hho.mp3",
}).toDestination();

Tone.Transport.scheduleRepeat(playBeat, "4n");

function playBeat(time) {
  let [measure, beat] = Tone.Transport.position.split(":").map(Number);
  currentStep = (measure * timeSignature[0] + beat) % numSteps;

  for (let track = 0; track < numTracks; track++) {
    if (cells[track][currentStep]) {
      kit.player(drumNames[track]).start(time);
    }
  }
}

let cellSize;
let camera;
let video;
let bodyPose;
let poses = [];
let prevNoseX = 0, prevNoseY = 0;
let threshold = 10; // Movement threshold to prevent rapid toggling

function preload() {
  bodyPose = ml5.bodyPose("MoveNet", { flipped: true });
}

function gotPoses(results) {
  poses = results;
}

function setup() {
  createCanvas(480, 240);
  cellSize = width / numSteps;
  
  camera = createCapture(VIDEO);
  camera.size(width, height);
  camera.hide();
  
  video = createCapture(VIDEO, { flipped: true });
  video.hide();
  
  bodyPose.detectStart(video, gotPoses);
}

function draw() {
  background(255);
  image(camera, 0, 0, width, height);

  if (poses.length > 0) {
    let pose = poses[0];
    fill(236, 1, 90);
    noStroke();
    circle(pose.nose.x, pose.nose.y, 48);

    // Convert nose position to drum grid coordinates
    let step = floor(pose.nose.x / cellSize);
    let track = floor(pose.nose.y / cellSize);

    // Only toggle if nose position is stable
    if (dist(prevNoseX, prevNoseY, pose.nose.x, pose.nose.y) < threshold) {
      if (track < numTracks && step < numSteps) {
        cells[track][step] = !cells[track][step];
      }
    }
    prevNoseX = pose.nose.x;
    prevNoseY = pose.nose.y;
  }

  noStroke();
  let colors = ["#999999", "#909090", "#707070", "#505050", "#303030"];
  
  for (let step = 0; step < numSteps; step++) {
    for (let track = 0; track < numTracks; track++) {
      if (cells[track][step]) {
        fill(colors[track]);
        rect(step * cellSize, track * cellSize, cellSize, cellSize);
      }
    }
  }

  stroke(178, 178, 188);
  for (let i = 0; i <= numTracks; i++) {
    line(0, i * cellSize, width, i * cellSize);
  }

  for (let i = 0; i <= numSteps; i++) {
    stroke(i % timeSignature[0] === 0 ? color(234, 30, 83, 60) : 178);
    line(i * cellSize, 0, i * cellSize, height);
    
    if (i === currentStep && Tone.Transport.state === "started") {
      fill(234, 30, 83, 60);
      rect(i * cellSize, 0, cellSize, height);
    }
  }
}

function mousePressed() {
  let step = floor(mouseX / cellSize);
  let track = floor(mouseY / cellSize);
  if (track < numTracks && step < numSteps) {
    cells[track][step] = !cells[track][step];
  }
}

Tone.loaded().then(() => {
  Tone.Transport.start();
});


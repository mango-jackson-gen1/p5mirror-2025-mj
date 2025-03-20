let video;
let bodyPose;
let poses = [];
let w = 60; // Cell width
let cells = [
  [0, 1, 0, 1], // Snare pattern
  [1, 0, 1, 0]  // Kick pattern
];
const kit = new Tone.Players({
  "kick": "samples/505/kick.mp3", 
  "snare": "samples/snare.mp3"
}).toDestination();

let flipped = false; // Toggle for flipping behavior

function preload() {
  bodyPose = ml5.bodyPose("MoveNet", { flipped: flipped });
}

function gotPoses(results) {
  poses = results;
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  bodyPose.detectStart(video, gotPoses);
  Tone.Transport.scheduleRepeat(playBeat, "4n");
  Tone.loaded().then(() => Tone.Transport.start());
}

function draw() {
  background(255);
  push();
  if (flipped) {
    translate(width, 0);
    scale(-1, 1); // Flip the video horizontally
  }
  image(video, 0, 0, width, height);
  pop();
  drawGrid();
  if (poses.length > 0) trackNose();
}

function drawGrid() {
  for (let step = 0; step < 4; step++) {
    for (let track = 0; track < 2; track++) {
      fill(cells[track][step] ? 100 : 255);
      rect(step * w, track * w, w, w);
    }
  }
  let beat = Tone.Transport.position.split(":")[1];
  fill(0, 200, 200, 50);
  rect(beat * w, 0, w, w * 2);
}

function trackNose() {
  let nose = poses[0].nose;
  fill(236, 1, 90);
  noStroke();
  let noseX = flipped ? width - nose.x : nose.x; // Adjust nose position based on flip
  circle(noseX, nose.y, 48);
  activateCell(noseX, nose.y);
}

function activateCell(x, y) {
  let i = floor(x / w);
  let j = floor(y / w);
  if (i >= 0 && i < 4 && j >= 0 && j < 2 && cells[j][i] === 0) {
    cells[j][i] = 1;
    let sound = j === 0 ? "snare" : "kick";
    kit.player(sound).start();
  }
}

function playBeat(time) {
  if (kit.loaded) {
    let beat = Tone.Transport.position.split(":")[1];
    if (cells[0][beat] === 1) kit.player("snare").start(time);
    if (cells[1][beat] === 1) kit.player("kick").start(time);
  }
}

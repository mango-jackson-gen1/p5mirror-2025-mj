let video;
let handPose, bodyPose;
let hands = [], poses = [];
let painting, px = 0, py = 0, sw = 8;
let paintPoints = []; // Array to store paint trail points
let w = 60; // Cell width for beat grid
let cells = [
  [0, 1, 0, 1], // Snare pattern
  [1, 0, 1, 0]  // Kick pattern
];
const kit = new Tone.Players({
  "kick": "samples/505/kick.mp3", 
  "snare": "samples/snare.mp3"
}).toDestination();
let flipped = false;

function preload() {
  handPose = ml5.handPose({ flipped: true });
  bodyPose = ml5.bodyPose("MoveNet", { flipped: flipped });
}

function gotHands(results) {
  hands = results;
}

function gotPoses(results) {
  poses = results;
}

function setup() {
  createCanvas(640, 480);
  painting = createGraphics(640, 480);
  painting.clear();
  video = createCapture(VIDEO, { flipped: true });
  video.hide();
  
  let eraseButton = createButton('Erase Canvas');
  eraseButton.position(20, 20);
  eraseButton.mousePressed(eraseCanvas);
  eraseButton.style('background-color', '#ff3366');
  eraseButton.style('color', 'white');
  
  handPose.detectStart(video, gotHands);
  bodyPose.detectStart(video, gotPoses);
  
  Tone.Transport.scheduleRepeat(playBeat, "4n");
  Tone.loaded().then(() => Tone.Transport.start());
}

function draw() {
  background(255);
  push();
  if (flipped) {
    translate(width, 0);
    scale(-1, 1);
  }
  image(video, 0, 0, width, height);
  pop();
  
  drawPaintTrail();
  image(painting, 0, 0);
  drawGrid();
  if (poses.length > 0) trackNose();
  if (hands.length > 0) handleHandDrawing();
}

function handleHandDrawing() {
  let rightHand, leftHand;
  for (let hand of hands) {
    if (hand.handedness == 'Right') {
      let index = hand.index_finger_tip;
      let thumb = hand.thumb_tip;
      rightHand = { index, thumb };
    }
    if (hand.handedness == 'Left') {
      let index = hand.index_finger_tip;
      let thumb = hand.thumb_tip;
      leftHand = { index, thumb };
    }
  }
  
  if (leftHand) {
    let { index, thumb } = leftHand;
    let x = (index.x + thumb.x) * 0.5;
    let y = (index.y + thumb.y) * 0.5;
    sw = dist(index.x, index.y, thumb.x, thumb.y);
    fill(255, 0, 255);
    noStroke();
    circle(x, y, sw);
  }
  
  if (rightHand) {
    let { index, thumb } = rightHand;
    let x = (index.x + thumb.x) * 0.5;
    let y = (index.y + thumb.y) * 0.5;
    let d = dist(index.x, index.y, thumb.x, thumb.y);
    if (d < 20) {
      paintPoints.push({ x: x, y: y, size: sw * 0.5, time: millis() });
      painting.stroke(255, 255, 0);
      painting.strokeWeight(sw * 0.5);
      painting.line(px, py, x, y);
    }
    px = x;
    py = y;
  }
}

function drawPaintTrail() {
  const currentTime = millis();
  const trailDuration = 2000;
  for (let i = 0; i < paintPoints.length; i++) {
    const point = paintPoints[i];
    const age = currentTime - point.time;
    if (age > trailDuration) {
      paintPoints.splice(i, 1);
      i--;
      continue;
    }
    const opacity = map(age, 0, trailDuration, 255, 0);
    fill(255, 0, 255, opacity);
    noStroke();
    circle(point.x, point.y, point.size);
  }
  if (paintPoints.length > 100) {
    paintPoints.splice(0, paintPoints.length - 100);
  }
}

function eraseCanvas() {
  painting.clear();
  paintPoints = [];
  px = 0;
  py = 0;
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
  let noseX = flipped ? width - nose.x : nose.x;
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

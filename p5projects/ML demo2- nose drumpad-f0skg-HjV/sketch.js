// Sequencer with Pose Detection
let bpm = 60;
let timeSignature = [4,4];
let nMeasures = 2;
function nSteps(){
  return nMeasures*timeSignature[0];
}
let currentStep;
let cells = [];

// Sound
let kit;
let drumNames = ["hho", "hh", "snare", "kick"];
let nTracks = drumNames.length;
kit = new Tone.Players(
    {
      "kick" : "/samples/505/kick.mp3",
      "snare" : "/samples/505/snare.mp3",
      "hh" : "/samples/505/hh.mp3",
      "hho" : "/samples/505/hho.mp3",
    }
);
kit.toDestination();
Tone.Transport.scheduleRepeat(onBeat, "4n");

// Camera and pose detection variables
let video;
let bodyPose;
let poses = [];
let lerpedX = 0;
let lerpedY = 0;
let prevNoseX = -1;
let prevNoseY = -1;
let poseReady = false;
let noseSize = 20; // Size of nose indicator circle

// Audio playback loop
function onBeat(time){
  let pos = Tone.Transport.position.split(":");
  let measure = int(pos[0]);
  let beat = int(pos[1]);
  
  let beatsPerMeasure = timeSignature[0];
  currentStep = (measure*beatsPerMeasure + beat) % nSteps();
  let velocity = 0.5;
  
  for(let track = 0; track < nTracks; track++){
    if(cells[track][currentStep]){
      let hh = kit.player(drumNames[track]);
      hh.start(time);
    }
  }
}

// Callback function for when ML5 detects poses
function gotPoses(results) {
  poses = results;
  poseReady = true;
}

function preload() {
  // Initialize ML5 bodyPose model (MoveNet)
  bodyPose = ml5.bodyPose("MoveNet", { flipped: true });
}

// Graphics
let w = 60;
let gray;
let colors = ["#999999", "#909090", "#707070", "#505050", "#303030"];
let cellWidth, cellHeight;

function setup() {
  createCanvas(480, 240);
  cellWidth = width / nSteps();
  cellHeight = height / nTracks;
  gray = color(178, 178, 188);
  
  // Initialize all sequencer cells. ON: 1, OFF: 0.
  for(let track = 0; track < nTracks; track++){
    cells[track] = [];
    for(let step = 0; step < nSteps(); step++){
        cells[track][step] = 0;
    }
  }
  
  // Set up video capture for pose detection
  video = createCapture(VIDEO, { flipped: true });
  video.size(480, 240);
  video.hide();
  
  // Start detecting poses from the video feed
  bodyPose.detectStart(video, gotPoses);
}

function draw() {
  background(255);
  
  // Display the video feed behind the sequencer (optional - can be commented out)
  // image(video, 0, 0, width, height);
  
  // Draw cells that are on
  for(let step = 0; step < nSteps(); step++){
    for(let track = 0; track < nTracks; track++){
      if(cells[track][step] == 1){
        fill(colors[track]);
        rect(step*w, track*w, w, w);
      }
    }
  }
  
  // Draw horizontal lines
  stroke(gray);
  for(let i = 0; i <= nTracks; i++){
    let y = i*w;
    line(0, y, width, y);
  }
  
  // Draw vertical lines
  for(let i = 0; i <= nSteps(); i++){
    // Thicker line for first beat (which marks the start of the measure)
    if(i % timeSignature[0] == 0){
      strokeWeight(1);
      stroke(234, 30, 83, 60);
    }
    else{
      stroke(gray);
      strokeWeight(0.5);
    }
    
    line(i*w, 0, i*w, height);
    // Highlight the step that is playing
    if(i == currentStep && Tone.Transport.state == "started"){
      fill(234, 30, 83, 60);
      noStroke();
      rect(i*w, 0, w, height);
    }
  }
  
  // Process pose detection for "clicking" cells
  if (poses.length > 0) {
    let pose = poses[0];
    
    // Check if nose keypoint is available
    if (pose.nose) {
      let x = pose.nose.x;
      let y = pose.nose.y;
      
      // Scale nose position to match canvas size if needed
      x = map(x, 0, video.width, 0, width);
      y = map(y, 0, video.height, 0, height);
      
      // Apply smoothing to reduce jitter
      lerpedX = lerp(lerpedX, x, 0.3);
      lerpedY = lerp(lerpedY, y, 0.3);
      
      // Draw indicator circle at nose position
      fill(255, 0, 0, 150);
      noStroke();
      circle(lerpedX, lerpedY, noseSize);
      
      // Check if nose position is different from previous frame
      // and use it to toggle cells (like a click)
      checkNoseClick(lerpedX, lerpedY);
    }
  }
}

// This function handles the "nose click" functionality
function checkNoseClick(x, y) {
  // Only register a "click" if the nose has moved significantly
  // and then stayed relatively still for a moment
  let distance = dist(x, y, prevNoseX, prevNoseY);
  
  // If nose has been stable (not moving too much)
  if (prevNoseX > 0 && distance < 5) {
    // Determine which cell the nose is on
    let i = floor(x / w);
    let j = floor(y / w);
    
    // Make sure the coordinates are within the grid
    if (i >= 0 && i < nSteps() && j >= 0 && j < nTracks) {
      // Toggle cell on/off
      cells[j][i] = !cells[j][i];
      
      // Reset previous nose position to prevent multiple toggles
      prevNoseX = -1;
      prevNoseY = -1;
    }
  } else {
    // Update previous nose position
    prevNoseX = x;
    prevNoseY = y;
  }
}

// Keep the mousePressed function as a fallback
function mousePressed(){
  // Determine which cell the mouse is on
  let i = floor(mouseX / w);
  let j = floor(mouseY / w);
  
  // Make sure the coordinates are within the grid
  if (i >= 0 && i < nSteps() && j >= 0 && j < nTracks) {
    // Toggle cell on/off
    cells[j][i] = !cells[j][i];
  }
}

// Once all audio files have been loaded, start the Tone playhead
Tone.loaded().then(function(){
  console.log("loaded");
  Tone.Transport.start();
});
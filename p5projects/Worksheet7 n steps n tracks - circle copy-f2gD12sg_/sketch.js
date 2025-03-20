// Sequencer
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
// Audio playback loop
function onBeat(time){
  let pos = Tone.Transport.position.split(":");
  let measure = int(pos[0]);
  let beat = int(pos[1]);
  currentStep = (measure*timeSignature[0] + beat) % nSteps();
  let velocity = 0.5;
  
  for(let track = 0; track < nTracks; track++){
    if(cells[track][currentStep]){
      let hh = kit.player(drumNames[track]);
      hh.start(time);
    }
  }
}
// Graphics
let w = 60;
let gray; // Not being used currently
let colors = ["#ffba84", "#967249", "#77969A", "#005CAF", "#26453D","#261E47"]
function setup() {
  createCanvas(480, 480);
  cellWidth = width / nSteps();
  cellHeight = height / nTracks;
  gray = color(178, 178, 188); // Not being used currently
  
  // Initialize all sequencer cells. ON: 1. OFF: 0.
  for(let track = 0; track < nTracks; track++){
    cells[track] = [];
    for(let step = 0; step < nSteps(); step++){
        cells[track][step] = 0;
    }
  }
}
function draw() {
  background(255);
  let w = 60;
  let d = width / nTracks; // diameter unit
  let a = TWO_PI / nSteps(); // angle unit
  // let c = 50; // color unit - commented out as we're using the colors array now
  let prevAngle = 0;
  let angle;
  for (let step = 1; step <= nSteps(); step++) { 
    for (let track = nTracks; track > 0; track--) { 
        let diameter = d * track;
        angle = a * step;
        // let f = track*c; // commented out as we're using the colors array now
        
        // Set transparent gray stroke for grid lines
        stroke(100, 100, 100, 150); // RGBA: semi-transparent gray
        
        if(cells[track-1][step-1] == 1){
          // Use the color from the colors array instead of grayscale
          fill(colors[track-1]);
        }
        else{
          fill(255);
        }
        arc(width/2, height/2, diameter, diameter, prevAngle, angle, PIE); 
      
    }
    prevAngle = angle;
  }
  // Highlight current step
  fill(0, 200, 200, 50);
  arc(width/2, height/2, width, width, a*currentStep, a*(currentStep+1));
}
function mousePressed(){
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
  
  // Toggle cell on/off
  cells[j][i] = !cells[j][i];
}
// Once all audio files have been loaded, start the Tone playhead
Tone.loaded().then(function(){
  console.log("loaded");
  Tone.Transport.start();
})
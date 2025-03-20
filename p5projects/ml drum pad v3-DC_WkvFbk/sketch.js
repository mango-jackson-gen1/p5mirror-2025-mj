let bpm = 60;
let timeSignature = [4,4];
let nMeasures = 2;
function nSteps(){
  return nMeasures*timeSignature[0];
}
let currentStep;
let cells = [];

// Video
let video;

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

// Graphics
let w = 60;
let gray;
let colors = ["#999999", "#909090", "#707070", "#505050", "#303030"]

function setup() {
  createCanvas(480, 240);
  cellWidth = width / nSteps();
  cellHeight = height / nTracks;
  gray =  color(178, 178, 188);

  // Load and configure video
  video = createVideo('your-video.mp4'); // Replace with your video file
  video.hide();  // Hide default video controls
  video.loop();  // Loop the video
  video.volume(0); // Mute the video

  // Initialize all sequencer cells. ON: 1, OFF: 0.
  for(let track = 0; track < nTracks; track++){
    cells[track] = [];
    for(let step = 0; step < nSteps(); step++){
        cells[track][step] = 0;
    }
  }
}

function draw() {
  background(255);

  // Draw the video in the background
  image(video, 0, 0, width, height);

  fill(100);
  noStroke();
  
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
      rect(i*w, 0, w, height)
    }
  }
}

function mousePressed(){
  let i = floor(mouseX / w);
  let j = floor(mouseY / w);
  cells[j][i] = !cells[j][i];
}

// Once all audio files have been loaded, start the Tone playhead
Tone.loaded().then(function(){
  console.log("loaded");
  Tone.Transport.start();
});

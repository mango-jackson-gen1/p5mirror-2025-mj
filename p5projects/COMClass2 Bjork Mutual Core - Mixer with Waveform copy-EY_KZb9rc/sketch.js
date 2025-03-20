// load 4 tracks
// create 4 sliders
// connect the value of the sliders to the volume of the tracks
let players = [];
let sliders = [];

let trackNames = [
  "ambient1", 
  "ambient2", 
  "bass1", 
  "bass2", 
  "drums1", 
  "drums2", 
  "organ1", 
  "organ2", 
  "vocal1", 
  "vocal2"
]

let tracks = [];
let playButton;

function setup() {
  createCanvas(540, 400);
  colorMode(HSB);
  
  for(let i = 0; i < trackNames.length; i++){
    tracks[i] = new Track(i, trackNames[i], "stems/" + trackNames[i] + ".mp3");
  }
  
  // I've added a play button directly to index.html
  playButton = select("#play");
  playButton.mousePressed(play);
  
  Tone.loaded().then(function(){  
    select("#play").removeAttribute("disabled");
  });

  noStroke();
}

function draw() {
  background(220);
  for(let i = 0; i < tracks.length; i++){
    tracks[i].draw();
  }
}

function mousePressed(){
  for(let i = 0; i < trackNames.length; i++){
    tracks[i].mousePressed();
  }
}

function play(){
  Tone.start();
  for(let i = 0; i < tracks.length; i++){
    tracks[i].player.start();
  }
}

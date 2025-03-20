// load 4 tracks
// create 4 sliders
// connect the value of the sliders to the volume of the tracks
let players = [];
let sliders = [];

let trackNames = [
  "adlibs", 
  "bass", 
  "drums1", 
  "drums2", 
  "fx", 
  "horns", 
  "percussion", 
  "strings", 
  "vox1", 
  "vox2", 
  "vox3", 
  "vox4" 
]

for(let i = 0; i < trackNames.length; i++){
  players[i] = new Tone.Player({
	url: "stems/" + trackNames[i] + ".mp3"
});
  players[i].toDestination();
}

function setup() {
  noCanvas();
  
  // Create a slider for each player
  for(i in players){
    // Be very careful with this range:
    // 0 is neutral volume
    sliders[i] = createSlider(-80, 0);
    sliders[i].id = i;
    sliders[i].input(volumeInput)
  }
}

function draw() {
  background(220);
}

// Once all files are fully loaded, 
// Start playing them back
Tone.loaded().then(function(){  
  Tone.start();
  for(let i = 0; i < trackNames.length; i++){
    players[i].start();
  }
});

function volumeInput(){
  let i = this.id;
  console.log(this.id + " " + this.value());
  players[i].volume.rampTo(this.value());
}
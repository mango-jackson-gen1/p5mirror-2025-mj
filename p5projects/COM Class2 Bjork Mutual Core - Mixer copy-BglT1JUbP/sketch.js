// load 4 tracks
// create 4 sliders
// connect the value of the sliders to the volume of the tracks
let players = [];
let sliders = [];

let trackNames = [
  "ambient1", 
  "bass1", 
  "drums1", 
  "organ1", 
  "vocal1"
]

for(let i = 0; i < trackNames.length; i++){
  players[i] = new Tone.Player({
	url: "stems/" + trackNames[i] + ".mp3",
	autostart: true,
});
  players[i].toDestination();
}

function setup() {
  noCanvas();
  // Create a slider for each player
  for(i in players){
    // Be very careful with this range:
    // 0 is neutral volume
    sliders[i] = createSlider(-60, 0);
    sliders[i].id = i;
    sliders[i].input(volumeInput)
  }
}

function draw() {
  background(220);
}

function volumeInput(){
  let i = this.id;
  console.log(this.id + " " + this.value());
  players[i].volume.rampTo(this.value());
}
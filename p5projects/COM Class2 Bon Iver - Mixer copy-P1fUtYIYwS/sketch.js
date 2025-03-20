// load 4 tracks
// create 4 sliders
// connect the value of the sliders to the volume of the tracks
let players = [];
let sliders = [];

let trackNames = ["stems/blobtower.mp3", 
                 "stems/brazen_mo.mp3", 
                 "stems/breezy_point_rd.mp3", 
                 "stems/lower_long_lake.mp3"];

for(let i=0; i<4; i++){
  players[i] = new Tone.Player({
      url: trackNames[i],
      autostart: true,
  }).toDestination();
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
  players[i].volume.rampTo(this.value());
}
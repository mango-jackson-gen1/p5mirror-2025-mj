let sliders = [];
let players = [];

//Load a track 
// create a slider 
// connect the value of the slider to volume of the track
players[0] = new Tone.Player("stems/blobtower.mp3");
players[0].autostart = true;
players[0].toDestination();

//create a slider
players[1] = new Tone.Player({
   url:"stems/brazen_mo.mp3",
   autostart: true
});

players[2] = new Tone.Player({
   url:"stems/breezy_point.mp3",
   autostart: true
});

players[3] = new Tone.Player({
   url:"stems/lower_long_take.mp3",
   autostart: true
});


//connect the value of the slider to the volume of the track 

// when the user change the volume of the slider, 

function setup() {
  noCanvas();
  
  // for each index in the players array
for(let i in players){
  //crerate a slider, connect it to the vent listener
  // give each slider an ID name, so you know which one you are adjusting 
  sliders[i] = createSlider(-60, 0);
  sliders[i].id = i;
  sliders[i].input(volumeInput);
}
  
  slider = createSlider(-60,0);//0 is already loud. 
  slider.input(volumeInput);
}

// within eventhandler, try use this. it points to the slider object. 
//question, why using this. 
// this within the volume input handler. and hte volume input already have value within it / aka reference to the slider 

function volumeInput(){
  console.log(this.id, this.value());
  let i = this.id;
  player[0].volume.rampTo(this.value);
  
}

function draw() {
  background(220);
}

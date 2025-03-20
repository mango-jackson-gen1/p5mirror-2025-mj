const sound = new SimplePlayer("sounds/blip.wav");
sound.toDestination();

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
}

// this is a good way to keep the loaded as true 
function mouseClicked(){
  if (loaded){
    sound.start();
  }
}

function keyTypes(){
  if(key == 'a'){
     if(loaded){
    sound.start()''
  }
}
}

let loaded = false;
Tone.loaded().then(function(){
  loaded = true;
}) // a promise ?? it is now loaded
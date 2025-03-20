const blip = new SimplePlayer("sounds/blip.wav");
sound.toDestination();

const pink = new SimplePlayer("sounds/pink.wav");
pink.toDestination();

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
}

// this is a good way to keep the loaded as true 
function mouseClicked(){
  if (loaded){
    blip.start();
  }
}

function keyTypes(){
  if(key == 'a'){
     if(loaded){
    blip.start(); 
   }else if(key == "s"){
     pink.start();
   }
 }
}

let loaded = false;
Tone.loaded().then(function(){
  loaded = true;
}) // a promise ?? it is now loaded
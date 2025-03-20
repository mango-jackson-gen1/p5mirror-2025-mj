/* There are three sounds. each is play one time after a mouse click. 
The mouse click is a circle button at the center of the screen. 
When it is clicked, the sound plays. 

1 sound zhouyidi plays first. 

*/

// Load sound files
const sound1 = new SimplePlayer("sounds/yameixiaoju.m4a");
const sound2 = new SimplePlayer("sounds/puddle.wav");

const blip = new SimplePlayer("sounds/yameixiaoju.m4a").toDestination();
const pink = new SimplePlayer("sounds/puddle.wav").toDestination();
const tears = new SimplePlayer("sounds/zhouyidi.m4a").toDestination();
const takerimba = new SimplePlayer("sounds/takerimba.wav").toDestination();

let loaded = false;

function setup() {
  createCanvas(600, 400);
  background(100, 233, 100);
}

function draw() {
  if(loaded){
   background(220); 
  }
  else{
    background(220);
    text("loading...", 20, 20);
  }
}

function keyTyped(){
  if(loaded){
    if(key == 'a'){
      blip.start();
    }
    else if(key == 's'){
      pink.start();
    }
    else if(key == 'd'){
      tears.start();
    }
    else if(key = 'f'){
      takerimba.start();
    }
  }
}

Tone.loaded().then(function(){
  loaded = true;
});

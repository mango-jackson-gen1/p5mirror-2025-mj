
// Press 'd' on the keyboard
const sound = new SimplePlayer("sounds/pink.wav");
sound.toDestination();

let loaded = false;

function setup() {
  createCanvas(600, 400);  
}

function draw(){
  background(0);
  console.log(sound.progress());
  let x = map(sound.progress(), 0, 1, 0, width);
	ellipse(x, height/3, 100, 100);
}

function keyTyped(){
  if(loaded){
    sound.start();
  }
}

Tone.loaded().then(function(){
  loaded = true;
});


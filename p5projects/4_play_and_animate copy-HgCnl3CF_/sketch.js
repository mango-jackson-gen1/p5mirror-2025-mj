const blip = new SimplePlayer("sounds/blip.wav");
blip.toDestination();

const pink = new SimplePlayer("sounds/pink.wav");
pink.toDestination();

const takerimba = new SimplePlayer("sounds/takerimba.wav");
takerimba.toDestination();

const tears = new SimplePlayer("sounds/tears.wav");
tears.toDestination();

let loaded = false;

function setup() {
  createCanvas(400, 400);
  colorMode(HSB);
  noStroke();
}

let x = 0;
let brightness = 60;
function draw() {
  background(0,0, brightness);
  
  // Pink
  let x = map(pink.progress(), 0, 1, 0, width);
  fill(0,100,100);
  ellipse(x, height/3, 100, 100);
  
  // Tears
  y = map(tears.progress(), 0, 1, 0, height);
  if(tears.progress() > 0)
    brightness = map(tears.progress(), 0, 1, 100, 60);
  fill(120,100,100);
  ellipse(width/2, y, 50, 50);
  
  // Blip
  let angle = map(blip.progress(), 0, 5, 0, -TWO_PI);
  fill(260,100,100);
  // push();
  translate(width / 2, height / 2);
  rotate(angle);
  rect(0, 0, 100, 100);
  // pop();
}

function keyTyped() {
  if(loaded) {
    if(key == 'a'){
      pink.start();
    }
    else if(key == 's'){      
      blip.start();
    }
    else if(key == 'd'){
      tears.start();
    }
    else if(key == 'f'){
      takerimba.start();
    }
  }
}

Tone.loaded().then(function(){
  loaded = true;
});


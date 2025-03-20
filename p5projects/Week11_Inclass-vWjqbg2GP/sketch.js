let drums=[];

function preload(){
  
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}

function keyPress(){
  // so keypad 1 is mapped as the first whenplaying! 
  drum[key-1].play(); 
  
}

/*



*/
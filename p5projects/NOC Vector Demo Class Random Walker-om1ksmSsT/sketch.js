let numWalkers = 8;
let walkers = [];

function setup() {
  createCanvas(400, 400);
  background(220);
  
  for (let i=0; i < numWalkers; i++){
    walkers[i] = new Walker(random(width), random(height));
  }
}

function draw() {
  for(let i = 0; i < walkers.length; i++){
    walkers[i].update();
    walkers[i].display();
  }
}

class Walker {

  constructor(x, y) {
    this.posX = x;
    this.posY = y;
    this.size = random(8,32);
    this.color = color(random(255), random(255), random(255));
    
  }
  //updates the varaibles of wallker
  update() {
    this.posX += random(-2, 2);
    this.posY += random(-2, 2);
  }
  //display the elements of walker 
  display() {
    fill(this.color);
    ellipse(this.posX, this.posY, this.size, this.size);
  }
}
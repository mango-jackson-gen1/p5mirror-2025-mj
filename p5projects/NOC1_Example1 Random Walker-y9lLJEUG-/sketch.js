//JESSIE ZHAI
//Nature of Code WEEK 1
let walkers = [];
let total = 10;
let color;

function setup() {
  createCanvas(500, 500);
  colorMode(HSB);
    
  for (let i = 0; i < total; i++) {
    walkers.push(new Walker(width * (i + 1) / (total + 1))); 
  }
  background(0);
}

function draw() {
  for (let walker of walkers) {
    walker.step();
    walker.show();
  }
}

class Walker {
  constructor(x) {
    this.x = x; 
    this.y = 0;  
  } 
  
  show() {
    let brightness = map(this.y, 0, height, 30, 100);
    let hue = map(this.y,0,height,220, 190);
    
    
    let vary = randomGaussian(30, 5);
    brightness = constrain(brightness + vary, 0, 100);
    
    stroke(hue, 200, brightness);
    point(this.x, this.y);
    blendMode(ADD);
  }
  
  step() {
    let r = random(5);
    let xstep, ystep;
    
    if (r < 0.01) {
      xstep = random(-100, 100);
      ystep = random(-100, 100);
    } else {
      xstep = random(-5, 5);
      ystep = random(-5, 6);
    }
    
    this.x += xstep;
    this.y += ystep;
    
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }
}
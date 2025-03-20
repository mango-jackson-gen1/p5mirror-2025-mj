// Challenge: Move your rectangle towards the mouse. 
let a, b, c, d;

let speedx = 1;
let speedy = 1;

function setup() {
  createCanvas(400, 400);
  a = 0.25 * width;
  b = 0.25 * height;
  c = 0.75 * width;
  d = 0.75 * height;
}

function draw() {
  background(68, 100, 173);
  line(a, b, c, b);
  line(a, d, c, d);
  line(a, b, a, d);
  line(c, b, c, d);
  
  if (mouseX > a) a += speedx;
  if (mouseX <a) a -=speedx;
  if (mouseY > b) b +=speedy;
  if (mouseY < b) b -=speedy
}

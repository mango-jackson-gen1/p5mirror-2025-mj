function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  
  translate(width/2, height/2);
  
  let x = radians(frameCount);
  
  
  //trig = atan(10*sin(x));
  // before using this, normalize this to -1 and 1 range, 
  //the periodic animation is still different than sin!
 trig = atan(10*sin(x))/atan(10);

  trigMapped = map(trig, -1,1, -height/4, height/4);
  
  circle(0, trigMapped, height/4);
  
}
let x = 0; 
let easing = 0.01; // when this is 0, there is no delay 

function setup(){
  createCanvas(220,120);
}

function draw(){
  let targetX = mouseX;
  x += (targetX - x)* easing;
  ellipse(x, 40, 12, 12);
  print(targetX+":"+x);
}

// manipulate the positioning of x with mouse, so there is a lag of the next frame. 


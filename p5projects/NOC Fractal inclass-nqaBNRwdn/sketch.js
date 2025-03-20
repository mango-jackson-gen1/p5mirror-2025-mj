function setup() {
  createCanvas(800, 400);
}

function draw() {
  background(220);
    drawCircle(400,200,100);
}


function drawCircle(x,y,r){
  stroke(0);
  noFill();
  circle(x,y,r*2);
  
  
  if (r>2){
  drawCircle(x+r,y, r*0.4);
      drawCircle(x-r,y, r*0.5);
    }
}
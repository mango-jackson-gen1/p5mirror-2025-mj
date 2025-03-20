function setup() {
  createCanvas(400, 400);
  cam = createCapture(VIDEO);
  cam.hide();

}



function draw() {
  background(220);
  tint(255, 255);
  image(cam, 0, 0);
  push();
  scale(-1, 1);
  copy(cam, 0, 0, width/2, height, -width, 0, width/2, height);
  pop();
  
  tint(255, a);// 0 fade to black 
  image(cam, 0, 0);
  
  a+= aspeed;
  if (a<0 || a> 255){
    aspeed *= -1;
  }
  
}
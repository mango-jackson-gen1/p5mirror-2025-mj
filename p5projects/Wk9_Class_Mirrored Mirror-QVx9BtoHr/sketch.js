// Hold the webcam stream
let cam;
let a = 0;
let aspeed = 1;

function setup() {
  // Grab the stream from the webcam
  cam = createCapture(VIDEO);
  // Set the size of the camera
  cam.size(640, 480);
  cam.hide();
  // Match the canvas size to the camera size
  createCanvas(cam.width, cam.height);
}

function draw() {
  background(220);
  
  // Draw cam stream frame by frame to canvas
  tint(255, 255);
  image(cam, 0, 0);

  // Flip the matrix horizontally
  push();
  scale(-1, 1);
  // Copy from x,y and w/2,h and Paste to -w,y,w/2,h
  // Making a perfectly symmetrical face

  copy(cam, 0, 0, width / 2, height, -width, 0, width / 2, height);
  pop();
  
  // Fade in/out the camera image
  tint(255, a);
  image(cam, 0, 0);
  
  // Change the alpha
  a += aspeed;
  // Bounce the alpha
  if (a > 255 || a < 0) aspeed *= -1;
  
  line(width / 2, 0, width / 2, height);
}

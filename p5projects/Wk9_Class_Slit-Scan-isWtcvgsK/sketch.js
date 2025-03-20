// Webcam
let cam;
// Moving coordinate for slit-scan
let x = 0;

function setup() {
  // Grab the webcam
  cam = createCapture(VIDEO);
  // Resize it
  cam.size(640, 480);
  // Hide it
  cam.hide();
  // Make the canvas the same size as the camera
  createCanvas(cam.width, cam.height);
}

function draw() {
  //background(220);
  //image(cam, 0, 0);
  line(width/2, 0, width/2, height);
  // Copy the middle vertical line of cam footage
  // Paste to wherever x is.  
  //put a variable here so it can accelerate and MOVE
  //initial location, width, height, move to where, width, height
  copy(cam, width/2, 0, 1, height, x, 0, 1, height)
  
  // Move the slit
  x++;
  // Wrap around the end
  x%=width;
}
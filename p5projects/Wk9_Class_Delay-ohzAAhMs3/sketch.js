let cam;
let cache = [];

// Delay in frames
let delayFrames = 240;

function setup() {
  createCanvas(1280, 480);
  cam = createCapture(VIDEO);
  cam.size(640, 480);
  cam.hide();
}

function draw() {
  background(220);
  
  // Draw current frame to the canvas
  image(cam, 0, 0);
  
  // Add current frame to cache
  cache.push(cam.get());
  
  // Remove the oldest frame when we have more than we need
  if(cache.length > delayFrames) {
    cache.shift();
  }
  
  // When we have enough, play the oldest frame
  if(cache.length >= delayFrames) image(cache[0], width/2, 0);
}
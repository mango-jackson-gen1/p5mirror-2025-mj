// Declare a variable to hold my webcam image
let cam;

function setup() {
  createCanvas(400, 400);
  // Create a video DOM element that grabs the video stream from my webcam
  cam = createCapture(VIDEO);
  // Hide the DOM element
  cam.hide();
  noStroke();
}

function draw() {
  background(220);
  
  // Why don't I need this?
  //cam.loadPixels();
  
  
  
  // Loop through every 50th pixel
  for(let x = 0; x < width; x+=50) {
    for(let y = 0; y < height; y+=50) {
      // Get the color at this x,y location
      let col = cam.get(x,y);
      // Use it to fill a 50x50 rectangle
      fill(col);
      rect(x, y, 50, 50);
    }
  }
  // Why do I need this?
   //cam.updatePixels();
  
  //image(cam, 0, 0);
}



/* 
  
1 Why don't I need this?
  //cam.loadPixels();
  Explanation: cam.loadPixels() is used to load the pixel data from the webcam into an array for pixel-by-pixel manipulation. However, in this code, you are using cam.get(x, y), which directly fetches the color of the pixel at (x, y) from the webcam feed. Since you are not manually accessing or manipulating the pixels array, there is no need to call cam.loadPixels(). The get() function handles this internally.

2  // Why do I need this?
   //cam.updatePixels();
updatePixels() is only required when you modify the pixels array directly (e.g., if you were to change the color data manually). 

Since you are not making any changes to the pixel data and are simply retrieving colors using get(), calling updatePixels() is unnecessary.

*/

//Make a pixelated 2-tone mirror with createCapture(VIDEO)and 20x20 pixels.
//Pixels that are > 50% bright are white.
//Pixels that are < 50% bright are black.
//Check out the brightness() function.

let vid; 

function setup() {
  createCanvas(400, 400);
  vid = createCapture(VIDEO, {flipped: true});
}

function draw() {
  vid.loadPixels();
  
  for (x = 0; x < vid.width; x += 20){
    for (y = 0; y < vid.height; y += 20){
      
     let i = (y * vid.width + x)*4;
      
     let r = vid.pixels[i];
     let g = vid.pixels[i + 1];
     let b = vid.pixels[i + 2];
     let a = vid.pixels[i + 3];  
     let c = color(r,g,b,a);
      
      // Check the brightness of the color and set the fill color
      if (brightness(c) >= 50) {
        fill(0); // Fill with black if brightness is above the threshold
      } else {
        fill(255); // Fill with white if brightness is below the threshold
      }
      
      // Draw a rectangle at (x, y) with a size of 20x20
      rect(x, y, 20, 20);
    }
  }
}
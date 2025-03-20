//Make every other pixel green. Erase a line that is 10 pixels tall across the middle of it. Turn a line that is 10 pixels wide down the middle of it blue. Challenge: Can you do it without using get() and set()?
let myCat;
let cat;

function preload() {
  cat = loadImage('cat.jpg');
}

function setup() {
  createCanvas(cat.width, cat.height);

  // Create a p5.Image from scratch
  myCat = createImage(width, height);

  // Load its pixels into memory (they will start out as 0)
  myCat.loadPixels();
  cat.loadPixels();

  // Loop through the pixels array 1 pixel at a time
  // Set each pixel to red
  for (let i = 0; i < myCat.pixels.length; i++) {
    myCat.pixels[i] = cat.pixels[i];
  }
  
  // Erase middle line of cat
  let beginning =  height/2 * cat.width * 4;
  let end = 136 * cat.width * 4;
  
  for (let i = begin; i < end; i++) {
    // Erase all pixel data
    myCat.pixels[i] = 0;
  }

  // Update the pixels array (write it back to object)
  myCat.updatePixels();
  
  // Draw the image to the canvas
  image(myCat, 0, 0);

}
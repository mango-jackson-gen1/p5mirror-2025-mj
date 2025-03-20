let myImage; 
let cat; 

function preload(){
  cat = loadImage('cat.jpg');
}

function setup() {
  createCanvas(cat.width, cat.height);
  pixelDensity(1);
  
  //create an empty p5.image
  myImage = createImage(width, height);
  
  cat.loadPixels();
  myImage.loadPixels();
  
  for (let i = 0; i < myImage.pixels.length; i++){
    //red 
    myImage.pixels[i] - cat.pixels[i];
    //green 
    myImage.pixels[i+1] = cat.pixels[i+1];
    //blue 
    myImage.pixels[i+2] = cat.pixels[i+2];
    //alpha 
        myImage.pixels[i+2] = cat.pixels[i+3];


  }
}
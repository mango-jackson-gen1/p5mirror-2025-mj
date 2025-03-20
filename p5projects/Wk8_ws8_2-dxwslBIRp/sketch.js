///Make every other pixel green.
//Erase a line that is 10 pixels tall across the middle of it.
//Turn a line that is 10 pixels wide down the middle of it blue.
//''Challenge: Can you do it without using get() and set()?
  
  
let cat;

function preload() {
  cat = loadImage('cat.jpg');
}

function setup() {
  createCanvas(cat.width, cat.height);
  
  cat.loadPixels();
  console.log('Image Width: ' + cat.width);
  console.log('Image Height: ' + cat.height);
  //Variables to use in all the px calculations
  const rowSize = cat.width*4;
  const halfRowSize = rowSize/2;
  const totalRows = cat.pixels.length/rowSize;
  
  
  /*01: Make every other pixel green*/
  for(let i = 0; i < cat.pixels.length; i += 20) {
    cat.pixels[i + 0] = 0;
    cat.pixels[i + 1] = 255;
    cat.pixels[i + 2] = 0;
    cat.pixels[i + 3] = 255;
  }
  
   /*02: Erase a 10px vertical line in the middle*/
  const centerColumnAlpha = rowSize/2 + 3;
  const fivePxAboveCenterAlpha = centerColumnAlpha + rowSize*(totalRows/2 - 5);
  const fivePxBelowCenterAlpha = centerColumnAlpha + rowSize*(totalRows/2 + 5);
  
  for(let i = fivePxAboveCenterAlpha; i < fivePxBelowCenterAlpha; i+= rowSize) {
    cat.pixels[i] = 0;
    //Uncomment below to check this is happening only 10 times
    //console.count('Erased Pixel');
  }

//   //3 turn 10 pixel line blue across middle vertically 
 
//   for (x = 0; x < cat.width; x++){
//     for (y = 0; y < cat.height; y++){
//       let i = (x + y * cat.width) * 4;
     
//       if (x <= cat.width/2 + 5 && x >= cat.width/2 - 5){
//         cat.pixels[i] = 0; 
//         cat.pixels[i + 1] = 0; 
//         cat.pixels[i + 2] = 255; 
//         cat.pixels[i + 3] = 255; 
//       }
//   }
//   }

  
  cat.updatePixels();
  image(cat,0,0);
}

/* 
1 Keep an aspect ratio of the original cat

let newWidth = 50;
let newHeight = (img.height / img.width) * newWidth;
image(img, 0, 0, newWidth, newHeight);

2 use set to move your image anywhere, and draw multiples
  // set(0, 0, img);
  // set(30, 30, img);

3 use img.copy
move one area of pixel data/rectangle to another area
  img.copy(20,20, 80,80, 80, 80, 80, 80);
  image(img, 0, 0);


*/
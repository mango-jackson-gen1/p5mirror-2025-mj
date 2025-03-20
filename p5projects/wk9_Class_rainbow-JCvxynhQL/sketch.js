// try again with 3 swatches 
// how computational color works

let numSwatches = 36;
let w;
let x;
let swSize;

function setup() {
  createCanvas(400, 400);
  
  // 360 degrees of color
  colorMode(HSB, 360, 100, 100)
  w = width/numSwatches; // create a number column 
  noStroke();
}

function draw() {
  background(220);
  
  //sw = swtches of colors 
  for(let sw = 0; sw < 36; sw++ ){
    let x = sw* width/36;// switch the number of swatches 
    
  }
  rect(x, 0, w, height);
  
}
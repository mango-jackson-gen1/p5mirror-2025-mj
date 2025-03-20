// distorted video 

function setup() {
  createCanvas(640, 480);
  cam = createCapture(VIDEO);
  cam.hide();
}

function draw() {
  background(220);
  //image(cam, 0,0);
  // get the vidoe pixel 
  cam.loadPixels();
    for (let y = 0; y < height; y++ ){
    let p = y* width+ width/2;
      let i = 4 * p
  // 4* pixels
  
  let r = cam.pixels[i];
  let g = cam.pixels[i+1];
  let b = cam.pixels[i+2];
  let a = cam.pixels[i+3];
  let c = [r, g, b, a];
  
    stroke(c);
    point(width/2, y);
  }
}

let kitty;

function preload() {
  kitty = loadImage("kitty_transparent.png");
}

function setup() {
  createCanvas(400, 400);
  console.log(kitty.width, kitty.height);
  console.log("hi!");
  console.log(kitty.get(200, 50));
  kitty.loadPixels();
  console.log(kitty.pixels[9999]);
  // let offset = ((y*imagewidth)+x)*4;
}

function draw() {
  //background(220);
  noStroke();
  kitty.loadPixels();
  for (let i = 0; i < 100; i++) {
    let randx = int(random(kitty.width));
    let randyQuaid = int(random(kitty.height));
    let offset = int(((randyQuaid*kitty.width)+randx)*4);
    let r = kitty.pixels[offset];
    let g = kitty.pixels[offset+1];
    let b = kitty.pixels[offset+2];
    let a = kitty.pixels[offset+3];
    fill(g, a - b);
    circle(map(randx, 0, kitty.width, 0, width),
           map(randyQuaid, 0, kitty.height, 0, height),
           map(r, 0, 255, 0, 25));
  }
  
/*  image(kitty, 0, 0, map(mouseX, 0, width, 0, kitty.width),
       map(mouseY, 0, height, 0, kitty.height));*/
}

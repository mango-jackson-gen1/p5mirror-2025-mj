let charon;
let gridx = 25;
let gridy = 25;
function preload() {
  charon = loadImage("charon.jpg");
}
function setup() {
  createCanvas(400, 400);
  noLoop();
  charon.loadPixels();
  background(0);
  rectMode(CENTER);
  noStroke();
}
function draw() {
  for (let i = 0; i < gridx; i++) {
    for (let j = 0; j < gridy; j++) {
      fill(
        charon.get(
          i*(width/gridx),
          j*(height/gridy)
        )
      );
      push();
      translate(i*(width/gridx), j*(height/gridy));
      if (((i+j) % 2) == 0) {
        ellipse(0,0,(width/gridx),(height/gridy));
      }
      else {
        rect(0,0,(width/gridx),(height/gridy));
      }
      pop();
    }
  }
}
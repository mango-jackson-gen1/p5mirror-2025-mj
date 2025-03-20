//EXERCISE: Modify the above example so that each rectangle object also stores a separate speed for the X and Y coordinates, then modify the draw() loop so that the rectangles move in directions other than downwards. BONUS: Write code so that each rectangle “bounces” when it reaches the bounds of the sketch.


let rectObjs = []; // start with empty list
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(50);
  noStroke();
  rectMode(CENTER);
  fill(255);
  for (let i = 0; i < rectObjs.length; i++) {
    fill(rectObjs[i].fillColor);
    rect(rectObjs[i].xpos,
        rectObjs[i].ypos, 50, 25);
    rectObjs[i].ypos += 1;
  }
}
function mousePressed() {
  rectObjs.push({xpos: mouseX, ypos: mouseY,
    fillColor: random(255)});
}
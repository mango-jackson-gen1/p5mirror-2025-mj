// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

let mover;

function setup() {
  createCanvas(640, 240);
  mover = new Mover();
  createP("Click mouse to apply wind force.");
}

function draw() {
  background(255);

  // when you use createvector, now it can be added 
  // to where the ball is moving to
  let gravity = createVector(0, 0.1);
  mover.applyForce(gravity);

  if (mouseIsPressed) {
    let wind = createVector(0.1, 0);
    mover.applyForce(wind);
  }

  mover.update();
  mover.display();
  mover.checkEdges();
}

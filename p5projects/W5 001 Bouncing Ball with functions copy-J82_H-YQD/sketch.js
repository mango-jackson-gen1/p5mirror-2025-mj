let x, y;
let xspeed = 1;
let yspeed = 0.5;

function setup() {
  createCanvas(400, 400);
  x = width / 2;
  y = height / 2;
}

function draw() {
  background(220);
  
  moveBall();
  bounceBall();
  drawBall();
}

function moveBall() {
  // Update the location of the ball
  x += xspeed;
  y += yspeed;
}

function bounceBall() {
  // Bounce the ball horizontally
  if (x < 0 || x > width) {
    xspeed *= -1;
  }
  
  // Bounce the ball vertically
  if (y < 0 || y > height) {
    yspeed *= -1;
  }
}

function drawBall() {
  // Display the ball
  ellipse(x, y, 50, 50);
}


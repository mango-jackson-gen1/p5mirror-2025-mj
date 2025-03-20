let stars = [];
let speedMax = 2;
let speedMin = 5;
let end = 3200;
let start = -3200;
let speed;

function setup() {
  createCanvas(700, 400); // Removed WEBGL
  for (let i = 0; i < 800; i++) {
    stars.push({
      xPos: random(-width, width),
      yPos: random(-height, height),
      zPos: random(start, end),
      size: random(0.3, 3),
    });
  }
}

function draw() {
  background(0);

  speed = map(0, 0, 1, speedMin, speedMax);

  translate(width / 2, height / 2); // Center stars on canvas
  stroke(255);

  for (let star of stars) {
    let starSize = map(star.zPos, start, end, star.size, 0);
    strokeWeight(starSize);
    point(star.xPos, star.yPos);

    star.zPos += speed;

    if (star.zPos > end) {
      star.xPos = random(-width, width);
      star.yPos = random(-height, height);
      star.size = random(0.3, 3);
      star.zPos = start;
    }
  }
}

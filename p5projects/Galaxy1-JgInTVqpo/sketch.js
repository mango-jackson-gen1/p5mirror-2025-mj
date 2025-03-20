let stars = [];
let speedMax = 2;
let speedMin = 5;
let end = 3200;
let start = -3200;
let speed;

function setup() {
  createCanvas(700, 400, WEBGL);
  angleMode(DEGREES);

  // Initialize star positions
  for (let i = 0; i < 800; i++) {
    stars.push({
      xPos: random(-2 * width, 2 * width),
      yPos: random(-2 * height, 2 * height),
      zPos: random(start, end),
      size: random(0.3, 3),
    });
  }
}

function draw() {
  background(0);
  orbitControl();

  stroke(random(230, 255));
  speed = map(0, 0, 1, speedMin, speedMax);

  for (let star of stars) {
    strokeWeight(ceil(map(star.zPos, start, end, 0, star.size)));
    point(star.xPos, star.yPos, star.zPos);
    star.zPos += speed;

    if (star.zPos > end) {
      star.xPos = random(-2 * width, 2 * width);
      star.yPos = random(-2 * height, 2 * height);
      star.size = random(0.3, 3);
      star.zPos = start;
    }
  }
}

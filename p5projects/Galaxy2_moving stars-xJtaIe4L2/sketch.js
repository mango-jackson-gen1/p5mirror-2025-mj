// Array to hold star objects
let stars = [];
let speedMin = 1;
let speedMax = 3;

// Setup function initializes canvas and stars
function setup() {
  createCanvas(700, 400);

  // Populate stars array with star objects
  for (let i = 0; i < 350; i++) {
    stars.push(new Star());
  }
}

// Draw loop continuously updates and displays stars
function draw() {
  background(0);

  // Update and display each star
  for (let star of stars) {
    star.update();
    star.show();
  }
}






class Star {
  constructor() {
    // Directly initialize star properties
    this.x = random(width);
    this.y = random(height);
    this.size = random(0.1, 0.5);
    this.speed = random(speedMin, speedMax);
  }

  update() {
    // Move star leftward
    this.x -= this.speed;

    // Reset star position when it goes off-screen
    if (this.x < 0) {
      // Reinitialize properties directly here (same as constructor)
      this.x = width;
      this.y = random(height);
      this.size = random(0.5, 3);
      this.speed = random(speedMin, speedMax);
    }
  }

  show() {
    // Draw star with random brightness (twinkle)
    stroke(random(50, 255));
    strokeWeight(this.size);
    point(this.x, this.y);
  }
}


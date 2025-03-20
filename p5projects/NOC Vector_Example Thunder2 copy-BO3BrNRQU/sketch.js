// https://natureofcode.com/vectors/
// https://youtu.be/jupjuq9Jl-M?si=2GDmVLYhkddaUhpM Coding train channel about vector
let flashAlpha = 0; // the brightness of the thunder
let thunderTimer = 0; // timer to control when thunder occurs
let lightningStrikes = []; // stores all active strikes

function setup() {
  createCanvas(800, 600);
  thunderTimer = floor(random(100, 300)); // set initial delay
}

function draw() {
  background(0);

  // white flash
  if (flashAlpha > 0) {
    flashAlpha -= 2; 
    fill(255, flashAlpha);
    noStroke();
    rect(0, 0, width, height);
  }


  // draw and update all strikes
  for (let i = lightningStrikes.length - 1; i >= 0; i--) {
    let strike = lightningStrikes[i];
    strike.update();
    strike.display();
    if (strike.alpha<=0) {
      lightningStrikes.splice(i, 1); // remove finished strikes
    }
  }

  // delay
  if (frameCount % thunderTimer === 0) {
    createThunder();
    thunderTimer = floor(random(100, 400)); // reset the timer
  }
}

function createThunder() {
  flashAlpha = 255; 

  // the main lightning strike
  let mainStrike = new LightningStrike(random(width / 4, (3 * width) / 4), 0);
  lightningStrikes.push(mainStrike);

  // branches
  let numBranches = floor(random(5, 9));
  for (let i = 0; i < numBranches; i++) {
    let branch = new LightningStrike(
      mainStrike.points[floor(random(mainStrike.points.length))].x,
      mainStrike.points[floor(random(mainStrike.points.length))].y,
      true
    );
    lightningStrikes.push(branch);
  }
}

class LightningStrike {
  constructor(startX, startY, isBranch = false) {
    this.points = [];
    this.alpha = 255;
    this.isBranch = isBranch;
    if (isBranch) {
      this.thickness = random(1, 2); // branches
    } else {
      this.thickness = random(2, 4); // the main strike
    }
    let currentX = startX;
    let currentY = startY;
    while (currentY < height) {
      this.points.push(createVector(currentX, currentY));

      // Adjust offsets based on whether it's a branch or main strike
      if (this.isBranch) {
        currentX += random(-10, 10); // Smaller for branches
        currentY += random(5, 15);   
      } else {
        currentX += random(-18, 18); // Larger for main strike
        currentY += random(10, 30);  
      }
    }
  }

  update() {
    this.alpha -= 5; // fade out the thunder when it's finished
  }

  display() {
    stroke(255, this.alpha);
    strokeWeight(this.thickness);
    noFill();
    beginShape();
    for (let point of this.points) {
      vertex(point.x, point.y);
    }
    endShape();

    // Add a glowing effect
    if (!this.isBranch) {
      stroke(200, 230, 255, this.alpha * 0.5);
      strokeWeight(this.thickness * 2);
      beginShape();
      for (let point of this.points) {
        vertex(point.x, point.y);
      }
      endShape();
    }
  }

}
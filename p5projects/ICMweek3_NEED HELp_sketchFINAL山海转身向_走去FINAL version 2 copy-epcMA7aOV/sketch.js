//question that I ran into: how to set that when click/ pressed at certain mouseY value (0-60; 120-180; 240-300, etc) draw image 1; if click on other mouseY value, draw image 2 >>
// eventually used modulo %

// let screen1 = true;
// let screen2 = false;
// let screen3 = false;

let a = 0;
let b;
let c = 30;
let d;
let e = 0;
let f;
let g = 30;
let h;

let amplitude = 100; // The height of the wave
let frequency = 0.01; // How many waves fit in the canvas width
let phase = 0; // Phase shift, this controls the wave's horizontal shift
let phase2 = 0;
let screen = 0;

function setup() {
  createCanvas(600, 700);
}

function draw() {
  background(55);
  textSize(20);
  fill(173, 216, 230);

  if (screen == 0) {
    drawbg();
  } else if (screen == 1) {
    drawMountain();
  } else if (screen == 2) {
    drawOcean();
  }

  // if (screen1 == true && screen2 == false && screen3 == false) {
  //   drawbg();
  //   console.log("background");
  // } else if (screen2 == true && screen1 == false && screen3 == false) {
  //   drawMountain();
  //   console.log("mountain");
  // } else if (screen3 == true && screen1 == false && screen2 == false) {
  //   drawOcean();
  //   console.log("ocean");
  // }
}

function drawbg() {
  // textSize(20);
  // fill(173, 216, 230);
  for (b = 20; b < height; b += 80) {
    text("转身向大海走去", a, b);
    a += 0.25;
    if (a > width) {
      a = 0;
    }
  }
  for (d = 40; d < height; d += 80) {
    text("turn around and walk to the ocean", c, d);
    c += 0.25;
    if (c > width) {
      c = 0;
    }
  }
  fill(196, 164, 132);
  for (f = 60; f < height; f += 80) {
    text("转身向山里走去", e, f);
    e += 0.25;
    if (e > width) {
      e = 0;
    }
  }
  for (h = 80; h < height; h += 80) {
    text("turn around and walk to the mountains", g, h);
    g += 0.3;
    if (g > width) {
      g = 0;
    }
  }
}

function mousePressed() {
  if (screen == 0) {
    if (mouseY % 80 > 40) {
      console.log("brown");
      screen = 1;
    } else {
      console.log("blue");
      screen = 2;
    }
  } else if (screen == 1) {
    screen = 0;
  } else if (screen == 2) {
    screen = 0;
  }
}

// draw mountain
function drawMountain() {
  background(220);
  fill(173, 216, 230);
  rect(0, 0, width, height);
  fill(55);
  strokeWeight(0);
  triangle(
    width / 3,
    height * 0.3,
    -0.3 * width,
    height * 1.3,
    width * 1.3,
    height * 1.3
  );
  triangle(
    (width / 5) * 4,
    height * 0.17,
    0.2 * width,
    height * 1.3,
    width * 1.7,
    height * 1.3
  );

  fill(240);
  ellipse(width * 0.2, height * 0.99, width * 2, height * 0.4);
  fill(255);
  ellipse(width * 0.98, height * 1.05, width * 2.1, height * 0.4);
}

//draw the ocean

function drawOcean() {
  background(55);
  //draw the clouds
  fill(240);
  ellipse(width * 0.2, height * 0.01, width * 2, height * 0.4);
  fill(255);
  ellipse(width * 0.98, height * -0.02, width * 2.1, height * 0.4);

  // First wave
  fill(0, 80, 250); // Light blue fill
  // stroke(0); // Black stroke for the wave
  noStroke();
  beginShape();
  for (let x = 0; x < width; x++) {
    let y = (height / 4) * 3 + amplitude * sin(frequency * x + phase);
    vertex(x, y); // Create the points for the wave
  }
  // Closing the shape by adding vertices at the bottom of the canvas
  vertex(width, height); // Bottom right corner
  vertex(0, height); // Bottom left corner
  endShape(CLOSE); // Close the shape to fill it

  // Second wave
  fill(173, 216, 230); // Another shade of blue
  beginShape();
  for (let x = 0; x < width; x++) {
    let y = (height / 4) * 2.7 + amplitude * sin(frequency * x + phase);
    vertex(x, y); // Create the points for the wave
  }
  // Closing the shape
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);

  // Third wave
  fill(173, 216, 250);
  beginShape();
  for (let a = 0; a < width; a++) {
    let b = (height / 6) * 5 + amplitude * sin(frequency * a + phase2);
    vertex(a, b); // Create the points for the wave
  }
  // Closing the shape
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);

  // Fourth wave
  fill(173, 216, 230);
  beginShape();
  for (let a = 0; a < width; a++) {
    let b = (height / 6) * 5.2 + amplitude * sin(frequency * a + phase2);
    vertex(a, b); // Create the points for the wave
  }
  // Closing the shape
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);

  // Increment phase to animate the waves over time
  phase += 0.01;
  phase2 += 0.011;
}

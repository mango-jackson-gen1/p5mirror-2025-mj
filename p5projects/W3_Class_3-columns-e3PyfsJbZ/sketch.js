function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(220);
  
  // if my mouse is in the left column
  // Fill the left column with red
  if (mouseX < 200) {
    fill("red");
    rect(0, 0, 200, height);
    fill("white");
    rect(200, 0, 200, height);
    fill("white");
    rect(400, 0, 200, height);
  }
  // OR if my mouse is in the middle column
  // Fill middle column with red
  else if (mouseX < 400) {
    fill("white");
    rect(0, 0, 200, height);
    fill("red");
    rect(200, 0, 200, height);
    fill("white");
    rect(400, 0, 200, height);
  }
  // OR if my mouse is in the right column
  // Fill the right column with red
  else{
    fill("white");
    rect(0, 0, 200, height);
    fill("white");
    rect(200, 0, 200, height);
    fill("red");
    rect(400, 0, 200, height);
  }
}

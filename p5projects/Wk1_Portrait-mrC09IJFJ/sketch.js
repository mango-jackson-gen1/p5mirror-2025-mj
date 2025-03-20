function setup() {
  createCanvas(400, 400);
  background(200);
}

function draw() {
  //Left Hair 清汤挂面发丝 + jap layers
  noFill();

  // Start drawing the left shapes
  drawLeftHair();

  // Hair part two - right side (mirror of the left side)
  drawRightHair();
}

function drawLeftHair() {
  // First left shape
  beginShape();
  vertex(30, 20);
  bezierVertex(15, 70, 80, 75, 20, 100);
  endShape();
  
  // Second left shape
  beginShape();
  vertex(40, 20);
  bezierVertex(25, 80, 89, 85, 30, 110);
  endShape();
  
  // Third left shape
  beginShape();
  vertex(50, 20);
  bezierVertex(35, 90, 99, 95, 40, 120);
  endShape();
}

function drawRightHair() {
  // Axis of symmetry is at x = 200
  let axis = 200;
  
  // Mirrored first shape
  beginShape();
  vertex(2 * axis - 30, 20);
  bezierVertex(2 * axis - 15, 70, 2 * axis - 80, 75, 2 * axis - 20, 100);
  endShape();
  
  // Mirrored second shape
  beginShape();
  vertex(2 * axis - 40, 20);
  bezierVertex(2 * axis - 25, 80, 2 * axis - 89, 85, 2 * axis - 30, 110);
  endShape();
  
  // Mirrored third shape
  beginShape();
  vertex(2 * axis - 50, 20);
  bezierVertex(2 * axis - 35, 90, 2 * axis - 99, 95, 2 * axis - 40, 120);
  endShape();
}

  
  
  // connecting the hair using arc 
  
  
  //heart shaped face 
  
  
  
  

function setup() {
  createCanvas(400, 400);
}

function draw() {
  // Calculate midpoints
  let midX = width/2;
  let midY = height/2;
  noStroke();
  
  // Top-left: red
  fill(247, 92, 47);
  rect(0, 0, midX, midY);
  
  // Top-right: blue
  fill(163, 99, 54);
  rect(midX, 0, midX, midY);
  
  // Bottom-left: yellow
  fill(48, 90, 86);
  rect(0, midY, midX, midY);
  
  // Bottom-right: white
  fill(0,98, 132);
  rect(midX, midY, midX, midY);
}
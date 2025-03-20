// Simple Music Staff with Measure Lines
// The most basic version that just draws staff lines and measures

function setup() {
  createCanvas(800, 200);
}

function draw() {
  background(255);
  
  // Draw the staff (5 horizontal lines)
  drawStaff();
  
  // Draw measure lines (vertical bars)
  drawMeasureLines();
}

function drawStaff() {
  stroke(0);
  strokeWeight(1);
  
  // Draw the 5 lines of the staff
  let staffLines = 5;
  let staffSpacing = 10;
  
  for (let i = 0; i < staffLines; i++) {
    let y = 100 + i * staffSpacing;
    line(40, y, width - 20, y);
  }
}

function drawMeasureLines() {
  stroke(0);
  strokeWeight(1);
  
  // Draw measure lines every 150 pixels
  for (let x = 190; x < width; x += 150) {
    line(x, 100, x, 100 + 4 * 10); // 4 spaces = 5 lines - 1
  }
}
let colors = [];

function setup() {
  createCanvas(400, 400);
  
  // Initialize an array of random colors for each column
  for (let i = 0; i < 20; i++) {
    colors[i] = color(random(255), random(255), random(255)); // Assign a random color to each column
  }
}

function draw() {
  background(255); // Set the background to white
  let each = width / 20; // Calculate the width of each piece

  for (let i = 0; i < 20; i++) {
    // Check if the mouse is over the current rectangle
    if (mouseX > i * each && mouseX < (i + 1) * each) {
      fill(colors[i]); // Fill with the color assigned to this column
    } else {
      fill(255); // If the mouse is not over, fill white
    }
    
    // Draw the rectangle at the calculated position and size
    rect(i * each, 0, each, height);
  }
}

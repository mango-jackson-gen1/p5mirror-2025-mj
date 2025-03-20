//Make every other column blue.
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255); // Set the background to white
  let each = width / 20; // 20 pieces

  for (let i = 0; i < 20; i++) {
    // Check if the mouse is over the current rectangle
    if (mouseX > i * each && mouseX < (i + 1) * each) {
      // If the index is even, fill blue
      if (i % 2 === 0) {
        fill("blue");
      } else {
        fill("red"); // If the index is odd, fill red
      }
    } else {
      fill(255); // If the mouse is not over, fill white
    }
    
    // Draw the rectangle at the calculated position and size
    rect(i * each, 0, each, height);
  }
}

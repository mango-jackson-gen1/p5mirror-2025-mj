//Create 20 columns that turn red only when you hover over the column. Do it 3 ways: Without a loop. With a for loop. With a while loop.
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(243, 249, 227);

  // Calculate the width of each column
  let columnWidth = width / 20;

  for (let i = 0; i < 20; i++) {
    let columnNum = i * columnWidth;

    // Check if the mouse is hovering over the current column
    if (mouseX > columnNum && mouseX < columnNum + columnWidth) {
      fill(241, 91, 181); // Highlight color when hovered
    } else {
          fill(243, 249, 227); // Default color
    }

    // Draw the column
    rect(columnNum, 0, columnWidth, height);
  }
}


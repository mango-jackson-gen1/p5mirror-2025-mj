let x = 0;
let y = 0;
let spacing = 50;
let textColumn = -1; // Variable to store the column index for text
let strings = [
  "We met at a dinner arranged by our parents.",
  "You met her in middle school",
  "You called me in the middle of the night.",
  "She resets you",
  "I was at your wedding. Your wife looks chubby"
]; // Array of text strings
let dates = ["Sep 1, 2004", "Aug 15, 2010", "Feb 28, 2021", "Dec 12, 2023", "Nov 26, 2025"]; // Array of date strings
let colors = [
  [217, 129, 137],
  [234, 113, 123],
  [213, 32, 47],
  [147, 22, 33],
  [173, 52, 62]
]; // Updated array of colors for every two rows
let margin = 20; // Margin from the sides
let isStringRow = false; // Start with dates
let rowCount = 0; // Counter to track rows displayed
let paused = false; // Flag to handle the delay
let dateIndex = 0; // Index to track the fixed order of dates
let colorIndex = 0; // Index to track the current color
let showingBackground = true; // Flag to show background colors first

function setup() {
  createCanvas(500, 500);
  textSize(12); // Adjust text size
  textAlign(CENTER, CENTER); // Default text alignment
  noStroke(); // Hide the grid
  frameRate(1); // Slow down the frame rate (1 frame per second)
}

function draw() {
  if (paused) return; // Skip execution if paused

  if (showingBackground) {
    // Display the background colors for the top two rows
    let currentColor = colors[colorIndex];
    fill(currentColor[0], currentColor[1], currentColor[2]);
    rect(0, y, width, spacing); // Fill the first row's background
    rect(0, y + spacing, width, spacing); // Fill the second row's background

    // Wait 1 second before proceeding to display text
    showingBackground = false;
    paused = true;
    setTimeout(() => {
      paused = false; // Resume after 1 second
      loop(); // Restart the draw loop
    }, 1000);
    noLoop();
    return;
  }

  // Define the valid range for text placement (excluding the margin)
  let totalColumns = floor(width / spacing);
  let startColumn = ceil(margin / spacing); // Start column after margin
  let endColumn = floor((width - margin) / spacing) - 1; // Last column before margin
  let validColumns = endColumn - startColumn + 1;

  // Select a random column within the margin boundaries for the date
  if (!isStringRow && x === 0) {
    textColumn = startColumn + floor(random(validColumns)); // Pick a random column within the valid range
  }

  // Determine what to display (strings or dates) based on the row type
  let contentArray = isStringRow ? strings : dates;

  // Ensure there's content left to display
  if (contentArray.length > 0) {
    let randomContent;
    let textY;

    if (isStringRow) {
      // Randomly select a string
      let randomIndex = floor(random(contentArray.length));
      randomContent = contentArray[randomIndex];
      contentArray.splice(randomIndex, 1); // Remove the displayed string
      textFont("Arial"); // Set the font for strings
      textStyle(ITALIC); // Set text style to italic
      textAlign(CENTER, CENTER); // Center-align strings
      textY = y + spacing / 2; // Align strings to the vertical center of the square
    } else {
      // Sequentially select a date
      randomContent = contentArray[dateIndex];
      dateIndex = (dateIndex + 1) % contentArray.length; // Move to the next date
      textFont("Arial"); // Set the font for dates
      textStyle(BOLD); // Set text style to bold
      textAlign(CENTER, BOTTOM); // Bottom-align dates
      textY = y + spacing; // Align dates to the bottom of the square
    }

    // Draw the text
    for (let col = 0; col < totalColumns; col++) {
      let rectX = col * spacing;
      if (col === textColumn) {
        fill(255); // Set text color for the text
        text(randomContent, rectX + spacing / 2, textY); // Draw the text or date
      }
    }
  }

  // Move to the next row
  y += spacing;
  rowCount++; // Increment the row counter

  // Alternate between date and string rows
  isStringRow = !isStringRow;

  // After two rows, update the background color index and show background
  if (rowCount % 2 === 0) {
    colorIndex = (colorIndex + 1) % colors.length; // Cycle through colors
    showingBackground = true; // Trigger background display
  }

  // Pause after every 2 rows
  if (rowCount % 2 === 0) {
    paused = true;
    setTimeout(() => {
      paused = false; // Resume after 3 seconds
      loop(); // Restart the draw loop
    }, 3000); // 3-second delay
    noLoop(); // Temporarily stop the draw loop
  }

  // Stop when the canvas is filled or content is exhausted
  if (y >= height || (strings.length === 0 && dateIndex >= dates.length)) {
    noLoop();
  }
}

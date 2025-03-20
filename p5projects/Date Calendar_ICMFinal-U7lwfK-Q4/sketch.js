let x = 0;
let y = 0;
let spacing = 50;
let textColumn = -1; // Variable to store the column index for text
let strings = [
  "I met you at a dinner arranged by our parents.",
  "You had known her since middle school.",
  "You called me in the middle of the night.",
  "I was at your wedding. She looked chubby.",
  "Your father thinks you're never good enough.",
  "You know, you used to look attractive.",
  "You drove me to grab a drink.",
  "I stalked you all over the internet."
]; // Array of text strings

let dates = [
  "2004 September",
  "2010 October",
  "2012 November",
  "2014 December",
  "2021 January",
  "2022 February",
  "2023 March",
  "2024 April"
]; // Array of date strings

let colors = [
  [244, 164, 171],
  [237, 110, 120],
  [230, 55, 70],
  [200, 25, 39],
  [163, 20, 32],
  [127, 16, 25],
  [91, 11, 18]
]; // Updated array of colors for every two rows

let margin = 120; // Adjusted margin for 120 pixels from the edges
let isStringRow = false; // Start with dates
let rowCount = 0; // Counter to track rows displayed
let dateIndex = 0; // Index to track the fixed order of dates
let colorIndex = 0; // Index to track the current color
let showingBackground = true; // Flag to show background colors first

function setup() {
  createCanvas(900, 900); // Adjusted canvas size
  textSize(12); // Adjust text size
  textAlign(CENTER, CENTER); // Default text alignment
  noStroke(); // Hide the grid
  frameRate(0.5); // Slow down the frame rate (1 frame per second)
}

function draw() {
  if (colorIndex >= colors.length) {
    noLoop(); // Stop the iteration when all colors are used
    return;
  }

  if (showingBackground) {
    // Display the background colors for the current two rows
    let currentColor = colors[colorIndex];
    fill(currentColor[0], currentColor[1], currentColor[2]);
    rect(0, y, width, spacing); // Fill the first row's background
    rect(0, y + spacing, width, spacing); // Fill the second row's background

    // Wait 1 second before proceeding to display text
    showingBackground = false;
    setTimeout(() => {
      loop(); // Restart the draw loop
    }, 1000);
    noLoop();
    return;
  }

  // Define the valid range for text placement (excluding the margin)
  let totalColumns = floor((width - 2 * margin) / spacing); // Adjust for left and right margins
  let startColumn = ceil(margin / spacing); // Start column after margin
  let endColumn = startColumn + totalColumns - 1; // Last column before margin

  // Select a random column within the margin boundaries for the date
  if (!isStringRow && x === 0) {
    textColumn = startColumn + floor(random(totalColumns)); // Pick a random column within the valid range
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
      dateIndex = (dateIndex + 1) % dates.length; // Move to the next date
      textFont("Arial"); // Set the font for dates
      textStyle(BOLD); // Set text style to bold
      textAlign(CENTER, BOTTOM); // Bottom-align dates
      textY = y + spacing; // Align dates to the bottom of the square
    }

    // Draw the text
    for (let col = startColumn; col <= endColumn; col++) {
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
    colorIndex++; // Move to the next color
    showingBackground = true; // Trigger background display
  }
}


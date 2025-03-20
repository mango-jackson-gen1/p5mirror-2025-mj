/*refer to class: display string*/

let currentDateIndex = 0; // Index to track the current date
const dates = [
  "SEPT.1",
  "SEPT.22",
  "OCT.5",
  "NOV.15",
  "DEC.5"
]; // Array of dates to loop through

const messages = [
  "First day of schoolCCCCCCCCCCC",
  "It is my birthday",
  "Made my first video ever",
  "It is sunny out",
  "Hong Shao Rou for lunch XXXXXX"
]; // Messages corresponding to each date

let scratch; // p5.Image for pixel manipulation
let progress = 0; // Progress for animation

function setup() {
  createCanvas(300, 300); // Create a canvas of size 300x300
  frameRate(60); // Set a consistent frame rate

  // Initialize the scratch image
  scratch = createImage(150, 100); // Same size as the bottom half of the rectangle
  scratch.loadPixels();

  // Fill the scratch image with a starting color
  for (let i = 0; i < scratch.pixels.length; i += 4) {
    scratch.pixels[i] = 212;   // Red
    scratch.pixels[i + 1] = 190; // Green
    scratch.pixels[i + 2] = 190; // Blue
    scratch.pixels[i + 3] = 255; // Alpha (fully opaque)
  }
  scratch.updatePixels();
}

function draw() {
  background(182, 166, 202); // Set the background color

  rectMode(CENTER); // Set rectangle drawing mode to CENTER
  noStroke(); // Disable stroke for the rectangle
  fill(213, 207, 225); // Set the fill color for the rectangle
  rect(width / 2, height / 2, 150, 200); // Draw the rectangle centered on the canvas

  // Draw a horizontal line in the middle of the rectangle
  stroke(0); // Set the line color to black
  strokeWeight(4); // Set the line thickness
  line(width / 2 - 70, height / 2, width / 2 + 70, height / 2);

  // Display the message in the top part of the rectangle
  noStroke(); // Remove stroke for the text
  fill(69, 63, 60); // Set the text color to the specified color
  textAlign(CENTER, CENTER); // Align the text to center horizontally and vertically
  textSize(13); // Set the text size
  textFont("Georgia");
  text(messages[currentDateIndex % messages.length], width / 2, height / 2 - 50); // Position text in the top part

  // Animate the pixel-by-pixel color change in the scratch image, row by row
  scratch.loadPixels();
  const cols = 150; // Number of columns in the image
  const rows = 100; // Number of rows in the image
  const totalPixels = cols * rows;
  const pixelsToChange = Math.floor(progress * totalPixels); // Pixels to animate

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let i = 4 * (x + y * cols); // Calculate the index in the pixels array
      if (x + y * cols < pixelsToChange) {
        scratch.pixels[i] = 255;        // Red remains constant
        scratch.pixels[i + 1] = (scratch.pixels[i + 1] + 1) % 256; // Increment Green
        scratch.pixels[i + 2] = (scratch.pixels[i + 2] + 1) % 256; // Increment Blue
        scratch.pixels[i + 3] = 255;    // Alpha remains fully opaque
      }
    }
  }
  scratch.updatePixels();

  // Draw the scratch image in the bottom half of the rectangle
  imageMode(CENTER);
  image(scratch, width / 2, height / 2 + 50, 150, 100);

  // Update progress for animation
  progress += 0.01;
  if (progress >= 1) {
    // Reset progress and move to the next date and message
    progress = 0;
    currentDateIndex = (currentDateIndex + 1) % dates.length;
  }

  // Display the current date in the bottom part of the rectangle
  fill(69, 63, 60); // Set the text color to the specified color
  textAlign(CENTER, CENTER); // Align the text to center horizontally and vertically
  textSize(16); // Set the text size
  text(dates[currentDateIndex], width / 2, height / 2 + 50); // Position the text in the lower portion
}


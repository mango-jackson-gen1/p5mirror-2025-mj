//Try to re-write bouncing ball from memory in just the horizontal dimension. See if you can re-derive the logic for yourself. 

//Challenge: Make the ball’s fill color bounce back and forth fading from white through gray to black and then back to white again. 

//Challenge: Make the fill color bouncing back and forth sync up with the ball bouncing back and forth so that both fill color and the x-position of the ball hit their respective boundaries at the same time. 

let xpos = 1;
let xspeed = 4;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(98, 139, 72); // Set background color

  // Map xpos to a color value between 0 (black) and 255 (white)
  let fillColor = map(xpos, 0, width, 0, 255);
  fill(fillColor); // Set the fill color for the ball
  noStroke(); // Remove the stroke outline

  // Draw the ball at xpos
  ellipse(xpos, height / 2, 50, 50); // Make the ball larger for visibility

  // Check if the ball hits the left or right edge of the canvas
  if (xpos > width || xpos < 0) {
    xspeed = xspeed * -1; // Reverse the direction
  }

  // Update xpos to move the ball
  xpos += xspeed;
}

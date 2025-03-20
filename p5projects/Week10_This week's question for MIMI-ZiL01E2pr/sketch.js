/* it looks like alpha value is very very slow when being manipulated as a variable? is that true



//Load a single sound file and play it.
//Play and pause it with a mousepress.


//todo: 1 an interaction to indicate it is now playing
*/

let puddle;
let parents;

function preload(){
  puddle = loadSound("Puddle.mp3");
  parents = loadSound("Parentstalking.mp3");
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  let centerX = width / 2;
  let centerY = height / 2;
  let innerDiameter = 50;
  let outerDiameter = innerDiameter * 2;

  // Set stroke weight
  strokeWeight(4);

  // Draw the original (inner) circle with thicker stroke and same color
  fill(100, 150, 255);      // Color of the inner circle
  stroke(100, 150, 255);     // Matching stroke color
  ellipse(centerX, centerY, innerDiameter, innerDiameter);
  
  // Draw the outer circle with thicker stroke and same color
  fill(255, 100, 150);       // Color of the outer circle
  stroke(255, 100, 150);     // Matching stroke color
  ellipse(centerX, centerY, outerDiameter, outerDiameter);
}

function mousePressed(){
  // Calculate the distance between the mouse position and the center of the circles
  let d = dist(mouseX, mouseY, width / 2, height / 2);
  
  // Check if the click is inside the inner circle
  if (d <= 25) {
    parents.play();
  }
  // Check if the click is inside the outer circle but outside the inner circle
  else if (d > 25 && d <= 50) {
    puddle.play();
  }
}


/* 1 for a trailing affect. set a alpha value for the background background(255, 0, 100, 0.1);


*/

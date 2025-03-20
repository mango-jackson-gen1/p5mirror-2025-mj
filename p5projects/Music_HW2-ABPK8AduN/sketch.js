////Load a single sound file and play it.
//Play and pause it with a mousepress.


//todo: 1 an interaction to indicate it is now playing


let puddle;
let aaron;
let parent;

function preload(){
  puddle = loadSound("water.mp3");
  aaron = loadSound("yamei.mp3");
  parent = loadSound("zhouyidi.mp3");

}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(215, 218, 229);
  
  let centerX = width / 2;
  let centerY = height / 2;
  let innerDiameter = 50;
  let outerDiameter = innerDiameter * 2;
  let thirdDiameter = innerDiameter * 3; // Diameter for the third circle

  // Set stroke weight
 // Draw the inner circle
  fill(100, 150, 255);      // Color of the inner circle
  stroke(100, 150, 255);     // Matching stroke color
  ellipse(centerX, centerY, innerDiameter, innerDiameter);
  
  // Draw the middle circle
  fill(255, 100, 150,100);       // Color of the outer circle
  stroke(255, 100, 150,100);     // Matching stroke color
  ellipse(centerX, centerY, outerDiameter, outerDiameter);

  // Draw the outer (third) circle
  fill(326, 19, 100, 80); // Color of the outer circle
  ellipse(centerX, centerY, thirdDiameter, thirdDiameter);
}

function mousePressed(){
  // Calculate the distance between the mouse position and the center of the circles
  let d = dist(mouseX, mouseY, width / 2, height / 2);
  
  // Check if the click is inside the inner circle
  if (d <= 25) {
    parent.play();
  }
  // Check if the click is inside the middle circle but outside the inner circle
  else if (d > 25 && d <= 50) {
    aaron.play();
  }
  // Check if the click is inside the outer circle but outside the middle circle
  else if (d > 50 && d <= 75) {
    puddle.play();
  }
}

/* 1 for a trailing affect. set a alpha value for the background background(255, 0, 100, 0.1);

it looks like alpha value is very very slow when being manipulated as a variable? is that true
*/


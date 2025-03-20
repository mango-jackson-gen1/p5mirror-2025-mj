let gestures = [];
let currentGesture = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(20);
  for (let i = 0; i < gestures.length; i+=1) {
    gestures[i].draw(); 
  }
  
  if (mouseIsPressed) {
    currentGesture.push({x: mouseX, y: mouseY});    
  }
}

function mouseReleased() {
  gestures.push(new Gesture(currentGesture));
  currentGesture = [];
}
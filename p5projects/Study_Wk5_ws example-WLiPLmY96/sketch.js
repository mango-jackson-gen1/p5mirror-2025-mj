//weave pattern
//Define a portable function that adds two numbers together. You should be able to copy and paste the function definition and only the function definition into a different sketch and use it without creating errors. 
// Pay attention to Jinnie's code, where lines are drawn from negative and positive side of the code 


let x, y;
let colorRange = ['#EAC53F', '#6EB9E7', '#46A4DE', '#208DD1', '#00619E'];

function setup() {
  createCanvas(400, 400);
  background(220);
  strokeWeight(5);
}

//add function definition
function add (a, b) {
  return(a+b);  
}

//draw lines
//add function is used
function drawLine(x, y, w, h) {
  line(x, y, add(x, w), add(y, h)); 
}

function draw() {
  //loop stairCase. give random x, y, w, h and greyscale color variables
  stroke(random(colorRange));
  x = random(0, width);
  y = random(0, height);
  w = random([-1, 0, 1])*width;
  if(w==0){
    h=random([-1,1])*height
  }else{h=0};
  
  drawLine(x, y, w, h);
}
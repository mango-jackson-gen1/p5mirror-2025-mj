//function setup() {
  //createCanvas(800, 400);
//}

//function draw() {
  //background(220);
    //top
  //line (200,100,600,100)
    //bottom
  //line(200,300,600,300)
    //left
  //line(200,100,200,300)
    //right
  //line(600,100,600,300)
//}

let a, b, c, d;
let speed = 1;

function setup() {
  createCanvas(500, 400);

  a = 0.25 * width;
  b = 0.25 * height;
  c = 0.75 * width;
  d = 0.75 * height;
}

function draw() {
  background(220);
  
  // Center of Rectangle
  let centerX = width / 2;
  let centerY = height / 2;
  
  
  if (centerX < mouseX) {
    a += speed;
    c += speed;
  }
  
  if (centerX > mouseX) {
    a -= speed;
    c -= speed;
  }
  
  if (centerY < mouseY) {
    b += speed;
    d += speed;
  }
  
  if (centerY > mouseY) {
    b -= speed;
    d -= speed;
  }
  

  line(a, b, c, b); 
  line(a, d, c, d); 
  line(a, b, a, d); 
  line(c, b, c, d); 
}
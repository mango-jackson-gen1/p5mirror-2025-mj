let x, y, w, h;
let left, topp, right, bottom;

function setup() {
  createCanvas(712, 400);
  // Defining the relationship of the rectangle's position and size relative to the canvas
  x = 0.37 * width;
  y = 0.54 * height;
  w = 0.23 * width;
  h = 0.72 * height;
}

function draw() {
  background(220);

  moveToMouse();
  update();
  display();
  
}

function moveToMouse() {
  x += (mouseX - x) / 10;
  y += (mouseY - y) / 10;
}

function update() {
  // Rel between 4 sides of the rect and its center and w,h
  left = x - w / 2;
  right = x + w / 2;
  topp = y - h / 2;
  bottom = y + h / 2;
}

function display() {
  line(left, topp, right, topp);
  line(right, topp, right, bottom);
  line(right, bottom, left, bottom);
  line(left, bottom, left, topp);
}

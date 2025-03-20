// Order and Chaos

let orderX;
let orderY;

let w = 40;
let h = 60;

function setup() {
  createCanvas(600, 400);
  noStroke();
  orderX = width / 10;
  orderY = height;
}

function draw() {
  background(255);

  // Order
  // moving rects
  fill(0);
  rect(orderX, orderY, w, h);
  rect(orderX * 2, orderY, w, h);
  rect(orderX * 3, orderY, w, h);
  
  // orderY = orderY - 1;
  console.log("orderY: " + orderY)
  
  // reset the y position of the rects
  if (orderY < 0) {
    orderY = height;
  } else {
    // three ways to write the same thing
    // orderY = orderY - 1;
    // orderY -= 1;
    orderY--;
  }
  
  // Chaos
  // right half background
  fill(0);
  rect(width/2, 0, width / 2, height);
  fill(255);
  let chaosX = random(width / 2, width);
  let chaosY = random(0, height);
  rect(chaosX, chaosY, w, h);
}

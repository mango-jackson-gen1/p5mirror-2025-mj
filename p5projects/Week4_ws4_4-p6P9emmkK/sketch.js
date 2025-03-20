//Challenge: Create a checkerboard grid of 100 cells.

function setup() {
  createCanvas(400, 400);
  cols = 10;
  rows = 10;
  colsHeight = width/cols; //40 per row
  rowsHeight = height/rows
}

function draw() {
  background(220);

  for (let i = 0; i < cols; i++){
    for (let j = 0; j < rows; j++){
    if((i+j) % 2 ==0){
      fill(255);// white
    }  else {
      fill(0);
    }
    x = i*colsHeight;
    y = j*rowsHeight;
    rect(x, y , colsHeight, rowsHeight);

    }
  }
}
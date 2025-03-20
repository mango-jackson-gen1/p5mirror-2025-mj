//Create a grid of 100 cells 
//that turn red when you hover over them. 

// Challenge: Rewrite your grid so that you can change the total width of the grid, the total height of the grid, the total number of columns and the total number of rows without having to change any of the code in the loops.

let totalWidth = 400; // Total width of the grid
let totalHeight = 400; // Total height of the grid
let cols = 10; // Number of columns
let rows = 10; // Number of rows
let cellWidth; // Width of each cell
let cellHeight; // Height of each cell

function setup() {
  createCanvas(totalWidth, totalHeight);
  
  // these values are static for the lifetime of the sketch
  cellWidth = totalWidth / cols; // Calculate cell width
  cellHeight = totalHeight / rows; // Calculate cell height

}

function draw() {
  background(220);
  for(let i=0; i<cols; i++){
    for (let j=0; j < rows; j++){
      let x = i * cellWidth; 
      let y = j * cellHeight
      
      if (mouseX > x &&
          mouseX < x+cellWidth &&
           mouseY > y &&
          mouseY < y+cellHeight
      ){
        fill("red");
      }else {
        fill(255);
      }
      rect(x, y, cellWidth, cellHeight);
    }
  }
}

//
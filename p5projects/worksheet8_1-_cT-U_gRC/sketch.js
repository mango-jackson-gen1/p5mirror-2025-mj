function setup() {
  createCanvas(400, 400);
  stroke(230, 57, 70);
  
  for(let i=0; i< width; i++){
    for (let j=0; j< height; j++){
      point(i, j);
    }
  }
}

function draw() {
}
let cols = 10
let rows = cols
let margin
let cellSize
let walkers = []
let stepSize = 0.1

function setup() {
  createCanvas(windowWidth, windowWidth);
  margin = width / 4
  cellSize = (width - 2 * margin) / cols
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      walkers.push(new Walker(i * cellSize, j * cellSize, cellSize))
    }
  }
}


class Walker {
  constructor(x, y, size) {
    this.x = x
    this.y = y
    this.startX = x
    this.startY = y
    this.size = size
  }

  update() {
  
    // unique p5 usage of random to pass in an array, so choose one of the three . with x and y , this creates 3x3 = 9 possibilities 
    let stepX = random([-stepSize, 0, stepSize])
    let stepY = random([-stepSize, 0, stepSize])
    
    this.x = constrain(this.x + stepX, this.startX - this.size, this.startX + this.size)
    this.y = constrain(this.y + stepY, this.startY - this.size, this.startY + this.size)


    fill('#fffff1')
    noStroke()
    // noFill()
    // stroke('#fffff')
    square(this.x, this.y, this.size/10)
    // line(this.x, this.y, this.prevx, this.prevy);
    
  }
  
}

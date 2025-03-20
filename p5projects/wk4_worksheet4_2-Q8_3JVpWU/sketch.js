//1 skip column 7 
//2 Make the left half turn blue, right half turn red.


function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);
  let w = width / 20;

  for (let i = 0; i < 20; i++) {
    if (i !== 6) {
      if (mouseX > i * w && mouseX < (i + 1) * w) {
        fill("red");
      } else {
        fill(255);
      }
    } else {
      fill(255);
    }

    rect(i * w, 0, w, height);
  }
}

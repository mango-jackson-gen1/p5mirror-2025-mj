//Make the left half turn blue, right half turn yellow.
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);
  let w = width / 20;

  for (let i = 0; i < 20; i++) {
    if (mouseX > i * w && mouseX < (i + 1) * w) {
      if (i < 10) {
        fill(126, 189, 195); // Blue when hovered over on the left half
      } else {
        fill(237, 218, 61); // Yellow when hovered over on the right half
      }
    } else {
      fill(255); // White when not hovered
    }

    rect(i * w, 0, w, height);
  }
}

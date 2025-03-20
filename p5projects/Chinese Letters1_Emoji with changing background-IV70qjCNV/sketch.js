let capture;
let pixelSize = 15; // size of pixel
let emojis = ["广","店","府","庭"]; // add emojis

function setup() {
  createCanvas(640, 480);
  capture = createCapture(VIDEO);
  capture.size(width / pixelSize, height / pixelSize);
  pixelDensity(5);
  noStroke();
  textAlign(CENTER, CENTER);
  colorMode(HSB, 360, 100, 100); // Set color mode to HSB
}

function draw() {
  let hueValue = (frameCount * 0.5) % 360; // Cycle hue over time
  background(hueValue, 80, 100); // Vibrant background with dynamic hue

  textSize(pixelSize);

  capture.loadPixels();
  for (let y = 0; y < capture.height; y += 1) {
    for (let x = 0; x < capture.width; x += 1) {
      let index = 4 * (x + y * capture.width);
      let r = capture.pixels[index];
      let g = capture.pixels[index + 1];
      let b = capture.pixels[index + 2];

      let bright = brightness(color(r, g, b));

      // Display emojis based on brightness thresholds
      if (bright > 90) {
        text(emojis[0], x * pixelSize, y * pixelSize);
      } else if (bright > 70) {
        text(emojis[1], x * pixelSize, y * pixelSize);
      } else if (bright > 30) {
        text(emojis[2], x * pixelSize, y * pixelSize);
      } else {
        text(emojis[3], x * pixelSize, y * pixelSize);
      }
    }
  }
}

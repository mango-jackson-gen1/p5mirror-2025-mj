let train1;
let scaleFactors = [];
let layerCount = 35;

function preload() {
  train1 = loadImage('train1.jpg'); // Load the image
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Populate scale factors for 35 layers, reducing each by 10%
  let scaleFactor = 1.0;
  for (let i = 0; i < layerCount; i++) {
    scaleFactors.push(scaleFactor);
    scaleFactor *= 0.9; // Reduce each layer by 10%
  }
}

function draw() {
  background(220);

  // Draw each layer, centered and scaled down
  for (let i = 0; i < layerCount; i++) {
    let scaleFactor = scaleFactors[i];
    let scaledWidth = train1.width * scaleFactor;
    let scaledHeight = train1.height * scaleFactor;
    let dx = (width - scaledWidth) / 2;
    let dy = (height - scaledHeight) / 2;

    // Draw the image at the calculated position and size
    image(train1, dx, dy, scaledWidth, scaledHeight);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


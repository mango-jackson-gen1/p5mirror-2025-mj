let time = 0;
let wavePeriod = 5000;
let currentColors = [];
let targetHue;
let center = {x: 0, y: 0};
let pixelSize = 10;
let pixelSlider;
let waveSlider;
let alphaSlider;
let bgImage;

function preload() {
  bgImage = loadImage('path/to/your/image.jpg');  // Load the image
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);  // Set alpha range to 100 for easier control
  
  pixelSlider = createSlider(2, 50, 10);
  pixelSlider.position(20, 20);
  pixelSlider.style('width', '200px');
  
  waveSlider = createSlider(500, 20000, 5000);
  waveSlider.position(20, 50);
  waveSlider.style('width', '200px');

  alphaSlider = createSlider(0, 100, 100);  // New alpha slider, 0 (transparent) to 100 (opaque)
  alphaSlider.position(20, 80);
  alphaSlider.style('width', '200px');
  
  center.x = width/2;
  center.y = height/2;
  
  targetHue = random(360);
  initializeColors();
  
  time = millis();
  draw();
  
  let pixelLabel = createDiv('Pixel Size');
  pixelLabel.position(230, 20);
  pixelLabel.style('color', 'white');
  
  let waveLabel = createDiv('Wave Period');
  waveLabel.position(230, 50);
  waveLabel.style('color', 'white');
  
  let alphaLabel = createDiv('Overlay Opacity');
  alphaLabel.position(230, 80);
  alphaLabel.style('color', 'white');
}

function initializeColors() {
  let oldColors = currentColors;
  currentColors = [];
  
  let cols = Math.ceil(width / pixelSize);
  let rows = Math.ceil(height / pixelSize);
  
  for (let i = 0; i < cols; i++) {
    currentColors[i] = [];
    for (let j = 0; j < rows; j++) {
      if (oldColors.length > 0) {
        let oldCol = Math.floor(i * oldColors.length / cols);
        let oldRow = Math.floor(j * (oldColors[0]?.length || 1) / rows);
        currentColors[i][j] = oldColors[oldCol]?.[oldRow] ?? targetHue;
      } else {
        currentColors[i][j] = 240;
      }
    }
  }
}

function draw() {
  if (frameCount % 2 !== 0) return;
  
  image(bgImage, 0, 0, width, height);  // Draw the background image
  
  let newPixelSize = pixelSlider.value();
  if (newPixelSize !== pixelSize) {
    pixelSize = newPixelSize;
    initializeColors();
  }
  
  wavePeriod = waveSlider.value();
  
  time = millis();
  let progress = (time % wavePeriod) / wavePeriod;
  let maxRadius = dist(0, 0, width, height);
  let currentRadius = progress * maxRadius;
  
  let alpha = alphaSlider.value();  // Get the current alpha value from the slider

  noStroke();
  
  let cols = Math.ceil(width / pixelSize);
  let rows = Math.ceil(height / pixelSize);
  
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * pixelSize;
      let y = j * pixelSize;
      
      let d = dist(
        x + pixelSize/2,
        y + pixelSize/2,
        center.x,
        center.y
      );
      
      let transitionWidth = 200;
      
      if (d < currentRadius) {
        let t = constrain(map(d, currentRadius - transitionWidth, currentRadius, 1, 0), 0, 1);
        currentColors[i][j] = lerp(currentColors[i][j], targetHue, 0.05 * t);
      }
      
      let baseBrightness = map(d, 0, maxRadius, 100, 70);
      fill(currentColors[i][j], 80, baseBrightness, alpha);  // Apply alpha for opacity control
      
      let w = min(pixelSize, width - x);
      let h = min(pixelSize, height - y);
      rect(x, y, w, h);
    }
  }
  
  if (progress < 0.01 && frameCount > 1) {
    targetHue = random(360);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  center.x = width/2;
  center.y = height/2;
  initializeColors();
}


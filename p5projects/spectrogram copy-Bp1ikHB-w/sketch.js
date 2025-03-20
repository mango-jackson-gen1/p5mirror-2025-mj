let mic;
let fft;

let currentX = 0;

function setup() {
  createCanvas(400, 400);
  mic = new p5.AudioIn();
  mic.start();
  // 512 is the number of bins!
  fft = new p5.FFT(0.8, 512);
  fft.setInput(mic);
}

function draw() {
  //background(0);
  noStroke();
  let bins = fft.analyze();
  
  // only the first 256 so we're looking mostly
  // at the more interesting bins at the lower
  // end of the frequency range
  for (let i = 0; i < 256; i++) {
    let ycoord = map(i, 0,
                     256, 0, height);
    fill(bins[i]);
    rect(currentX, ycoord, 5, 5);
  }
  currentX++;
  if (currentX > width) {
    currentX = 0;
  }
}
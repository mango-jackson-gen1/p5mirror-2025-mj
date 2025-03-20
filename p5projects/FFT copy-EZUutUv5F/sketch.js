let mic;
let fft;
let num = 200;

function setup() {
  createCanvas(1024, 400);
  mic = new p5.AudioIn();
  mic.start();

  fft = new p5.FFT();
  fft.setInput(mic);
}

function draw() {
  background(255);
  let level = mic.getLevel();

  let bins = fft.analyze();
  for (let b = 0; b < num; b++) {
    let bin = bins[b];
    let y = height - bin;
    line(b, height, b, y);

    rect((width / num) * b, height, width/num, -y);
  }

  let wave = fft.waveform();
  // console.log(wave);
}

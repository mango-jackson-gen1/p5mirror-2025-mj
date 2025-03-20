let pianoC2, pianoG2, pianoD3;

function preload() {
  soundFormats('mp3');
  pianoC2 = loadSound('https://tonejs.github.io/audio/salamander/C2.mp3');
  pianoG2 = loadSound('https://tonejs.github.io/audio/salamander/G2.mp3');
  pianoD3 = loadSound('https://tonejs.github.io/audio/salamander/D3.mp3');
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  text("Click to play piano notes", 20, 20);
}

function mousePressed() {
  pianoC2.play();
  setTimeout(() => pianoG2.play(), 1000);
  setTimeout(() => pianoD3.play(), 2000);
  return false; // Prevent default behavior
}
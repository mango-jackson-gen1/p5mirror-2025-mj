/*
 *  Load audio file and play/pause with click
 */

let melody;

function preload() {
  melody = loadSound('merry-go-round.mp3');
}

function setup() {
  createCanvas(400, 400);
  textAlign(CENTER);
  colorMode(HSB);
}

function draw() {
  background(255, 0, 100, 0.1);
  fill(frameCount%100, 100,100);
  if(melody.isPlaying()) {
    textSize(12);
    text('pause', mouseX, mouseY);
  }else {
    textSize(20);
    text('play', mouseX, mouseY);
  }
}

function mouseReleased() {
  if(melody.isPlaying()) {
    melody.pause();
  }else {
    melody.play();
  }
}
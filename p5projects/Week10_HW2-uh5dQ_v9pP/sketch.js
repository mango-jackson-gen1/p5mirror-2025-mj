/*
Week 10 HW Nov 13 - Wed
Load 10 sound files with a loop and an array.
Challenge: Press the mouse to play and pause each sound file in a progression. First pair of mousepresses play/pause 1st sound file, second pair of mousepresses play/pause 2nd sound file, etc. (Hint: You may want to use the sound file’s isPlaying() function.)

*/

let oscCount = 20;

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < oscCount; i++) {
    let wave = new p5.Oscillator();
    wave.freq(random(40, 4000));
    wave.amp(1/oscCount);
    wave.setType('sine');
    wave.start();
  }
}

function draw() {
  background(220);
}
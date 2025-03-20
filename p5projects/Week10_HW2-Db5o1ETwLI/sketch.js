let sounds = []; // Array to hold sound files
let soundIndex = 0; // Index of the current sound to play

function preload() {
  // Load the songs
  for (let i = 0; i < 5; i++) {
    sounds.push(loadSound("sounds/" + i + ".mp3")); 
  }
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  textAlign(CENTER, CENTER);
  textSize(20);
  text("Click to Play/Pause and Switch Sound", width / 2, height / 2);
}

function mousePressed() {
  if (sounds[soundIndex].isPlaying()) {
    sounds[soundIndex].pause();
    soundIndex = (soundIndex + 1) % sounds.length; // Move to the next sound
  } else {
    sounds[soundIndex].play();
  }
}

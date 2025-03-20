
// Draw your pattern
let w = 60;

// Change these lines to change your pattern. 
// 1 is ON; 0 is OFF
// for convenience, let's combine the following two patterns into one array 
// var snarePattern = [0, 1, 0, 1];
// var kickPattern = [1, 0, 1, 0]; 

var cells = [
  [0, 1, 0, 1], //cells[0] holds the snare pattern
  [1, 0, 1, 0] //cells[1] holds the kick pattern
];

// SOUNDS

// Create a Players object and load the "kick.mp3" and "snare.mp3" files
const kit = new Tone.Players({
  "kick": "samples/505/kick.mp3", 
  "snare": "samples/snare.mp3"
});

// Connect the player output to the computer's audio output
kit.toDestination();

/*
"1:2:3".split(":")    // Splits into ["1", "2", "3"]
// [0] = bar number
// [1] = beat number (what we want)
// [2] = sixteenth note number

// So [1] gives us just the beat number (0,1,2,3)
*/

// Create a loop: call playBeat every quarter note
Tone.Transport.scheduleRepeat(playBeat, "4n");

// Audio playback loop
function playBeat(time) {
  // Make sure the sound files have been completely loaded
  if (kit.loaded) {
    let beat = Tone.Transport.position.split(":")[1];

    console.log(beat);
    if (cells[0][beat] == 1) {
      kit.player("snare").start(time);
    }
    if (cells[1][beat] == 1) {
      kit.player("kick").start(time);
    }
  }
}

// GRAPHICS

function setup() {
  createCanvas(240, 120);
}

function draw() {
  background(255);
  let w = 60;

  fill(100);
  noStroke();
  for (var step = 0; step < 4; step++) { // we have 4 steps
    for (var track = 0; track < 2; track++) { //we have 4 tracks
      if (cells[track][step] == 1) {
        fill(100);
      }
      else{
        fill(255);
      } 
      rect(step * w, track * w, w, w);
      
    }
  }

  // Highlight current step
  fill(0, 200, 200, 50);
  let beat = Tone.Transport.position.split(":")[1];
  rect(beat * w, 0, w, w * 2);
}


function mousePressed(){
  // Determine which cell the mouse is on
  let i = floor(mouseX / w);
  let j = floor(mouseY / w);
  // Toggle cell on/off
  cells[j][i] = !cells[j][i];
}

// Once all audio files have been loaded, start the Tone playhead
Tone.loaded().then(function(){
 console.log("loaded");
  Tone.Transport.start();
}
)



// Draw your pattern
let w = 60;

// Change these lines to change your pattern. 
// 1 is ON; 0 is OFF
// for convenience, let's combine the following two patterns into one array 
// var snarePattern = [0, 1, 0, 1];
// var kickPattern = [1, 0, 1, 0]; 

let cells = [
  [0, 0, 0, 1], //cells[0] holds the snare pattern
  [1, 1, 1, 0] //cells[1] holds the kick pattern
];

// SOUNDS

// Create a Players object and load the "kick.mp3" and "snare.mp3" files
const kit = new Tone.Players({
  "kick": "samples/505/kick.mp3", 
  "snare": "samples/snare.mp3"
});

// Connect the player output to the computer's audio output
kit.toDestination();

// Create a loop: call playBeat every quarter note
Tone.Transport.scheduleRepeat(playBeat, "4n");

// Audio playback loop
function playBeat(time) {
  // Make sure the sound files have been completely loaded
  if (kit.loaded) {
    let beat = Tone.Transport.position.split(":")[1];

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
  createCanvas(240, 240);
}

function draw() {
  background(255);
  let w = 60;

  // Draw grid
  let nTracks = 2;
  let nSteps = 4;

  let d = width / nTracks; // diameter unit
  let a = TWO_PI / nSteps; // angle unit
  let c = 50; // color unit

  let prevAngle = 0;
  let angle;
  for (let step = 1; step <= nSteps; step++) { 
    for (let track = nTracks; track > 0; track--) { 
        let diameter = d * track;
        angle = a * step;
        let f = track*c;

        stroke(0);
        if(cells[track-1][step-1] == 1){
          fill(f);
        }
        else{
          fill(255);
        }
        arc(width/2, height/2, diameter, diameter, prevAngle, angle, PIE); 
      
    }
    prevAngle = angle;
  }

  // Highlight current step
  fill(0, 200, 200, 50);
  let beat = int(Tone.Transport.position.split(":")[1]);
  arc(width/2, height/2, width, width, a*beat, a*(beat+1));

}



// Once all audio files have been loaded, start the Tone playhead
Tone.loaded().then(function(){
 console.log("loaded");
  Tone.Transport.start();
}
)


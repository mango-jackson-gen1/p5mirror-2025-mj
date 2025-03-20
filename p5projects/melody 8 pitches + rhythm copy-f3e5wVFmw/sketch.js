// Given a tempo, time signature, and scale, play a random melody
// made up of consecutive notes of different durations (half, quarter and eighth notes) 
// Exercise: add rests
/*The code randomly selects notes and durations.
Adjusts volume to emphasize certain beats.
Creates an endlessly looping melody controlled by a simple play/pause button.
*/

let synth = new Tone.Synth();
synth.toDestination();
// 0 is C-1: five octaves below C4 or Middle C
let root = 0;
let major = [0, 2, 4, 5, 7, 9, 11];
let scale = major;
let octave = 4;

let durations = ["8n", "4n", "2n"];

// Set the tempo to 120 beats per minute
Tone.Transport.bpm.value = 120;

// Set the time signature to 4/4. 
Tone.Transport.timeSignature = [4, 4];

// Create a loop: call playBeat. start immediately
Tone.Transport.scheduleOnce(playNote, 0);

function playNote(time) {  
  let pos = floor(random(0, scale.length));
  let pitch = root + scale[pos] + 12 * octave;
  
  let pos2 = floor(random(0, durations.length));
  let duration = durations[pos2];
  
  // Place accents: Play notes on the first beat louder than the rest.
  // Try changing the time signature above and listen.
  
  // Tone's position gives us a string: 
  // bar:beat:sixteenth
  // Slice the string by ":" and get the number in the second position (the beat)
  let beat = Tone.Transport.position.split(":")[1];

  if (beat == 0) {
  synth.volume.rampTo(1, 0.005); // loudest note (beat 1)
} else if (beat == 2){
  synth.volume.rampTo(0, 0.005); // medium loudness (beat 3)
} else{
  synth.volume.rampTo(-2, 0.005); // quieter (beats 2 & 4)
}
  
  let noteObject = Tone.Frequency(pitch, "midi");
  synth.triggerAttackRelease(noteObject, duration);
  
  // call playBeat again once the current note is done playing.
  Tone.Transport.scheduleOnce(playNote, "+" + duration);
}

// Interface: p5 functions
function setup() {
  btn = createButton("play");
  btn.mousePressed(togglePlay);
  btn.position(0, 0);
}

function togglePlay() {
  if (Tone.Transport.state == "started") {
    Tone.Transport.pause();
    btn.html("play");
  } else {
    Tone.Transport.start();
    btn.html("pause");
  }
}
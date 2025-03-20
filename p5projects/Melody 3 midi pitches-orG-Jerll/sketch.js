//// MIDI arithmetics ////
// Press keys 1 - 8 on the keyboard to play a C scale
// Click the mouse to switch between C major and C minor
// Press z to go down an octave; x to go up an octave

let synth = new Tone.Synth();
synth.toDestination();

// Major scale pattern, in semitones: [0, 2, 2, 1, 2, 2, 2, 1]  
// Starting with A4 (69) as the root, for example, we can derive an A major scale like so: 
// Amajor = [69+0, 69+2, 69+2+2, 69+2+2+1, 69+2+2+1+2, 69+2+2+1+2+2, 69+2+2+1+2+2+2, 69+2+2+1+2+2+2+1];
  
// Given the above it can be more practical to describe the pattern of a scale in terms of the distance of each note to the root, in semitones:
let major = [0, 2, 4, 5, 7, 9, 11, 12];
let minor = [0, 2, 3, 5, 7, 8, 10, 12];
let scale = minor; // try other modes (see the comments at the bottom of this sketch)

let root = 0; // lowest C in MIDI  
let octave = 3;  

function setup() {
  createCanvas(620, 200);
}

// Given a root note, an octave, a scale type, and a scale degree (a position in the scale array), 
// calculate the notes' MIDI number
function keyPressed(){
  // Press Z to move an octave down; X to move an octave up. 
  if(key == "z" & octave > 0){
    octave = octave - 1;
  }
  else if(key == "x" & octave < 8){
    octave = octave + 1;
  }
  // If the key pressed is a number
  else if(key > 0){
    let pos = parseInt(key) % 9 - 1;
  // in case the scale has less than 8 notes
    pos = pos % scale.length;

  // An octave has 12 semitones. To transpose our scale up or down, we can add or subtract 12 to its root. 
  // A3 = 69
  // A4 = 69 + 12. 
  // A2 = 69 - 12. 
    let pitch = root + scale[pos] + octave * 12;
    let pitchObject = Tone.Frequency(pitch, "midi");   
    synth.triggerAttack(pitchObject);
  } 
}

function keyReleased(){
  synth.triggerRelease();
}

function mousePressed(){
  if(scale == major){
    scale = minor;
  }
  else{
    scale = major;
  }
}

// Suggested exercise: 
// Explore other scales and modes: 
// https://en.wikipedia.org/wiki/List_of_musical_scales_and_modes
// and: https://en.wikipedia.org/wiki/Mode_(music)

// Ionian: W–W–H–W–W–W–H (same as major)
// Dorian: W–H–W–W–W–H–W
// Phrygian: H–W–W–W–H–W–W
// Lydian: W–W–W–H–W–W–H
// Mixolydian: W–W–H–W–W–H–W
// Aeolian: W–H–W–W–H–W–W(same as minor)
// Locrian: H–W–W–H–W–W–W

// Play them at random. can you tell any difference in mood? 
// Exercise: make sure your melody starts and ends in the root, and that the root is played more often than other notes. Then, try different modes again. Do you hear any difference now? 
// Press keys 1 through 8 to jump around the scale a certain number of steps (degrees), in a random direction (up or down)

// To get a sense of the size of each step/leap, try pressing 1 several times, then 2 several times, then 3, and so on. Then, start alternating them.

let synth = new Tone.Synth();
synth.toDestination();

// 0 is C-1: five octaves below C4 or Middle C
let root = 0;
let major = [0, 2, 4, 5, 7, 9, 11];
let minor = [0, 2, 3, 5, 7, 8, 10, 12];
let scale = major;
let pos = 0;
let octave = 5;

function setup() {
  createCanvas(620, 200);
  pos = scale.length*octave;  
}

function keyPressed() {
  // The key determines how far we are jumping, in scale degrees:
  let interval = parseInt(key) % scale.length;
  
  // Pick a random direction (-1 is down; 1 is up)
  let direction;
  if (random() > 0.5) {
    direction = 1;
  } else {
    direction = -1;
  } 
  
  pos = pos + interval*direction; 
  
  if (pos < 0) pos = 0;  
  
  let scaleDegree = pos % scale.length;
  console.log(scaleDegree);
  octave = floor(pos / scale.length);   
   
  let pitch = root + scale[scaleDegree] + 12 * octave;
  let noteObject = Tone.Frequency(pitch, "midi");
  synth.triggerAttackRelease(noteObject, 0.1);

}
// Contour
// Press the UP and DOWN keys to move up and down the scale by a random number of steps (degrees).

let synth = new Tone.Synth();
synth.toDestination();
// 0 is C-1: five octaves below C4 or Middle C
let root = 0;
let major = [0, 2, 4, 5, 7, 9, 11];
let scale = major;
let pos = 0;
let octave = 4;


function setup() {
  createCanvas(620, 200);
  pos = scale.length*octave; 
}

function keyPressed() {
  // Key determines direction of motion
  if(keyCode == DOWN_ARROW){
    direction = -1;
  }
  else if(keyCode == UP_ARROW){
    direction = 1;
  }
  // size of leap (in scale steps or degrees) is random
  let interval = round(random(0, scale.length));  
  
  pos = pos + interval*direction;    
  if (pos < 0) pos = 0;  
  let scaleDegree = pos % scale.length;
  octave = floor(pos / scale.length);   
   
  let pitch = root + scale[scaleDegree] + 12 * octave;
  let noteObject = Tone.Frequency(pitch, "midi");
  synth.triggerAttackRelease(noteObject, 0.1);
  console.log(pitch);

}
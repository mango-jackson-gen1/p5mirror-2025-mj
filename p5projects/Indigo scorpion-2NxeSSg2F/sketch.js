let synth = new Tone.Synth();
synth.toDestination();

let scale = [];
let f = 100;

function setup() {
  createCanvas(620, 200);

  // Define pentatonic scale clearly with ratios:
  scale[0] = f;             // Do = 100 Hz
  scale[3] = f * 3 / 2;     // So = 150 Hz
  scale[5] = f * 2;         // higher Do = 200 Hz
  scale[2] = scale[5] * 2 / 3; // Mi ≈ 133.3 Hz
  scale[1] = scale[3] * 3 / 4; // Re = 112.5 Hz

  console.log("Scale frequencies:", scale);
}

function keyPressed(){
  let pos = parseInt(key) - 1; // keys 1-6
  if (pos >= 0 && pos < scale.length) {
    let pitch = scale[pos];  
    synth.triggerAttack(pitch);
    console.log("Playing pitch:", pitch);
  }
}

function keyReleased(){
  synth.triggerRelease();
}

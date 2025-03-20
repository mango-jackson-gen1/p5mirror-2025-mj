// Click on the canvas to create a sequence of random notes
// Uncomment below to play each example

let synth = new Tone.Synth();
synth.toDestination();

function setup(){
  
}
function mousePressed() {
  //0. play 440 Hz for 0.1 seconds
  synth.triggerAttack(440);

  // //1. play a random frequency
  // let frequency = random(100, 1000);
  // synth.triggerAttack(frequency);

  //2. play a random frequency within an octave
  // let frequency = random(440, 880);
  // synth.triggerAttack(frequency);

  //3. play a random frequency within an equal-tempered semitone
  //let frequency = random(329.63, 349.23);
  //synth.triggerAttack(frequency);

  //4. play a random frequency within a 5-note scale that I made up
  // let myScale = [200.32, 350.55, 480, 670, 800];
  // let pos = int(random(0, myScale.length));
  // let frequency = myScale[pos];
  // synth.triggerAttack(frequency);

  //5. play frequencies from a pentatonic scale
  let pentatonic = [200, 225, 266.6666666666667, 300, 337.5, 400];
  let pos = int(random(0, pentatonic.length));
  let frequency = pentatonic[pos];
  synth.triggerAttack(frequency);
 
}

function mouseReleased(){
  synth.triggerRelease();
}

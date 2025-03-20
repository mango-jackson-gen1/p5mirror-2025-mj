/* Interactive sketch 
1 make the numbers in sine wave randomly generated 


*/


// Osc let you deal with multiple osc in an array
// play each 



let osc = new Tone.Oscillator(261.63, "sine");
osc.volume.value = -12;
// osc.toDestination();

let ampEnv1 = Tone.AmplitudeEnvelope({
  "attack": 0.01,
  "decay": 0.6,
  "sustain": 0.1,
  "release":0.8
});
osc1.connect(ampEnv1);
ampEnv1.toDestination();
osc1.start();


setInterval(randomPartials, 1000);
function randomPartials(){
  let partials = [];
  for(let i = 0; i<8; i++){
    partials[i] = random();
  }
  console.log(partials);
  osc.partials = partials;
}


let slider;
function setup() {
  slider = createSlider(-60, 0, -12);
  slider.input(updateVolume);
}

function updateVolume(){
  osc.volume.rampTo(this.value());
}

function draw() {
  background(220);
  drawFFT(0, height/2, width/2, )
}

function keyPressed(){
  // osc.start();

  ampEnv1.triggerAttack();
}

function keyReleased(){
  ampEnv1.triggerRelease();
}
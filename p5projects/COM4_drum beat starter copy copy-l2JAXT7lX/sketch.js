//1 start the track 2 times. schedule it + attach it to the transport 
/*

*/

const kit = new Tone.Players({
  "kick": "samples/505/kick.mp3", 
  "snare": "samples/505/snare.mp3"
});
kit.toDestination();

let bpm = 120; 
let interval = 60/bpm; 
//This converts beats per minute into seconds per beat.

let measure; 
let beat;
let count = -1;
let lounder = 0;
let softer = -20;


let beatsPerMeasure = 4;
const repeatEvent = new Tone.Loop(playDrum,interval);
// or 1 sec
repeatEvent.start(0);
//timeline in tone is Transport

function playDrum(){
  count++;
  beat = count %4;
  console.log(count, beat)
  kit.player("kick").start();

  
  if(beat==3){
    kit.player('kick').volume.rampTo(louder);
  }else{
   kit.player('kick').volume.rampTo(softer);
  }
  console.log(count, measure, beat);
}

function keyPressed(){
  kit.player("kick").start();
}

function setup(){
  createCanvas(200, 200); 
  background(0);
}

function draw(){
  
}

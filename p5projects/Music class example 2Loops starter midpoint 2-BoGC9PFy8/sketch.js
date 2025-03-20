let loaded = false;
const bass = new Tone.Player({
          url: "loops/Bass0.mp3",
          loop: true
        });
bass.toDestination();

const chords = new Tone.Player({
          url: "loops/Chords0.mp3",
          loop: true
        });
chords.toDestination();

const melody = new Tone.Player({
          url: "loops/Melody0.mp3",
          loop: true
        });
melody.toDestination();

const drums = new Tone.Player({
          url: "loops/Drums0.mp3",
          loop: true
        });
drums.toDestination();

function setup() {  
  noCanvas();
  
}

function draw() {
  // not drawing anything for now
  
}

function keyTyped(){
  if(loaded){
    // let's get a more precise measurement of the current time
    const now = Tone.now();
    bass.start(now); 

    // get the duration of the bass loop
    let d = bass._buffer.duration;

    // stagger the triggering of the other loops, 
    // relative to the start and duration of the bass
    chords.start(now + d/2); 
    drums.start(now + d);
    melody.start(now + d*3/2);
  }
}

Tone.loaded().then(function(){  
  loaded = true;
});


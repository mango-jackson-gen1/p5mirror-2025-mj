// Second step: with sync + exclusive loop per track
let trackNames = ["Drums", "Bass", "Chords", "Melody"];
let displayNames = ["MyName", "Bass", "Chords", "Melody"];
let loops = [];
let n = 2; //number of alternative loops per track

let startBtn;

function setup() {  
  noCanvas();  
  loadLoops();
}

function draw() {
  // not drawing anything for now
}

function loadLoops() {  
  Tone.Transport.bpm.value = 122;
  for(let i = 0; i < trackNames.length; i++){    
    loops[i] = [];
    // load n loop alternatives per track
    for(let j = 0; j < n; j++){
      let name = trackNames[i] + " " + j;
      loops[i][j] = new Loop("loops/" + trackNames[i] + j + ".mp3", i, j, name);
    }
    // load loop siblings (each needs to access the loops from the same track, 
    // to stop them when it's about to play - 
    // we want only one loop from each track to be playing at any given time.
    for(let j = 0; j < n; j++){
      for(let k = 0; k < n; k++){
        if(j != k){
          loops[i][j].siblings.push(loops[i][k])
        }
      }
    }
  }
}

Tone.loaded().then(function(){  
  console.log('loaded');
});



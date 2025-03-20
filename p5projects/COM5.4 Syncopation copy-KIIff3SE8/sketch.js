// Create a Players object and load the "kick.mp3" and "snare.mp3" files
let kit = new Tone.Players({
  "kick": "samples/505/kick.mp3",
  "snare": "samples/505/snare.mp3"
});

// Connect the player output to the computer's audio output
kit.toDestination();

// Set the tempo to 120 beats per minute
Tone.Transport.bpm.value = 120;

// Set the time signature to 4/4. 
Tone.Transport.timeSignature = [4, 4];

// Create a loop: call playBeat every quarter note
Tone.Transport.scheduleRepeat(playDrum, "4n");

function playDrum(time) {
  // Tone's position gives us a string: 
  // bar:beat:sixteenth
  // Slice the string by ":" and get the number in the second position (the beat)
  let beat = Tone.Transport.position.split(":")[1];
  console.log(beat);
  
  // Play the first beat louder than the rest.
  // Try changing the time signature above and listen.
  if (beat == 0) {
    // Push back
    kit.player("kick").start(time + Tone.Time("16n"));
    
    // Pull forward
    // kit.player("kick").start(time - Tone.Time("16n"));
    
  } else {
    kit.player("snare").start(time);
  }
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
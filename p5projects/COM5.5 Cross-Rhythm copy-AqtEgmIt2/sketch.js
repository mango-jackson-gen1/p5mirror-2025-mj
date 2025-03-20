const kit = new Tone.Players({
  "kick": "samples/505/kick.mp3", 
  "snare": "samples/snare.mp3"
});
kit.toDestination();

//  - Rhythm1: Kick drum plays every 1/3 second
//  - Rhythm2: Snare drum plays every 1/2 second
Tone.Transport.scheduleRepeat(playRhythm1, 1/3 );
Tone.Transport.scheduleRepeat(playRhythm2, 1/2);

// Exercise: add accents to each loop
/*
创建强拍和弱拍的模式
重音-轻音-轻音，重音-轻音-轻音...
就像数拍子："一二三，一二三"
类似于华尔兹的三拍子节奏 (3/4 拍子)

function playRhythm1(time){
  // Accent every 3rd kick drum hit
  if(kickCount % 3 === 0) {
    kit.player("kick").volume.value = 0;  // Normal volume for accent
  } else {
    kit.player("kick").volume.value = -6; // Quieter for other hits
  }
  
  kit.player("kick").start(time);
  kickCount++;
}

function playRhythm2(time){
  // Accent every 2nd snare hit
  if(snareCount % 2 === 0) {
    kit.player("snare").volume.value = 0;  // Normal volume for accent
  } else {
    kit.player("snare").volume.value = -8; // Even quieter for other hits
  }
  
  kit.player("snare").start(time);
  snareCount++;
}


*/

function playRhythm1(time){
  kit.player("kick").start(time);
}

function playRhythm2(time){
  kit.player("snare").start(time);
}

Tone.loaded().then(function(){
 console.log("loaded");
  Tone.Transport.start();
}
)

const sound = new SimplePlayer("sounds/congas.m4a");
sound.toDestination();
sound.loop = true;
let meter = new Tone.Meter();

/*meter.normalRange = true;
By default, audio values in Tone.js often range from -1 to 1. Setting normalRange to true changes this to a 0 to 1 range, which is easier to work with for visualization. This means 0 represents silence and 1 represents maximum volume.*/

meter.normalRange = true;
meter.channels = 1;
sound.connect(meter);

let loaded = false;

function setup(){
  createCanvas(100,100);
}

function draw(){
  background(220);
  if(loaded){
    if(sound.state == "started"){
      console.log(meter.getValue()*100);
      ellipse(width/2, height/2, meter.getValue()*50);
    }    
  }
  else{
    text("loading...", 20, 20);
  }
}

function mouseClicked(){
  if(loaded){
    sound.start();
  }
}

Tone.loaded().then(function(){
  loaded = true;
});

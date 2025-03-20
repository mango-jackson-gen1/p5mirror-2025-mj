const sound = new SimplePlayer("sounds/Ambiente_3.mp3");
let analyzer = new Tone.Waveform(128);
sound.toDestination();
sound.connect(analyzer);

let loaded = false;

function setup(){
  createCanvas(600,600);
}

function draw(){
  if(loaded){
  background(0);

  let waveform = analyzer.getValue();

  fill(255);
  noStroke();
  beginShape();
  vertex(0, height/2);
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, 0, width+10);
    let y = map(waveform[i], -1, 1, height, 0);
    vertex(x, y);
  }
  vertex(width, height);
  vertex(0, height);
  endShape();
  }
  else{
    background(220);
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

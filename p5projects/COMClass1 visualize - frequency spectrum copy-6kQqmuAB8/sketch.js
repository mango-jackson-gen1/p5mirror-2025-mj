const sound = new SimplePlayer("sounds/blip.wav");
sound.toDestination();
let analyzer = new Tone.FFT(512);
sound.connect(analyzer);

let loaded = false;

function setup(){
  createCanvas(100,100);
}

function draw(){
  if(loaded){
    background(255);
    let frequencyData = analyzer.getValue();

    noStroke();
    fill(0);
    beginShape();
    vertex(0, height);
    for (let i = 0; i < frequencyData.length; i++) {
      let x = map(log(i), 0, log(frequencyData.length), 0, width);
      let y = map(frequencyData[i], -127, 0, height, 0);
      vertex(x, y);
    }
    vertex(width, height);
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

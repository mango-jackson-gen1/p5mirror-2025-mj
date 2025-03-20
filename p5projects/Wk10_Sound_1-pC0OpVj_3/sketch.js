let mic;
let fft; // a formula to sample sound 


function setup() {
  createCanvas(1024, 400);
  mic = new p5.AudioIn();
  mic.start()
  fft = new p5.FFT();
  fft.setInput(mic);
}

function draw() {
  background(225);
//   let level = mic.getLevel()*100;
//   // console.log(level);
//   if(level >0.1){
//     background(random(255));}
//   ellipse(width/2, height/2, level * 100, level * 100);
  
// many 1024 containers, so one pixel slitch correspond to this 
  let bins = fft.analyze(); 
  for (let b=0; b< bins.length; b++){
    let bin = bins[b];
    // line(b,0, b, bin);
    line(b,height-bin, b, height);
    
    //fft deviding up sound to frequency, bund them together, and measure how much of that is in the sound 
    
   let wave = fft.waveform();
   // console.log(wave);
   beginShape();
    for (let w = 0; w< wave.length; w++){
      let y = wave[w]*200 + height/2;
      vertex(w,y);
    }
    endShape();
  }
  // console.log(stuff);
}
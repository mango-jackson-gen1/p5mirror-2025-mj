class Track{
  constructor(i, name, url){
    this.i = i;
    this.x = 0;
    this.w = width;
    this.y = this.i*40;
    this.h = height/10;
    this.player = new Tone.Player(url);
    this.player.toDestination();
    this.wave = new Tone.Waveform(512);
    this.player.connect(this.wave);
    console.log("loading...");
    
    this.color = color(random(0, 360), 100, 100);
    
  }
  setVolume(){
    this.player.volume.rampTo(this.slider.value());
  }
  draw(){
    let waveform = this.wave.getValue();
    
    // draw waveform
    strokeWeight(2);
    noFill();
    stroke(0);
    beginShape();
    for (let i = 0; i < waveform.length; i++) {
      let x = map(i, 0, waveform.length, 0, width);
      let y = this.i*40 + map(waveform[i], -1, 1, this.h, 0);
      vertex(x, y);
    }
    endShape();
    
    if(this.player.state == "stopped"){
      noStroke();
      fill(300, 100, 100, 0.5);
      rect(this.x, this.y, this.w, this.h);
    }

    
  }
  
  mousePressed(){
    if(0 < mouseX && mouseX < width &&
      this.y < mouseY && mouseY < this.y+this.h){
      this.toggle();
    }
  }
  
  toggle(){
    if(this.player.state == "started"){
      this.player.stop();
    } 
    else if(this.player.state == "stopped"){
      this.player.start();
    }
  }
}
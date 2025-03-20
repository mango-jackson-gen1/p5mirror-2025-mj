let colorOptions = ["#FE5D26", "#540D6E", "#E01A4F", "#F9C22E", "#53B3CB"];
let noteOptions = [48, 55, 60, 36, 43, 52];


class Gesture {
  constructor(positions) {
    this.positions = positions;
    this.index = 0;
    this.color = color(colorOptions[int(random(0, colorOptions.length))]);
    this.note = noteOptions[int(random(0, noteOptions.length))];
    
    // all of this dumb stuff is to set up the synth
    this.osc = new p5.TriOsc();
    this.env = new p5.Envelope();
    this.duration = positions.length / 30; // if the frame count is 60
    this.env.setADSR(0.5, 0.5, 0.5, this.duration-1);
    this.env.setRange(1,0);
    this.osc.freq(midiToFreq(this.note));
    this.osc.start();
  }
  
  draw() {
    noStroke();
    strokeCap(SQUARE);
    let radius = map(this.index, 0, this.positions.length, 5, 50);
    for (let i = 0; i < this.index - 1; i += 1) {
      let x = this.positions[i].x;
      let y = this.positions[i].y;
      let xn = this.positions[i+1].x;
      let yn = this.positions[i+1].y;
      // fill(this.color);
      // ellipse(x, y, radius);
      stroke(this.color);
      strokeWeight(radius + random(-5, 5));
      line(x, y, xn, yn);
    }
    this.update();
  }
  
  update() {
    if (this.index === 0) {
      this.env.play(this.osc, 0, 0.05);
    }
    if (frameCount % 2 === 0) {
      this.index = (this.index + 1) % this.positions.length;
      let newAlpha = map(this.index, 0, this.positions.length, 255, 10);
      this.color.setAlpha(newAlpha);
    }
  }
}
class Loop {
  constructor(url, i, j, name) {
    this.player = new Tone.Player({
      url: url,
      loop: true
    });
    this.player.toDestination();
    this.quantize = "@2m"
    this.siblings = []; // loops from the same track

    this.button = createButton(name);
    this.button.mousePressed(this.toggle.bind(this));
    this.button.style('width', '100px');
    this.button.style('height', '60px');
    this.button.position(j * 100, i * 60);
    this.button.style('background-color', 'white');
  }

  toggle() {
    if(Tone.Transport.state != "started"){
      Tone.start();
      Tone.Transport.start();
    }
    // if the loop is playing, mark it to stop at the next measure
    if (this.player.state == "started") {
      this.scheduleStop();
    }
    // if the loop is not playing, mark it to start at the next measure
    else {
      this.scheduleStart();
    }
  }

  start() {
    this.button.style('background-color', 'black');
    this.button.style('color', 'white');
    this.state = this.player.state;
  }
  
  transition(){
    this.button.style('background-color', 'orange');
    this.button.style('color', 'black');
  }

  stop() {
    this.button.style('background-color', 'white');
    this.button.style('color', 'black');
    this.state = this.player.state;
  }

  scheduleStart() {
    this.player.start(this.quantize);
    
    // stop any siblings that are currently playing: 
    for (const sibling of this.siblings) {
      if (sibling.player.state == 'started') {
        sibling.scheduleStop();
      }
    }
    
    // visuals
    //immediately: call transition function (sets orange state)
    this.transition();
    
    //at the next this.quantize line: call start function (sets the black state)
    Tone.Draw.schedule(() => { this.start() }, this.quantize);
  }

  scheduleStop() {
    this.player.stop(this.quantize);
    Tone.Draw.schedule(this.stop.bind(this), this.quantize);
    
    this.button.style('background-color', 'orange');
    this.button.style('color', 'black');
  }

}
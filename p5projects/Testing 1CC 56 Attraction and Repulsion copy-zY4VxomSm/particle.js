// Daniel Shiffman
// Attraction / Repulsion
// https://thecodingtrain.com/challenges/56-attraction-and-repulsion-forces

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.prev = createVector(x, y);
    this.vel = createVector(); //p5.Vector.random2D();
    //this.vel = p5.Vector.random2D();
    //this.vel.setMag(random(2, 5));
    this.acc = createVector();
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(5);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  show() {
    stroke(255, 255);
    strokeWeight(4);
    line(this.pos.x, this.pos.y, this.prev.x, this.prev.y);

    this.prev.x = this.pos.x;
    this.prev.y = this.pos.y;
  }

  attracted(target) {
    // var dir = target - this.pos
    let force = p5.Vector.sub(target, this.pos);
    let d = force.mag();
    d = constrain(d, 1, 25);
    let G = 50;
    let strength = G / (d * d);
    force.setMag(strength);
    if (d < 20) {
      force.mult(-10);
    }
    this.acc.add(force);
  }
}

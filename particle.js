class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 2;
    this.prevPos = this.pos.copy();
  }

  update = function () {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  };

  applyForce = function (force) {
    this.acc.add(force);
  };

  show = function () {
    stroke(0, 3);
    strokeWeight(1);
    // line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    point(this.pos.x, this.pos.y);
    this.updatePrev();
  };

  updatePrev = function () {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  };

  edges = function () {
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrev();
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.updatePrev();
    }
  };

  follow = function (vectors) {
    let x = floor(this.pos.x / scl);
    let y = floor(this.pos.y / scl);
    const index = x + y * cols;
    let force = vectors[index];
    this.applyForce(force);
  };
}

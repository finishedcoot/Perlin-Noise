const inc = 0.01;
const scl = 10;
let zOff = 0;
let cols, rows;
let particles = [];

let flowField;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  cols = floor(width / scl);
  rows = floor(height / scl);

  flowField = new Array(cols * rows);

  for (let i = 0; i < 10000; i++) {
    particles[i] = new Particle();
  }
  //pixelDensity(1);
  background(255);
}

function draw() {
  let yOff = 0;
  for (let y = 0; y < rows; y++) {
    let xOff = 0;
    for (let x = 0; x < cols; x++) {
      const i = x + y * cols;
      const angle = noise(xOff, yOff, zOff) * TWO_PI * 3;
      // rect(x * scl, y * scl, scl, scl);
      const v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowField[i] = v;
      xOff += 0.1;
      stroke(0, 100);
      // strokeWeight(1);
      // push();
      // translate(x * scl, y * scl);
      // rotate(v.heading());
      // line(0, 0, scl, 0);
      // pop();
    }
    zOff += 0.0003;
    yOff += 0.1;
  }

  for (let i = 0; i < particles.length; i++) {
    particles[i].follow(flowField);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }

  // 2d
  // loadPixels();
  // let yOff1 = 0;
  // for (let y = 0; y < height; y++) {
  //   let xOff1 = 0;
  //   for (let x = 0; x < width; x++) {
  //     let i = (x + y * width) * 4;
  //     let r = noise(xOff1, yOff1) * 255;
  //     pixels[i] = r;
  //     pixels[i + 1] = r;
  //     pixels[i + 2] = r;
  //     pixels[i + 3] = 255;
  //     xOff1 += inc;
  //   }
  //   yOff1 += inc;
  // }
  // updatePixels();

  //1d
  // let xOff1 = start;
  // stroke(255);
  // noFill();
  // beginShape();
  // for (let x = 0; x < width; x++) {
  //   stroke(255);
  //   let y = noise(xOff1) * height;
  //   vertex(x, y);
  //   xOff1 += inc;
  // }
  // endShape();
  // start += inc;

  // fill(0);
  // let x = map(noise(xOff1), 0, 1, 0, width);
  // let y = map(noise(xOff2), 0, 1, 0, width);
  // xOff1 += 0.01;
  // xOff2 += 0.01;

  // ellipse(x, y, 24, 24);
}

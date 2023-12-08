let particles = []

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  initRandomParticles(10);
}

function windowResized() {
   resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  for (p of particles){
    p.draw();
  }
}

function update(){
  for (let i = 0; i < particles.length - 1; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      particles[i].update(particles[j]);
    }
  }
}

// non-p5js stuff

function initRandomParticles(count){
  particles = []
  for (let i=0; i<=count;i++){
    particles.push(new Particle())
  }
}

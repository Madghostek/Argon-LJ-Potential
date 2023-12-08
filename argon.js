let particles = []

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  initRandomParticles(20, 5);
  //initTest()
}

function windowResized() {
   resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  update()
  for (p of particles){
    p.draw();
  }
}

function update(){
  for (p of particles){
    p.update()
  }
  for (let i = 0; i < particles.length - 1; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      particles[i].interact(particles[j]);
    }
  }
}

// non-p5js stuff

function initRandomParticles(count, temperature){
  for (let i=0; i<count;i++){
    particles.push(new Particle(temperature))
  }
}

function initTest()
{
  particles = [new Particle(), new Particle()]
  particles[0].pos = createVector(100,100)
  particles[1].pos = createVector(500,100)
  
  particles[0].vel = createVector(2,0)
  particles[1].vel = createVector(0,0)
}

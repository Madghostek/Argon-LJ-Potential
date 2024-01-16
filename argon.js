let particles = []

precision = 2
step = 0.01

function setup() {
  let canvas = createCanvas(3*windowWidth/4, windowHeight);
  canvas.parent("container");
  frameRate(60)
  initRandomParticles(100, 25);
  //initGrid(5,5,0,0)
  //initTestMoving()
  //initTestStatic()
}

function windowResized() {
   resizeCanvas(3*windowWidth/4, windowHeight);
}

function draw() {
  background(220);
  //update(deltaTime/1000)
  for (let i=1;i<precision;++i)
    update(step/i)
  for (p of particles){
    p.draw();
  }
}

let update_counter = 0;

function update(dt){
  update_counter+=1
  // temperature
  if (chart && !(update_counter%10))
  {
    console.log("update")
    let speeds = particles.map(d => d.vel.mag())
    let data = createHistogram(speeds,10,0,300)
    chart.series[0].setData(data)
  }
  let check = document.getElementById('termostat').checked
  if (check)
    temp_scale = Math.sqrt(getVelocityScale())
  else
    temp_scale = 1

  // LJ interactions and collisions
  for (let i = 0; i < particles.length - 1; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      particles[i].interact(particles[j]);
    }
  }

  // applying changes
  for (p of particles){
    p.update(dt, temp_scale)
  }
}


// non-p5js stuff

function createHistogram(data, binCount, xStart, xEnd) {
  // Calculate bin width
  const binWidth = (xEnd - xStart) / binCount;

  // Initialize an array to store histogram bars
  const histogram = [];

  // Create bins and count occurrences
  for (let i = 0; i < binCount; i++) {
    const binStart = xStart + i * binWidth;
    const binEnd = binStart + binWidth;

    // Count occurrences within the bin
    const count = data.reduce((acc, value) => {
      if (value >= binStart && value < binEnd) {
        return acc + 1;
      }
      return acc;
    }, 0);

    // Add the bin [x, y] pair to the histogram array
    histogram.push([binStart, count]);
  }

  return histogram;
}

function getVelocityScale(){
  let T = document.getElementById('temperatura').value
  // get average velocity
  let velavg = 0
  for (p of particles){
    velavg+=p.vel.mag()
  }
  velavg/=particles.length
  return T/velavg

}

function initRandomParticles(count, temperature){
  console.log("init")
  particles = []
  for (let i=0; i<count;i++){
    particles.push(new Particle(temperature))
  }
}

function initGrid(countx, county, offsetX, offsetY){
  particles = []
  for (let i=0; i<countx;i++){
    for (let j=0; j<county;j++){
      var p = new Particle(0)
      if (offsetY+p.r+p.r*3*j>height || offsetX+p.r+i*p.r*3>width) continue
      p.pos = createVector(offsetX+p.r+i*p.r*3, offsetY+p.r+p.r*3*j)
      particles.push(p)
    }
  }
}

function initTestMoving()
{
  particles = [new Particle(), new Particle()]
  particles[0].pos = createVector(100,100)
  particles[1].pos = createVector(500,100)
  
  particles[0].vel = createVector(30,0)
  particles[1].vel = createVector(0,0)
}

function initTestStatic()
{
  particles = [new Particle(), new Particle()]
  particles[0].pos = createVector(100,100)
  particles[1].pos = createVector(500,100)
}
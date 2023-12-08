class Particle {
	constructor()
	{
		this.x = Math.random()*windowWidth
		this.y = Math.random()*windowHeight
		this.vel = createVector(Math.random(),Math.random());
	}

	update(other){
		// handles collision and LJ forces

	}

	draw(){
		circle(this.x,this.y,10)
	}
}
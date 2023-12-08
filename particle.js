class Particle {
	constructor(temperature)
	{
		this.pos = createVector(Math.random()*windowWidth,Math.random()*windowHeight)
		this.vel = createVector(randomGaussian(0,temperature),randomGaussian(0,temperature));
		this.r = 50;
	}

	update(){
		// applies velocity
		this.pos.add(this.vel)

		// teleport if off-screen
		if (this.pos.x+this.r<0){
			this.pos.x+=windowWidth+this.r*2
		}
		if (this.pos.x-this.r>windowWidth)
			this.pos.x-=windowWidth+this.r*2

		if (this.pos.y+this.r<0)
			this.pos.y+=windowHeight+this.r*2
		
		if (this.pos.y-this.r>windowHeight)
			this.pos.y-=windowHeight+this.r*2
	}

	interact(other){
		// handles collision and LJ forces

		//Collision
		if (this.pos.dist(other.pos)<=this.r*2){


			// get normal vector from this to other
			const norm = p5.Vector.sub(this.pos,other.pos).div(this.pos.dist(other.pos))

			//space them away to avoid bugs
			//find midpoint of particles
			const mid = p5.Vector.add(this.pos,other.pos).div(2)
			print(this.pos,other.pos,mid)

			// final points are radius away from midpoint, in other directions
			this.pos=p5.Vector.add(mid,p5.Vector.mult(norm,this.r))
			other.pos=p5.Vector.sub(mid,p5.Vector.mult(norm,this.r))

			// math
			const p = p5.Vector.dot(this.vel,norm)-p5.Vector.dot(other.vel,norm)

			norm.mult(p)
			this.vel.sub(norm)
			other.vel.add(norm)
		}
	}

	draw(){
		circle(this.pos.x,this.pos.y,this.r*2)
	}
}
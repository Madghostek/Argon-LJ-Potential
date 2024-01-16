const dispersion = 200;
const psize = 70;


class Particle {
	constructor(temperature)
	{
		this.pos = createVector(Math.random()*width,Math.random()*height)
		this.vel = createVector(randomGaussian(0,temperature),randomGaussian(0,temperature));
		this.acc = createVector(0,0)
		this.r = 25
		this.initCap = 500 // safety cap to fix overlaping particles at start
	}

	update(dt, temp_scale){
		// teleport if off-screen
		// this is bad, because particles can teleport on top of another one, and spaz out
/*		if (this.pos.x+this.r<0){
			this.pos.x+=windowWidth+this.r*2
		}
		if (this.pos.x-this.r>windowWidth)
			this.pos.x-=windowWidth+this.r*2

		if (this.pos.y+this.r<0)
			this.pos.y+=windowHeight+this.r*2
		
		if (this.pos.y-this.r>windowHeight)
			this.pos.y-=windowHeight+this.r*2*/

		this.vel.mult(temp_scale)
		//safe check for absurd accelerations...
		this.acc.limit(min(this.initCap,5000))
		this.initCap+=20

		// applies velocity
		this.vel.add(p5.Vector.mult(this.acc,dt))
		this.pos.add(p5.Vector.mult(this.vel,dt))
		this.acc.x=0;this.acc.y=0;
		
		// bounce off the walls
		if (this.pos.x-this.r<0){
			this.pos.x=this.r // placing the particle on the edge, in case it's very far
			this.vel.x*=-1	  // flip velocity component
		}
		if (this.pos.x+this.r>width){
			this.pos.x=width-this.r
			this.vel.x*=-1
		}

		if (this.pos.y-this.r<0){
			this.pos.y=this.r
			this.vel.y*=-1
		}
		
		if (this.pos.y+this.r>height){
			this.pos.y=height-this.r
			this.vel.y*=-1
		}
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
			//print(this.pos,other.pos,mid)

			// final points are radius away from midpoint, in other directions
			this.pos=p5.Vector.add(mid,p5.Vector.mult(norm,this.r))
			other.pos=p5.Vector.sub(mid,p5.Vector.mult(norm,this.r))

			// math
			const p = p5.Vector.dot(this.vel,norm)-p5.Vector.dot(other.vel,norm)

			norm.mult(p)
			this.vel.sub(norm)
			other.vel.add(norm)
		}

		const dist = this.pos.dist(other.pos);
		// LJ potential
		let r6 = Math.pow(psize/dist,6)
		var V=4*dispersion*(r6*r6-r6)
		const norm = p5.Vector.sub(this.pos,other.pos).div(this.pos.dist(other.pos))
		this.acc.add(p5.Vector.mult(norm,V))
		other.acc.add(p5.Vector.mult(norm,-V))


	}

	draw(){
		var scale = 500-this.vel.mag()
		fill(500-scale,0,scale)
		circle(this.pos.x,this.pos.y,this.r*2)
	}
}
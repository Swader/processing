var ps;

function setup() {
	createCanvas(640, 360);
	ps = new ParticleSystem(new p5.Vector(width/2, 50));
}

function draw() {
	background(0);
	ps.addParticle();
	ps.run();
}

function Particle(lvector) {
	this.location = lvector.get();
	this.acceleration = new p5.Vector(0,0.05);

	var random1 = Math.random() * ((Math.random() > 0.5) ? -1 : 1);
	var random2 = Math.random() - ((Math.random() > 0.5) ? 1 : 2);

	this.velocity = new p5.Vector(random1, random2);

	this.lifespan = 255.0;
}

Particle.prototype.run = function() {
	this.update();
	this.display();
}

Particle.prototype.update = function() {
	this.velocity.add(this.acceleration);
	this.location.add(this.velocity);
	this.lifespan -= 1.0;
}

Particle.prototype.display = function() {
	stroke(255, this.lifespan);
	fill(255, this.lifespan);
	ellipse(this.location.x, this.location.y, 8, 8);	
}

Particle.prototype.isDead = function() {
	return (this.lifespan < 0);
}

function ParticleSystem(location) {
	this.origin = location.get();
	this.particles = [];
}

ParticleSystem.prototype.addParticle = function() {
	this.particles.push(new Particle(this.origin));
}

ParticleSystem.prototype.run = function() {
	var p;
	for (var i = this.particles.length - 1; i >= 0; i--) {
		p = this.particles[i];
		p.run();
		if (p.isDead()) {
			this.particles.splice(i, 1);
		}
	}
}
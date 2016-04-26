var agents = [];//lists of agents
var circles = [];

function setup(){
	createCanvas(1000,500);
	rectMode(CENTER);
	
	//creates an agent at a random location
	for(var i = 0; i<10; i++){
		var a = new Agents(random(width), random(height), 16,16);
		agents.push(a);
	}
}

function draw(){
	background(51);
	stroke(255,50);

	//drawing agents, calls the run function inside Agents class'
	for(var i=0;i<agents.length;i++){
		agents[i].run(agents);
		
		agents[i].intersectedAgents = [];
		for(var j=i+1;j<agents.length;j++){
			if(ifIntersecting(agents[i],agents[j])){
				agents[i].intersectedAgents.push(agents[j]);
				agents[j].intersectedAgents.push(agents[i]);
				agents[j].velocity = agents[i].velocity;
			}
		}
	}
	for(var i=0;i<agents.length;i++){
		//a cool effect happens if agents[i].draw() is commented out
		 //agents[i].draw();
		for(var j=0;j<agents[i].intersectedAgents.length;j++){
			var other = agents[i].intersectedAgents[j];
			line(agents[i].position.x, agents[i].position.y, other.position.x, other.position.y);
		}
	}
}

function mouseDragged(){
	noFill();
	var a = new Agents(mouseX,mouseY,15);
	agents.push(a);
	a.draw();
}

//defining agents class
function Agents(x,y,rad){
	this.position = createVector(x,y);
	this.velocity = p5.Vector.random2D();
	this.radius = rad;
	this.intersectedAgents = [];
}

//adding functions to agents class through a prototype
Agents.prototype.run = function(agents){
	this.wrap();
	this.update();
}

Agents.prototype.draw = function(){
	fill(127,127);
	ellipse(this.position.x,this.position.y,this.radius,this.radius);
}

Agents.prototype.update = function(){
	this.position.x += this.velocity.x;
	this.position.y += this.velocity.y;
}

Agents.prototype.wrap = function(){
	if(this.position.x > width){
		this.position.x = 0;
	}
	if(this.position.y > height){
		this.position.y = 0;
	}
	if(this.position.x < 0){
		this.position.x = width;
	}
	if(this.position.y < 0){
		this.position.y = height;
	}
}

function ifIntersecting(a, b, radius){
	var d = dist(a.position.x, a.position.y, b.position.x, b.position.y);
	if(d < a.radius + b.radius){
		return hasIntersected = true;
	} else{
		return hasIntersected = false;
	}
}
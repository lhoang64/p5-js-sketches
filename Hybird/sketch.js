var agents = [];//lists of agents

function setup(){
	createCanvas(1200,700);
	rectMode(CENTER);
	
	//creates an agent at a random location
	for(var i = 0; i<5; i++){
		var a = new Agents(random(width), random(height));
		agents.push(a);
	}	
}

function draw(){
	
	var radius = map(noise(frameCount*0.01),0,1,0,30);
	var weight = map(sin(frameCount*0.01),-1,1,0,5);
	
	background(0,21);
	stroke(255,50);

	//drawing agents, calls the run function inside Agents class'
	for(var i=0;i<agents.length;i++){
		agents[i].run(agents);

		agents[i].intersectedAgents = [];
		for(var j=0;j<agents.length;j++){
			agents[j].accelerate(noise(frameCount*0.01));
			if(ifIntersecting(agents[i],agents[j]),radius){
				agents[i].intersectedAgents.push(agents[j]);
				agents[j].intersectedAgents.push(agents[i]);
			}
		}
	}
	for(var i=0;i<agents.length;i++){
		agents[i].draw(radius,weight);
		for(var j=0;j<agents[i].intersectedAgents.length;j++){
			var other = agents[i].intersectedAgents[j];
			line(agents[i].position.x, agents[i].position.y, other.position.x, other.position.y);
		}
	}
}

function mouseClicked(){
	var a = new Agents(mouseX,mouseY,20);
	agents.push(a);
	a.draw();
}

function mouseDragged(){
	var a = new Agents(mouseX,mouseY,20);
	agents.push(a);
	a.draw();
}

//defining agents class
function Agents(x,y){
	this.position = createVector(x,y);
	this.velocity = p5.Vector.random2D();
	this.intersectedAgents = [];
}

//adding functions to agents class through a prototype
Agents.prototype.run = function(agents){
	this.wrap();
	this.update();
	this.velocity.limit(4);
}

Agents.prototype.draw = function(rad,weight){
	fill(211,233,57,127);
	strokeWeight(weight);
	ellipse(this.position.x,this.position.y,rad,rad);
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

Agents.prototype.accelerate = function(lv){
	this.velocity.x = this.velocity.x + sin(frameCount)*random(-lv,lv);
	this.velocity.y = this.velocity.y + cos(frameCount)*random(-lv,lv);
}

function ifIntersecting(a, b, rad){
	var d = dist(a.position.x, a.position.y, b.position.x, b.position.y);
	if(d < a.rad + b.rad){
		return hasIntersected = true;
	} else{
		return hasIntersected = false;
	}
}

/*experimenting with shapes
function drawShape(x1,y1,x2,y2){
	fill(50,20);
	stroke(255,20);
	rect(x1,y1,x2,y2);
}*/
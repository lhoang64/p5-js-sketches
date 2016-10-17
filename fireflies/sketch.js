var agents = [];//lists of yellow ellipses
var snd;
var amp, smoothed;
var thresh;

function preload(){
	snd = loadSound('Loud Pipes.mp3')
}

function setup(){
	createCanvas(1200,700);

	//creates an agent at a random location
	for(var i = 0; i<50; i++){
		var a = new Agents(random(width), random(height));
		agents.push(a);
	}
	
	amp = new p5.Amplitude();
	smoothed = 0;
	thresh = false;
}

function draw(){
	var level = amp.getLevel();
	smoothed = lerp(smoothed,level,0.4);
	
	var radius = map(smoothed,0,1,0,40);
	var weight = 0; 

	var bgColor = 0;
	var threshold = 0.5;
	
	if(level>threshold && !thresh){
		thresh = true;
		bgColor = 100;
	} else{
		thresh = false;
	}
	
	background(bgColor,21);
	stroke(255,50);
	
	//drawing agents, calls the run function inside Agents class'
	for(var i=0;i<agents.length;i++){
		agents[i].run(agents);
		agents[i].accelerate(level);
		drawShape(agents[i].position.x,agents[i].position.y);
	}
	for(var i=0;i<agents.length;i++){
		agents[i].draw(radius,weight);
	}

}

function mouseClicked(){
	var a = new Agents(mouseX,mouseY,20);
	agents.push(a);
	a.draw();
}

function keyPressed(){
	if(keyCode == ENTER){
		snd.play();
	}
	if(keyCode == ESCAPE){
		snd.stop();
	}
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
}

//adding functions to agents class through a prototype
Agents.prototype.run = function(agents){
	this.wrap();
	this.update();
	this.velocity.limit(3);
}

Agents.prototype.accelerate = function(lv){
	this.velocity.x = this.velocity.x + random(-noise(-lv),noise(lv));
	this.velocity.y = this.velocity.y + random(-noise(-lv),noise(lv));
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

function drawShape(x1,y1){
	var level = amp.getLevel();
	smoothed = lerp(smoothed,level,0.4);
	var rad = map(smoothed,0,1,0,90);
	fill(100,70);
	noStroke();
	ellipse(x1,y1,rad,rad);
}
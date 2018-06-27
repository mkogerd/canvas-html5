var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// c for "context"
var c = canvas.getContext('2d');

// Draw some rectangles
/*
c.fillStyle = 'rgba(0, 255, 255, 0.4)';
c.fillRect(100, 100, 40, 40);
c.fillStyle = 'rgba(0, 0, 255, 0.4)';
c.fillRect(500, 30, 100, 100);
c.fillStyle = 'rgba(0, 255, 0, 0.4)';
c.fillRect(400, 700 , 100, 100);
console.log(canvas);

// Line
c.beginPath();
c.moveTo(100, 300);
c.lineTo(200, 200);
c.lineTo(300, 200);

// Draw another segment of the line on the same path
c.moveTo(400, 200);
c.lineTo(500, 300);
c.strokeStyle = "#0034a3";
c.stroke();

// Arc / Circle
c.beginPath();
c.arc(300, 300, 30, 0, Math.PI * 2, false);
c.strokeStyle = 'blue';
c.stroke();

// Multiple Arc / Circle
for(var i = 0; i < 40; i++) {
	// Generate random coordinates and color
	var x = Math.random() * window.innerWidth;
	var y = Math.random() * window.innerHeight;
	var color = (0xFFFFFF*Math.random()<<0).toString(16);
	while(color.length < 6) color = '0'+color;
	color = '#'+color;

	// Draw a bunch of randomized circles
	c.beginPath();
	c.arc(x, y, 30, 0, Math.PI * 2, false);
	c.strokeStyle = color; 
	c.stroke();
}
*/
var mouse = {
	x: undefined,
	y: undefined
}
var maxRadius = 40;
var minRadius = 2;

var colorArray = [
	'#49804A',
	'#1E5532',
	'#89CC66',
	'#1F5532',
	'#FAFCF9'
];

window.addEventListener('mousemove', (event)=> {
	mouse.x = event.x;
	mouse.y = event.y;
	console.log(mouse);
	
});

window.addEventListener('resize', ()=>{
	canvas.width = innerWidth;
	canvas.height = innerHeight;
	init();
});

function Circle(x, y, dx, dy, radius, color) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.minRadius = radius;
	this.color = colorArray[Math.floor(colorArray.length * Math.random())];

	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
	}

	this.update = ()=>{
		if (this.x + this.radius > innerWidth || this.x - this.radius < 0) 
			this.dx = -this.dx;
		if (this.y + this.radius > innerHeight || this.y - this.radius < 0) 
			this.dy = -this.dy;
		this.x += this.dx;
		this.y += this.dy;
		
		// Interactivity
		if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && 
			mouse.y - this.y < 50 && mouse.y - this.y > -50) {
			if (this.radius < maxRadius) this.radius += 1;
		} else if (this.radius > this.minRadius) {
			this.radius -= 1;	
		}

		this.draw();
	}
}


var circleArray = [];
init();
function init() {
	circleArray = [];
	for (var i = 0; i < 800; i++) {
		var radius = Math.floor(Math.random() * 3 + 1);
		var x = Math.random() * (innerWidth - radius * 2) + radius; 
		var y = Math.random() * (innerHeight - radius * 2) + radius;
		var dx = (Math.random() - 0.5);
		var dy = (Math.random() - 0.5);
		var color = (0xFFFFFF*Math.random()<<0).toString(16);
		while(color.length < 6) color = '0'+color;
		
		circleArray.push(new Circle(x, y, dx, dy, radius));
	}
	
}

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, innerWidth, innerHeight);
	
	for (var i = 0; i < circleArray.length; i++) {
		circleArray[i].update();
	}
}

animate();

var canvas = document.querySelector("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;

// Get context
var c = canvas.getContext('2d');

// Set up variables
var colors = [
	'#5E005E',
	'#AB2F52',
	'#E55D4A',
	'#E88554',
	'#FFAF53'
];

var mouse = {
	x: undefined,
	y: undefined
}

var gravity = 1;
var friction = 0.98;

// Event listeners
window.addEventListener('mousemove', (event)=> {
	mouse.x = event.x;
	mouse.y = event.y;
});

window.addEventListener('resize', (event)=> {
	canvas.width = innerWidth;
	canvas.height = innerHeight;
	init();
});

window.addEventListener('click', (event)=> {
	init();
});

function Ball(x, y, dy, dx, radius, color) {
	this.x = x;
	this.y = y;
	this.dy = dy;
	this.dx = dx;
	this.radius = radius;
	this.color = color;

	this.update = ()=>{
		if(this.y + this.radius + this.dy > canvas.height) {
			this.dy = -this.dy * friction;	
		} else {
			this.dy += gravity;
		}
		if(this.x + this.radius + this.dx >= canvas.width || this.x -this.radius + this.dx <= 0) {
			this.dx = -this.dx;
		}
		this.y += this.dy;
		this.x += this.dx;
		this.draw();
	}
	
	this.draw = ()=>{
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
		c.stroke();
		c.closePath();
	}
}

// Implementation
var ball;
var ballArray;
function init() {
	ballArray = [];
	for (var i = 0; i < 300; i++) {
		var radius = Math.floor(Math.random() * 30) + 1;
		var x = Math.floor(Math.random() * (canvas.width - radius * 2 + 1)) + radius;
		var y = Math.floor(Math.random() * (canvas.height - radius * 2 + 1)) + radius;
		var dx = Math.floor(Math.random() * 5) - 2; 
		var dy = Math.floor(Math.random() * 5) - 2; 
		color = colors[Math.floor(Math.random() * colors.length)];
		ballArray.push(new Ball(x, y, 2, dx, radius, color));
	}
}

// Animation loop
function animate() {
	requestAnimationFrame(animate);	
	c.clearRect(0, 0, canvas.width, canvas.height);
	
	for (var i = 0; i < ballArray.length ; i++) {
		ballArray[i].update();
	}
}

init();
animate();

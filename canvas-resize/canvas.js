var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// c for "context"
var c = canvas.getContext('2d');

// Draw some rectangles
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

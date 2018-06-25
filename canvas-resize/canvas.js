var canvas = document.querySelector('canvas');
console.log(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// c for "context"
var c = canvas.getContext('2d');

c.fillRect(100, 100, 40, 40);
c.fillRect(30, 30, 100, 100);
c.fillRect(70, 70 , 100, 100);


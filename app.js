const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");
canvas.width=800;
canvas.height=800;


//house
ctx.fillRect(200,200, 50, 200);
ctx.fillRect(400,200, 50, 200);
ctx.lineWidth=2;
ctx.strokeRect(300,300, 50, 100)
ctx.fillRect(200,200,250,20)

ctx.moveTo(200,200);
ctx.lineTo(325, 100)
ctx.lineTo(450, 200)
ctx.fill()

//man

ctx.fillRect(600,300, 50, 100)
ctx.fillRect(550,300, 25, 50)
ctx.fillRect(675,300, 25, 50)
ctx.fillRect(600,400, 20, 50)
ctx.fillRect(630,400, 20, 50)

ctx.beginPath()
ctx.arc(620, 220, 50, 0 , 2 * Math.PI)
ctx.fill()

ctx.beginPath();
ctx.arc(600, 215, 10, Math.PI, 2 *Math.PI)
ctx.arc(640, 215, 10, Math.PI, 2 *Math.PI)
ctx.fillStyle = "white"
ctx.fill()
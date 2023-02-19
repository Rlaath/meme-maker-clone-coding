const color = document.getElementById('color')
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");
const lineWidth = document.getElementById('line-width')
canvas.width=800;
canvas.height=800;
ctx.lineWidth = lineWidth.value;
let isPainting = false;

function onMove(event){
  if(isPainting){
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  
  ctx.beginPath();
  ctx.moveTo(event.offsetX, event.offsetY)
}
function onPainting(){
  isPainting = true;
}

function canclePainting(){
  isPainting = false;
}

function lineChange(event){
  ctx.lineWidth = event.target.value;
}

function onColorChange(event){
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;

}
canvas.addEventListener('mousemove', onMove)
canvas.addEventListener('mousedown', onPainting)
canvas.addEventListener('mouseup', canclePainting)
canvas.addEventListener('mouseleave',canclePainting)
lineWidth.addEventListener('change', lineChange)
color.addEventListener('change', onColorChange)
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");
const lineWidth = document.querySelector('#line-width');
const color = document.querySelector('#color');
const colorOptions = Array.from(document.getElementsByClassName('color-option'));
const modeButton = document.querySelector('#mode-button');
const destroyBtn = document.querySelector('#destry-btn');
const eraserBtn = document.querySelector('#eraser-btn');
const imageInput = document.querySelector('#image');
const textInput = document.querySelector('#text')
const saveBtn = document.querySelector('#save')

canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = lineWidth.value;
let isPainting = false;
let isFilling = false;


function onMouse(event){
  if(isPainting){
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }

  ctx.beginPath();
  ctx.moveTo(event.offsetX, event.offsetY);
}

function onPaint(){
  isPainting = true;
}

function canclePaint(){
  isPainting = false;
}

function lineChange(event){
  ctx.lineWidth = event.target.value;
}

function colorChange(event){
  ctx.fillStyle = event.target.value;
  ctx.strokeStyle = event.target.value;
}

function onColorChange(event){
  const colorValue = event.target.dataset.color;
  ctx.fillStyle =colorValue;
  ctx.strokeStyle =colorValue;
  color.value = colorValue;
}

function onModeClick(){
  if(isFilling){
    isFilling = false;
    modeButton.innerText = 'Draw Mode';
  }else {
    isFilling= true;
    modeButton.innerText = 'Fill Mode';
  }

}
function onCanvasFill(){
  if(isFilling){
    ctx.fillRect(0,0,800,800);
  }

}

function onDestroy(){
  ctx.fillStyle = 'white'
  color.value = ctx.fillStyle;
  ctx.fillRect(0,0,800,800);
}

function onErase(){
  if(isFilling){
    isFilling = false;
  }
  ctx.strokeStyle = 'white'
  color.value = ctx.strokeStyle;
}

function onImageAdd(event){
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function() {
    ctx.drawImage(image, 0, 0, 400, 400);
}};

function onDoubleClick(event){
  const text = textInput.value;
  if(textInput !== null){
    ctx.save();
    ctx.lineWidth = 1;
    ctx.font = "68px serif"
    ctx.fillText(text, event.offsetX,event.offsetY)
    ctx.restore();
  }
}

function onSave(event){
  const url = canvas.toDataURL();
  const a = document.createElement('a');
  a.href = url;
  a.download = 'myDrawing.jpeg'
  a.click();
}
canvas.addEventListener('mousemove', onMouse);
canvas.addEventListener('mousedown', onPaint);
canvas.addEventListener('mouseup', canclePaint);
canvas.addEventListener('mouseleave', canclePaint);
lineWidth.addEventListener('change', lineChange);
color.addEventListener('change', colorChange);
colorOptions.forEach( color => color.addEventListener('click', onColorChange));
modeButton.addEventListener('click', onModeClick);
canvas.addEventListener('click', onCanvasFill);
destroyBtn.addEventListener('click',onDestroy);
eraserBtn.addEventListener('click', onErase);
imageInput.addEventListener('change', onImageAdd);
canvas.addEventListener('dblclick', onDoubleClick);
saveBtn.addEventListener('click', onSave);
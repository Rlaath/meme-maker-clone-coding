const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const widthInput = document.querySelector('#width-input');
const colorOptions = Array.from(document.getElementsByClassName('color-option'));
const modeBtn = document.querySelector('#mode-btn')
const destroyBtn = document.querySelector('#destroy-btn')
const eraseBtn = document.querySelector('#erase-btn')
const fileInput = document.querySelector('#file')
const textInput = document.querySelector('#textInput')
const saveBtn = document.querySelector('#save')


ctx.lineWidth = widthInput.value;
canvas.width = 800;
canvas.height = 800;

let isPainting = false;
let isFilling = false;




// Draw a line only while the mouse is pressed
function onMouseMove(event){
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

function offPainting(){
  isPainting = false;
}

// change linewidth
function onWidthChange(event){
  ctx.lineWidth = event.target.value;
}

//change color 1
function onColorChange(event){
  ctx.fillStyle = event.target.value;
  ctx.strokeStyle = event.target.value; 
}

//change color 2
function onColorClick(event){
  const colorValue = event.target.dataset.color;
  ctx.fillStyle = colorValue;
  ctx.strokeStyle = colorValue; 
  color.value = colorValue;
}

// Mode change
function onModeChange(){
  if(isFilling){
    isFilling = false;
    modeBtn.innerText = 'Draw Mode'
  } else{
    isFilling = true;
    modeBtn.innerText = 'Fill Mode'
  }
}


// Fill the whole screen
function onFillMode(){
  if(isFilling){
    ctx.fillRect(0,0,800,800);
  }
}


// Erase the whole screen
function onDestroyMode(){
  
    ctx.fillStyle = 'white'
    ctx.fillRect(0,0,800,800);
    if(isFilling){
      color.value = ctx.fillStyle;
    }
}

// Erase the specific part of the screen
function onEraseMode(){
  if(isFilling){
    isFilling=false;
  }
  ctx.strokeStyle='white';
  color.value = ctx.strokeStyle;
}

// Image add
function onFileAdd(event){
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function(){
    ctx.drawImage(image,0,0,800,800)
  }
  fileInput.value = ''
}

// Text add

function onTextAdd(event){
  const text = textInput.value;
  if(textInput !== null){
    ctx.save();
    ctx.font = "68px serif"
    ctx.fillText(text,event.offsetX, event.offsetY);
    ctx.restore();
  }
}

//Save the image

function onSave(){
  const url = canvas.toDataURL();
  const a = document.createElement('a')
  a.href = url;
  a.download = 'My Drawing.png'
  a.click();
}
canvas.addEventListener('mousemove', onMouseMove)
canvas.addEventListener('mousedown', onPainting)
canvas.addEventListener('mouseup', offPainting)
canvas.addEventListener('mouseleave',offPainting)
widthInput.addEventListener('change', onWidthChange)
color.addEventListener('change', onColorChange)
colorOptions.forEach(color => color.addEventListener('click', onColorClick))
modeBtn.addEventListener('click', onModeChange)
canvas.addEventListener('click', onFillMode)
destroyBtn.addEventListener('click', onDestroyMode)
eraseBtn.addEventListener('click', onEraseMode)
fileInput.addEventListener('change', onFileAdd)
canvas.addEventListener('dblclick', onTextAdd)
saveBtn.addEventListener('click', onSave)
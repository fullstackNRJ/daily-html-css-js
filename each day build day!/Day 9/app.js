const canvas = document.querySelector('#draw')
const ctx = canvas.getContext('2d');



const brush = document.querySelector('#brush-width')
brush.addEventListener('change', ()=>{
    let brush_thickness = 0; 
    for (let i = 0; i < brush.options.length; i++) {
        var option = brush.options[i];
        if (option.selected)
          brush_thickness = Number(option.value);
    }  
    //console.log(brush_thickness) 
    //set the width
    ctx.lineWidth = brush_thickness|| 10;
}) 



 color = document.querySelector('#color-pick')
 color.addEventListener('change', ()=>{
    //set the color
    ctx.strokeStyle = color.value||'#BADA55'
    //console.log(color.value)
  },false)


//ctx.strokeStyle = '#BADA55';

//ctx.lineWidth = brush_thickness|| 10;
// ctx.globalCompositeOperation = 'multiply'; // blender-effect 

let isDrawing = false;
let lastX = 0;
let lastY = 0;
//let hue = brush_color || 0;


function setColor(){
    ctx.strokeStyle = '#f0f8ff';
}


function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


function draw(e) {
    e.preventDefault();
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    if (!isDrawing) return;
    
    //ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath();
    // start from
    ctx.moveTo(lastX, lastY);
    // go to
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
   
if(!e.touches){  ctx.lineTo(e.offsetX, e.offsetY); [lastX, lastY] = [e.offsetX, e.offsetY];}

else{
    if (e.touches.length == 1) { // Only deal with one finger
        let touch = e.touches[0]; // Get the information for finger #1
        lastX=touch.clientX;
        lastY=touch.clientY;
    }
    ctx.lineTo(e.clientX, e.clientY);
   }  
}


canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);



// mobile specific `touch` support
canvas.addEventListener('touchstart', (e) =>{
    isDrawing = true;
    if (e.touches) {
        if (e.touches.length == 1) { // Only deal with one finger
            var touch = e.touches[0]; // Get the information for finger #1
            lastX=touch.clientX;
            lastY=touch.clientY;
            console.log(touch)
        }
    } 
})

canvas.addEventListener('touchmove', draw)

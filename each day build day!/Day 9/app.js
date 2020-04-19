
//Global Variables for referencing the canvas and 2dcanvas context, mouse, touch , brush, color elements
 var canvas,ctx;
 var mouseX,mouseY,mouseDown=false;
 var touchX,touchY;
 var brush, color, eraser;
 let brush_thickness = 10, brush_color = '#333'; 

 // Draws a dot at a specific position on the supplied canvas name
    // Parameters are: A canvas context, the x position, the y position, the size of the dot
    function drawDot(ctx,x,y,size) {
        // Let's use black by setting RGB values to 0, and 255 alpha (completely opaque)
        

        // Select a fill style
        ctx.fillStyle = `${brush_color}`;

        // Draw a filled circle
        ctx.beginPath();
        ctx.arc(x, y, brush_thickness, 0, Math.PI*2, true); 
        ctx.closePath();
        ctx.fill();
    } 

    // Clear the canvas context using the canvas width and height
    function clearCanvas(canvas,ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Keep track of the mouse button being pressed and draw a dot at current location
    function sketchpad_mouseDown() {
        mouseDown=true;
        drawDot(ctx,mouseX,mouseY,brush_thickness);
    }

    // Keep track of the mouse button being released
    function sketchpad_mouseUp() {
        mouseDown=false;
    }

     // Keep track of the mouse position and draw a dot if mouse button is currently pressed
     function sketchpad_mouseMove(e) { 
        // Update the mouse co-ordinates when moved
        getMousePos(e);

        // Draw a dot if the mouse button is currently being pressed
        if (mouseDown) {
            drawDot(ctx,mouseX,mouseY,brush_thickness);
        }
    }


    // Get the current mouse position relative to the top-left of the canvas
    function getMousePos(e) {
        if (!e)
            var e = event;

        if (e.offsetX) {
            mouseX = e.offsetX;
            mouseY = e.offsetY;
        }
        else if (e.layerX) {
            mouseX = e.layerX;
            mouseY = e.layerY;
        }
     }

     // Draw something when a touch start is detected
    function sketchpad_touchStart(e) {
        // Update the touch co-ordinates
        getTouchPos();

        drawDot(ctx,touchX,touchY,12);

        // Prevents an additional mousedown event being triggered
        e.preventDefault();
    }

    // Draw something and prevent the default scrolling when touch movement is detected
    function sketchpad_touchMove(e) { 
        // Update the touch co-ordinates
        getTouchPos(e);

        // During a touchmove event, unlike a mousemove event, we don't need to check if the touch is engaged, since there will always be contact with the screen by definition.
        drawDot(ctx,touchX,touchY,brush_thickness); 

        // Prevent a scrolling action as a result of this touchmove triggering.
        e.preventDefault();
    }

    //Eraser set color to same as background

    function setColor(){
        console.log('called')
        brush_color = '#f0f8ff';
        eraser.classList.toggle('selected')
    }

    /* Get the touch position relative to the top-left of the canvas
    Note :  When we get the raw values of pageX and pageY below, they take into account the scrolling on the page
     but not the position relative to our target div. We'll adjust them using "target.offsetLeft" and
     "target.offsetTop" to get the correct values in relation to the top left of the canvas.
    */
     function getTouchPos(e) {
        if (!e)
            var e = event;

        if(e.touches) {
            if (e.touches.length == 1) { // Only deal with one finger
                var touch = e.touches[0]; // Get the information for finger #1
                touchX=touch.pageX-touch.target.offsetLeft;
                touchY=touch.pageY-touch.target.offsetTop;
            }
        }
    }

     // Set-up the canvas and add our event handlers after the page has loaded
     function init() {
        // Get the specific canvas element from the HTML document
        canvas = document.getElementById('draw');
        console.log(canvas)
        // If the browser supports the canvas tag, get the 2d drawing context for this canvas
        if (canvas.getContext)
            ctx = canvas.getContext('2d');


        //Listener to the brush and color for thickness and color
        brush = document.querySelector('#brush-width');
        color = document.querySelector('#color-pick'); 
        eraser = document.querySelector('.btn-eraser');
        //hookup event listeners
        brush.addEventListener('change', ()=>{
            
            for (let i = 0; i < brush.options.length; i++) {
                var option = brush.options[i];
                if (option.selected)
                  brush_thickness = Number(option.value);
            }  
            //console.log(brush_thickness) 
            //set the width
            ctx.lineWidth = brush_thickness|| 10;
        }) 


        color.addEventListener('change', ()=>{
            //set the color
            brush_color = color.value||'#BADA55'
            //console.log(color.value)
          },false)
        

        // Check that we have a valid context to draw on/with before adding event handlers
        if (ctx) {
            // React to mouse events on the canvas, and mouseup on the entire document
            canvas.addEventListener('mousedown', sketchpad_mouseDown, false);
            canvas.addEventListener('mousemove', sketchpad_mouseMove, false);
            window.addEventListener('mouseup', sketchpad_mouseUp, false);

            // React to touch events on the canvas
            canvas.addEventListener('touchstart', sketchpad_touchStart, false);
            canvas.addEventListener('touchmove', sketchpad_touchMove, false);
        }
    }


 init();

//wait till the window is loaded before performining
//the init() function
window.onload=init;

// declare canvas contexts here so they are global
var ctx, ctx2, canvas2;

//canvas width and height
var w;
var h;
//create a global variable for the drawing context

//Position for object on the canvas
var xPos = 0;
var yPos = 0;

//sprite width and height
var spriteH = 40;
var spriteW = 40;

//what shape are we drawing
var shape;

//mouse down will turn on drawState, mouse up will turn off drawState
var drawState = false;

//get the existing canvas defined in HTML
var canvas = document.getElementById("drawing");
ctx = canvas.getContext("2d");

// mouse position array for lines
var mousePosition = [];


// counter for line
var clickCount = 0;

// color for line
var lineColor;

//do all the set up stuff here

function init() {
    // color change
    // ctx.fillStyle = "blue";
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	//grab the canvas width and height
	w = canvas.width;
	h = canvas.height;
	
	//register mouse events to canvas
	canvas.addEventListener("mousemove",getMousePosition,false);
	canvas.addEventListener("mousedown", drawOn,false);
	canvas.addEventListener("mouseup", drawOff,false);
	
	//create another canvas element to hold the shape we want to draw
	canvas2 = document.createElement("canvas");
	canvas2.width = spriteH;
	canvas2.height = spriteH;
	
	//setup the canvas context
	ctx2 = canvas2.getContext("2d");
	ctx2.strokeStyle = "#000000"; //black
	ctx2.lineWidth = 1;
	



	//set the initial color to white
	setColor("#000000");
	
	// //set the default shape to a square
	// setShape('squareBig');
	
	//draw the shape in canvas2
	drawShape();
	
	//this is the draw function that will be repeated using animation frames
    // if (shape != "straightLine" || shape != "image") {
        draw();
    // }

	
}

function draw() {
	//this is in raf.js
	requestAnimationFrame(draw);
	
	//draw what ever is in canvas2 at xPos,yPos
	if (drawState)
		ctx.drawImage(canvas2,xPos,yPos);
}

//update the position of the drawing object to the mouse position
function getMousePosition(e) {
	//need to subtract the offsetLeft and offsetTop positions of the element
	xPos = e.clientX - getPosition(e.currentTarget).x - spriteW/2;
	//we need to offset the scrolling using pageYOffset 
	yPos = e.clientY - getPosition(e.currentTarget).y- spriteH/2 + window.pageYOffset;

	//for debugging
	//console.log(e.currentTarget);
	// console.log("x = "+ xPos + " y = " + yPos);
}



//Script for getting element position is from
//reference:http://www.kirupa.com/html5/get_element_position_using_javascript.htm
function getPosition(element) {
    var xPosition = 0;
    var yPosition = 0;
  
    while(element) {
        xPosition += (element.offsetLeft - element.scrollTop + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollLeft + element.clientTop);
        element = element.offsetParent;
    }
    return { x: xPosition, y: yPosition };
}

// // reference: https://codepen.io/chris_calmatlas/pen/nNLoad
// // get the mouse position on click
// canvas.addEventListener("click", function (evt) {
//     var mousePos = getMousePos(canvas, evt);
//     alert(mousePos.x + ',' + mousePos.y);

// }, false);

// //Get Mouse Position
// function getMousePos(canvas, evt) {
//     var rect = canvas.getBoundingClientRect();
//     return {
//         x: evt.clientX - rect.left,
//         y: evt.clientY - rect.top
//     };
// }


//functions to turn drawing state on and off
function drawOn(e) {
	drawState = true;
}

function drawOff(e) {
	drawState = false;
}

function drawShape() {
	ctx2.clearRect(0,0,spriteH,spriteH);
	if (shape == 'squareBig') 
		makeSquareBig();
    else if (shape == 'squareMedium') 
        makeSquareMedium();
    else if (shape == 'squareSmall') 
        makeSquareSmall();
    else if (shape == 'straightLine') 
        makeStraightLine();
    else if (shape == 'image1') 
        image1();
    else if (shape == 'image2') 
        image2();
    else if (shape == 'image3') 
        image3();
    else if (shape == 'circleSmall') 
        makeCircleSmall();
    else if (shape == 'circleMedium') 
        makeCircleMedium();
	else
		makeCircleBig();

}

function makeSquareBig() {
	// draw a square in canvas2 using existing fill color
	ctx2.fillRect(0,0,40,40);
	ctx2.strokeRect(0,0,40,40);
}

function makeSquareMedium() {
	// draw a square in canvas2 using existing fill color
	ctx2.fillRect(0,0,30,30);
	ctx2.strokeRect(0,0,30,30);
}

function makeSquareSmall() {
	// draw a square in canvas2 using existing fill color
	ctx2.fillRect(0,0,20,20);
	ctx2.strokeRect(0,0,20,20);
}


// on click add position of cursor to array + drawing a line
canvas.addEventListener("click", function cursorPosition (e) {
    mousePosition.push((e.clientX - getPosition(e.currentTarget).x ), (e.clientY - getPosition(e.currentTarget).y));
    console.log(mousePosition);

    var previousX = mousePosition[mousePosition.length - 4];
    var previousY = mousePosition[mousePosition.length - 3];
    var currentX = mousePosition[mousePosition.length - 2];
    var currentY = mousePosition[mousePosition.length - 1];
    
    console.log(clickCount);
    if (shape === "straightLine") {
        clickCount+=1;
        if (clickCount % 2 == 0) {
            ctx.strokeStyle = lineColor;
            ctx.beginPath(); // Start a new path
            ctx.moveTo(previousX, previousY); 
            ctx.lineTo(currentX, currentY); 
            ctx.stroke(); // Render the path
        }
    }
    else if (shape === "image1") {
        // reference: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
        const image = new Image(100, 70);
        image.onload = drawImageActualSize;
        image.src = "images/image1.jpg";
        function drawImageActualSize() {
            // To use the custom size we'll have to specify the scale parameters
            // using the element's width and height properties - lets draw one
            // on top in the corner:
            ctx.drawImage(this, currentX-50, currentY-35, this.width, this.height);
        }
    }
    else if (shape === "image2") {
        const image = new Image(100, 70);
        image.onload = drawImageActualSize;
        image.src = "images/image2.jpg";
        function drawImageActualSize() {
            ctx.drawImage(this, currentX-50, currentY-35, this.width, this.height);
        }
    }
    else if (shape === "image3") {
        const image = new Image(100, 70);
        image.onload = drawImageActualSize;
        image.src = "images/image3.jpg";
        function drawImageActualSize() {
            ctx.drawImage(this, currentX-50, currentY-35, this.width, this.height);
        }
    }
})

function makeStraightLine() {
    clickCount = 0;
    mousePosition = [];
}


function image1() {
    const image = new Image(80, 55);
}

function image2() {
    const image = new Image(80, 55);
}

function image3() {
    const image = new Image(80, 55);
}

function makeRectangle() {
    ctx2.fillRect(1,1,30,10);
	ctx2.strokeRect(0,0,30,10);
}

function makeCircleBig() {
	//draw a circle in canvas2 using existing fill color
	ctx2.beginPath();
	ctx2.arc(spriteH/2,spriteH/2,spriteH/2-1,0,2*Math.PI);
	ctx2.stroke();
	ctx2.fill();	
}

function makeCircleSmall() {
	//draw a circle in canvas2 using existing fill color
	ctx2.beginPath();
	ctx2.arc(spriteH/4,spriteH/4,spriteH/4-1,0,2*Math.PI);
	ctx2.stroke();
	ctx2.fill();	
}

function makeCircleMedium() {
	//draw a circle in canvas2 using existing fill color
	ctx2.beginPath();
	ctx2.arc(spriteH/3,spriteH/3,spriteH/3-1,0,2*Math.PI);
	ctx2.stroke();
	ctx2.fill();	
}

// Change color
function setColor(c) {
	ctx2.fillStyle = "white";
    ctx2.strokeStyle = c;
    lineColor = c;
	//need to redraw the shape as well
	drawShape();

}

function setShape(s) {
	//remember the shape
	shape = s;
	drawShape();
}





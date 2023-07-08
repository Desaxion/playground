/*-----------CALCULATE MIDDLE OF SCREEN-----------*/
function middleOfScreen() {
    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;
    //console.log("widht:", screenWidth)
    //console.log("height",screenHeight)
    var midX = screenWidth / 2;
    var midY = screenHeight / 2;
    var midPoint = {midX, midY};
  return midPoint;
  }


//Declare cursor
let x = middleOfScreen().midX;
let y = middleOfScreen().midY;
let CURSOR = {x,y};

document.addEventListener('mousemove', function(event) {
  CURSOR.x = event.clientX;
  CURSOR.y = event.clientY;
});


document.addEventListener('DOMContentLoaded', () => {
/*----------------MOUSE MOVEMENT ------------------*/
const BACKGROUND_COLOR = '#090914';
const ACCENT_COLOR = '#FFFFFF';









  
//canvas coding
//run after it is loaded

  // Get the canvas element
  const canvas = document.getElementById('drawing-board');
  // Get the 2D rendering context
  const ctx = canvas.getContext('2d');
  //Set background color

  //Function declarations
  function setBackgroundColor(){
    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fillRect(0 , 0, canvas.width, canvas.height);
  }

  function setCanvasSize(){
    drawingBoard = document.getElementById('drawing-board');
    drawingBoard.width = window.innerWidth;
    drawingBoard.height = window.innerHeight;
 }

  function setTextPosition(newX,newY) {
    let midpoint = middleOfScreen();
    let diffX = ((midpoint.midX )) + (newX/(100));
    let diffY = ((midpoint.midY )) + (newY/(100));
    // Set the font style

    ctx.font = "14px 'IBM Plex Mono', monospace"; 
    ctx.textAlign = 'center';
    ctx.fillStyle = ACCENT_COLOR;
    ctx.fillText("björnfoot", diffX, diffY);
    //ctx.fillText("björnfoot", CURSOR.x,CURSOR.y);
    //console.log("diffX:",diffX)
    //console.log("diffY:",diffY)
  }

 


  //Initialize everything to be drawn

  
  //Drawing loop
  function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setCanvasSize();
    setBackgroundColor(); 

    //Update text to be drawn
    setTextPosition(CURSOR.x, CURSOR.y);

    //Generate starry night sky? Or something


    // Request the next frame
    requestAnimationFrame(draw);

  }

  // Start the animation loop
  draw();
});


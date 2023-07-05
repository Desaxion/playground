/*----------------MOUSE MOVEMENT------------------*/
document.addEventListener('mousemove', function(event) {
    var cursorX = event.clientX;
    var cursorY = event.clientY;
    console.log('Cursor position:', cursorX, cursorY);
  });
  
/*-----------CALCULATE MIDDLE OF SCREEN-----------*/
var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;
var midpointX = screenWidth / 2;
var midpointY = screenHeight / 2;
console.log('Midpoint of the screen:', midpointX, midpointY);



  
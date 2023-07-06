document.addEventListener('DOMContentLoaded', () => {
/*----------------MOUSE MOVEMENT ------------------*/

//document.addEventListener('mousemove', function(event) {
function mouseMovement(event) {
  var x = event.clientX;
  var y = event.clientY;
  var cursor = {x, y};
  return cursor;
};
  
/*-----------CALCULATE MIDDLE OF SCREEN-----------*/
function middleOfScreen() {
  var screenWidth = window.innerWidth;
  var screenHeight = window.innerHeight;
  var x = screenWidth / 2;
  var y = screenHeight / 2;
  var midPoint = {x, y};
return midPoint;
}





  
//canvas coding
//run after it is loaded

  // Get the canvas element
  const canvas = document.getElementById('drawing-board');
  // Get the 2D rendering context
  const ctx = canvas.getContext('2d');
  //Set background color

  //Function declarations
  function setBackgroundColor(){
    ctx.fillStyle = '#090914';
    ctx.fillRect(0 , 0, canvas.width, canvas.height);
  }

  function setTextPosition(event) {
    
  
  
    let midpoint = middleOfScreen();
    let cursor = mouseMovement(event);
    let diffX = ((midpoint.x )+ (cursor.x/(100)));
    let diffY = ((midpoint.y )+ (cursor.y/(100)));
    // Set the font style
    ctx.font = "bold 24px 'IBM Plex Mono', monospace";
    ctx.fillText("björnfoot", diffX, diffY);
  }



  //Initialize everything to be drawn
  
  function draw() {
    // Clear the canvas
    setBackgroundColor();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
   
    //Update text to be drawn

    //Adding eventlistener so that it gets its functionality
    document.addEventListener('mousemove', function(event) {
      setTextPosition(event);
      });



    // Request the next frame
    requestAnimationFrame(draw);

  }

  // Start the animation loop
  draw();
});


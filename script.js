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

function setTextPosition(event) {
  text  = document.getElementById('name-holder');


  let midpoint = middleOfScreen();
  let cursor = mouseMovement(event);
  let diffX = ((midpoint.x - (text.offsetWidth/2))- (cursor.x/(100)));
  let diffY = ((midpoint.y - (text.offsetHeight/2))- (cursor.y/(100)));
  text.style.left = diffX + "px";
  text.style.top = diffY + "px";
}





document.addEventListener('mousemove', function(event) {
setTextPosition(event);
});

  
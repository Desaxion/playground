let balls = [];


document.addEventListener('DOMContentLoaded', () => {
/*----------------MOUSE MOVEMENT ------------------*/


let mouse = {x:0, y:0};

document.addEventListener('mousemove', (event) => {
  mouse = mouseMovement(event);
})
/*-----------CALCULATE MIDDLE OF SCREEN-----------*/
function middleOfScreen() {
  var screenWidth = window.innerWidth;
  var screenHeight = window.innerHeight;
  var x = screenWidth / 2;
  var y = screenHeight / 2;
  var midPoint = {x, y};
return midPoint;
}

// Remove all balls if the right click is hit
document.addEventListener("contextmenu", function(event) {
  // Prevent the default context menu from showing up
  event.preventDefault();
  let allBalls = Array.from(document.getElementsByClassName('ball'));
  allBalls.forEach(ball => {ball.remove()});
  ballCounter = 0;
  balls.length = 0;
});

//Eventlistener to the document of adding divs.
let ballCounter = 0;
let background = document.getElementById('background')


function addBall() {

  // Godot checkout
  
  const ballRadius = 25;
  const ballWeight = 3;
  let ballPosition = {x: mouse.x - ballRadius, y: mouse.y - ballRadius };

  let ball = document.createElement('div');
  ball.setAttribute('id', `ball-${ballCounter}`);
  ball.classList.add('ball');

  ball.style.width = 2*ballRadius + 'px';
  ball.style.height = 2*ballRadius + 'px'; 
  

  ball.style.top =  ballPosition.y + 'px';
  ball.style.left = ballPosition.x + 'px';

  background.appendChild(ball);
  ballCounter++;

}

document.addEventListener('click', () => {
  addBall();
  })
})

function mouseMovement(event) {
  var x = event.clientX;
  var y = event.clientY;
  var cursor = {x, y};
  return cursor;
};
  



//Main tick function
const intervalMilliseconds = 16; // approximately 60 frames per second

function tick() {
  // Your code to be executed at every tick goes here

  // For example, you could update the game state, animation, etc.
}

// Start the interval
const intervalID = setInterval(tick, intervalMilliseconds);

// To stop the interval (for example, when you want to pause the tick):
// clearInterval(intervalID);


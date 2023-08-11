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
const background = document.getElementById('background')


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

  const newBall = {position:{x:ballPosition.x, y:ballPosition.y},velocity:{x:0,y:0},acceleration:{x:0,y:0},weight:ballWeight,radius:ballRadius, element: ball};
  balls.push(newBall)
  ballCounter++;

}

document.addEventListener('click', () => {

  addBall();
  })

function mouseMovement(event) {
  var x = event.clientX;
  var y = event.clientY;
  var cursor = {x, y};
  return cursor;
};
  



//Main tick function
let intervalMilliseconds = 16; // approximately 60 frames per second
const dt = intervalMilliseconds;
const gravity = 0.001;
function tick() {
  for(let i = 0; i < balls.length; i++){

    balls[i].acceleration.y = gravity;
    
    // Forward euler time integration
    balls[i].velocity.x = balls[i].velocity.x + balls[i].acceleration.x*dt
    balls[i].velocity.y = balls[i].velocity.y + balls[i].acceleration.y*dt

    balls[i].position.x = balls[i].position.x + balls[i].velocity.x*dt
    balls[i].position.y = balls[i].position.y + balls[i].velocity.y*dt

    balls[i].element.style.left = balls[i].position.x + 'px';
    balls[i].element.style.top = balls[i].position.y + 'px';
  }
  // Your code to be executed at every tick goes here

  // For example, you could update the game state, animation, etc.
}

// Start the interval
const intervalID = setInterval(tick, intervalMilliseconds);



// To stop the interval (for example, when you want to pause the tick):
// clearInterval(intervalID);

})
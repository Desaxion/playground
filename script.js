let balls = [];
let pegs = [];

document.addEventListener('DOMContentLoaded', () => {
/*----------------MOUSE MOVEMENT ------------------*/
var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;

let mouse = {x: 0, y: 0};

const EPSILON = 0.0000001;
const PSI = 0.001;
const arrow = document.getElementById('shoot-arrow')
const topMid = {x: middleOfScreen().midX, y: 80 }
arrow.style.left = topMid.x + 'px';
arrow.style.top = topMid.y +'px';
arrow.style.transform = `translateY(-50%)`;

function getArrowAngle() {
  let xDiff = mouse.x - topMid.x;
  let yDiff = mouse.y - topMid.y;
  let arrowAngle;
  if(yDiff > 0) {
  arrowAngle = Math.PI - Math.atan(xDiff/yDiff);
  } else if(Math.abs(yDiff) < EPSILON) { // If it is on y = 0
    if(xDiff < 0) { // if the mouse is to the left of the arrow
      arrowAngle = Math.PI*3 / 2;
    } else { // Otherwise it is to the right of the arrow
      arrowAngle = Math.PI / 2;
    }
  } else {
  arrowAngle = - Math.atan(xDiff/yDiff);
  }
  return arrowAngle;
}

document.addEventListener('mousemove', (event) => {
  arrow.style.opacity = '1'
  mouse = mouseMovement(event);
  let xDiff = mouse.x - topMid.x;
  let yDiff = mouse.y - topMid.y;

  let arrowAngle = getArrowAngle();

  const translationLimit = 200;
  let translation = distance(mouse,topMid);
  if(translation > translationLimit) { translation = translationLimit; } // clamp the distance to the translation limit
  arrow.style.transform = `translateY(-50%) rotate(${arrowAngle}rad) translateY(-${translation}px) translateY(100%)`
})
/*-----------CALCULATE MIDDLE OF SCREEN-----------*/
function middleOfScreen() {
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

function rotateVec2(vec2, angle){
  return {x: Math.cos(angle)*vec2.x - Math.sin(angle)*vec2.y, y: Math.sin(angle)*vec2.x + Math.cos(angle)*vec2.y};
}

function addBall() {

  // Godot checkout
  
  const ballRadius = 17;
  const ballThickness = 3;
  const ballWeight = 3;
  const ballEnergyConservation = 0.5;
  //let ballPosition = {x: mouse.x - ballRadius, y: mouse.y - ballRadius }; // This spawns the ball at the mousePointer
  let ballPosition = {x: topMid.x - ballRadius, y: topMid.y - ballRadius }; // This spawns the ball at the topMid-position (which the arrow stems from)
  let ball = document.createElement('div');
  ball.setAttribute('id', `ball-${ballCounter}`);
  ball.classList.add('ball');

  ball.style.width = 2*ballRadius + 'px';
  ball.style.height = 2*ballRadius + 'px'; 
  ball.style.border = ballThickness + "px solid white";

  ball.style.top =  ballPosition.y + 'px';
  ball.style.left = ballPosition.x + 'px';


  background.appendChild(ball);

  let ballSpeed = 2;



  let ballVelocity = {x: 0, y: -ballSpeed}
  ballVelocity = rotateVec2(ballVelocity,getArrowAngle());

  /*
 |
 |   NOTE: THE BALLS POSITION IS COUNTED FROM THE UPPERLEFT CORNER:
 |        HERE ----> x  _____
 |                     /     \ 
 |                    |       |
 |                     \_____/
  */
  const newBall = {position:{x:ballPosition.x, y:ballPosition.y},velocity:ballVelocity,acceleration:{x:0,y:0},weight:ballWeight,radius:ballRadius + ballThickness,leftLimit: {x: ballPosition.x, y: ballPosition.y + this.radius}, rightLimit:  {x: ballPosition.x + 2*this.radius, y: ballPosition.y + this.radius}, topLimit : {x: ballPosition.x + this.radius, y: ballPosition.y}, bottomLimit: {x: ballPosition.x + this.radius, y: ballPosition.y + 2*this.radius}, energyConservation: ballEnergyConservation, element: ball};
  balls.push(newBall)
  
  let addedBall = document.getElementById(`ball-${ballCounter}`)
  addedBall.style.opacity = '1'
  
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
let intervalMilliseconds = 15; // approximately 60 frames per second
const dt = intervalMilliseconds;
const gravity = 9.82;
const damping = 0.0001;
const frictionCoefficient = 0.7;
const scaleCoefficient = 0.0001;

function tick() {
  for(let i = 0; i < balls.length; i++){

//balls[i].position.x = mouse.x - balls[i].radius;
//balls[i].position.y = mouse.y - balls[i].radius;

    balls[i].leftLimit  = { x: balls[i].position.x, y: balls[i].position.y + balls[i].radius };
    balls[i].rightLimit = { x: balls[i].position.x + 2 * balls[i].radius, y: balls[i].position.y + balls[i].radius };

    balls[i].topLimit    = { x: balls[i].position.x + balls[i].radius, y: balls[i].position.y };
    balls[i].bottomLimit = { x: balls[i].position.x + balls[i].radius, y: balls[i].position.y + 2 * balls[i].radius };

    // Calculate "mirror image" points that are on veiwport edges but has the same x and y as the ball, to be able to use the "collision" function
    // The mirror on the vertical edges
    let mirrorImageLeft   =  {x: 0, y: balls[i].position.y + balls[i].radius};
    let mirrorImageRight  =  {x: screenWidth, y: balls[i].position.y + balls[i].radius};
    let mirrorImageTop    =  {x: balls[i].position.x +  balls[i].radius, y: 0}
    let mirrorImageBottom =  {x: balls[i].position.x + balls[i].radius, y: screenHeight}


    const bounceTime = 0.1;
    // Calculate the energy movement for the ball
    let kineticEnergy = { x: balls[i].weight*balls[i].velocity.x*balls[i].velocity.x * (1/2), y: balls[i].weight*balls[i].velocity.y*balls[i].velocity.y * (1/2)};
    let resultingEnergy = { x:kineticEnergy.x*balls[i].energyConservation, y:kineticEnergy.y*balls[i].energyConservation};

    let momentum = { x: balls[i].velocity.x * balls[i].weight, y: balls[i].velocity.y * balls[i].weight };
    let momentumAfter = {x: 0, y: 0};
    let force = {x: 0, y: 0};
    /* NOTE:
    | F = Δp / Δt --> a = (Δp / Δt * m)
    |
    | This also means that if 
    |
    |   k*m*v_1^2/2 = m*v_2^2/2
    |          <-> 
    |      k*v_1^2 = v_2^2
    |   Which leads to
    |   v_2 = sqrt(k)*v_1
    |   Where k is the percentage of energy conservated after the bounce
    |   Note that the velocities also are pointing at each other, the square removes the sign
    */

    let ballMidpoint = {x: balls[i].position.x + balls[i].radius, y: balls[i].position.y + balls[i].radius };
    // Check if any of the sides have collided with the viewport edges (Maybe better way of doing this later?)
  
    if(collision(ballMidpoint, mirrorImageLeft, balls[i].radius, 0)) {
      // Collided with the left wall
      balls[i].velocity.x = -balls[i].velocity.x*Math.sqrt(balls[i].energyConservation);
      momentumAfter.x = balls[i].velocity.x*balls[i].weight;
      force.x += (momentumAfter.x - momentum.x)/bounceTime;
    }else if(collision(ballMidpoint, mirrorImageRight, balls[i].radius, 0)) {
      // Collided with the right wall
      balls[i].velocity.x = -balls[i].velocity.x*Math.sqrt(balls[i].energyConservation);
      momentumAfter.x = balls[i].velocity.x*balls[i].weight;
      force.x += (momentumAfter.x - momentum.x)/bounceTime;
    } else {
      // Calculate horizontal acceleration accordingly
    }
    // Maybe apply constant horizontal force if wanted

    //Friction if ball is rolling on floor (Not working atm!)
   /* if(Math.abs(balls[i].velocity.y) < PSI) { 
      //console.log((balls[i].velocity.x / Math.abs(balls[i].velocity.x)) * gravity*balls[i].weight*frictionCoefficient)
      force.x += (balls[i].velocity.x / Math.abs(balls[i].velocity.x)) * gravity*balls[i].weight*frictionCoefficient;
    }*/

    if(collision(ballMidpoint, mirrorImageTop, balls[i].radius, 0)) {
      // Collided with the top wall
      balls[i].velocity.y = -balls[i].velocity.y*Math.sqrt(balls[i].energyConservation);
      momentumAfter.y = balls[i].velocity.y*balls[i].weight;
      force.y += (momentumAfter.y - momentum.y)/bounceTime;
    } else if(collision(ballMidpoint, mirrorImageBottom, balls[i].radius, 0)) {
      // Collided with the bottom wall
      // Calculate the new velocity in accordance with the formula above:
      balls[i].velocity.y = -balls[i].velocity.y*Math.sqrt(balls[i].energyConservation);
      momentumAfter.y = balls[i].velocity.y*balls[i].weight;
      force.y += (momentumAfter.y - momentum.y)/bounceTime;
      

    } else {
      // Calculate vertical acceleration accordingly
    }
    // Always apply gravity
    force.y += gravity*balls[i].weight;
    
    balls[i].acceleration.x = force.x/balls[i].weight*scaleCoefficient;
    balls[i].acceleration.y = force.y/balls[i].weight*scaleCoefficient;
    // Forward euler time integration, using the correct retrieved acceleration
    balls[i].velocity.x = balls[i].velocity.x + balls[i].acceleration.x*dt //- damping;
    balls[i].velocity.y = balls[i].velocity.y + balls[i].acceleration.y*dt //- damping;

    // Making check so that balls arent outside of the walls
    if(balls[i].position.y + 2*balls[i].radius > screenHeight) {
      balls[i].position.y = screenHeight - 2*balls[i].radius;
    } else if(balls[i].position.y < 0) {
      balls[i].position.y = 0;
    }
    if(balls[i].position.x + 2*balls[i].radius > screenWidth) {
      balls[i].position.x = (screenWidth - 2*balls[i].radius);
    } else if (balls[i].position.x < 0) {
      balls[i].position.x = 0;
    }



    balls[i].position.x = balls[i].position.x + balls[i].velocity.x*dt
    balls[i].position.y = balls[i].position.y + balls[i].velocity.y*dt

    // Setting visual representation
    balls[i].element.style.top = balls[i].position.y + 'px';
    balls[i].element.style.left = balls[i].position.x + 'px';
  }
  //console.log(pointInsideViewport(mouse));
  //More things that are executed every tick
}

// Start the interval
const intervalID = setInterval(tick, intervalMilliseconds);

function outsideX(position) {
  return (position.x < 0 || position.x > screenWidth);
}

function outsideY(position) {
  return (position.y < 0 || position.y > screenHeight);
}

function outside(position,min, max) {
  return (position < min || position > max);
}

function distance(a,b) {

  return Math.sqrt((a.x - b.x)*(a.x - b.x) + (a.y - b.y)*(a.y - b.y));

}

function collision(lhsPosition, rhsPosition, lhsRadius, rhsRadius){
  return (distance(lhsPosition,rhsPosition) < (lhsRadius + rhsRadius));
}



//Checks if the input is inside the vieport or not
function pointOutsideViewport(point) {
 return ((point.x < 0 || point.x > screenWidth)||(point.y < 0 || point.y > screenHeight));
}



// To stop the interval (for example, when you want to pause the tick):
// clearInterval(intervalID);

})


document.addEventListener('DOMContentLoaded', () => {

  let playButton = document.createElement('button');
  playButton.textContent = 'Play Pachinko';
  document.getElementById('game-area').appendChild(playButton);
  playButton.addEventListener('click', () => {
    setupPachinko();
    playButton.remove();
  })



})






//const math = require('..')
function setupPachinko() {

  const goBackButton = document.getElementById('back-button')
  //Remove if connected to any other game
  goBackButton.addEventListener('click', () => {
      clearPachinko();
  }, {once:true})
    

  let newGameSpace = document.createElement('div');
  newGameSpace.setAttribute('id','gamespace');
  let back = document.getElementById('game-area');
  back.appendChild(newGameSpace); 
  let pegs = [];
  let balls = [];
  let gamePlaying = true;



  const pegThickness = 2;
  const startupLives = 10;
  let lives = startupLives;
  function setUpLevel(level) {
    for(let i = 0; i < level.pegs.length; i++){
      let tempPeg = { position: level.pegs[i].position, hit: false, radius: level.pegs[i].radius, id: i }
      pegs.push(tempPeg)
    }


    //Make the pegs visible
    for(let i = 0; i < pegs.length; i++){
      let peg = document.createElement('div');
      peg.classList.add('peg')
      peg.setAttribute('id', `peg-${pegs[i].id}`);
      //Add styling attributes to the peg
      peg.style.left = pegs[i].position.x + 'px';
      peg.style.top = pegs[i].position.y + 'px';
      peg.style.width = (2*pegs[i].radius - 2*pegThickness) + 'px';
      peg.style.height = (2*pegs[i].radius - 2*pegThickness) + 'px';
      //peg.style.background = 'white';
      peg.style.border = `${pegThickness}px solid white`;
      //peg.style.transform = `translateX(-${pegs[i].radius - pegThickness}px) translateY(-${pegs[i].radius - pegThickness}px)`;
      peg.style.transform = `translate(-${pegs[i].radius}px, -${pegs[i].radius}px)`;
  
      gamespace.appendChild(peg);
  
    }
    //add the arrow to the code
  
  }
  
  function updateLevel() {
    let newPegs = [];
    for(let i = 0; i < pegs.length; i++){
      if(pegs[i].hit){
        //Remove the peg
        
        let elementPeg = document.getElementById(`peg-${pegs[i].id}`);
        if(elementPeg){
        elementPeg.remove(); 
        pegs.splice(i,1);
        i--;
        }
      }
    }
  }
  
  
    document.getElementById('gamespace').innerHTML += '<i class="arrow" id="shoot-arrow"></i>';
  /*----------------MOUSE MOVEMENT ------------------*/
  //var screenWidth = window.innerWidth;
  //var screenHeight = window.innerHeight;
  const gamespace = document.getElementById('gamespace');
  let screenWidth = gamespace.clientWidth;
  let screenHeight = gamespace.clientHeight;
  
  let gameSpaceLeftEdge = gamespace.offsetLeft;
  
  let gameSpaceRightEdge = gamespace.offsetLeft + screenWidth;
  
  let gameSpaceTopEdge = gamespace.offsetTop;
  
  let gameSpaceBottomEdge = gamespace.offsetTop + screenHeight;
  


  let gameInfoBar = document.createElement('div');
  
  gameInfoBar.style.position = 'absolute';
  gameInfoBar.style.top = gamespace.offsetTop / 2  /*(screenHeight) */+ 'px';
  gameInfoBar.style.left =  gamespace.offsetLeft + 'px';
  gameInfoBar.style.minHeight = 'max-content';
  gameInfoBar.style.minWidth = gamespace.clientWidth + 'px';
  //gameInfoBar.style.padding = '10px';
  gameInfoBar.style.display = 'flex';
  gameInfoBar.style.flexDirection = 'row';
  gameInfoBar.style.justifyContent = 'space-between';

  let ballContainer = document.createElement('div');
  for(let i = 0; i < lives; i++){
    tempBall = document.createElement('div');
    tempBall.classList.add('ball')
    tempBall.setAttribute('id',`ball-life-${i}`)
    tempBall.style.opacity = "1";
    tempBall.style.width = '15px'
    tempBall.style.height = '15px'
    tempBall.style.position = 'relative'
    tempBall.style.margin = '0 0 0 3px'
    
    ballContainer.appendChild(tempBall)
    
  }
  ballContainer.style.minWidth = 'max-content';
  ballContainer.style.minHeight = 'max-content';
  ballContainer.style.display = 'flex';
  ballContainer.style.flexDirection = 'row';

  let score = 0;

  let scoreBoard = document.createElement('h3');
  scoreBoard.classList.add('gameText');
  scoreBoard.style.margin = '0px';
  scoreBoard.textContent = score;
  gameInfoBar.appendChild(scoreBoard);
  gameInfoBar.appendChild(ballContainer);
  gamespace.appendChild(gameInfoBar)
  // gameInfoBar.style.transform = 'translateY(-100%)';
 
 /*let gameSpaceLeftEdge =;
 
  let gameSpaceRightEdge = gamespace.offsetLeft + screenWidth;
 
  let gameSpaceTopEdge = gamespace.offsetTop;
 
  let gameSpaceBottomEdge = gamespace.offsetTop + screenHeight;
 */



  //console.log(gamespace)
  let mouse = {x: 0, y: 0};
  
  const EPSILON = 0.0000001;
  const PSI = 0.001;
  const arrow = document.getElementById('shoot-arrow')
  const topMid = {x: middleOfScreen().midX, y: gameSpaceTopEdge  + 80 }
  arrow.style.left = topMid.x + 'px';
  arrow.style.top = topMid.y +'px';
  arrow.style.transform = `translateY(-50%)`;
  
  // Level declaration and design (maybe store them in a separate file)
  const level1 = {pegs : []};
  let level1Radius = 10;
  let rad = 100;
  let rows = 5;
  let columns = 10;
  let add = 70;
  let base = {x: 400, y: 400}
  //level1.pegs.push({position: {x: middleOfScreen().midX, y: middleOfScreen().midY }, radius: level1Radius})
  for(let i = 0; i < rows; i++){
   /* if(i % 2 == 0){
      base.x = 400;
      //add = add + add/2;
    } else{
      base.x = 430;
      //add = 70;
    }
    for(let j = 0; j < columns; j++ ) {
     
      level1.pegs.push({position: {x: base.x + j*add, y: base.y + i*60 }, radius: level1Radius})
    }*/
    level1.pegs.push({position: {x: middleOfScreen().midX + 100*Math.cos(10*i), y: middleOfScreen().midY + 100*Math.sin(10*i)}, radius: level1Radius})
  }
  
  
  setUpLevel(level1);
  //console.log(pegs)
  
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
  
  if(gamePlaying) {
    arrow.style.opacity = '1'
    mouse = mouseMovement(event);
    let xDiff = mouse.x - topMid.x;
    let yDiff = mouse.y - topMid.y;
  
    let arrowAngle = getArrowAngle();
  
  /*  Mouse Logging  */
  //console.log(mouse); 
  /*if(collision(mouse,pegs[0].position,0,pegs[0].radius)){
    //console.log(pegs[0].radius)
    let thePeg = document.getElementById('peg-0');
    if(!thePeg.classList.contains('collision')){
      thePeg.classList.add('collision')
    }
    //console.log("MOUSE COLLISION AT: ",mouse )
    console.log("pegPos:",pegs[0].position)
  } else{
    let thePeg = document.getElementById('peg-0')
    if(thePeg.classList.contains('collision')){
      thePeg.classList.remove('collision')
    }
  }*/
  
  
    const translationLimit = 100;
    let translation = distance(mouse,topMid);
    if(translation > translationLimit) { translation = translationLimit; } // clamp the distance to the translation limit
    
    //Make arrow stay inside gamespace
  
    arrow.style.transform = `translateY(-50%) rotate(${arrowAngle}rad) translateY(-${translation}px) translateY(100%)`
  }
  })
  /*-----------CALCULATE MIDDLE OF SCREEN-----------*/
  function middleOfScreen() {
      //console.log("widht:", screenWidth)
      //console.log("height",screenHeight)
      var midX = (screenWidth  / 2)+ gamespace.offsetLeft;
      var midY = (screenHeight  / 2)+ gamespace.offsetTop;
      var midPoint = {midX, midY};
    return midPoint;
    }
  
  
  //Declare cursor
  let x = middleOfScreen().midX;
  let y = middleOfScreen().midY;
  
  
  
  
  // Remove all balls if the right click is hit (Disabled atm)
  /*
  document.addEventListener("contextmenu", function(event) {
    // Prevent the default context menu from showing up
    event.preventDefault();
    let allBalls = Array.from(document.getElementsByClassName('ball'));
    allBalls.forEach(ball => {ball.remove()});
    ballCounter = 0;
    balls.length = 0;
  });
  */

  //Eventlistener to the document of adding divs.
//This is to keep track of score. Set to 10000 just to make sure it doesnt begin as the same as ballcounter
  let ballCount = 10000;

  let ballCounter = 0;
  //const gamespace = document.getElementById('gamespace')
  
  function rotateVec2(vec2, angle){
    return {x: Math.cos(angle)*vec2.x - Math.sin(angle)*vec2.y, y: Math.sin(angle)*vec2.x + Math.cos(angle)*vec2.y};
  }
  
  function addBall() {
  
    // Godot checkout
    
    const ballRadius = 10;
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
  
  
    gamespace.appendChild(ball);
  
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
  
  gamespace.addEventListener('click', () => {
    if(balls.length == 0 && lives != 0 && gamePlaying) {
    addBall();
    lives -= 1;
    //remove one ball life
    document.getElementById(`ball-life-${ballCounter - 1}`).remove();

    }
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

    let additionalSum = 50;
    for(let i = 0; i < balls.length; i++){

   

      //balls[i].position.x = mouse.x - balls[i].radius;
      //balls[i].position.y = mouse.y - balls[i].radius;
  
      balls[i].leftLimit  = { x: balls[i].position.x, y: balls[i].position.y + balls[i].radius };
      balls[i].rightLimit = { x: balls[i].position.x + 2 * balls[i].radius, y: balls[i].position.y + balls[i].radius };
  
      balls[i].topLimit    = { x: balls[i].position.x + balls[i].radius, y: balls[i].position.y };
      balls[i].bottomLimit = { x: balls[i].position.x + balls[i].radius, y: balls[i].position.y + 2 * balls[i].radius };
  
      // Calculate "mirror image" points that are on veiwport edges but has the same x and y as the ball, to be able to use the "collision" function
      // The mirror on the vertical edges
      let mirrorImageLeft   =  {x: gameSpaceLeftEdge, y: balls[i].position.y + balls[i].radius};
      let mirrorImageRight  =  {x: gameSpaceRightEdge, y: balls[i].position.y + balls[i].radius};
      let mirrorImageTop    =  {x: balls[i].position.x +  balls[i].radius, y: gameSpaceTopEdge}
      let mirrorImageBottom =  {x: balls[i].position.x + balls[i].radius, y: gameSpaceBottomEdge}
  
  
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
         //Check ball collision with pegs
         for(let j = 0; j < pegs.length; j++){
          //Check for each peg if the ball has collided with the peg
          
          if(collision(ballMidpoint,pegs[j].position,balls[i].radius,pegs[j].radius)){
          //Make element show it is hit

       

          let pegElement = document.getElementById(`peg-${pegs[j].id}`)
          pegElement.style.background = 'white'//"rgba(1,1,1,1)";
          
          //Calculate new force and such
          let velocityArray = [balls[i].velocity.x, balls[i].velocity.y]  
          let normalMagnitude = distance(ballMidpoint, pegs[j].position); 
          let normalDirection = {x: (ballMidpoint.x - pegs[j].position.x) / normalMagnitude, y: (ballMidpoint.y - pegs[j].position.y) / normalMagnitude}
          
          let velocityDirection = {x: balls[i].velocity.x / math.norm(velocityArray), y:balls[i].velocity.y / math.norm(velocityArray)}
  
          //console.log(normalDirection)
            //If ball inside the peg
           if(distance(ballMidpoint, pegs[j].position) < (balls[i].radius + pegs[j].radius)) {
              //Move ball to edge of peg
              //balls[i].position.x = pegs[j].position.x + normalDirection.x * (pegs[j].radius + balls[i].radius);
              //balls[i].position.y = pegs[j].position.y + normalDirection.y * (pegs[j].radius + balls[i].radius);
              //Move the ball backwards
            }
              let backStep = 0.1;
              
                while(distance(ballMidpoint, pegs[j].position) < (balls[i].radius + pegs[j].radius)){
                  balls[i].position.x = balls[i].position.x - velocityDirection.x*backStep;
                  balls[i].position.y = balls[i].position.y - velocityDirection.y*backStep;
                  ballMidpoint = {x: balls[i].position.x + balls[i].radius, y: balls[i].position.y + balls[i].radius };
                }
            
      
        
          //Convert them to array
          let normalArray = [normalDirection.x, normalDirection.y];
  
          let up = [0,1];
          let normalAngle = (Math.acos((math.dot(up,normalArray))/(math.norm(up)*math.norm(normalArray))) - Math.PI)*(normalDirection.x/Math.abs(normalDirection.x)*-1);
  
          //Find angle between normal and incline angle for reflection angle
          let angleDiff = Math.acos((math.dot(normalArray,velocityArray))/(math.norm(normalArray)*math.norm(velocityArray)))*-1*(normalDirection.x/Math.abs(normalDirection.x))
          //console.log(angleDiff * (180/Math.PI))
          //Divide components with length
          //Normalize the velocity vector to calculate bounce direction and such.
  
          const rotationMatrix = math.matrix([
            [Math.cos(angleDiff), -Math.sin(angleDiff)],
            [Math.sin(angleDiff), Math.cos(angleDiff)]
          ]);
  
          
          
          // Rotate the vector using the rotation matrix
          let newVelocity = math.multiply(rotationMatrix, velocityArray);
          //console.log(force)
          //console.log(newVelocity._data[0],newVelocity._data[1]);
          balls[i].velocity.x = newVelocity._data[0]*Math.sqrt(balls[i].energyConservation);
          momentumAfter.x = balls[i].velocity.x*balls[i].weight;
          force.x += (momentumAfter.x - momentum.x)/bounceTime;
  
          balls[i].velocity.y = newVelocity._data[1]*Math.sqrt(balls[i].energyConservation);
          momentumAfter.y = balls[i].velocity.y*balls[i].weight;
          force.y += (momentumAfter.y - momentum.y)/bounceTime;
          //console.log(force);
          //balls[i].velocity = {x: 0, y: 0};
     

          let sameBall = false;
          if(ballCount != ballCounter) {
            ballCount = ballCounter;
          } else if(ballCount == ballCounter) {
            sameBall = true;
          }

          // MAke this work
          if(sameBall){
            additionalSum += 25;
          }
          if(!pegs[j].hit){
          score += additionalSum;

          pegs[j].hit = true;
          }
          }

    
        }
      
      
      
      
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
      } /*else if(collision(ballMidpoint, mirrorImageBottom, balls[i].radius, 0)) {
        // Collided with the bottom wall
        // Calculate the new velocity in accordance with the formula above:
        balls[i].velocity.y = -balls[i].velocity.y*Math.sqrt(balls[i].energyConservation);
        momentumAfter.y = balls[i].velocity.y*balls[i].weight;
        force.y += (momentumAfter.y - momentum.y)/bounceTime;
        
  
      } */else {
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
      if(balls[i].position.y + 2*balls[i].radius > gameSpaceBottomEdge) {
        //balls[i].position.y = screenHeight - 2*balls[i].radius;
      } else if(balls[i].position.y < gameSpaceTopEdge) {
        balls[i].position.y = gameSpaceTopEdge;
      }
      if(balls[i].position.x + 2*balls[i].radius > gameSpaceRightEdge) {
        balls[i].position.x = (gameSpaceRightEdge - 2*balls[i].radius);
      } else if (balls[i].position.x < gameSpaceLeftEdge) {
        balls[i].position.x = gameSpaceLeftEdge;
      }

      balls[i].position.x = balls[i].position.x + balls[i].velocity.x*dt
      balls[i].position.y = balls[i].position.y + balls[i].velocity.y*dt

      if(outsideYBottom(balls[i].position)){
        //Not working correctly, fix outsideX and outsideY functions
        balls[i].element.style.opacity = '0';
        balls[i].element.remove();
        //remove the ball
        balls.length = 0;
        updateLevel();

        if(pegs.length == 0) {
        gamePlaying = false;

        let winnerText = document.createElement('h2');
        winnerText.classList.add('gameText');
        let scoreText = document.createElement('h4');
        scoreText.classList.add('gameText');
        let replayButton = document.createElement('button');
        winnerText.textContent = 'You win!';
        scoreText.textContent = 'Score: ' + score;
        replayButton.textContent = 'Play again';
  
        let arrow =  document.getElementById('shoot-arrow').style.opacity = 0;
        gamespace.appendChild(winnerText);
        gamespace.appendChild(scoreText);
        gamespace.appendChild(replayButton);
  


        replayButton.addEventListener('click', (event) => {
          event.preventDefault(); // prevent the event from propagating upwards! (not working)
          clearPachinko();
          setupPachinko();
          //restart(level1);
        })
        }
        if(lives == 0){
          gamePlaying = false;
        
        //Remove all pegs
        for(let i = 0; i < pegs.length; i++){
          document.getElementById(`peg-${i}`).remove();
        }
        
        pegs.length = 0;
        let winnerText = document.createElement('h2');
        winnerText.classList.add('gameText');
        let scoreText = document.createElement('h4');
        scoreText.classList.add('gameText');
        let replayButton = document.createElement('button');
        winnerText.textContent = 'Game Over!';
        scoreText.textContent = 'You ran out of lives!';
        replayButton.textContent = 'Play again';
  
        let arrow =  document.getElementById('shoot-arrow').style.opacity = 0;
        gamespace.appendChild(winnerText);
        gamespace.appendChild(scoreText);
        gamespace.appendChild(replayButton);
  


        replayButton.addEventListener('click', (event) => {
          event.preventDefault(); // prevent the event from propagating upwards! (not working)
          clearPachinko();
          setupPachinko();
          //restart(level1);
        })
        }
      }

      if(balls.length > 0){
      balls[i].element.style.top = balls[i].position.y + 'px';
      balls[i].element.style.left = balls[i].position.x + 'px';
    }


    }
    //console.log(pointInsideViewport(mouse));
    //More things that are executed every tick
    //updating score text
    scoreBoard.textContent = score;
    gameInfoBar.style.top = gamespace.offsetTop / 2  /*(screenHeight) */+ 'px';
    gameInfoBar.style.left =  gamespace.offsetLeft + 'px';
  
  }
  
  // Start the interval
  const intervalID = setInterval(tick, intervalMilliseconds);
  
  function outsideX(position) {
    return (position.x < gameSpaceLeftEdge || position.x > gameSpaceRightEdge);
  }
  
  function outsideY(position) {
    return (position.y < gameSpaceTopEdge || position.y > gameSpaceBottomEdge);
  }
  function outsideYBottom(position) {
    return (position.y > gameSpaceBottomEdge);
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
  
  
  
  
  function clearPachinko() {
    gamespace.remove();
    pegs.length = 0;
    balls.length = 0;

    let playButton = document.createElement('button');
    playButton.textContent = 'Play Pachinko';
    document.getElementById('game-area').appendChild(playButton);
    playButton.addEventListener('click', () => {
      setupPachinko();
      playButton.remove();
    })
  

  }
  
  
  
  // To stop the interval (for example, when you want to pause the tick):
  // clearInterval(intervalID);
  
  }
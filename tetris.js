const borderWidth = 1;
const blockspace = window.innerHeight*0.7/20 + 2*borderWidth; // Maybe adjust this when resizing

let pieces = [];
let spawnPoints = [];
// initialize gameboard
let gameboard = [];


for(let i = 0; i < 20; i++){
    gameboard[i] = [];
    for(let j = 0; j < 10; j++){
       // gameboard[i][j] = `${i},${j}`//false;
       gameboard[i][j] = false;
    }
};


const emptyPieceLocation = gameboard;
let newPieceLocation = emptyPieceLocation;

document.addEventListener('DOMContentLoaded', () => {

function setUpTetris() {
    let tempPiece_0 = []
    tempPiece_0[0] = []
    tempPiece_0[1] = []
    //Setup an array with all piecetypes

    let tempPiece_1 = []
    tempPiece_1[0] = []
    tempPiece_1[1] = []

    let tempPiece_2 = []
    tempPiece_2[0] = []
    tempPiece_2[1] = []

    let tempPiece_3 = []
    tempPiece_3[0] = []
    tempPiece_3[1] = []

    let tempPiece_4 = []
    tempPiece_4[0] = []
    tempPiece_4[1] = []

    let tempPiece_5 = []
    tempPiece_5[0] = []
    tempPiece_5[1] = []

    // XX
    //  XX
    tempPiece_0[0][0] = true;
    tempPiece_0[0][1] = true;
    tempPiece_0[0][2] = false;
    tempPiece_0[0][3] = false;
    tempPiece_0[1][0] = false;
    tempPiece_0[1][1] = true;
    tempPiece_0[1][2] = true;
    tempPiece_0[1][3] = false;
    pieces.push(tempPiece_0);
    spawnPoints.push({x:4,y:0})
    
    //  XX
    // XX
    tempPiece_1[0][0] = false;
    tempPiece_1[0][1] = true;
    tempPiece_1[0][2] = true;
    tempPiece_1[0][3] = false;
    tempPiece_1[1][0] = true;
    tempPiece_1[1][1] = true;
    tempPiece_1[1][2] = false;
    tempPiece_1[1][3] = false;
    pieces.push(tempPiece_1);
    spawnPoints.push({x:4,y:0})
    // XXXX
    tempPiece_2[0][0] = true;
    tempPiece_2[0][1] = true;
    tempPiece_2[0][2] = true;
    tempPiece_2[0][3] = true;
    tempPiece_2[1][0] = false;
    tempPiece_2[1][1] = false;
    tempPiece_2[1][2] = false;
    tempPiece_2[1][3] = false;
    pieces.push(tempPiece_2);
    spawnPoints.push({x:4,y:0})
    // XX
    // XX
    tempPiece_3[0][0] = false;
    tempPiece_3[0][1] = true;
    tempPiece_3[0][2] = true;
    tempPiece_3[0][3] = false;
    tempPiece_3[1][0] = false;
    tempPiece_3[1][1] = true;
    tempPiece_3[1][2] = true;
    tempPiece_3[1][3] = false;
    pieces.push(tempPiece_3);
    spawnPoints.push({x:4,y:0})
    // X
    // XXX
    tempPiece_4[0][0] = true;
    tempPiece_4[0][1] = false;
    tempPiece_4[0][2] = false;
    tempPiece_4[0][3] = false;
    tempPiece_4[1][0] = true;
    tempPiece_4[1][1] = true;
    tempPiece_4[1][2] = true;
    tempPiece_4[1][3] = false;
    pieces.push(tempPiece_4);
    spawnPoints.push({x:4,y:0})

    //   X
    // XXX
    tempPiece_5[0][0] = false;
    tempPiece_5[0][1] = false;
    tempPiece_5[0][2] = true;
    tempPiece_5[0][3] = false;
    tempPiece_5[1][0] = true;
    tempPiece_5[1][1] = true;
    tempPiece_5[1][2] = true;
    tempPiece_5[1][3] = false;
    pieces.push(tempPiece_5);
    spawnPoints.push({x:4,y:0})
   
}


function spawnPiece(){
    //Firstly select a piece to be spawned (maybe randomly)
    const gameArea = document.getElementById('tetris-space');
    let thePiece = document.createElement('div');
    thePiece.classList.add('piece');
    thePiece.style.width = blockspace * 4;
    thePiece.style.height = blockspace * 2;

    const randomInt = Math.floor(Math.random() * 6);

    let selectedPiece = pieces[randomInt];
    let spawnPoint = spawnPoints[randomInt];


    /*for(let j = 0; j < selectedPiece.length; j++){
        for(let i = 0; i < selectedPiece[0].length; i++){
            if(selectedPiece[j][i]){
                //Spawn the sub-blocks independently (how?)
                let subblock = document.createElement('div');
                subblock.classList.add('tetris-block');

                subblock.style.width = blockspace + 'px';
                subblock.style.height = blockspace + 'px';

                subblock.style.borderWidth = borderWidth + 'px';
                let xPos = blockspace*i;
                let yPos = blockspace*j;
                
                subblock.style.left = xPos + 'px';
                subblock.style.top = yPos + 'px';

                thePiece.appendChild(subblock);
            }
        }
        

        thePiece.style.left = blockspace*spawnPoint.x + 'px';
        thePiece.style.top = blockspace*spawnPoint.y + 'px';
    }*/
    gameArea.appendChild(thePiece);
    
    let pieceLocation = emptyPieceLocation;

    for(let i = 0; i < 2; i++){
        for(let j = 0; j < 4; j++){

            //pieceLocation[spawnPoint.y + j][spawnPoint.x - 1 + i] = selectedPiece[i][j];
            pieceLocation[spawnPoint.y + i][spawnPoint.x - 1 + j] = selectedPiece[i][j];

        }
    }
    return pieceLocation;
}


function render() {
    // RENDERING LOOP
    // Clear the moving piece board
    // Render
    
    // Clear entire board
    // Render
    
    const gameArea = document.getElementById('tetris-space');
    gameArea.innerHTML = '';
    
    
    let thePiece = document.createElement('div');
    thePiece.classList.add('piece');
    thePiece.style.width = blockspace * 4;
    thePiece.style.height = blockspace * 2;
    
    for(let j = 0; j < 20; j++){
        for(let i = 0; i < 10; i++){
            if(gameboard[j][i] || newPieceLocation[j][i]){
                //Spawn the sub-blocks independently (how?)
                let subblock = document.createElement('div');
                subblock.classList.add('tetris-block');
    
                subblock.style.width = blockspace + 'px';
                subblock.style.height = blockspace + 'px';
    
                subblock.style.borderWidth = borderWidth + 'px';
                let xPos = blockspace*i;
                let yPos = blockspace*j;
                
                subblock.style.left = xPos + 'px';
                subblock.style.top = yPos + 'px';
    
                gameArea.appendChild(subblock);
            }
        }
    }
    
}



const intervalMilliseconds = 15; // approximately 60 frames per second
let time = 0;

function tick() {
time++;
const hasTrue = newPieceLocation.some(row => row.includes(true));
if(!hasTrue){
    newPieceLocation = spawnPiece();
}

// Check through all blocks of the newPieceLocation, compared to the previous Location (under the assumption that pieces cant be inside them)
let blockedDown = false;
let blockedRight = false;
let blockedLeft = false;
for(let i = 0; i < 20; i++){
    for(let j = 0; j < 10; j++){
        if(newPieceLocation[i][j]){
            
            if(i == 19 || gameboard[i + 1][j]){
                blockedDown = true;
            }

            if(j == 0 || gameboard[i][j - 1]){
                blockedLeft = true;
            }

            if(j == 19 || gameboard[i][j + 1]){
                blockedRight = true;
            }


        }
    }
}

if(true/*time % 60 == 0*/){

//Undefined sometimes??
    //console.log("bonk",time);
    let tempPosition = newPieceLocation;
    console.log(console.log(newPieceLocation.some(row => row.includes(true))))
    //console.log(tempPosition);
    //Make empty
    //newPieceLocation = emptyPieceLocation;
    // Move piece
    for(let i = 0; i < 20; i++){
        for(let j = 0; j < 9; j++){
            newPieceLocation[i][j + 1] = tempPosition[i][j]
        }
    }
    


}

render();
    
}
  // Start the interval



//A tetrisboard is 10x20 blocks
let anchor = document.getElementById('background');

const tetrisSpace = document.createElement('div');
tetrisSpace.style.width = 10*blockspace + "px";
tetrisSpace.style.height = 20*blockspace + "px";


tetrisSpace.setAttribute('id','tetris-space')
anchor.appendChild(tetrisSpace);


setUpTetris();
//render();
//newPieceLocation = spawnPiece();



const intervalID = setInterval(tick, intervalMilliseconds);



});


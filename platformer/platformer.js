function addEventListeners() {

}

let startTime = 0;
const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;
const globalScale = 3;
let speed = 160;
function logic() {

}


function setup(ctx){

    // We create the characters
    let tempJohan = {
        name:"johan", health : 100, position : [0 ,0], animations : [
            new Animation(ctx,"johan","idle"),
            new Animation(ctx,"johan","walk")
        ], abilities : []
    }
    johan = new Player(johan.health,johan.position,johan.animations,johan.abilities);
}


function render(c, ctx){
    if (!ctx) {
        console.error("Canvas context is undefined!");
        return;
    }
        logic()
    ctx.clearRect(0, 0, c.width, c.height);
    // Calculate deltaTime (time difference between the current frame and the last frame)
    let time = Date.now() - startTime;
    //console.log(time);
    Renderable.renderables.forEach((r) =>{
        r.draw(time);
    })
    // Call next frame
    requestAnimationFrame(() => render(c, ctx));
}

function mainLoop(c,ctx) {


    render(c,ctx);
}

function main() {
    addEventListeners();
    const c = document.getElementById("platformerCanvas"); 
    c.width = canvasWidth;
    c.height = canvasHeight;
    const ctx = c.getContext("2d");
    ctx.imageSmoothingEnabled = false; // Ensure pixel perfection!


    startTime = Date.now();
    mainLoop(c,ctx);

}


document.addEventListener('DOMContentLoaded', () => {

    main();

});
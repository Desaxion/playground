function addEventListeners() {

}

let startTime = 0;
let renderables = [];
const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;
const globalScale = 3;
let speed = 160;
function logic() {

    renderables[1].setSpeed(speed);

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
    renderables.forEach((r) =>{
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
    renderables.push(new Animation(ctx,"johan","idle",[300,300]));
    renderables.push(new Animation(ctx,"johan","walk",[600,300],speed));
    startTime = Date.now();
    mainLoop(c,ctx);


    let sd =document.getElementById("sd");
    let si =document.getElementById("si")
    sd.onclick = function() {
        speed -= 10
        console.log(speed)
    }
    si.onclick = function() {
        speed += 10
        console.log(speed)
    }

}


document.addEventListener('DOMContentLoaded', () => {

    main();

});
class Player extends Character {
    constructor(name="unnamed", health = 100, position = [0 ,0], animations = [], abilities = []){
        super(name,health,animations,abilities);
    }

    setupPlayer(document){
        document.addEventListener("keydown", e =>{
            this.movementHandler(e.key)
        })
    }

    movementHandler(key){
        if(key === "ArrowRight"){
            position += 10;
            // We need to show this specific animation
            this.animations["walkRight"].setVisible();
        }
    }
}
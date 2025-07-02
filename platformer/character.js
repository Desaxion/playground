class Character {
    constructor(health = 100, position = {x:0, y:0}, animations = [], abilities = []){
        this.health = health;
        this.position = position;
        this.animations = animations;
        this.abilities = abilities;
    }
}
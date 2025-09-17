class Character {
    static characters = []
    constructor(name="unnamed", health = 100, position = [0 ,0], animations = [], abilities = [],visible){
        this.name = name
        this.health = health;
        this.position = position;
        this.animations = animations;
        this.abilities = abilities;
        characters.push(this);
        this.visible = visible;

    }

    updateLogic(){

    }

    addAnimation(animation) {
        this.animations.push(animation);
    }
    addAbility(ability) {
        this.abilities.push(abilities);
    }
    setHealth(hp){
        this.health = hp;
    }
    setPosition(pos){
        this.position = pos;
    }
}
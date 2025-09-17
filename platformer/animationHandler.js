class AnimationHandler {
    // This class-job is to associate specific animations with keywords, and unless a specific animation has been added, a default animation will play indefinetly
    constructor(idle,optional){
        this.idle = idle;
        this.anims = optional;
    }
    idle(){
        // play the idle animation
        
    }
    playAnimation(anim){
        //this.anims[anim]
    }
}
class Renderable {
    constructor(ctx, width = 0,height = 0, position, path = "", order=0,scale) {
        this.width = width;
        this.height = height;
        this.position = position;
        this.path = path;
        this.order = order;
        this.ctx = ctx;
        this.scale = 3;
    }

    draw(time){
        throw new Error("Method 'draw()' must be implemented in a subclass");     
    }
}
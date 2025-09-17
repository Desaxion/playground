class CharacterAvatar extends Renderable{
    constructor(ctx, width = 0,height = 0, position, path = "", order=0,scale){
        super(ctx, width,height,position, path, order,scale)
        Renderable.renderables.push(this);
    }
}
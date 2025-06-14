import {Character} from "./CharacterClass.js";

export class Player extends Character{
    characterType='player';
    collisionColor='green'
    constructor(size,color,position,hp) {
        super(size,color,position,hp);
    }
    reloadAction=(ctx,i,j,level,movement,deltaTime)=>{
        movement.move(this,deltaTime);
        this.collisions(this,ctx,level,movement);
        ctx.fillRect(this.position.x,this.position.y,this.size.width,this.size.height)
    }
}
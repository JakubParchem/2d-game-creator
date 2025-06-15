import {Character} from "./CharacterClass.js";

export class Player extends Character{
    characterType='player';
    collisionColor='green'
    attackDamage={ranged:0,melee:20}
    constructor(size,color,position,hp) {
        super(size,color,position,hp);
    }
    reloadAction=(ctx,i,j,level,movement,deltaTime)=>{
        if(!this.isDead()) {
            movement.move(this, deltaTime);
            this.collisions(this, ctx, level, movement);
            this.animate(ctx)
        }
        else{
            ctx.clearRect(0, 0, 800, 600);
            ctx.font = "bold 72px Arial";
            ctx.fillStyle = "red";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("GAME OVER", 400, 300);
        }
    }
}
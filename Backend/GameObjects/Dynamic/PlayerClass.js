import {Character} from "./CharacterClass.js";
import {SpriteSheet} from "../SpriteSheet.js";

export class Player extends Character{
    characterType='player';
    collisionColor='green'
    attackDamage={ranged:0,melee:40}
    attackSpeed=1;
    constructor(size,color,position,hp) {
        super(size,color,position,hp);
    }
    setSpriteSheat(src){
        this.spriteSheat=new SpriteSheet(src,true);
    }
    reloadAction=(ctx,i,j,level,movement,deltaTime)=>{
        if(!this.isDead()) {
            // console.log("Player State:", this.state);
            // console.log("Player Frame:", this.lastFrame);
            // console.log("Player Attack Animation:", this.attackAnimation)
            movement.move(this, deltaTime);
            this.collisions(this, ctx, level, movement);
            this.animate(ctx)
        }
    }

}
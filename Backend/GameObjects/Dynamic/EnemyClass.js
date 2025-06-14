import {Character} from "./CharacterClass.js";
export class Enemy extends Character{
    initialPosX=this.position.x;
    characterType='enemy';
    maxspeed=70;
    patrolDirection=1;
    constructor(size,color,position,hp) {
        super(size,color,position,hp);
    }
    moveTo(position){
        if(this.position.x<position+10 && this.position.x>position-10){
            this.velocity.x=0;
            return true;
        }
        else if(this.position.x>position){
            if(this.velocity.x<-this.maxspeed){
                this.velocity.x=-this.maxspeed;
            }
            else{
                this.velocity.x-=15;
            }
            return false;
        }
        else if(this.position.x<position){
            if(this.velocity.x>this.maxspeed){
                this.velocity.x=this.maxspeed;
            }
            else{
                this.velocity.x+=15;
            }
            return false;
        }
    }
    patrol(range) {
        let targetX = this.initialPosX + (range * this.patrolDirection);
        const reached = this.moveTo(targetX);

        if (reached) {
            this.patrolDirection *= -1; // reverse direction when edge is reached
        }
    }
    behaviour(character,range,detectionRange){
        const dist=this.distanceTo(character)
        if(dist<=detectionRange){
            this.moveTo(character.position.x);
            if(this.range.melee+15>dist){
                this.attack(character);
            }
        }
        else{
            this.patrol(range)
        }
    }
    reloadAction=(ctx,i,j,level,movement,deltaTime,player)=>{
        this.behaviour(player,100,150);
        movement.move(this,deltaTime);
        this.collisions(this,ctx,level,movement);
        ctx.fillRect(this.position.x,this.position.y,this.size.width,this.size.height)
    }
}
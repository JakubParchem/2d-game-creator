import {Character} from "./CharacterClass.js";
import {SpriteSheet} from "../SpriteSheet.js";
export class Enemy extends Character{
    initialPosX=this.position.x;
    characterType='enemy';
    maxspeed=70;
    patrolDirection=1;
    constructor(size,color,position,hp) {
        super(size, color, position, hp);
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
        if(dist<=detectionRange && !character.isDead()){
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
        if(!this.isDead()){
            console.log("Enemy State:", this.state);
            console.log("Enemy Frame:", this.lastFrame);
            console.log("Enemy Attack Animation:", this.attackAnimation)
            this.behaviour(player,100,150);
            movement.move(this,deltaTime);
            this.drawHealthBar(ctx)
            this.collisions(this,ctx,level,movement);
            this.animate(ctx)
        }
    }
    drawHealthBar(ctx){
        const hp=this.hp.currentHp;
        ctx.strokeStyle="black";
        ctx.lineWidth=1;
        ctx.strokeRect(this.position.x,this.position.y-this.size.height/4,this.size.width,8);
        if(hp>0) {
            ctx.fillStyle = `rgb(${255*(hp/100)+50},0,0)`;
            if(hp<=100) {
                ctx.fillRect(this.position.x+1,this.position.y-this.size.height/4+1,this.hp.currentHp/(100/(this.size.width))-1,7);
            }
            else{
                ctx.fillRect(this.position.x+1,this.position.y-this.size.height/4+1,this.size.width-1,7);
            }
        }
    }
}
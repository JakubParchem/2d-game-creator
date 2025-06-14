import {Character} from "./CharacterClass";
export class Enemy extends Character{
    initialPosX=this.position.x;
    moveTo(position){
        if(this.position.x<position+10 && this.position.x>position-10){
            this.velocity.x=0;
            return true;
        }
        else if(this.position.x>position){
            if(this.velocity.x<-150){
                this.velocity.x=-150;
            }
            else{
                this.velocity.x-=30;
            }
            return false;
        }
        else if(this.position.x<position){
            if(this.velocity.x<-150){
                this.velocity.x=-150;
            }
            else{
                this.velocity.x-=30;
            }
            return false;
        }
    }
    patrol(range){
        if(this.position.x<this.initialPosX+range){
            this.moveTo(this.initialPosX+range);
        }
        else{
            this.moveTo(this.initialPosX-range);
        }
    }
    behaviour(character,range){

    }

}
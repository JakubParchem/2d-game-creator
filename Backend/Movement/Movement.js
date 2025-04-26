import {Character} from "../GameObjects/Dynamic/CharacterClass.js";
export class Movement{
    constructor(gravity=-20,airFriction=5) {
        this.gravity=gravity;
        this.airFriction=airFriction;
        this.t=0.03//30fps
    }
    move(character){
        character.position.x+=character.velocity.x*this.t
        character.position.y+=character.velocity.y*this.t
        this.setNewVelocity(character)
    }
    setNewVelocity(character){
        if(character.velocity.x>0) {
            character.velocity.x-=(this.airFriction*this.t);
            if(character.velocity.x<0){
                character.velocity.x=0;
            }
        }
        else{
            character.velocity.x+=(this.airFriction*this.t);
            if(character.velocity.x>0){
                character.velocity.x=0;
            }
        }
        character.velocity.y-=(this.gravity*this.t);
    }
}
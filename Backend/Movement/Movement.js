import {Character} from "../GameObjects/Dynamic/CharacterClass.js";
export class Movement{
    constructor(gravity=-20,airFriction=5) {
        this.gravity=gravity;
        this.airFriction=airFriction;
        this.t=0.03//30fps
    }
    move(character,deltaTime){
        const accelerationy=character.acceleration.y-this.gravity;
        const accelerationx=character.acceleration.x-this.airFriction;
        character.position.x+=character.velocity.x*deltaTime+(0.5*accelerationx*deltaTime**2);
        character.position.y+=character.velocity.y*deltaTime+(0.5*accelerationy*deltaTime**2);
        this.setNewVelocity(character,deltaTime);
    }
    setNewVelocity(character,deltaTime){
        if(character.velocity.x>0) {
            character.velocity.x-=(this.airFriction*deltaTime);
            if(character.velocity.x<0){
                character.velocity.x=0;
            }
        }
        else{
            character.velocity.x+=(this.airFriction*deltaTime);
            if(character.velocity.x>0){
                character.velocity.x=0;
            }
        }
        character.velocity.y-=(this.gravity*deltaTime);
    }
    Collisions(character,object) {
        if (character.IsCollidingWith(object)) {
            // if (character.onTopOf(object)) {
            //     alert(1)
                if (character.velocity.y > 0) {
                    character.velocity.y = 0;
                    character.position.y = object.position.y - object.size.height/1.1;
                }
                character.colliding = true;
                object.colliding = true;
            // }
        }
        else{
            character.colliding = false;
            object.colliding = false;
        }
    }
}
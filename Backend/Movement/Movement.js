export class Movement{
    constructor(gravity=-20,airFriction=5) {
        this.gravity=gravity;
        this.airFriction=airFriction;
        this.t=0.03//30fps
    }
    move(character,deltaTime){
        const accelerationy=character.acceleration.y-this.gravity;
        let accelerationx=character.acceleration.x-this.airFriction;
        if(accelerationx<0){accelerationx=0}
        character.position.x+=character.velocity.x*deltaTime+(0.5*accelerationx*deltaTime**2);
        character.position.y+=character.velocity.y*deltaTime+(0.5*accelerationy*deltaTime**2);
        if(character.position.y>600){
            character.hp.currentHp=0;
        }
        this.setNewVelocity(character,deltaTime);
    }
    setNewVelocity(character,deltaTime){
        if(character.velocity.x>0) {
            character.velocity.x-=(this.airFriction*deltaTime);
            if(character.velocity.x<0){
                character.velocity.x=0;
            }
            if(character.position.x+character.size.width>800){
                character.position.x=800-character.size.width;
                character.velocity.x=0;
            }
            if(character.colliding){
                if(character.state==='jumping'){
                    character.lastFrame=0;
                }
                if(performance.now()-character.lastAttack<=character.attackSpeed*1000 && character.lastAttack!==0) {
                    character.state='attacking';
                }
                else{
                    character.state='moving'
                }
            }
            else{
                character.state='jumping'
            }
            character.facing='right';
        }
        else if(character.velocity.x<0){
            character.velocity.x+=(this.airFriction*deltaTime);
            if(character.velocity.x>0){
                character.velocity.x=0;
            }
            if(character.position.x<0){
                character.position.x=0;
                character.velocity.x=0;
            }
            if(character.colliding){
                if(character.state==='jumping'){
                    character.lastFrame=0;
                }
                if(performance.now()-character.lastAttack<=character.attackSpeed*1000 && character.lastAttack!==0) {
                    character.state='attacking';
                }
                else{
                    character.state='moving'
                }
            }
            else{
                character.state='jumping'
            }
            character.facing='left';
        }
        else {
            if(character.colliding){
                if(character.state==='jumping'){
                    character.lastFrame=0;
                }
                if(performance.now()-character.lastAttack<=character.attackSpeed*1000 && character.lastAttack!==0) {
                    character.state='attacking';
                }
                else{
                    character.state='standing'
                }
            }
            else{
                character.state='jumping'
            }
        }
        character.velocity.y-=(this.gravity*deltaTime);
    }
    Collisions(character, object) {
        if (character.IsCollidingWith(object)) {
            if (character.onTopOf(object) && character.velocity.y > 0) {
                character.velocity.y = 0;
                character.position.y = object.position.y - character.size.height;
            } else if (character.onBottomOf(object) && character.velocity.y < 0) {
                character.velocity.y = 0;
                character.position.y = object.position.y + object.size.height;
            } else if (character.onRightOf(object) && character.velocity.x < 0) {
                character.velocity.x = 0;
                character.position.x = object.position.x + object.size.width;
            } else if (character.onLeftOf(object) && character.velocity.x > 0) {
                character.velocity.x = 0;
                character.position.x = object.position.x - character.size.width;
            }
            character.colliding = true;
            object.colliding = true;
            return true
        } else {
            character.colliding = character.isStandingOn(object);
            object.colliding = false;
            return character.isStandingOn(object);
        }
    }

}
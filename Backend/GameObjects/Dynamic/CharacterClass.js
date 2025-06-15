import {GameObject} from "../GameObjectClass.js";
import {SpriteSheet} from "../SpriteSheet.js";
export class Character extends GameObject{
hp={currentHp:50,maxHp:100};
attackType={ranged:false,melee:true};
attackDamage={ranged:0,melee:20};
state='standing';
facing='left';
collisionColor='lime';
range={ranged:30,melee:30};
velocity={x:0,y:0};
acceleration={x:0,y:0};
standing=false;
characterType='default';
lastAttack=1;
attackSpeed=1.5;
spriteSheat;
Tile;
lastFrame=0;
lastFrameChange=0;
animationSpeed=0.15;
constructor(size,color,position,hp=50) {
    super(size,color);
    this.hp.currentHp=hp;
    this.position=position
}
setSpriteSheat(src){
    this.spriteSheat=new SpriteSheet(src);
}
isStatic=()=>false;
isDead=()=>this.hp.currentHp<=0;
isStandingOn(object) {
    return (
        Math.abs(this.position.y + this.size.height - object.position.y) <= 5 &&
        this.position.x + this.size.width > object.position.x &&
        this.position.x < object.position.x + object.size.width
    );
}
attack(character){
    if(performance.now()-this.lastAttack>=this.attackSpeed*1000 || this.lastAttack===0){
        this.state='attacking';
        this.lastFrame=0;
        if(this.range.melee>=this.distanceTo(character)) {
            character.hp.currentHp -= this.attackDamage.melee;
        }
        this.lastAttack=performance.now();
    }
}
attackMultiple(characters){
    if(performance.now()-this.lastAttack>=this.attackSpeed*1000 || this.lastAttack===0){
        this.state='attacking';
        this.lastFrame=0;
        characters.forEach(character => {if(this.range.melee>=this.distanceTo(character)) {
            character.hp.currentHp -= this.attackDamage.melee;
        }})
        this.lastAttack=performance.now();
    }
}
collisions(obj,ctx,level,movement){
    let colliding=false;
    level.staticObjects.forEach(n=>{
        if(movement.Collisions(obj,n)){
            colliding=true;
        }
    })
    if(colliding){
        obj.colliding=true;
    }
}
img=new Image();
animate(ctx) {
        const now = performance.now();
        let sprite={};
        switch(this.state){
            case 'standing':{
                sprite = this.spriteSheat.idle;
                break
            }
            case 'moving':{
                sprite = this.spriteSheat.run;
                break
            }
            case 'jumping':{
                sprite = this.spriteSheat.jump;
                break
            }
            case 'attacking':{
                switch(this.lastAttack){
                    case 1:{
                        sprite = this.spriteSheat.attack1;
                        this.lastAttack++;
                        break
                    }
                    case 2:{
                        sprite = this.spriteSheat.attack2;
                        this.lastAttack++;
                        break
                    }
                    case 3:{
                        sprite = this.spriteSheat.attack3;
                        this.lastAttack=1;
                        break
                    }
                }
            }
        }
        const frame=sprite.frames[this.lastFrame];
        if (now - this.lastFrameChange >= this.animationSpeed * 1000 || this.lastFrameChange === 0) {
            this.lastFrame = (this.lastFrame +1) % sprite.states;
            this.lastFrameChange = now;
        }
        const img = sprite.img;

        ctx.drawImage(img, frame.width, frame.height, this.spriteSheat.imgSize.width, this.spriteSheat.imgSize.height, this.position.x, this.position.y, this.size.width, this.size.height);

        console.log("State:", this.state);
        console.log("Frame:", this.lastFrame);
    }

}

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
lastAttack=0;
attackSpeed=1.5;
spriteSheat;
Tile;
lastFrame=0;
lastFrameChange=0;
animationSpeed=0.3;
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
animate(ctx){
    if(this.state==='standing'){
        if(performance.now()-this.lastFrameChange>=this.animationSpeed*1000 || this.lastFrameChange===0){
                const frame = this.spriteSheat.idle.frames[this.lastFrame];
                ctx.drawImage(
                    this.spriteSheat.idle.img,
                    frame.width, frame.height,
                    this.spriteSheat.imgSize.width, this.spriteSheat.imgSize.height,
                    this.position.x, this.position.y,
                    this.size.width, this.size.height
                )
            this.lastFrameChange=performance.now();
            this.lastFrame++;
            if(this.lastFrame>=this.spriteSheat.idle.states){
                this.lastFrame=0;
            }
        }
    }
}
}

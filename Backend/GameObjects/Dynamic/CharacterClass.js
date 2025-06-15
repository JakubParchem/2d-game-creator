import {GameObject} from "../GameObjectClass.js";
import {SpriteSheet} from "../SpriteSheet.js";
export class Character extends GameObject{
hp={currentHp:50,maxHp:100};
attackType={ranged:false,melee:true};
attackDamage={ranged:0,melee:20};
state='standing';
facing='left';
collisionColor='lime';
range={ranged:30,melee:50};
velocity={x:0,y:0};
acceleration={x:0,y:0};
standing=false;
characterType='default';
lastAttack=0;
attackAnimation=1;
attackSpeed=1.2;
spriteSheat;
Tile;
lastFrame=0;
lastFrameChange=0;
animationSpeed=0.15;
slashSound=new Audio('../../../Frontend/Sounds/sword-sound.mp3');
hurtSound=new Audio('../../../Frontend/Sounds/hurt-sound.mp3');
deathSound=new Audio('../../../Frontend/Sounds/death-sound.mp3');
constructor(size,color,position,hp=50) {
    super(size,color);
    this.hp.currentHp=hp;
    this.position=position
}
setSpriteSheat(src){
    this.spriteSheat=new SpriteSheet(src,false);
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
        this.slashSound.play();
        if(this.range.melee>=this.distanceTo(character)) {
            character.hp.currentHp -= this.attackDamage.melee;
            character.hurtSound.play();
            if(character.hp.currentHp<0){character.hp.currentHp=0; character.deathSound.play();}
        }
        this.lastFrame=0;
        this.attackAnimation=(this.attackAnimation+1)%3;
        this.state='attacking';
        this.lastAttack=performance.now();
    }
}
attackMultiple(characters){
    if(performance.now()-this.lastAttack>=this.attackSpeed*1000 || this.lastAttack===0){
        this.slashSound.play();
        characters.forEach(character => {if(this.range.melee>=this.distanceTo(character)) {
            character.hp.currentHp -= this.attackDamage.melee;
            character.hurtSound.play();
            if(character.hp.currentHp<0){character.hp.currentHp=0; character.deathSound.play();}
        }})
        this.lastFrame=0;
        this.attackAnimation=(this.attackAnimation+1)%3;
        this.state='attacking';
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
    let sprite = {};
        switch (this.state) {
            case 'standing':
                sprite = this.spriteSheat.idle;
                break;
            case 'moving':
                sprite = this.spriteSheat.run;
                break;
            case 'jumping':
                sprite = this.spriteSheat.jump;
                break;
            case 'attacking':
                switch (this.attackAnimation) {
                    case 0:
                        sprite = this.spriteSheat.attack1;
                        break;
                    case 1:
                        sprite = this.spriteSheat.attack2;
                        break;
                    case 2:
                        sprite = this.spriteSheat.attack3;
                        break;
                }
                break;
        }

        const frame = sprite.frames[this.lastFrame];
        if (!frame) return;

        if (now - this.lastFrameChange >= this.animationSpeed * 1000 || this.lastFrameChange === 0) {
            if (this.state === 'attacking' || this.state === 'jumping') {
                if (this.lastFrame !== sprite.states - 1) {
                    this.lastFrame++;
                }
            } else {
                this.lastFrame = (this.lastFrame + 1) % sprite.states;
            }
            this.lastFrameChange = now;
        }

        const img = sprite.img;
        const drawX = this.position.x;
        const drawY = this.position.y;
        const drawW = this.size.width;
        const drawH = this.size.height;

        ctx.save();

        if (this.facing === 'left') {
            ctx.translate(drawX + drawW, drawY);
            ctx.scale(-1, 1);
            ctx.drawImage(
                img,
                frame.width,
                frame.height,
                this.spriteSheat.imgSize.width,
                this.spriteSheat.imgSize.height,
                0,
                0,
                drawW,
                drawH
            );
        } else {
            ctx.translate(drawX, drawY);
            ctx.drawImage(
                img,
                frame.width,
                frame.height,
                this.spriteSheat.imgSize.width,
                this.spriteSheat.imgSize.height,
                0,
                0,
                drawW,
                drawH
            );
        }

        ctx.restore();
    }


}

import {GameObject} from "../GameObjectClass.js";
export class Character extends GameObject{
hp={currentHp:50,maxHp:100};
attackType={ranged:false,melee:true};
attackDamage={ranged:0,melee:20};
state='standing';
facing='left';
collisionColor='lime';
range={ranged:30,melee:5};
velocity={x:0,y:0};
acceleration={x:0,y:0};
standing=false;
characterType='default';
lastAttack=0;
attackSpeed=1.5;
constructor(size,color,position,hp=50) {
    super(size,color);
    this.hp.currentHp=hp;
    this.position=position
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
        if(this.range.melee>=this.distanceTo(character)) {
            character.hp.currentHp -= this.attackDamage.melee;
        }
        this.lastAttack=performance.now();
    }
}
attackMultiple(characters){
    if(performance.now()-this.lastAttack>=this.attackSpeed*1000 || this.lastAttack===0){
        this.state='attacking';
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
    if(obj.colliding){
        ctx.fillStyle=this.collisionColor;
    }
    else{
        ctx.fillStyle=this.color;
        }
    }
}
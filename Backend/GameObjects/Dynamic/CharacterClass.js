import {GameObject} from "../GameObjectClass.js";
export class Character extends GameObject{
hp={currentHp:50,maxHp:100};
attackType={ranged:false,melee:true};
range={ranged:20,melee:5};
velocity={x:0,y:0};
acceleration={x:0,y:0};
standing=false;
constructor(size,color,position) {
    super(size,color);
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
}
import {GameObject} from "../GameObjectClass.js";
export class Character extends GameObject{
hp={currentHp:1,maxHp:100};
attackType={ranged:false,melee:true};
range={ranged:20,melee:5};
velocity={x:0,y:0};
acceleration={x:0,y:0};
isStatic=()=>false;
isDead=()=>this.hp.currentHp<=0;

}
import {GameObject} from "../GameObjectClass.js";
export class Platform extends GameObject{
    isStatic=()=>true;
    size={width:50,height:50};
    reloadAction=(ctx,i,j)=>{
        this.position.x=i*50
        this.position.y=j*50
        ctx.fillStyle=this.color
        ctx.fillRect(i*50,j*50,50,50)
    }
}
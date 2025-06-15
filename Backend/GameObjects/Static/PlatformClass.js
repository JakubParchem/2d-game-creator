import {GameObject} from "../GameObjectClass.js";
export class Platform extends GameObject{
    isStatic=()=>true;
    size={width:50,height:50};
    img=new Image();
    reloadAction=(ctx,i,j)=>{
        this.img.src=`${window.location.origin}/2d-game-creator/Frontend/Sprites/Tile_01.png`
        this.position.x=i*50
        this.position.y=j*50
        ctx.drawImage(this.img,0,0,32,32,this.position.x,this.position.y,50,50);
        //ctx.fillRect(i*50,j*50,50,50)
    }
}
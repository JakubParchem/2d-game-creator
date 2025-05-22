export class GameObject{
    size={width:0,height:0};
    position={x:0,y:0};
    visible=true;
    collision=true;
    colliding=false;
    constructor(size,position) {
        this.size=size;
        this.position=position;
    }
    makeVisible=()=>this.visible=true;
    makeInvisible=()=>this.visible=false;
    changeSizeBy= (n)=>{this.size.height*=n;this.size.width*=n}
    CollisionOn=()=>this.collision=true;
    CollisionOff=()=>this.collision=false;
    IsCollidingWith(object){
        const a = this.getCorners();
        const b = object.getCorners();
        return (
            a[0].x < b[1].x &&
            a[1].x > b[0].x &&
            a[0].y < b[1].y &&
            a[1].y > b[0].y
        );
    }
    distanceTo(object){
        return ((object.position.x-this.position.x)**2+(object.position.y-this.position.y)**2)**0.5
    }
    getCorners(){
        return [{x:this.position.x,y:this.position.y},
            {x:this.position.x+this.size.width,y:this.position.y+this.size.height},]
    }
    onTopOf(object){
        const corners1=this.getCorners();
        const corners2=object.getCorners();
        return corners2[1]-corners1[0].y>=object.size.height;
    }
    onRightOf(object){
        const corners1=this.getCorners();
        const corners2=object.getCorners();
        return corners1[0].x>=corners2[1].x;
    }
    isStatic=()=>true;
}
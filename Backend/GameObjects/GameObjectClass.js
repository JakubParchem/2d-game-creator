class GameObject{
    size={width:0,height:0};
    position={x:0,y:0};
    visible=true;
    collision=true;
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
        const corners1=getCorners();
        const corners2=object.getCorners();
        return corners2[0].x>=corners1[0].x && corners2[0].y>=corners1[0].y && corners2[1].x<=corners1[1].x && corners2[1].y<= corners1[1].y;
    }
    distanceTo(object){
        return ((object.position.x-this.position.x)**2+(object.position.y-this.position.y)**2)**0.5
    }
    getCorners(){
        return [{x:this.position.x,y:this.position.y},
            {x:this.position.x+this.size.width,y:this.position.y+this.size.height},]
    }
    onTopOf(object){
        const corners1=getCorners();
        const corners2=object.getCorners();
        return corners1[0].y>=corners2[1].y;
    }
    onRightOf(object){
        const corners1=getCorners();
        const corners2=object.getCorners();
        return corners1[0].x>=corners2[1].x;
    }
    isStatic=()=>true;
}
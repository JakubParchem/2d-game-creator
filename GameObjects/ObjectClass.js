class Object{
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
    
}
export class GameObject{
    size={width:0,height:0};
    position={x:0,y:0};
    visible=true;
    collision=true;
    colliding=false;
    color
    constructor(size,color) {
        this.size=size;
        this.color=color
    }
    makeVisible=()=>this.visible=true;
    makeInvisible=()=>this.visible=false;
    changeSizeBy= (n)=>{this.size.height*=n;this.size.width*=n}
    CollisionOn=()=>this.collision=true;
    CollisionOff=()=>this.collision=false;
    reloadAction;
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
    getCenter(){
        return {x:this.position.x+this.size.width/2,y:this.position.y+this.size.height/2};
    }
    onTopOf(object) {
        return (
            this.position.y + this.size.height <= object.position.y + 10 &&
            this.position.y + this.size.height >= object.position.y - 10 &&
            this.position.x + this.size.width > object.position.x &&
            this.position.x < object.position.x + object.size.width
        );
    }
    onBottomOf(object) {
        return (
            this.position.y >= object.position.y + object.size.height - 5 &&
            this.position.y <= object.position.y + object.size.height + 5 &&
            this.position.x + this.size.width > object.position.x &&
            this.position.x < object.position.x + object.size.width
        );
    }
    onRightOf(object) {
        return (
            this.position.x >= object.position.x + object.size.width - 5 &&
            this.position.x <= object.position.x + object.size.width + 5 &&
            this.position.y + this.size.height > object.position.y &&
            this.position.y < object.position.y + object.size.height
        );
    }
    onLeftOf(object) {
        return (
            this.position.x + this.size.width <= object.position.x + 5 &&
            this.position.x + this.size.width >= object.position.x - 5 &&
            this.position.y + this.size.height > object.position.y &&
            this.position.y < object.position.y + object.size.height
        );
    }
    isStatic=()=>true;
}
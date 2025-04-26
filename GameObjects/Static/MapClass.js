import "../GameObjectClass"
class Map{
    height=100;
    width=200;
    map=[];
    dynamicObjects=[];
    staticObjects=[];
    addObject(object){
        if(object.isStatic()){
            this.addStatic(object)
        }
        else{
            this.addDynamic(object)
        }
    }
    removeObject(object){
        if(object.isStatic()){
            this.removeStatic(object);
        }
        else{
            this.removeDynamic(object);
        }
    }
    addStatic(staticObject){
        this.staticObjects.push(staticObject);
    }
    removeStatic(staticObject){
        this.staticObjects=this.staticObjects.filter((n)=>{return n!==staticObject})
    }
    addDynamic(dynamicObject){
        this.dynamicObjects.push(dynamicObject);
    }
    removeDynamic(dynamicObject){
        this.dynamicObjects=this.dynamicObjects.filter((n)=>{return n!==dynamicObject})
    }
}
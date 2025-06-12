import {GameObject} from "./GameObjectClass.js"
import {Character} from "./Dynamic/CharacterClass.js";
import {Movement} from "../Movement/Movement.js";
import {Platform} from "./Static/PlatformClass.js";

export class Level{
    height=12;
    width=16;
    map=[];
    dynamicObjects=[];
    staticObjects=[];
    constructor(){
        this.fillWithEmpty();
    }
    addObject(object){
        if(object.isStatic()){
            this.addStatic(object)
        }
        else{
            this.addDynamic(object)
        }
    }
    addCharacter(width,height,object){
        this.addDynamic(object)
        this.updateTile(width,height,object)
        let Tile=this.getTile(width,height)
        Tile.objType="Character"
    }
    removeCharacter(){
        this.removeDynamic(this.dynamicObjects.find(n=>n.objType==="Character"))
    }
    removeObject(object){
        if(object.isStatic()){
            this.removeStatic(object);
        }
        else{
            this.removeDynamic(object);
        }
    }
    fillWithEmpty(){
        if(this.map.length===0) {
            for (let i = 0; i < this.width; i++) {
                for (let j = 0; j < this.height; j++) {
                    this.map.push({
                        width: i,
                        height: j,
                        objId: -1,
                        objType: "void"
                    })
                }
            }
        }
    }
    getTileByCoordinates(x,y){
        return this.getTile(Math.floor(x / 50), Math.floor(y / 50))
    }
    getTile(width,height){
        return this.map.find(n=>(n.width===width && n.height===height))
    }
    clearTileByCoordinates(x,y){
        this.clearTile(Math.floor(x / 50), Math.floor(y / 50))
    }
    updateTileByCoordinates(x,y,object){
        this.updateTile(Math.floor(x / 50), Math.floor(y / 50),object)
    }
    clearTile(width,height){
        let Tile=this.getTile(width,height)
        if(Tile.objType==="Static"){
            this.removeStatic(this.staticObjects[Tile.objId])
        }
        else if(Tile.objType==="Dynamic"){
            this.removeDynamic(this.dynamicObjects[Tile.objId])
        }
        Tile.objId=-1
        Tile.objType="void"
    }
    updateTile(width,height,object) {
        let Tile=this.getTile(width,height)
        if(object.isStatic()){
            this.addStatic(object)
            Tile.objType="Static"
            Tile.objId = this.staticObjects.length-1
        }
        else if(!object.isStatic()){
            this.addDynamic(object)
            if(object.objType!=="Character") {
                Tile.objType = "Dynamic"
            }
            Tile.objId=this.dynamicObjects.length-1
        }
        Tile.width=width
        Tile.height=height
    }
    addStatic(staticObject){
        this.staticObjects.push(staticObject);
        this.reloadStatic()
    }
    removeStatic(staticObject){
        this.staticObjects=this.staticObjects.filter((n)=>{return n!==staticObject})
        this.reloadStatic()
    }
    addDynamic(dynamicObject){
        this.dynamicObjects.push(dynamicObject);
        this.reloadDynamic()
    }
    removeDynamic(dynamicObject){
        this.dynamicObjects=this.dynamicObjects.filter((n)=>{return n!==dynamicObject})
        this.reloadDynamic()
    }
    reloadStatic(){
        let i=0;
        this.staticObjects.forEach(n=>n.objId=i++)
    }
    reloadDynamic(){
        let i=0;
        this.dynamicObjects.forEach(n=>n.objId=i++)
    }
    getCharacter(){
        return this.dynamicObjects[this.map.find(n=>n.objType==="Character").objId]
    }
    loadLevel(src){
        const obj=JSON.parse(src);
        this.map=obj.map;
        this.height=obj.height;
        this.width=obj.width;
        obj.staticObjects.forEach(n=>{
            this.addStatic(new Platform(n.size,n.color));
        });
        obj.dynamicObjects.forEach(n=>{
            if(n.objType==="Character"){
                this.addCharacter(50,50,new Character(n.size,n.color));
            }
            else{
                this.addDynamic(new Character(n.size,n.color,n.position));
            }
        });
    }
    saveLevel(){
        return JSON.stringify(this);
    }
}
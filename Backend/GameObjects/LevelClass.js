import {GameObject} from "./GameObjectClass.js"
import {Character} from "./Dynamic/CharacterClass.js";
import {Movement} from "../Movement/Movement.js";
import {Platform} from "./Static/PlatformClass.js";
import {Player} from "./Dynamic/PlayerClass.js";

export class Level{
    height=12;
    width=16;
    map=[];
    dynamicObjects=[];
    staticObjects=[];
    name="";
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
    addPlayer(width,height,object){
        object.player=true;
        this.addDynamic(object)
        this.updateTile(width,height,object)
        this.getTile(width,height).objType="Player"
    }
    removePlayer(){
        this.removeDynamic(this.dynamicObjects.find(n=>n.objType==="Player"))
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
            if(object.objType!=="Player") {
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
    getPlayer(){
        return this.dynamicObjects[this.map.find(n=>n.objType==="Player").objId]
    }
    loadLevel(src){
        const obj=JSON.parse(src);
        this.height=obj.height;
        this.width=obj.width;

        this.staticObjects = [];
        this.dynamicObjects = [];
        this.map=obj.map;
        obj.staticObjects.forEach(n=>{
            this.addStatic(new Platform(n.size,n.color));
        });
        obj.dynamicObjects.forEach(n=>{
            if(n.player){
                this.addPlayer(0,0,new Player({width:20,height:20},"red",{x:50,y:50},n.hp.currentHp));
            }
            else{
                this.addDynamic(new Character(n.size,n.color,n.position));
            }
        });
    }
    getLevelJSON(){
        return JSON.stringify(this);
    }
    saveLevel(){
        localStorage.setItem(this.name, this.getLevelJSON());
    }
}
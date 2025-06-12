import {Character} from "./GameObjects/Dynamic/CharacterClass.js";
import {Movement} from "./Movement/Movement.js";
import {controls} from "./Controls.js";
import {Platform} from "./GameObjects/Static/PlatformClass.js";
import {Level} from "./GameObjects/LevelClass.js"
let level=new Level()
// level.fillWithEmpty()
// level.addCharacter(0,0,new Character({width:10,height:10},'red',{x:25,y:25}))
// for(let i=0;i<16;i++){
//     level.updateTile(i,7,new Platform({x:0,y:0},'blue'))
// }
let movement = new Movement(-500,150)
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let grid=false
let now=0,last=performance.now()
let levelstring='{"height":12,"width":16,"map":[{"width":0,"height":0,"objId":1,"objType":"Character"},{"width":0,"height":1,"objId":-1,"objType":"void"},{"width":0,"height":2,"objId":-1,"objType":"void"},{"width":0,"height":3,"objId":-1,"objType":"void"},{"width":0,"height":4,"objId":-1,"objType":"void"},{"width":0,"height":5,"objId":-1,"objType":"void"},{"width":0,"height":6,"objId":-1,"objType":"void"},{"width":0,"height":7,"objId":0,"objType":"Static"},{"width":0,"height":8,"objId":-1,"objType":"void"},{"width":0,"height":9,"objId":-1,"objType":"void"},{"width":0,"height":10,"objId":-1,"objType":"void"},{"width":0,"height":11,"objId":-1,"objType":"void"},{"width":1,"height":0,"objId":-1,"objType":"void"},{"width":1,"height":1,"objId":-1,"objType":"void"},{"width":1,"height":2,"objId":-1,"objType":"void"},{"width":1,"height":3,"objId":-1,"objType":"void"},{"width":1,"height":4,"objId":-1,"objType":"void"},{"width":1,"height":5,"objId":-1,"objType":"void"},{"width":1,"height":6,"objId":-1,"objType":"void"},{"width":1,"height":7,"objId":1,"objType":"Static"},{"width":1,"height":8,"objId":-1,"objType":"void"},{"width":1,"height":9,"objId":-1,"objType":"void"},{"width":1,"height":10,"objId":-1,"objType":"void"},{"width":1,"height":11,"objId":-1,"objType":"void"},{"width":2,"height":0,"objId":-1,"objType":"void"},{"width":2,"height":1,"objId":-1,"objType":"void"},{"width":2,"height":2,"objId":-1,"objType":"void"},{"width":2,"height":3,"objId":-1,"objType":"void"},{"width":2,"height":4,"objId":-1,"objType":"void"},{"width":2,"height":5,"objId":-1,"objType":"void"},{"width":2,"height":6,"objId":-1,"objType":"void"},{"width":2,"height":7,"objId":2,"objType":"Static"},{"width":2,"height":8,"objId":-1,"objType":"void"},{"width":2,"height":9,"objId":-1,"objType":"void"},{"width":2,"height":10,"objId":-1,"objType":"void"},{"width":2,"height":11,"objId":-1,"objType":"void"},{"width":3,"height":0,"objId":-1,"objType":"void"},{"width":3,"height":1,"objId":-1,"objType":"void"},{"width":3,"height":2,"objId":-1,"objType":"void"},{"width":3,"height":3,"objId":-1,"objType":"void"},{"width":3,"height":4,"objId":-1,"objType":"void"},{"width":3,"height":5,"objId":-1,"objType":"void"},{"width":3,"height":6,"objId":-1,"objType":"void"},{"width":3,"height":7,"objId":3,"objType":"Static"},{"width":3,"height":8,"objId":-1,"objType":"void"},{"width":3,"height":9,"objId":-1,"objType":"void"},{"width":3,"height":10,"objId":-1,"objType":"void"},{"width":3,"height":11,"objId":-1,"objType":"void"},{"width":4,"height":0,"objId":-1,"objType":"void"},{"width":4,"height":1,"objId":-1,"objType":"void"},{"width":4,"height":2,"objId":-1,"objType":"void"},{"width":4,"height":3,"objId":-1,"objType":"void"},{"width":4,"height":4,"objId":-1,"objType":"void"},{"width":4,"height":5,"objId":-1,"objType":"void"},{"width":4,"height":6,"objId":-1,"objType":"void"},{"width":4,"height":7,"objId":4,"objType":"Static"},{"width":4,"height":8,"objId":-1,"objType":"void"},{"width":4,"height":9,"objId":-1,"objType":"void"},{"width":4,"height":10,"objId":-1,"objType":"void"},{"width":4,"height":11,"objId":-1,"objType":"void"},{"width":5,"height":0,"objId":-1,"objType":"void"},{"width":5,"height":1,"objId":-1,"objType":"void"},{"width":5,"height":2,"objId":-1,"objType":"void"},{"width":5,"height":3,"objId":-1,"objType":"void"},{"width":5,"height":4,"objId":-1,"objType":"void"},{"width":5,"height":5,"objId":-1,"objType":"void"},{"width":5,"height":6,"objId":-1,"objType":"void"},{"width":5,"height":7,"objId":5,"objType":"Static"},{"width":5,"height":8,"objId":-1,"objType":"void"},{"width":5,"height":9,"objId":-1,"objType":"void"},{"width":5,"height":10,"objId":-1,"objType":"void"},{"width":5,"height":11,"objId":-1,"objType":"void"},{"width":6,"height":0,"objId":-1,"objType":"void"},{"width":6,"height":1,"objId":-1,"objType":"void"},{"width":6,"height":2,"objId":-1,"objType":"void"},{"width":6,"height":3,"objId":-1,"objType":"void"},{"width":6,"height":4,"objId":-1,"objType":"void"},{"width":6,"height":5,"objId":-1,"objType":"void"},{"width":6,"height":6,"objId":-1,"objType":"void"},{"width":6,"height":7,"objId":6,"objType":"Static"},{"width":6,"height":8,"objId":-1,"objType":"void"},{"width":6,"height":9,"objId":-1,"objType":"void"},{"width":6,"height":10,"objId":-1,"objType":"void"},{"width":6,"height":11,"objId":-1,"objType":"void"},{"width":7,"height":0,"objId":-1,"objType":"void"},{"width":7,"height":1,"objId":-1,"objType":"void"},{"width":7,"height":2,"objId":-1,"objType":"void"},{"width":7,"height":3,"objId":-1,"objType":"void"},{"width":7,"height":4,"objId":-1,"objType":"void"},{"width":7,"height":5,"objId":-1,"objType":"void"},{"width":7,"height":6,"objId":-1,"objType":"void"},{"width":7,"height":7,"objId":7,"objType":"Static"},{"width":7,"height":8,"objId":-1,"objType":"void"},{"width":7,"height":9,"objId":-1,"objType":"void"},{"width":7,"height":10,"objId":-1,"objType":"void"},{"width":7,"height":11,"objId":-1,"objType":"void"},{"width":8,"height":0,"objId":-1,"objType":"void"},{"width":8,"height":1,"objId":-1,"objType":"void"},{"width":8,"height":2,"objId":-1,"objType":"void"},{"width":8,"height":3,"objId":-1,"objType":"void"},{"width":8,"height":4,"objId":-1,"objType":"void"},{"width":8,"height":5,"objId":-1,"objType":"void"},{"width":8,"height":6,"objId":-1,"objType":"void"},{"width":8,"height":7,"objId":8,"objType":"Static"},{"width":8,"height":8,"objId":-1,"objType":"void"},{"width":8,"height":9,"objId":-1,"objType":"void"},{"width":8,"height":10,"objId":-1,"objType":"void"},{"width":8,"height":11,"objId":-1,"objType":"void"},{"width":9,"height":0,"objId":-1,"objType":"void"},{"width":9,"height":1,"objId":-1,"objType":"void"},{"width":9,"height":2,"objId":-1,"objType":"void"},{"width":9,"height":3,"objId":-1,"objType":"void"},{"width":9,"height":4,"objId":-1,"objType":"void"},{"width":9,"height":5,"objId":-1,"objType":"void"},{"width":9,"height":6,"objId":-1,"objType":"void"},{"width":9,"height":7,"objId":9,"objType":"Static"},{"width":9,"height":8,"objId":-1,"objType":"void"},{"width":9,"height":9,"objId":-1,"objType":"void"},{"width":9,"height":10,"objId":-1,"objType":"void"},{"width":9,"height":11,"objId":-1,"objType":"void"},{"width":10,"height":0,"objId":-1,"objType":"void"},{"width":10,"height":1,"objId":-1,"objType":"void"},{"width":10,"height":2,"objId":-1,"objType":"void"},{"width":10,"height":3,"objId":-1,"objType":"void"},{"width":10,"height":4,"objId":-1,"objType":"void"},{"width":10,"height":5,"objId":-1,"objType":"void"},{"width":10,"height":6,"objId":-1,"objType":"void"},{"width":10,"height":7,"objId":10,"objType":"Static"},{"width":10,"height":8,"objId":-1,"objType":"void"},{"width":10,"height":9,"objId":-1,"objType":"void"},{"width":10,"height":10,"objId":-1,"objType":"void"},{"width":10,"height":11,"objId":-1,"objType":"void"},{"width":11,"height":0,"objId":-1,"objType":"void"},{"width":11,"height":1,"objId":-1,"objType":"void"},{"width":11,"height":2,"objId":-1,"objType":"void"},{"width":11,"height":3,"objId":-1,"objType":"void"},{"width":11,"height":4,"objId":-1,"objType":"void"},{"width":11,"height":5,"objId":-1,"objType":"void"},{"width":11,"height":6,"objId":-1,"objType":"void"},{"width":11,"height":7,"objId":11,"objType":"Static"},{"width":11,"height":8,"objId":-1,"objType":"void"},{"width":11,"height":9,"objId":-1,"objType":"void"},{"width":11,"height":10,"objId":-1,"objType":"void"},{"width":11,"height":11,"objId":-1,"objType":"void"},{"width":12,"height":0,"objId":-1,"objType":"void"},{"width":12,"height":1,"objId":-1,"objType":"void"},{"width":12,"height":2,"objId":-1,"objType":"void"},{"width":12,"height":3,"objId":-1,"objType":"void"},{"width":12,"height":4,"objId":-1,"objType":"void"},{"width":12,"height":5,"objId":-1,"objType":"void"},{"width":12,"height":6,"objId":-1,"objType":"void"},{"width":12,"height":7,"objId":12,"objType":"Static"},{"width":12,"height":8,"objId":-1,"objType":"void"},{"width":12,"height":9,"objId":-1,"objType":"void"},{"width":12,"height":10,"objId":-1,"objType":"void"},{"width":12,"height":11,"objId":-1,"objType":"void"},{"width":13,"height":0,"objId":-1,"objType":"void"},{"width":13,"height":1,"objId":-1,"objType":"void"},{"width":13,"height":2,"objId":-1,"objType":"void"},{"width":13,"height":3,"objId":-1,"objType":"void"},{"width":13,"height":4,"objId":-1,"objType":"void"},{"width":13,"height":5,"objId":-1,"objType":"void"},{"width":13,"height":6,"objId":-1,"objType":"void"},{"width":13,"height":7,"objId":13,"objType":"Static"},{"width":13,"height":8,"objId":-1,"objType":"void"},{"width":13,"height":9,"objId":-1,"objType":"void"},{"width":13,"height":10,"objId":-1,"objType":"void"},{"width":13,"height":11,"objId":-1,"objType":"void"},{"width":14,"height":0,"objId":-1,"objType":"void"},{"width":14,"height":1,"objId":-1,"objType":"void"},{"width":14,"height":2,"objId":-1,"objType":"void"},{"width":14,"height":3,"objId":-1,"objType":"void"},{"width":14,"height":4,"objId":-1,"objType":"void"},{"width":14,"height":5,"objId":-1,"objType":"void"},{"width":14,"height":6,"objId":-1,"objType":"void"},{"width":14,"height":7,"objId":14,"objType":"Static"},{"width":14,"height":8,"objId":-1,"objType":"void"},{"width":14,"height":9,"objId":-1,"objType":"void"},{"width":14,"height":10,"objId":-1,"objType":"void"},{"width":14,"height":11,"objId":-1,"objType":"void"},{"width":15,"height":0,"objId":-1,"objType":"void"},{"width":15,"height":1,"objId":-1,"objType":"void"},{"width":15,"height":2,"objId":-1,"objType":"void"},{"width":15,"height":3,"objId":-1,"objType":"void"},{"width":15,"height":4,"objId":-1,"objType":"void"},{"width":15,"height":5,"objId":-1,"objType":"void"},{"width":15,"height":6,"objId":-1,"objType":"void"},{"width":15,"height":7,"objId":15,"objType":"Static"},{"width":15,"height":8,"objId":-1,"objType":"void"},{"width":15,"height":9,"objId":-1,"objType":"void"},{"width":15,"height":10,"objId":-1,"objType":"void"},{"width":15,"height":11,"objId":-1,"objType":"void"}],"dynamicObjects":[{"size":{"width":10,"height":10},"position":{"x":23.261275000000023,"y":342},"visible":true,"collision":true,"colliding":true,"color":"red","hp":{"currentHp":50,"maxHp":100},"attackType":{"ranged":false,"melee":true},"range":{"ranged":20,"melee":5},"velocity":{"x":0,"y":0},"acceleration":{"x":0,"y":0},"objId":0},{"size":{"width":10,"height":10},"position":{"x":50,"y":50},"visible":true,"collision":true,"colliding":true,"color":"red","hp":{"currentHp":1,"maxHp":100},"attackType":{"ranged":false,"melee":true},"range":{"ranged":20,"melee":5},"velocity":{"x":0,"y":0},"acceleration":{"x":0,"y":0},"objId":1}],"staticObjects":[{"size":{"x":0,"y":0,"width":50,"height":50},"position":{"x":0,"y":350},"visible":true,"collision":true,"colliding":true,"color":"blue","objId":0},{"size":{"x":0,"y":0,"width":50,"height":50},"position":{"x":50,"y":350},"visible":true,"collision":true,"colliding":false,"color":"blue","objId":1},{"size":{"x":0,"y":0,"width":50,"height":50},"position":{"x":100,"y":350},"visible":true,"collision":true,"colliding":false,"color":"blue","objId":2},{"size":{"x":0,"y":0,"width":50,"height":50},"position":{"x":150,"y":350},"visible":true,"collision":true,"colliding":false,"color":"blue","objId":3},{"size":{"x":0,"y":0,"width":50,"height":50},"position":{"x":200,"y":350},"visible":true,"collision":true,"colliding":false,"color":"blue","objId":4},{"size":{"x":0,"y":0,"width":50,"height":50},"position":{"x":250,"y":350},"visible":true,"collision":true,"colliding":false,"color":"blue","objId":5},{"size":{"x":0,"y":0,"width":50,"height":50},"position":{"x":300,"y":350},"visible":true,"collision":true,"colliding":false,"color":"blue","objId":6},{"size":{"x":0,"y":0,"width":50,"height":50},"position":{"x":350,"y":350},"visible":true,"collision":true,"colliding":false,"color":"blue","objId":7},{"size":{"x":0,"y":0,"width":50,"height":50},"position":{"x":400,"y":350},"visible":true,"collision":true,"colliding":false,"color":"blue","objId":8},{"size":{"x":0,"y":0,"width":50,"height":50},"position":{"x":450,"y":350},"visible":true,"collision":true,"colliding":false,"color":"blue","objId":9},{"size":{"x":0,"y":0,"width":50,"height":50},"position":{"x":500,"y":350},"visible":true,"collision":true,"colliding":false,"color":"blue","objId":10},{"size":{"x":0,"y":0,"width":50,"height":50},"position":{"x":550,"y":350},"visible":true,"collision":true,"colliding":false,"color":"blue","objId":11},{"size":{"x":0,"y":0,"width":50,"height":50},"position":{"x":600,"y":350},"visible":true,"collision":true,"colliding":false,"color":"blue","objId":12},{"size":{"x":0,"y":0,"width":50,"height":50},"position":{"x":650,"y":350},"visible":true,"collision":true,"colliding":false,"color":"blue","objId":13},{"size":{"x":0,"y":0,"width":50,"height":50},"position":{"x":700,"y":350},"visible":true,"collision":true,"colliding":false,"color":"blue","objId":14},{"size":{"x":0,"y":0,"width":50,"height":50},"position":{"x":750,"y":350},"visible":true,"collision":true,"colliding":false,"color":"blue","objId":15}]}';
document.getElementById("save").addEventListener('click', ()=>{
    levelstring=level.saveLevel();
    document.getElementById("levelContent").innerText=levelstring;
});
document.getElementById("stop").addEventListener('click', ()=>{stopped=!stopped});
level.loadLevel(levelstring);
let stopped = false;
function gameLoop(){
    now=performance.now();
    let deltaTime=0;
    if(!stopped){
        deltaTime=(now-last)/1000;
    }
    last=now
    reloadLevel(ctx,deltaTime,grid)
    requestAnimationFrame(gameLoop);
}
function reloadLevel(ctx,deltaTime,grid){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for(let i=0;i<level.width;i++){
        for(let j=0;j<level.height;j++){
            //if(level.getTile(i,j).objType!=="void"){
                const Tile=level.getTile(i,j)
                switch(Tile.objType){
                    case "Static":{
                        const obj=level.staticObjects[Tile.objId]
                        obj.position.x=i*50
                        obj.position.y=j*50
                        obj.size.width=50
                        obj.size.height=50
                        ctx.fillStyle=obj.color
                        ctx.fillRect(i*50,j*50,50,50)
                        break
                    }
                    case "Dynamic":{
                        const obj=level.dynamicObjects[Tile.objId]
                        ctx.fillStyle=obj.color
                        ctx.fillRect(obj.position.x,obj.position.y,obj.size.width,obj.size.height)
                        break
                    }
                    case "Character":{
                        const obj=level.dynamicObjects[Tile.objId]
                        if(obj.colliding){
                            ctx.fillStyle='green';
                        }
                        else{
                            ctx.fillStyle='red';
                        }
                        movement.move(obj,deltaTime);
                        level.staticObjects.forEach(n=>movement.Collisions(obj,n))
                        ctx.fillRect(obj.position.x,obj.position.y,obj.size.width,obj.size.height)
                        break
                    }
                }
            //}
        }
    }
    drawHealthBar(ctx,level.getCharacter());
    if(grid){
        drawGrid(ctx)
    }
}
window.addEventListener('keydown', (event) => {
    if(event.key==='g'){
        grid=!grid
    }
    else if(event.key==='h'){
        level.getCharacter().hp.currentHp-=10;
    }
    else if(event.key==='j'){
        level.getCharacter().hp.currentHp+=10;
    }
})
function drawGrid(ctx){
    ctx.fillStyle='black'
    for(let i=1;i<12;i++){
        ctx.fillRect(0,i*50,800,1)
    }
    for(let i=1;i<16;i++){
        ctx.fillRect(i*50,0,1,600)
    }
}
function drawHealthBar(ctx,character){
    const hp=character.hp.currentHp;
    ctx.strokeStyle="black";
    ctx.lineWidth=1;
    ctx.strokeRect(3,3,102,14);
    if(hp>0) {
        ctx.fillStyle = `rgb(${255*(hp/100)+50},0,0)`;
        if(hp<=100) {
            ctx.fillRect(4, 4, hp, 12);
        }
        else{
            ctx.fillRect(4, 4, 100, 12);
        }
    }
}
controls(level.getCharacter(),movement);
gameLoop()

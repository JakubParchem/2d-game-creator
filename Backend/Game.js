import {Character} from "./GameObjects/Dynamic/CharacterClass.js";
import {Movement} from "./Movement/Movement.js";
import {controls} from "./Controls.js";
import {Platform} from "./GameObjects/Static/PlatformClass.js";
import {Level} from "./GameObjects/LevelClass.js"
let level=new Level()
level.fillWithEmpty()
level.addCharacter(0,0,new Character({width:10,height:10},'red',{x:25,y:25}))
for(let i=0;i<16;i++){
    level.updateTile(i,7,new Platform({x:0,y:0},'blue'))
}
let movement = new Movement(-500,150)
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let grid=false

let now=0,last=performance.now()
function gameLoop(){
    now=performance.now();
    const deltaTime=(now-last)/1000
    last=now
    reloadLevel(ctx,deltaTime,grid)
    requestAnimationFrame(gameLoop);
}
function reloadLevel(ctx,deltaTime,grid){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for(let i=0;i<16;i++){
        for(let j=0;j<12;j++){
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
    if(grid){
        drawGrid(ctx)
    }
}
window.addEventListener('keydown', (event) => {
    if(event.key==='g'){
        grid=!grid
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
controls(level.getCharacter(),movement);
gameLoop()

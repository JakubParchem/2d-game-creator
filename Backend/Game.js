import {Movement} from "./Movement/Movement.js";
import {controls,removeControls} from "./Controls.js";
import {Platform} from "./GameObjects/Static/PlatformClass.js";
import {Level} from "./GameObjects/LevelClass.js"
import{Player} from "./GameObjects/Dynamic/PlayerClass.js";
import {Enemy} from "./GameObjects/Dynamic/EnemyClass.js";
let level=new Level()
let currentTool = 'Platform';
let movement = new Movement(-500,150)
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let grid=true;
let load=true;
let now=0,last=performance.now()
let levelstring=level.getLevelJSON();
document.getElementById("save").addEventListener('click', ()=>{
    level.name='level.'+document.getElementById("levelName").value;
    level.saveLevel();
    reloadLevelList();
});
document.getElementById("stop").addEventListener('click', ()=>{
    if(!stopped){
        load=true;
        grid=true;
        document.getElementById("stop").innerText='Play'
    }
    else{
        grid=false
        levelstring=level.getLevelJSON();
        load=true;
        document.getElementById("stop").innerText='Create'
    }
    stopped=!stopped});
const gridHandler = (e) => {
    if(e.key==='g'){
        grid=!grid
    }
}
window.addEventListener('keydown', gridHandler);
canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const tileX = Math.floor(x / 50);
    const tileY = Math.floor(y / 50);
    if(level.getTile(tileX,tileY).objId===-1 && stopped) {
        if (currentTool === "Platform") {
            level.updateTile(tileX, tileY, new Platform({width: 50, height: 50}, "blue"));
        } else if (currentTool === "Enemy") {
            level.addEnemy(tileX,tileY,new Enemy({width:70,height:70},"red",{x:400,y:50},100))
        } else if (currentTool === "Player" && !level.getPlayer()) {
            level.addPlayer(tileX, tileY,new Player({width:70,height:70},"orange",{x:50,y:50},100));
        }
    }
    if((currentTool === "Eraser") && level.getTile(tileX,tileY).objId!==-1 && stopped) {
        level.clearTile(tileX,tileY);
        // levelstring=level.getLevelJSON();
        // level.loadLevel(levelstring);
        // load=true;
    }
});
let stopped = true;
function gameLoop(){
    now=performance.now();
    if(load){
        load=false;
        level.loadLevel(levelstring);
        controls(level,movement,true);
        reloadLevelList();
    }
    let deltaTime = 0;
    if (!stopped) {
        deltaTime = (now - last) / 1000.0;
    }
    last = now
    reloadLevel(ctx, deltaTime, grid)
    console.log("\n\n")
    requestAnimationFrame(gameLoop);
}
const platform=new Platform({width:50,height:50},"blue");
function reloadLevel(ctx,deltaTime,grid){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if((level.areEnemiesAlive() && !level.getPlayer().isDead()) || stopped) {
        for (let i = 0; i < level.width; i++) {
            for (let j = 0; j < level.height; j++) {
                const Tile = level.getTile(i, j)
                if(Tile.objType!=="void") {
                    switch (Tile.objType) {
                        case "Static": {
                            level.staticObjects[Tile.objId].reloadAction(ctx, i, j);
                            break
                        }
                        case "Dynamic": {
                            level.dynamicObjects[Tile.objId].reloadAction(ctx, i, j, level, movement, deltaTime);
                            break
                        }
                        case "Player": {
                            if (level.getPlayer() && !stopped) {
                                level.dynamicObjects[Tile.objId].reloadAction(ctx, i, j, level, movement, deltaTime);
                            } else if (level.getPlayer()) {
                                ctx.fillStyle = 'green'
                                ctx.fillRect(i * 50, j * 50, 50, 50)
                            }
                            break
                        }
                        case "Enemy": {
                            if (level.getPlayer() && level.areEnemiesAlive() && !stopped) {
                                level.dynamicObjects[Tile.objId].reloadAction(ctx, i, j, level, movement, deltaTime, level.getPlayer());
                            } else if (stopped) {
                                ctx.fillStyle = 'red'
                                ctx.fillRect(i * 50, j * 50, 50, 50)
                            }
                            break
                        }
                    }
                }
            }
        }
    }
    else if((level.getPlayer() && level.getPlayer().isDead() && !stopped) || (!level.areEnemiesAlive() && !stopped)){
        if(level.getPlayer().isDead()){
            ctx.clearRect(0, 0, 800, 600);
            ctx.font = "bold 72px Arial";
            ctx.fillStyle = "red";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("GAME OVER", 400, 300);
        }
        else {
            ctx.clearRect(0, 0, 800, 600);
            ctx.font = "bold 72px Arial";
            ctx.fillStyle = "Green";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("YOU WIN", 400, 300);
        }
    }
    if(level.getPlayer() && !stopped) {
        drawHealthBar(ctx, level.getPlayer());
        drawAttackBar(ctx, level.getPlayer());
    }
    if(grid){
        drawGrid(ctx)
    }
}
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
            ctx.fillRect(4, 4, 100, 13);
        }
    }
}
function drawAttackBar(ctx,character){
    const timer=performance.now()-character.lastAttack;
    ctx.strokeStyle="black";
    ctx.lineWidth=1;
    ctx.strokeRect(122,3,102,14);
    if(timer>0) {
        if(timer<=character.attackSpeed*1000 && character.lastAttack!==0) {
            ctx.fillStyle = `yellow`;
            ctx.fillRect(123, 4, 100 * (timer / (character.attackSpeed * 1000)), 12);
        }
        else{
            ctx.fillStyle = `orange`;
            ctx.fillRect(123, 4, 100, 12);
        }
    }
}
function reloadLevelList() {
    let levelList = document.getElementById("levelList");
    levelList.innerHTML = '';
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('level.')) {
            const li = document.createElement('li');
            const level = document.createElement('div');
            const removebtn=document.createElement('button');
            const loadbtn =document.createElement('button');
            const name=document.createElement('p');
            name.textContent = key.replace(/^level\./, '')
            loadbtn.textContent = 'Load Level'
            loadbtn.addEventListener('click', ()=>{levelstring=localStorage.getItem(key);load=true});
            removebtn.textContent = 'Remove Level';
            removebtn.addEventListener('click', ()=>{localStorage.removeItem(key);reloadLevelList();});
            level.append(name);
            level.appendChild(loadbtn);
            level.appendChild(removebtn);
            li.appendChild(level);
            levelList.appendChild(li);
        }
    }
}
document.getElementById("platform").addEventListener('click', () => setTool('Platform'));
document.getElementById("player").addEventListener('click', () => setTool('Player'));
document.getElementById("enemy").addEventListener('click', () => setTool('Enemy'));
document.getElementById("erase").addEventListener('click', () => setTool('Eraser'));

function setTool(tool) {
    currentTool = tool;
}
gameLoop()

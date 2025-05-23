import {Character} from "./GameObjects/Dynamic/CharacterClass.js";
import {Movement} from "./Movement/Movement.js";
import {controls} from "./Controls.js";
import {Platform} from "./GameObjects/Static/PlatformClass.js";
let character = new Character({width:10,height:10},{x:200,y:200})
character.velocity.x=50;
let platform =new Platform({width:800,height:10},{x:0,y:400})
let movement = new Movement(-500,30)
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let start=0,end=0
function gameLoop(){
    end=performance.now();
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if(character.colliding){
        ctx.fillStyle='green';
    }
    else{
        ctx.fillStyle='red';
    }
    ctx.fillRect(character.position.x,character.position.y,character.size.width,character.size.height)
    ctx.fillStyle='blue';
    ctx.fillRect(platform.position.x,platform.position.y,platform.size.width,platform.size.height)
    movement.move(character,(end-start)/1000);
    movement.Collisions(character,platform)
    start=performance.now();
    requestAnimationFrame(gameLoop);
}
controls(character,movement);
gameLoop()

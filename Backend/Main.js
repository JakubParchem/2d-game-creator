import {Character} from "./GameObjects/Dynamic/CharacterClass.js";
import {Movement} from "./Movement/Movement.js";
import {Platform} from "./GameObjects/Static/PlatformClass.js";

let character = new Character({width:10,height:10},{x:200,y:200})
character.velocity.x=50;
let platform =new Platform({width:800,height:10},{x:0,y:400})
let movement = new Movement(-100,15)
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
window.addEventListener('keydown', (event)=>{
    if(event.key===' '){
        character.velocity.y=-140;
    }
    if(event.key==='a' || event.key==='ArrowLeft'){
        character.velocity.x=-70
    }
    if(event.key==='d' || event.key==='ArrowRight'){
        character.velocity.x=70
    }
})
function gameLoop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle='red';
    ctx.fillRect(character.position.x,character.position.y,character.size.width,character.size.height)
    ctx.fillStyle='blue';
    ctx.fillRect(platform.position.x,platform.position.y,platform.size.width,platform.size.height)
    movement.move(character);
    movement.Collisions(character,platform)
    requestAnimationFrame(gameLoop);
}
gameLoop();

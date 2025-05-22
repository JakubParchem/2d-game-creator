import {Character} from "./GameObjects/Dynamic/CharacterClass.js";
import {Movement} from "./Movement/Movement.js";
import {Platform} from "./GameObjects/Static/PlatformClass.js";
let character = new Character({width:10,height:10},{x:200,y:200})
character.velocity.x=50;
let platform =new Platform({width:800,height:10},{x:0,y:400})
let movement = new Movement(-500,30)
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
function controls() {
    window.addEventListener('keydown', (event) => {
        if (event.key === ' ' || event.key === 'ArrowUp') {
            if(character.colliding) {
                character.velocity.y = -350;
            }
        }
        if (event.key === 'a' || event.key === 'ArrowLeft') {
            character.velocity.x = -150
            movement.airFriction = 0;
        }
        if (event.key === 'd' || event.key === 'ArrowRight') {
            character.velocity.x = 150
            movement.airFriction = 0;
        }
    })
    window.addEventListener('keyup', (event) => {
        if (event.key === 'a' || event.key === 'ArrowLeft') {
            character.velocity.x += 50
            movement.airFriction = 30;
        }
        if (event.key === 'd' || event.key === 'ArrowRight') {
            character.velocity.x -= 50
            movement.airFriction = 30;
        }
    })
}
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
controls();
gameLoop()

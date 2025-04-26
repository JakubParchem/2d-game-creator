import {Character} from "./GameObjects/Dynamic/CharacterClass.js";
import {Movement} from "./Movement/Movement.js";

let character = new Character({width:10,height:10},{x:200,y:200})
character.velocity.x=50;
let movement = new Movement()
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
function gameLoop(){
     ctx.clearRect(0, 0, canvas.width, canvas.height)
     ctx.fillStyle='red'
     ctx.fillRect(character.position.x,character.position.y,character.size.width,character.size.height)
     movement.move(character);
     requestAnimationFrame(gameLoop);
}
gameLoop();
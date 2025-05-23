import {Character} from "./GameObjects/Dynamic/CharacterClass.js";
import {Movement} from "./Movement/Movement.js";
export function controls(character,movement) {
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
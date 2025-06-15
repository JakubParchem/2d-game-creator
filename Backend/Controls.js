// import {Character} from "./GameObjects/Dynamic/CharacterClass.js";
// import {Movement} from "./Movement/Movement.js";
// import {Level} from "./GameObjects/LevelClass.js";
let onJumpHandler;
let onLeftDownHandler;
let onLeftUpHandler;
let onRightDownHandler;
let onRightUpHandler;
let healthDownHandler;
let healthUpHandler;
let attackHandler;

export function controls(level, movement,test) {
    const character = level.getPlayer();
    if (!character) return;
    onJumpHandler = (e) => {
        if ((e.key === 'w' || e.key === 'ArrowUp') && character.colliding) {
            character.velocity.y = -350;
            character.state='jumping';
        }
    };
    onLeftDownHandler = (e) => {
        if (e.key === 'a' || e.key === 'ArrowLeft') {
            character.velocity.x = -150;
            movement.airFriction = 0;
        }
    };
    onLeftUpHandler = (e) => {
        if ((e.key === 'a' || e.key === 'ArrowLeft') && character.colliding && character.velocity.x === -150) {
            character.velocity.x = 0;
            movement.airFriction = 30;
        }
    };
    onRightDownHandler = (e) => {
        if (e.key === 'd' || e.key === 'ArrowRight') {
            character.velocity.x = 150;
            movement.airFriction = 0;
        }
    };
    onRightUpHandler = (e) => {
        if ((e.key === 'd' || e.key === 'ArrowRight') && character.colliding && character.velocity.x === 150) {
            character.velocity.x = 0;
            movement.airFriction = 30;
        }
    };
    healthUpHandler = (e) => {
        if(e.key==='j'){
            level.getPlayer().hp.currentHp+=10;
        }
    }
    healthDownHandler = (e) => {
        if(e.key==='h'){
            level.getPlayer().hp.currentHp-=10;
        }
    }
    attackHandler = (e)=>{
        if(e.key==='q'){
            level.getPlayer().attackMultiple(level.getEnemies());
        }
    }
    window.addEventListener('keydown', onJumpHandler);
    window.addEventListener('keydown', onLeftDownHandler);
    window.addEventListener('keydown', onRightDownHandler);
    window.addEventListener('keydown',attackHandler);
    if(test){
        window.addEventListener('keydown',healthUpHandler);
        window.addEventListener('keydown', healthDownHandler);
    }
    window.addEventListener('keyup', onLeftUpHandler);
    window.addEventListener('keyup', onRightUpHandler);
}
export function removeControls() {
    window.removeEventListener('keydown', onJumpHandler);
    window.removeEventListener('keydown', onLeftDownHandler);
    window.removeEventListener('keyup', onLeftUpHandler);
    window.removeEventListener('keydown', onRightDownHandler);
    window.removeEventListener('keyup', onRightUpHandler);
    window.removeEventListener('keydown',healthUpHandler);
    window.removeEventListener('keydown', healthDownHandler);
}
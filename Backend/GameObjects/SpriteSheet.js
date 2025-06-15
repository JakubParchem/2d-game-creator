export class SpriteSheet {
    attack1 = { states: 0, name: '', frames: [], img: {} };
    attack2 = { states: 0, name: '', frames: [], img: {} };
    attack3 = { states: 0, name: '', frames: [], img: {} };
    dead    = { states: 0, name: '', frames: [], img: {} };
    idle    = { states: 0, name: '', frames: [], img: {} };
    jump    = { states: 0, name: '', frames: [], img: {} };
    run     = { states: 0, name: '', frames: [], img: {} };

    imgSize = { width: 128, height: 128 };

    constructor(src,player) {
        this.attack1.states = 4;
        this.attack1.name = src + '/Attack_1.png';
        this.attack1.img = new Image();
        this.attack1.img.src = this.attack1.name;
        this.generateFrames(this.attack1);

        this.attack2.states = 5;
        this.attack2.name = src + '/Attack_2.png';
        this.attack2.img = new Image();
        this.attack2.img.src = this.attack2.name;
        this.generateFrames(this.attack2);

        this.attack3.states = 4;
        this.attack3.name = src + '/Attack_3.png';
        this.attack3.img = new Image();
        this.attack3.img.src = this.attack3.name;
        this.generateFrames(this.attack3);

        this.dead.states = 6;
        this.dead.name = src + '/Dead.png';
        this.dead.img = new Image();
        this.dead.img.src = this.dead.name;
        this.generateFrames(this.dead);

        if(player) {
            this.idle.states = 6;
        }
        else{
            this.idle.states = 5;
        }
        this.idle.name = src + '/Idle.png';
        this.idle.img = new Image();
        this.idle.img.src = this.idle.name;
        this.generateFrames(this.idle);

        if(player) {
            this.jump.states = 9;
        }
        else{
            this.jump.states = 7;
        }
        this.jump.name = src + '/Jump.png';
        this.jump.img = new Image();
        this.jump.img.src = this.jump.name;
        this.generateFrames(this.jump);

        this.run.states = 8;
        this.run.name = src + '/Run.png';
        this.run.img = new Image();
        this.run.img.src = this.run.name;
        this.generateFrames(this.run);
    }

    generateFrames(state) {
        for (let i = 0; i < state.states; i++) {
            state.frames.push({ width: this.imgSize.width * i, height: 0 });
        }
    }
}

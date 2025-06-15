export class SpriteSheet {
    attack1={states:0,name:'',frames:[],img:{}};
    attack2={states:0,name:'',frames:[]};
    attack3={states:0,name:'',frames:[]};
    dead={states:0,name:'',frames:[]};
    idle={states:0,name:'',frames:[],img:{}};
    jump={states:0,name:'',frames:[]};
    run={states:0,name:'',frames:[]};
    imgSize={width:128,height:128};
    constructor(src){
        this.attack1.states=4
        this.attack1.name=src+'/Attack_1.png'
        this.attack1.img=new Image()
        this.attack1.img.src=name;
        this.generateFrames(this.attack1)
        this.attack2.states=5
        this.attack2.name=src+'/Attack_2.png'
        this.generateFrames(this.attack2)
        this.attack3.states=4
        this.attack3.name=src+'/Attack_3.png'
        this.generateFrames(this.attack3)
        this.dead.states=6
        this.dead.name=src+'/Dead.png'
        this.generateFrames(this.dead)
        this.idle.states=6
        this.idle.name=src+'/Idle.png'
        this.idle.img=new Image()
        this.idle.img.src=name;
        this.generateFrames(this.idle)
        this.jump.states=9
        this.jump.name=src+'/Jump.png'
        this.generateFrames(this.jump)
        this.run.states=8
        this.run.name=src+'/Run.png'
        this.generateFrames(this.run)
    }
    generateFrames(state){
        for (let i = 0; i < state.states; i++) {
            state.frames.push({width:this.imgSize.width*i,height:0});
        }
    }
}
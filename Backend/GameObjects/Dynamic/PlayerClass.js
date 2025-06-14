import {Character} from "./CharacterClass.js";

export class Player extends Character{
    player=true;
    constructor(size,color,position,hp) {
        super(size,color,position,hp);
    }

}
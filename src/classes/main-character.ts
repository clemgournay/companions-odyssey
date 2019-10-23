import { Character } from './character';
import { Controller } from '@classes/controller';

export class MainCharacter extends Character {

    constructor(cont: Controller, id: string) {
        super(cont, id);
    }

    public update() {
        const keys = this.cont.getInputProperty('keys');
        if (keys.ArrowDown) {
            this.walk('down');
        } else if (keys.ArrowLeft) {
            this.walk('left');
        } else if (keys.ArrowRight) {
            this.walk('right');
        } else if (keys.ArrowUp) {
            this.walk('up');
        } else {
           this.idle();
         }
    }

}

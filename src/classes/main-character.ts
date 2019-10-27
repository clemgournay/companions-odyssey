import { Character } from './character';
import { Controller } from '@classes/controller';
import { Log } from './log';

export class MainCharacter extends Character {

    constructor(cont: Controller, id: string) {
        super(cont, id);
        this.log = new Log('MAIN-CHAR');
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

    public walk(direction: string) {
        super.walk(direction);
        if (this.positionUpdated) {
            this.log.info('Position updated');
            this.cont.onCharPosUpdated();
        }
    }

}

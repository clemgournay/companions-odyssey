import { Stage, Ticker } from '@createjs/easeljs';

import { Controller } from './controller';
import { MainCharacter } from './main-character';

export class Game {

    private cont: Controller;
    private stage = new Stage('game-view');
    private mainCharacter: any;

    constructor (cont: Controller) {
        this.cont = cont;
    }

    public start () {
        this.mainCharacter = new MainCharacter(this.cont, 'character01');
        this.stage.addChild(this.mainCharacter.getSprite());
        Ticker.interval = 60;
        Ticker.addEventListener("tick", () => { this.tick(); });
    }

    public tick () {
        this.mainCharacter.update();
        this.stage.update();
    }

    

}

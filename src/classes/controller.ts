import { Ticker } from '@createjs/easeljs';

import { Game } from './game';
import { View } from './view';
import { Input } from './input';
import { Log } from './log';

export class Controller {

    private log = new Log('MAIN');
    private game = new Game(this);
    private view = new View(this);
    private input = new Input(this);

    constructor() {
        Ticker.interval = 60;
    }

    public init() {
        this.input.init();
        this.game.loadAssets();
    }

    public onGameLoaded() {
        this.game.start();
        this.view.start();
        Ticker.addEventListener('tick', () => { this.tick(); });
    }

    public tick() {
        this.game.update();
        this.view.update();
    }

    public collision(object: any, direction: string) {
        return this.game.collision(object, direction);
    }

    public onMapLoaded() {
        return this.game.onMapLoaded();
    }

    public getInputProperty(property: string) {
        return this.input.getProperty(property);
    }

    public getGameProperty(property: string, id: string = '') {
        return this.game.getProperty(property, id);
    }

    public getMainCharacterProperty(property: string) {
        return this.game.getMainCharacterProperty(property);
    }

    public getMapProperty(property: string) {
        return this.game.getMapProperty(property);
    }

    public getTilesetProperty(property: string) {
        return this.game.getTilesetProperty(property);
    }

}

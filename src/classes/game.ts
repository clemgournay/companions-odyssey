import { Stage, Ticker } from '@createjs/easeljs';

import { Controller } from './controller';
import { Log } from './log';
import { Map } from './map';

export class Game {

    private cont: Controller;
    private log: Log;
    private stage = new Stage('game-view');
    private assetsDef: any;
    private maps: any;
    private currentMap: Map;

    constructor(cont: Controller) {
        this.cont = cont;
        this.log = new Log('GAME');
        this.assetsDef = require('../config/assets-def.json');
        this.maps = {start: new Map(this.cont, 'start', 'Start town')};
        this.currentMap = this.maps.start;
        Ticker.interval = 60;
    }

    public loadAssets() {
        this.log.info('Loading game assets...');
        this.currentMap.loadAssets();
    }

    public onMapLoaded() {
        this.log.success('Successfully loaded, starting game...');
        this.cont.onGameLoaded();
    }

    public start() {
        this.stage.addChild(this.currentMap.getMainCharacterSprite());
        Ticker.addEventListener('tick', () => { this.tick(); });
    }

    public tick() {
        this.currentMap.update();
        this.stage.update();
    }

    public getAssetsDef(id: string) {
        return this.assetsDef[id];
    }

    public getMapAssets() {
        return this.currentMap.getAssets();
    }

}

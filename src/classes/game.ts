import { Controller } from './controller';
import { Log } from './log';
import { Map } from './map';

import gameConfig from '../config/game.json';

export class Game {

    private cont: Controller;
    private log: Log;
    private maps: any;
    private assetsDef: any;
    private currentMap: Map;
    private config: any;

    constructor(cont: Controller) {
        this.cont = cont;
        this.log = new Log('GAME');
        this.assetsDef = require('../config/assets-def.json');
        this.maps = {};
        this.maps.start = new Map(this.cont, 'start', 'Start town');
        this.currentMap = this.maps.start;
        this.config = gameConfig;
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
        // start
    }

    public update() {
        this.currentMap.update();
    }

    public collision(object: any, direction: string) {
        return this.currentMap.collision(object, direction);
    }

    public getProperty(property: string, id: string) {
        let object: any;
        switch (property) {
            case 'assets-def':
                object = this.assetsDef[id];
                break;
            case 'config':
                object = this.config;
                break;
        }
        return object;
    }

    public getMainCharacterProperty(property: string) {
        return this.currentMap.getMainCharacterProperty(property);
    }

    public getMapProperty(property: string) {
        return this.currentMap.getProperty(property);
    }

    public getTilesetProperty(property: string) {
        return this.currentMap.getTilesetProperty(property);
    }

}

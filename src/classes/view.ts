import { Stage, Container, Sprite, Shape } from '@createjs/easeljs';

import { Controller } from './controller';
import { ClientHttp2Session } from 'http2';

export class View {

    private cont: Controller;
    private stage: any;
    private mapContainer: any;

    constructor(cont: Controller) {
        this.cont = cont;
        this.stage = new Stage('game-view');
    }

    public start() {
        const tilesetSS = this.cont.getTilesetProperty('sprite-sheet');
        const mapGrid = this.cont.getMapProperty('grid');
        const mapSize = this.cont.getMapProperty('size');
        this.mapContainer = new Container();
        this.stage.addChild(this.mapContainer);
        console.log(mapGrid);

        for (const row of mapGrid) {
            console.log(row)
            for (const cell of row) {
                const tile = new Sprite(tilesetSS).set({x: cell.j * 32, y: cell.i * 32});
                tile.gotoAndStop(cell.content.index);
                if (cell.content.wall) {
                    //tile.alpha = 0.5;
                }
                this.mapContainer.addChild(tile);
            }
        }

        this.mapContainer.cache(0, 0, mapSize.width, mapSize.height);

        const mainCharacter = this.cont.getMainCharacterProperty('container');
        this.stage.addChild(mainCharacter);

    }

    public update() {
        this.stage.update();
    }

    public onCharPosUpdated() {
        const mapSize = this.cont.getMapProperty('size');
        const screenSize = this.cont.getGameProperty('config').screenSize;
        const character = this.cont.getMainCharacterProperty('container');
        const speed = this.cont.getMainCharacterProperty('speed');
        const direction = this.cont.getMainCharacterProperty('direction');
        let limit;

        if (mapSize.height >= screenSize.height) {

            switch (direction) {
                case 'down':
                    limit = screenSize.height / 2;
                    if (character.y >= limit) {
                        const nextPos = this.stage.y - speed;
                        if (nextPos >= - (mapSize.height - screenSize.height)) {
                            this.stage.y -= speed;
                        }
                    }
                    break;
                case 'left':
                        limit = Math.abs(this.stage.x) + screenSize.width / 2;
                        if (character.x <= limit) {
                            const nextPos = this.stage.x + speed;
                            if (nextPos <= 0) {
                                this.stage.x += speed;
                            }
                        }
                    break;
                case 'right':
                        limit = screenSize.width / 2;
                        if (character.x >= limit) {
                            const nextPos = this.stage.x - speed;
                            if (nextPos >= - (mapSize.width - screenSize.width)) {
                                this.stage.x -= speed;
                            }
                        }
                    break;
                case 'up':
                    limit = Math.abs(this.stage.y) + screenSize.height / 2;
                    if (character.y <= limit) {
                        const nextPos = this.stage.y + speed;
                        if (nextPos <= 0) {
                            this.stage.y += speed;
                        }
                    }
                    break;
            }
        }
    }

}

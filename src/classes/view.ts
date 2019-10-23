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
        this.mapContainer = new Container();
        this.stage.addChild(this.mapContainer);
        console.log(mapGrid);

        for (const row of mapGrid) {
            for (const cell of row) {
                const tile = new Sprite(tilesetSS).set({x: cell.j * 32, y: cell.i * 32});
                tile.gotoAndStop(cell.content.index);
                if (cell.content.wall) {
                    tile.alpha = 0.5;
                }
                this.mapContainer.addChild(tile);
            }
        }

        this.mapContainer.cache(0, 0, mapGrid.length * 32, mapGrid[0].length * 32);

        const sprite = this.cont.getMainCharacterProperty('sprite');
        const hitboxShape = this.cont.getMainCharacterProperty('hitbox-shape');

        this.stage.addChild(sprite);
        this.stage.addChild(hitboxShape);

    }

    public update() {
        this.stage.update();
    }

}

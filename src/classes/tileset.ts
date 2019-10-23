import { SpriteSheet } from '@createjs/easeljs';

import { Controller } from './controller';

import tilesetConfig from '../config/tilesets.json';

export class Tileset {

    private cont: Controller;
    private id: string;
    private tilesetConfig: any;
    private config: any;
    private asset: any;
    private spriteSheet: any;

    constructor(cont: Controller, id: string) {
        this.cont = cont;
        this.id = id;
        this.tilesetConfig = tilesetConfig;
        this.config = this.tilesetConfig[this.id];
    }

    public attachAssets(assets: any) {
        this.asset = assets[this.id];
        this.spriteSheet = new SpriteSheet({
            images: [this.asset.el],
            frames: {width: 32, height: 32, regX: 0, regY: 0, spacing: 0, margin: 0},
        });
    }

    public getCoor(index: number) {
        let i = 0;
        let j = 0;
        let count = 0;
        let found = false;
        while (!found && i < this.config.content.length) {
            while (!found && j < this.config.content[i].length) {
                if (count === index) {
                    found = true;
                } else {
                    j++;
                    count++;
                }
            }
            if (!found) {
                i++;
                j = 0;
            }
        }
        return (found) ? {i, j} : null;
    }

    public getWall(index: number) {
        const coor = this.getCoor(index);
        const wall = (coor) ? this.config.content[coor.i][coor.j] : null;
        return wall;
    }

    public getProperty(property: string) {
        let object: any;
        switch (property) {
            case 'config':
                object = this.config;
                break;
            case 'sprite-sheet':
                object = this.spriteSheet;
                break;
        }
        return object;
    }

}

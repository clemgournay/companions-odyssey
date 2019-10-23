
import { Sprite, SpriteSheet } from '@createjs/easeljs';

import { Controller } from './controller';
import { Log } from './log';
import { Loader } from './loader';
import { Character } from './character';
import { MainCharacter } from './main-character';
import { Tileset } from './tileset';

import { ICell } from '@models/cell';

import mapConfig from '../config/maps.json';

export class Map {

    private cont: Controller;
    private log: Log;
    private id: string;
    private name: string;
    private loader: Loader;
    private assets: any;
    private mapsConfig: any;
    private config: any;
    private tileset: Tileset;
    private mainCharacter: MainCharacter;
    private sprite: any;
    private pnjList: Character[];
    private grid: [ICell[]];

    constructor(cont: Controller, id: string, name: string) {
        this.cont = cont;
        this.log = new Log('MAP');
        this.id = id;
        this.name = name;
        this.loader = new Loader(this.cont);
        this.assets = {};
        this.mapsConfig = mapConfig;
        this.config = this.mapsConfig[this.id];
        this.tileset = new Tileset(this.cont, this.config.tileset);
        this.mainCharacter = new MainCharacter(this.cont, 'character01');
        this.pnjList = [];
        this.grid = [[]];
        this.buildGrid();
    }

    public loadAssets() {
        this.log.info('Loading assets for map ' + this.id + '..');
        this.loader.loadAssets((resp: any) => {
            if (resp.result === 'success') {
                this.assets = resp.assets;
                this.onAssetsLoaded();
            } else {
                alert('Loading error');
                console.error(resp.errors);
            }
        });
    }

    public onAssetsLoaded() {
        this.log.success('Successfully loaded');
        this.mainCharacter.attachAssets(this.assets);
        this.tileset.attachAssets(this.assets);
        this.cont.onMapLoaded();
    }

    public buildGrid() {
        let i: any;
        let j: any;
        let row: any;
        let val: any;
        for ([i, row] of Object.entries(this.config.content)) {
            const newRow: ICell[] = [];
            for ([j, val] of Object.entries(this.config.content[i])) {
                i = parseInt(i, 10);
                j = parseInt(j, 10);
                const cell: ICell = {
                    i, j,
                    content: {
                        index: val,
                        wall: this.tileset.getWall(val),
                    },
                };
                newRow.push(cell);
            }
            if (!this.grid[i]) {
                this.grid.push(newRow);
            } else {
                this.grid[i] = newRow;
            }
        }
    }

    public collision(object: any, direction: string) {
        let cellI = Math.floor(object.topLeft.x / 32);
        let cellJ = Math.floor(object.topLeft.y / 32);
        switch (direction) {
            case 'down':
                cellJ++;
                break;
            case 'left':
                cellI--;
                break;
            case 'right':
                cellI++;
                break;
            case 'up':
                cellJ--;
                break;
        }

        const cellBox = {
            topLeft: {x: cellI * 32, y: cellJ * 32},
            bottomRight: {x: (cellI + 1) * 32, y: (cellJ + 1) * 32},
        };
        console.log(cellI, cellJ);
        let wall = false;
        if (this.grid[cellJ]) {
            if (this.grid[cellI]) {
                if (this.grid[cellJ][cellI].content.wall) {
                    console.log('next block wall');
                    wall = false;
                    if (object.topLeft.x > cellBox.bottomRight.x || cellBox.topLeft.x > object.bottomRight.x) {
                        wall = true;
                    }
                    if (object.topLeft.y < cellBox.bottomRight.y || cellBox.topLeft.y < object.bottomRight.y) {
                        wall = true;
                    }
                }
           }
        }
        return wall;
    }

    public update() {
        this.mainCharacter.update();
    }

    public getMainCharacterProperty(property: string) {
        return this.mainCharacter.getProperty(property);
    }

    public getProperty(property: string) {
        let object: any;
        switch (property) {
            case 'grid':
                object = this.grid;
                break;
            case 'assets':
                object = this.assets;
                break;
        }
        return object;
    }

    public getTilesetProperty(property: string) {
        return this.tileset.getProperty(property);
    }

}

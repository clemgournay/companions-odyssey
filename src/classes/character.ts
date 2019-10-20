import { Sprite, SpriteSheet } from '@createjs/easeljs';

import { Controller } from '@classes/controller';

export class Character {
    
    protected cont: Controller;
    protected direction = 'down';
    protected speed = 2;
    protected sprite: any;

    constructor(cont: Controller, id: string) {
        this.cont = cont;
        const assets = this.cont.getLoadedAssets();
        const spriteSheet = new SpriteSheet({
            images: [assets[id].el],
            frames: {width: 32, height: 32, regX: 0, regY: 0},
            animations: {    
                idleDown: [1, 1, 'idleDown'],
                idleLeft: [4, 4, 'idleLeft'],
                idleRight: [7, 7, 'idleRight'],
                idleUp: [10, 10, 'idleUp'],
                walkDown: [0, 2, 'walkDown'],
                walkLeft: [3, 5, 'walkLeft'],
                walkRight: [6, 8, 'walkRight'],
                walkUp: [9, 11, 'walkUp']
            }
        });
        this.sprite = new Sprite(spriteSheet, 'idleDown');
    }

    public getSprite () {
        return this.sprite;
    }
    

}

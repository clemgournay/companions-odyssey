import { Sprite, SpriteSheet } from '@createjs/easeljs';

import { Controller } from '@classes/controller';

export class Character {

    protected cont: Controller;
    protected id: string;
    protected direction = 'down';
    protected speed = 2;
    protected sprite: any;
    protected walking = false;

    constructor(cont: Controller, id: string) {
        this.cont = cont;
        this.id = id;
    }

    public attachAssets(assets: any) {
        const spriteSheet = new SpriteSheet({
            images: [assets[this.id].el],
            frames: {width: 32, height: 32, regX: 0, regY: 0},
            animations: {
                idleDown: [1, 1, 'idleDown'],
                idleLeft: [4, 4, 'idleLeft'],
                idleRight: [7, 7, 'idleRight'],
                idleUp: [10, 10, 'idleUp'],
                walkDown: [0, 2, 'walkDown'],
                walkLeft: [3, 5, 'walkLeft'],
                walkRight: [6, 8, 'walkRight'],
                walkUp: [9, 11, 'walkUp'],
            },
        });
        this.sprite = new Sprite(spriteSheet, 'idleDown');
    }

    public walk(direction: string) {
        switch (direction) {
            case 'down':
                if (this.direction !== 'down' || !this.walking) {
                    this.walking = true;
                    this.direction = 'down';
                    this.sprite.gotoAndPlay('walkDown');
                }
                this.sprite.y += this.speed;
                break;
            case 'left':
                if (this.direction !== 'left' || !this.walking) {
                    this.walking = true;
                    this.direction = 'left';
                    this.sprite.gotoAndPlay('walkLeft');
                }
                this.sprite.x -= this.speed;
                break;
            case 'right':
                if (this.direction !== 'right' || !this.walking) {
                    this.walking = true;
                    this.direction = 'right';
                    this.sprite.gotoAndPlay('walkRight');
                }
                this.sprite.x += this.speed;
                break;
            case 'up':
                if (this.direction !== 'up' || !this.walking) {
                    this.walking = true;
                    this.direction = 'up';
                    this.sprite.gotoAndPlay('walkUp');
                }
                this.sprite.y -= this.speed;
                break;
        }
    }

    public idle() {
        this.walking = false;
        switch (this.direction) {
            case 'down':
                this.sprite.gotoAndPlay('idleDown');
                break;
            case 'up':
                this.sprite.gotoAndPlay('idleUp');
                break;
            case 'left':
                this.sprite.gotoAndPlay('idleLeft');
                break;
            case 'right':
                this.sprite.gotoAndPlay('idleRight');
                break;
        }
    }

    public automove() {
        console.log('move');
    }

    public getSprite() {
        return this.sprite;
    }

}

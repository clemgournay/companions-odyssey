import { Sprite, SpriteSheet, Shape } from '@createjs/easeljs';

import { Controller } from '@classes/controller';

import charsetsConfig from '../config/charsets.json';

export class Character {

    protected cont: Controller;
    protected id: string;
    protected direction = 'down';
    protected speed = 2;
    protected sprite: any;
    protected walking = false;
    protected charsetsConfig: any;
    protected config: any;
    protected hitboxShape: any;

    constructor(cont: Controller, id: string) {
        this.cont = cont;
        this.id = id;
        this.charsetsConfig = charsetsConfig;
        this.config = this.charsetsConfig[this.id];
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
        this.hitboxShape = new Shape();
        this.hitboxShape.graphics.beginFill('red');
        this.hitboxShape.graphics.drawRect(
            this.sprite.x + this.config.hitbox.x,
            this.sprite.y + this.config.hitbox.y,
            this.config.hitbox.width,
            this.config.hitbox.height,
        );
        this.hitboxShape.graphics.endFill();
        this.hitboxShape.alpha = 0.6;
    }

    public walk(direction: string) {

        const gameConfig = this.cont.getGameProperty('config');
        const width = this.hitboxShape.graphics._instructions[1].w;
        const height = this.hitboxShape.graphics._instructions[1].h;
        let noCollision: boolean;

        const hitboxPos: any = {
            topLeft: {
                x: 0, y: 0,
            },
            bottomRight: {
                x: 0, y: 0,
            },
        };

        switch (direction) {
            case 'down':
                if (this.direction !== 'down' || !this.walking) {
                    this.walking = true;
                    this.direction = 'down';
                    this.sprite.gotoAndPlay('walkDown');
                }

                hitboxPos.topLeft.x = this.hitboxShape.x;
                hitboxPos.topLeft.y = this.hitboxShape.y + this.speed;
                hitboxPos.bottomRight.x = hitboxPos.topLeft.x + width;
                hitboxPos.bottomRight.y = hitboxPos.topLeft.y + height;
                const dontReachesBottom = hitboxPos.bottomRight.y <= gameConfig.screenSize.height;
                noCollision = !this.cont.collision(hitboxPos, this.direction);
                if (dontReachesBottom && noCollision) {
                    this.sprite.y += this.speed;
                    this.hitboxShape.y += this.speed;
                }
                break;
            case 'left':
                if (this.direction !== 'left' || !this.walking) {
                    this.walking = true;
                    this.direction = 'left';
                    this.sprite.gotoAndPlay('walkLeft');
                }
                hitboxPos.topLeft.x = this.hitboxShape.x - this.speed;
                hitboxPos.topLeft.y = this.hitboxShape.y;
                hitboxPos.bottomRight.x = hitboxPos.topLeft.x + width;
                hitboxPos.bottomRight.y = hitboxPos.topLeft.y + height;
                const dontReachesLeft = hitboxPos.x >= 0;
                noCollision = !this.cont.collision(hitboxPos, this.direction);
                if (dontReachesLeft && noCollision) {
                    this.sprite.x -= this.speed;
                    this.hitboxShape.x -= this.speed;
                }
                break;
            case 'right':
                if (this.direction !== 'right' || !this.walking) {
                    this.walking = true;
                    this.direction = 'right';
                    this.sprite.gotoAndPlay('walkRight');
                }
                hitboxPos.topLeft.x = this.hitboxShape.x + this.speed;
                hitboxPos.topLeft.y = this.hitboxShape.y;
                hitboxPos.bottomRight.x = hitboxPos.topLeft.x + width;
                hitboxPos.bottomRight.y = hitboxPos.topLeft.y + height;
                const dontReachesRight = hitboxPos.bottomRight.x <= gameConfig.screenSize.width;
                console.log(hitboxPos.bottomRight.x)
                noCollision = !this.cont.collision(hitboxPos, this.direction);
                if (noCollision) {
                    this.sprite.x += this.speed;
                    this.hitboxShape.x += this.speed;
                }
                break;
            case 'up':
                if (this.direction !== 'up' || !this.walking) {
                    this.walking = true;
                    this.direction = 'up';
                    this.sprite.gotoAndPlay('walkUp');
                }
                hitboxPos.topLeft.x = this.hitboxShape.x;
                hitboxPos.topLeft.y = this.hitboxShape.y - this.speed;
                hitboxPos.bottomRight.x = hitboxPos.topLeft.x + width;
                hitboxPos.bottomRight.y = hitboxPos.topLeft.y + height;
                const dontReachesUp = hitboxPos.y >= 0;
                noCollision = !this.cont.collision(hitboxPos, this.direction);
                if (dontReachesUp && noCollision) {
                    this.sprite.y -= this.speed;
                    this.hitboxShape.y -= this.speed;
                }
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

    public getProperty(property: string) {
        let object: any;
        switch (property) {
            case 'sprite':
                object = this.sprite;
                break;
            case 'config':
                object = this.config;
                break;
            case 'hitbox-shape':
                object = this.hitboxShape;
                break;

        }
        return object;
    }

}

import { Sprite, SpriteSheet, Shape, Container } from '@createjs/easeljs';

import { Controller } from '@classes/controller';
import { Log } from './log';

import charsetsConfig from '../config/charsets.json';

export class Character {

    protected cont: Controller;
    protected id: string;
    protected log: Log;
    protected direction = 'down';
    protected container: any;
    protected sprite: any;
    protected hitbox: any;
    protected speed = 2;
    protected walking = false;
    protected charsetsConfig: any;
    protected config: any;
    protected positionUpdated: boolean;

    constructor(cont: Controller, id: string) {
        this.cont = cont;
        this.id = id;
        this.log = new Log('CHARACTER');
        this.charsetsConfig = charsetsConfig;
        this.config = this.charsetsConfig[this.id];
        this.positionUpdated = false;
    }

    public attachAssets(assets: any) {
        this.container = new Container();
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
        this.hitbox = new Shape();
        this.container.addChild(this.sprite);
        this.container.addChild(this.hitbox);
        this.hitbox.graphics.beginFill('red');
        this.hitbox.graphics.drawRect(
            0, 0,
            this.config.hitbox.width, this.config.hitbox.height,
        );
        this.hitbox.graphics.endFill();
        this.hitbox.alpha = 0.6;
        this.hitbox.x = this.config.hitbox.x;
        this.hitbox.y = this.config.hitbox.y;
        this.hitbox.absoluteX = this.container.x + this.hitbox.x;
        this.hitbox.absoluteY = this.container.y + this.hitbox.y;
        this.hitbox.width = this.config.hitbox.width;
        this.hitbox.height = this.config.hitbox.height;
    }

    protected walk(direction: string) {

        const mapSize = this.cont.getMapProperty('size');
        const gameConfig = this.cont.getGameProperty('config');
        let noCollision: boolean;

        const hitboxPos: any = {
            width: this.hitbox.width,
            height: this.hitbox.height,
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

                hitboxPos.topLeft.x = this.hitbox.absoluteX;
                hitboxPos.topLeft.y = this.hitbox.absoluteY + this.speed;
                hitboxPos.bottomRight.x = hitboxPos.topLeft.x + hitboxPos.width;
                hitboxPos.bottomRight.y = hitboxPos.topLeft.y + hitboxPos.height;
                const dontReachesBottom = hitboxPos.bottomRight.y <= mapSize.height;
                noCollision = !this.cont.collision(hitboxPos, this.direction);
                if (dontReachesBottom && noCollision) {
                    this.container.y += this.speed;
                    this.hitbox.absoluteY = this.container.y + this.hitbox.y;
                    this.positionUpdated = true;
                } else {
                    this.positionUpdated = false;
                }
                break;
            case 'left':
                if (this.direction !== 'left' || !this.walking) {
                    this.walking = true;
                    this.direction = 'left';
                    this.sprite.gotoAndPlay('walkLeft');
                }
                hitboxPos.topLeft.x = this.hitbox.absoluteX - this.speed;
                hitboxPos.topLeft.y = this.hitbox.absoluteY;
                hitboxPos.bottomRight.x = hitboxPos.topLeft.x + hitboxPos.width;
                hitboxPos.bottomRight.y = hitboxPos.topLeft.y + hitboxPos.height;
                const dontReachesLeft = this.container.x >= 0;
                noCollision = !this.cont.collision(hitboxPos, this.direction);
                if (dontReachesLeft && noCollision) {
                    this.container.x -= this.speed;
                    this.hitbox.absoluteX = this.container.x + this.hitbox.x;
                    this.positionUpdated = true;
                } else {
                    this.positionUpdated = false;
                }
                break;
            case 'right':
                if (this.direction !== 'right' || !this.walking) {
                    this.walking = true;
                    this.direction = 'right';
                    this.sprite.gotoAndPlay('walkRight');
                }
                hitboxPos.topLeft.x = this.hitbox.absoluteX + this.speed;
                hitboxPos.topLeft.y = this.hitbox.absoluteY;
                hitboxPos.bottomRight.x = hitboxPos.topLeft.x + hitboxPos.width;
                hitboxPos.bottomRight.y = hitboxPos.topLeft.y + hitboxPos.height;
                const dontReachesRight = hitboxPos.bottomRight.x <= gameConfig.screenSize.width;
                noCollision = !this.cont.collision(hitboxPos, this.direction);
                if (dontReachesRight && noCollision) {
                    this.container.x += this.speed;
                    this.hitbox.absoluteX = this.container.x + this.hitbox.x;
                    this.positionUpdated = true;
                } else {
                    this.positionUpdated = false;
                }
                break;
            case 'up':
                if (this.direction !== 'up' || !this.walking) {
                    this.walking = true;
                    this.direction = 'up';
                    this.sprite.gotoAndPlay('walkUp');
                }
                hitboxPos.topLeft.x = this.hitbox.absoluteX;
                hitboxPos.topLeft.y = this.hitbox.absoluteY - this.speed;
                hitboxPos.bottomRight.x = hitboxPos.topLeft.x + hitboxPos.width;
                hitboxPos.bottomRight.y = hitboxPos.topLeft.y + hitboxPos.height;
                const dontReachesUp = this.container.y >= 0;
                noCollision = !this.cont.collision(hitboxPos, this.direction);
                if (dontReachesUp && noCollision) {
                    this.container.y -= this.speed;
                    this.hitbox.absoluteY = this.container.y + this.hitbox.y;
                    this.positionUpdated = true;
                } else {
                    this.positionUpdated = false;
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
            case 'container':
                object = this.container;
                break;
            case 'speed':
                object = this.speed;
                break;
            case 'direction':
                object = this.direction;
                break;
            case 'config':
                object = this.config;
                break;

        }
        return object;
    }

}

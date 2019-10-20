import { Stage, Sprite, SpriteSheet, Ticker } from '@createjs/easeljs';
import { Loader } from './loader';
import { Input } from './input';

export class Game {

    private stage = new Stage('game-view');
    private loader = new Loader(this);
    private input = new Input();
    private mainCharacter: any;
    private direction = 'idle';
    private speed = 2;

    public run () {
        this.loader.processQueue();
    }

    public onAssetsLoaded (assets: any) {
        this.start();
    }

    public start () {
        this.input.init();
        const assets = this.loader.getLoadedAssets();
        const spriteSheet = new SpriteSheet({
            images: [assets.characters.el],
            frames: {width: 32, height: 32, regX: 0, regY: 0},
            animations: {    
                idleDown: [1, 1, 'idleDown'],
                idleLeft: [1, 1, 'idleLeft'],
                idleRight: [1, 1, 'idleRight'],
                idleUp: [1, 1, 'idleUp'],
                walkDown: [0, 2, 'walkDown'],
                walkLeft: [3, 5, 'walkLeft'],
                walkRight: [6, 8, 'walkRight'],
                walkUp: [9, 11, 'walkUp']
            }
        });
        this.mainCharacter = new Sprite(spriteSheet, 'idle');
        this.stage.addChild(this.mainCharacter);
        Ticker.interval = 60;
        Ticker.addEventListener("tick", () => { this.tick(); });
        
    }

    tick () {
        const keys = this.input.getKeys();
        console.log(keys)
        if (keys.ArrowDown) {
            if (this.direction !== 'down') {
                this.mainCharacter.gotoAndPlay('walkDown');
                this.direction = 'down';
            }
            this.mainCharacter.y += this.speed;
        } else if (keys.ArrowLeft) {
            if (this.direction !== 'left') {
                this.mainCharacter.gotoAndPlay('walkLeft');
                this.direction = 'left';
            }
            this.mainCharacter.x -= this.speed;
        } else if (keys.ArrowRight) {
            if (this.direction !== 'right') {
                this.mainCharacter.gotoAndPlay('walkRight');
                this.direction = 'right';
            }
            this.mainCharacter.x += this.speed;
        } else if (keys.ArrowUp) {
            if (this.direction !== 'up') {
                this.mainCharacter.gotoAndPlay('walkUp');
                this.direction = 'up';
            }
            this.mainCharacter.y -= this.speed;
        } else {
            this.direction = 'idle';
            this.mainCharacter.gotoAndPlay('idle');
        }
        this.stage.update();
    }

    

}
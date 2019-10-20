import { Character } from './character';
import { Controller } from '@classes/controller';

export class MainCharacter extends Character {

    protected walking: boolean;

    constructor(cont: Controller, id: string) {
        super(cont, id);
        this.walking = false;
    }

    update () {
        const keys = this.cont.getInputKeys();
        if (keys.ArrowDown) {
            if (this.direction !== 'down' || !this.walking) {
                this.walking = true;
                this.direction = 'down';
                this.sprite.gotoAndPlay('walkDown');
            }
            this.sprite.y += this.speed;
        } else if (keys.ArrowLeft) {
            if (this.direction !== 'left' || !this.walking) {
                this.walking = true;
                this.direction = 'left';
                this.sprite.gotoAndPlay('walkLeft');
            }
            this.sprite.x -= this.speed;
        } else if (keys.ArrowRight) {
            if (this.direction !== 'right' || !this.walking) {
                this.walking = true;
                this.direction = 'right';
                this.sprite.gotoAndPlay('walkRight');
            }
            this.sprite.x += this.speed;
        } else if (keys.ArrowUp) {
            if (this.direction !== 'up' || !this.walking) {
                this.walking = true;
                this.direction = 'up';
                this.sprite.gotoAndPlay('walkUp');
            }
            this.sprite.y -= this.speed;
        } else {
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
    }

}
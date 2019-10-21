import { Controller } from './controller';

export class Input {

    private cont: Controller;
    private keys: any;

    constructor(cont: Controller) {
        this.cont = cont;
        this.keys = {};
    }

    public init() {
        window.addEventListener('keydown', (e: any) => {
            this.keys[e.code] = true;
        });
        window.addEventListener('keyup', (e: any) => {
            e.preventDefault();
            delete this.keys[e.code];
        });
    }

    public getKeys() {
        return this.keys;
    }
}

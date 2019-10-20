

import { Game } from './game';
import { Loader } from './loader';
import { Input } from './input';

export class Controller {

    private game = new Game(this);
    private loader = new Loader(this);
    private input = new Input(this);

    public run () {
        this.loader.processQueue();
    }

    public onAssetsLoaded (assets: any) {
        this.start();
    }

    public start () {
        this.game.start();
        this.input.init();
    }

    public getLoadedAssets() {
        return this.loader.getLoadedAssets();
    }

    public getInputKeys() {
        return this.input.getKeys();
    }

}
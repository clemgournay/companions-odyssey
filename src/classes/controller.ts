
import { Game } from './game';
import { Input } from './input';
import { Log } from './log';

export class Controller {

    private log = new Log('MAIN');
    private game = new Game(this);
    private input = new Input(this);

    public init() {
        this.input.init();
        this.game.loadAssets();
    }

    public onGameLoaded() {
        this.game.start();
    }

    public getInputKeys() {
        return this.input.getKeys();
    }

    public getGameAssetsDef(id: string) {
        return this.game.getAssetsDef(id);
    }

    public getMapAssets() {
        return this.game.getMapAssets();
    }

    public onMapLoaded() {
        return this.game.onMapLoaded();
    }

}

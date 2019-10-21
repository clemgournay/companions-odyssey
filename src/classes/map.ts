import { Controller } from './controller';
import { Log } from './log';
import { Loader } from './loader';
import { Character } from './character';
import { MainCharacter } from './main-character';
import { ICell } from './cell';

export class Map {

    private cont: Controller;
    private log: Log;
    private id: string;
    private name: string;
    private loader: Loader;
    private assets: any;
    private mainCharacter: MainCharacter;
    private pnjList: Character[];
    private grid: ICell[];

    constructor(cont: Controller, id: string, name: string) {
        this.cont = cont;
        this.log = new Log('MAP');
        this.id = id;
        this.name = name;
        this.loader = new Loader(this.cont);
        this.assets = {};
        this.mainCharacter = new MainCharacter(this.cont, 'character01');
        this.pnjList = [];
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
        this.cont.onMapLoaded();
    }

    public update() {
        this.mainCharacter.update();
    }

    public getMainCharacterSprite() {
        return this.mainCharacter.getSprite();
    }

    public getAssets() {
        return this.assets;
    }

}

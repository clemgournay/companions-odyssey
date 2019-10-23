import { Controller } from '@classes/controller';
import { Log } from './log';

import { IQueueItem } from '../models/queue-item';

export class Loader {

    private cont: Controller;
    private log: Log;
    private assetsDef: any;
    private queue: IQueueItem[];
    private loading = false;
    private assets: any;
    private length: number;
    private count: number;
    private errors: any[];
    private completeCallback: any;

    constructor(cont: Controller) {
        this.cont = cont;
        this.log = new Log('LOADER');
        this.queue = [];
        this.assets = {};
        this.length = 0;
        this.count = 0;
        this.errors = [];
    }

    public loadAssets(completeCallback: any) {
        this.assetsDef = this.cont.getGameProperty('assets-def', 'start');
        this.completeCallback = completeCallback;
        this.length += Object.keys(this.assetsDef.images.charsets).length;
        this.length++; // For map tileset
        const tileset: IQueueItem = {
            id: this.assetsDef.images.tileset,
            nature: 'image',
            type: 'tileset',
            src: require('../../assets/img/tilesets/' + this.assetsDef.images.tileset + '.png'),
            endStatus: false,
            hasError: false,
        };
        this.queue.push(tileset);
        for (const id of Object.keys(this.assetsDef.images.charsets)) {
            const assets = this.assetsDef.images.charsets;
            const item: IQueueItem = {
                id,
                nature: 'image',
                type: 'charset',
                src: require('../../assets/img/charsets/' + assets[id] + '.png'),
                endStatus: false,
                hasError: false,
            };
            this.queue.push(item);
        }
        this.processQueue();
    }

    public processQueue() {
        if (!this.loading) {
            this.loading = true;
            this.queue.forEach((item: IQueueItem, index: number) => {
                this.log.info('Loading ' + (index + 1) + ' files of ' + this.length + '...');
                switch (item.nature) {
                    case 'image':
                        item.el = new Image();
                        item.el.index = index;
                        item.el.src = item.src;
                        item.el.onload = ((e: any) => {
                            const el: any = e.path[0];
                            const refItem = this.queue[el.index];
                            refItem.endStatus = true;
                            this.assets[refItem.id] = refItem;
                            this.assets[refItem.id].endStatus = true;
                            this.count++;
                            this.progress();
                        });
                        item.el.onerror = ((e: any) => {
                            const el: any = e.path[0];
                            const refItem = this.queue[el.index];
                            refItem.endStatus = true;
                            refItem.hasError = true;
                            this.errors.push({code: 'load-error', refItem});
                            this.count++;
                            this.progress();
                        });
                }
            });
        }
    }

    public progress() {
        if (this.count === this.length) {
            if (this.errors.length === 0) {
                this.completeCallback({result: 'success', assets: this.assets});
            } else {
                this.completeCallback({result: 'fail', assets: this.assets, errors: this.errors});
            }
        }
    }

    public getLoadedAssets() {
        return this.assets;
    }

    private getQueueIndex(id: string) {
      let i = 0;
      let found = false;
      while (!found && i < this.queue.length) {
        if (this.queue[i].id === id) {
          found = true;
        } else {
          i++;
        }
      }
      const index = (found) ? i : -1;
      return index;
    }

}

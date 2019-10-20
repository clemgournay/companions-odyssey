import { Controller } from '@classes/controller';

import { IAsset } from '@models/asset';
import { IQueueItem } from '../models/queue-item';

export class Loader {

    private assets = require('../config/assets.json');
    private queue: IQueueItem[] = [];
    private loading = false;
    private loadedAssets: any = {};
    private cont: Controller;

    constructor(cont: Controller) {
        this.cont = cont;
        for (const id of Object.keys(this.assets)) {
            const asset: IAsset = this.assets[id];
            let src: string;
            switch (asset.type) {
                case 'charset':
                    src = require('../../assets/img/charset/' + asset.filename);
                    break;
                default:
                    src = 'not-found';
                    break;
            }

            const item: IQueueItem = {
                endStatus: false,
                hasError: false,
                id,
                nature: this.assets[id].nature,
                src,
                type: this.assets[id].type,
            };
            this.queue.push(item);
        }
    }

    public processQueue() {
        if (!this.loading) {
            this.loading = true;
            this.queue.forEach((item: IQueueItem) => {
                switch (item.nature) {
                    case 'image':
                        item.el = new Image();
                        item.el.src = item.src;
                        item.el.onload = (() => {
                            item.endStatus = true;
                            this.loadedAssets[item.id] = item;
                            this.progress(item.id);
                        });
                        item.el.onerror = ((res: any) => {
                            item.endStatus = true;
                            item.hasError = true;
                        });
                }
            });
        }
    }

    public progress(id: string) {
        const queueIndex = this.getQueueIndex(id);
        this.queue.splice(queueIndex, 1);
        if (this.queue.length === 0) {
          this.finishedLoading();
        }
    }

    public finishedLoading() {
        this.cont.onAssetsLoaded(this.loadedAssets);
    }

    public getLoadedAssets() {
        return this.loadedAssets;
    }
  
    private getQueueIndex(id: string) {
      let i = 0, found = false;
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

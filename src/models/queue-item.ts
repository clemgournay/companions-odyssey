import { IAsset } from './asset';

export interface IQueueItem extends IAsset {
    id: string;
    endStatus: boolean;
    hasError: boolean;
}

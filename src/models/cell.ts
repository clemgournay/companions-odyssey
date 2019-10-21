import { ITileset } from './tileset';

export interface ICell {
    i: number;
    j: number;
    content: ITileset;
    wall: boolean;
}
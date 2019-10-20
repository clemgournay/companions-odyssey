export class Input {
    
    keys:any = {};

    public init () {
        window.addEventListener('keydown', (e: any) => {
            e.preventDefault();
            this.keys[e.code] = true;
        });
        window.addEventListener('keyup', (e: any) => {
            e.preventDefault();
            delete this.keys[e.code];
        });
    }

    public getKeys () {
        return this.keys;
    }
}
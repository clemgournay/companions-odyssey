export class Log {

    private className: string;
    private classColor: string;
    private blankColor: string;
    private infoColor: string;
    private successColor: string;
    private warningColor: string;
    private errorColor: string;
    private classBlockWidth: number;

    constructor(className: string) {
        this.className = className;
        this.classColor = 'background: #555555; color: white';
        this.blankColor = 'background: white, color: white';
        this.infoColor = 'color: purple';
        this.successColor = 'color: green';
        this.warningColor = 'background: yellow; color: orange';
        this.errorColor = 'background: red, color: white';
        this.classBlockWidth = 8;
    }

    public info(message: string) {
        this.log(message, this.infoColor);
    }

    public success(message: string) {
        this.log(message, this.successColor);
    }

    public warning(message: string) {
        this.log(message, this.warningColor);
    }

    public error(message: string) {
        this.log(message, this.errorColor);
    }

    private log(message: string, color: string) {
        let classBlockStr = '';
        const reminingChar = this.classBlockWidth - this.className.length;
        for (let i = 0; i < reminingChar; i++) {
            classBlockStr += ' ';
        }
        console.log('%c ' + this.className + classBlockStr + '%c  ' + '%c' + message, this.classColor, this.blankColor, color);
    }

}

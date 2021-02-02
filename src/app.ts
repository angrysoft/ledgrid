import { Canvas } from "./canvas.js";


class App {
    private canvas: Canvas;
    private btnAddGrid: HTMLButtonElement;
    private btnSaveCanvas: HTMLAnchorElement;
    private btnClearCanvas: HTMLButtonElement;

    public constructor() {
        this.canvas = new Canvas(1920, 1080);
        this.canvas.addGrid(9,4,128,128);
        this.btnAddGrid = document.getElementById('add-grid') as HTMLButtonElement;
        
        this.btnSaveCanvas = document.getElementById('save-canvas') as HTMLAnchorElement;
        this.btnSaveCanvas.addEventListener('click', (e:Event) => {
            this.btnSaveCanvas.href = this.canvas.saveToFile();
            this.btnSaveCanvas.download = `${this.canvas.width}x${this.canvas.height}`;
        });

        this.btnClearCanvas = document.getElementById('clear-canvas') as HTMLButtonElement;
        this.btnClearCanvas.addEventListener('click', (e:Event) => {
            this.canvas.clear();
        });
    }
}

window.onload = () => {
    new App();
};
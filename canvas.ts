class App {
    private canvas: Canvas;
    public constructor() {
        this.canvas = new Canvas(1920, 1080);
    }
}

class Canvas {
    private canvasElement: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private inputCanvasWidth: HTMLInputElement;
    private inputCanvasHeight: HTMLInputElement;

    public constructor(width:number, height:number) {
        this.canvasElement = document.getElementById("led-canvas") as HTMLCanvasElement;
        this.ctx = this.canvasElement.getContext("2d");
        
        this.inputCanvasWidth = document.getElementById("canvas-width") as HTMLInputElement;
        this.inputCanvasHeight = document.getElementById("canvas-height") as HTMLInputElement;
        this.inputCanvasWidth.valueAsNumber = width;
        this.inputCanvasHeight.valueAsNumber = height;
        this.changeSize();
        this.connectEvents();
    }

    private connectEvents() {
        this.inputCanvasHeight.addEventListener('change', (e:Event) => this.changeSize());
        this.inputCanvasWidth.addEventListener('change', (e:Event) => this.changeSize());
    }
    
    public changeSize() {
        this.canvasElement.width = this.inputCanvasWidth.valueAsNumber;
        this.canvasElement.height = this.inputCanvasHeight.valueAsNumber;
    }

    public addGrid() {}

    public delGrid() {}

    public clear() {
        this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    }
}

class GridTable {
    private tableElement: HTMLTableElement;

    public constructor(id:string) {
        this.tableElement = document.getElementById(id) as HTMLTableElement;
    }

    public addRow() {}

    public delRow() {}

}

class Grid {
    public constructor(offsetX:number, offsetY:number, name:string) {

    }
}

window.onload = () => {
    new App();
};
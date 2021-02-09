import { Canvas } from "./canvas.js";
import { GridTable } from "./gridtable.js";


class App {
    private canvas: Canvas;
    private inputCanvasName: HTMLInputElement;
    private inputCanvasWidth: HTMLInputElement;
    private inputCanvasHeight: HTMLInputElement;
    private btnSaveCanvas: HTMLAnchorElement;
    private btnClearCanvas: HTMLButtonElement;
    private btnImportCanvas: HTMLButtonElement;
    private btnExportCanvas: HTMLButtonElement;
    
    private btnAddGrid: HTMLButtonElement;
    private btnDelGrid: HTMLButtonElement;
    
    private gridTable: GridTable;
    
    public constructor() {
        let width:number = 1920;
        let height:number = 1080;
        this.canvas = new Canvas(width, height);
        this.inputCanvasName = document.getElementById('canvas-name') as HTMLInputElement;
        this.inputCanvasWidth = document.getElementById("canvas-width") as HTMLInputElement;
        this.inputCanvasWidth.valueAsNumber = width;
        this.inputCanvasHeight = document.getElementById("canvas-height") as HTMLInputElement;
        this.inputCanvasHeight.valueAsNumber = height;
        
        
        this.btnSaveCanvas = document.getElementById('save-canvas') as HTMLAnchorElement;
        this.btnClearCanvas = document.getElementById('clear-canvas') as HTMLButtonElement;
        this.btnImportCanvas = document.getElementById('import-canvas') as HTMLButtonElement;
        this.btnExportCanvas = document.getElementById('export-canvas') as HTMLButtonElement;
        
        this.btnAddGrid = document.getElementById('add-grid') as HTMLButtonElement;
        this.btnDelGrid = document.getElementById('del-grid') as HTMLButtonElement;

        this.gridTable = new GridTable('grid-list');
        this.connectEvents();
    }
    
    public connectEvents(): void {
        this.inputCanvasName.addEventListener('change', (e: Event) => {
            this.canvas.name = this.inputCanvasName.value;
        });

        
        this.btnSaveCanvas.addEventListener('click', () => this.saveCanvas());
        this.btnClearCanvas.addEventListener('click', () => this.clearCanvas());
        this.btnImportCanvas.addEventListener('click', () => this.importCanvas());
        this.btnExportCanvas.addEventListener('click', () => this.exportCanvas());
        
        this.btnAddGrid.addEventListener('click', () => this.addGrid());
        this.btnDelGrid.addEventListener('click', () => this.delGrid());

        this.inputCanvasHeight.addEventListener('change', (e:Event) => this.canvasChangeSize());
        this.inputCanvasWidth.addEventListener('change', (e:Event) => this.canvasChangeSize());
        this.gridTable.tableElement.addEventListener('gridchange', () => {
            this.redrawCanvas();
        });
    }
    
    private addGrid():void {
        let cols:number = 1;
        let rows:number = 1;
        let tileWidth:number = 128;
        let tileHeight:number = 128;
        let offsetX:number = 0;
        let offsetY:number = 0;
        let name:string = "Screen";
        let style:string = "default";
        this.canvas.addGrid(cols, rows, tileWidth, tileHeight, offsetX, offsetY, name);
        this.gridTable.addRow(cols, rows, tileWidth, tileHeight, offsetX, offsetY, name);
    }
    
    private delGrid():void {}
    
    private saveCanvas():void {
        this.btnSaveCanvas.href = this.canvas.saveToFile();
        this.btnSaveCanvas.download = `${this.canvas.name}-${this.canvas.width}x${this.canvas.height}`;
    }
    
    private clearCanvas() {
        this.canvas.clear();
        this.gridTable.clear();

    }

    private importCanvas() {}
    private exportCanvas() {}

    private canvasChangeSize() {
        let width = this.inputCanvasWidth.valueAsNumber;
        let height = this.inputCanvasHeight.valueAsNumber;
        this.canvas.changeSize(width, height);
        this.redrawCanvas();
    }
    
    private redrawCanvas() {
        console.log('redrawCAnvas', this.gridTable.getGridInfoList());
        this.canvas.redrawGrids(this.gridTable.getGridInfoList());
    }
}

window.onload = () => {
    new App();
};
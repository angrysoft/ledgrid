import { Grid } from "./grid.js";
import { GridTable } from "./gridtable.js";

export class Canvas {
    private canvasElement: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private inputCanvasWidth: HTMLInputElement;
    private inputCanvasHeight: HTMLInputElement;
    private gridList: Grid[] = [];
    private gridTable: GridTable;

    public constructor(width:number, height:number) {
        this.canvasElement = document.getElementById("led-canvas") as HTMLCanvasElement;
        this.ctx = this.canvasElement.getContext("2d") as CanvasRenderingContext2D;
        
        this.gridTable = new GridTable('grid-list');

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
        this.redrawGrids();
    }

    public get width(): number {
        return this.canvasElement.width;
    }

    public get height(): number {
        return this.canvasElement.height;
    }

    private redrawGrids() {
        this.gridList.forEach((grid: Grid) => {
            grid.draw();
        });
    }

    public addGrid(cols:number, rows:number, tileWidth:number, tileHeight:number, offsetX:number = 0, offsetY:number = 0, name:string = "Screen") {
        let grid:Grid = new Grid(this.ctx, cols, rows, tileWidth, tileHeight, offsetX, offsetY, name);
        this.gridList.push(grid);
        this.gridTable.addRow(cols, rows, tileWidth, tileHeight, offsetX, offsetY, name);
        grid.draw();
    }

    public delGrid() {

    }

    public clear() {
        this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
        this.gridList = [];
    }

    public saveToFile() {
        let image = this.canvasElement.toDataURL('image/png');
        return image;
    }
}
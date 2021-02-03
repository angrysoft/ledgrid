import { Grid } from "./grid.js";
import { GridTable } from "./gridtable.js";

export class Canvas {
    private canvasElement: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private inputCanvasWidth: HTMLInputElement;
    private inputCanvasHeight: HTMLInputElement;
    private gridTable: GridTable;
    private canvasName:string;

    public constructor(width:number, height:number, name:string = 'Canvas') {
        this.canvasName = name;
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
        this.gridTable.tableElement.addEventListener('gridchange', () => {
            console.log('gridchange');
            this.redrawGrids();
        });
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

    public get name(): string {
        return this.canvasName;
    }

    public set name(value:string) {
        this.canvasName = value;
    }

    private redrawGrids() {
        let grids = this.gridTable.getGridFromRows();
        this.clear();
        grids.forEach((grid) => {
            console.log(grid);
            let newGrid: Grid = new Grid(this.ctx, Number(grid[0]), Number(grid[1]), Number(grid[2]), Number(grid[3]), Number(grid[4]), Number(grid[5]), grid[6]?.toString());
            newGrid.draw()
        });
    }

    public addGrid(cols:number, rows:number, tileWidth:number, tileHeight:number, offsetX:number = 0, offsetY:number = 0, name:string = "Screen") {
        let grid:Grid = new Grid(this.ctx, cols, rows, tileWidth, tileHeight, offsetX, offsetY, name);
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
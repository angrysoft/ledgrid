import { Grid, GridInfo } from "./grid.js";

export class Canvas {
    private canvasElement: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private canvasName:string;

    public constructor(width:number, height:number, name:string = 'Canvas') {
        this.canvasName = name;
        this.canvasElement = document.getElementById("led-canvas") as HTMLCanvasElement;
        this.ctx = this.canvasElement.getContext("2d") as CanvasRenderingContext2D;
        
        this.changeSize(width, height);
    }

    public changeSize(width:number, height:number) {
        this.canvasElement.width = width;
        this.canvasElement.height = height;
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

    public redrawGrids(gridList: GridInfo[]) {
        this.clear();
        gridList.forEach((grid) => {
            let newGrid: Grid = new Grid(this.ctx,
                Number(grid.get("cols")),
                Number(grid.get("rows")),
                Number(grid.get("tileWidth")),
                Number(grid.get("tileHeight")),
                Number(grid.get("offsetX")),
                Number(grid.get("offsetY")),
                String(grid.get("name")));
            newGrid.draw()
        });
    }

    public addGrid(cols:number, rows:number, tileWidth:number, tileHeight:number, offsetX:number = 0, offsetY:number = 0, name:string = "Screen") {
        let grid:Grid = new Grid(this.ctx, cols, rows, tileWidth, tileHeight, offsetX, offsetY, name);
        grid.draw();
    }

    public delGrid() {

    }

    public clear():void {
        this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    }

    public saveToFile():string {
        let image = this.canvasElement.toDataURL('image/png');
        return image;
    }
}
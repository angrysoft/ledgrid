class App {
    private canvas: Canvas;
    public constructor() {
        this.canvas = new Canvas(1920, 1080);
        this.canvas.addGrid(9,4,128,128);
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

    public addGrid(cols:number, rows:number, tileWidth:number, tileHeight:number, offsetX:number = 0, offsetY:number = 0, name:string = "Screen") {
        let grid:Grid = new Grid(this.ctx, cols, rows, tileWidth, tileHeight, offsetX, offsetY, name);
        grid.draw();
    }

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
    public cols: number;
    public rows: number;
    public name: string;
    public offsetX: number;
    public offsetY: number;
    public tileWidth: number;
    public tileHeight: number;
    public style: GridStyle;
    private ctx: CanvasRenderingContext2D;

    public constructor(canvasContext: CanvasRenderingContext2D, cols:number, rows:number, tileWidth:number, tileHeight:number, offsetX:number = 0, offsetY:number = 0, name:string = "Screen", style: GridStyle = new DefaultStyle()) {
        this.ctx = canvasContext;
        this.cols = cols;
        this.rows = rows;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
        this.name = name;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.style = style;
    }

    public draw() {
        let tileQuantity: number = this.cols * this.rows;
        let currentTile: Tile = new Tile(this.tileWidth, this.tileHeight, this.offsetX, this.offsetY);

        this.applyStyle();

        for (let tileNumber = 0; tileNumber < tileQuantity; ++tileNumber) {
            console.log(`${currentTile.indexY}.${currentTile.indexX} position ${currentTile.x}x${currentTile.y}`);
            this.drawTail(currentTile);
            if (currentTile.indexX == this.cols) {
                currentTile.moveTailDown();
            } else {
                currentTile.moveTailRight();
            }
        }
    }
    
    private applyStyle() {
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle  = this.style.baseColor;
    }
    
    private drawTail(tile: Tile) {
        this.ctx.strokeRect(tile.x, tile.y, tile.width, tile.height);
        if (this.style.drawTileIds) {
            this.ctx.font = "20px Arial";
            this.ctx.fillStyle = this.style.idFontColor;
            this.ctx.fillText(`${tile.indexY}.${tile.indexX}`, tile.x + 4, tile.y + 24);
        }
    }

    private drawIds() {}

    private drawCross() {}

    private drawResolution() {

    }
}

class Tile {
    public x: number;
    public y: number;
    private baseX: number;
    private baseY: number;
    public width: number;
    public height: number;
    public indexX: number;
    public indexY: number;

    public constructor(width: number, height:number, x: number = 0, y:number = 0) {
        this.baseX = x;
        this.baseY = y;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.indexX = 1;
        this.indexY = 1;
    }
    
    public createTailRight() {
        return new Tile(this.width, this.height, this.x + this.width, this.y);
    }

    public createTailBottom() {
        return new Tile(this.width, this.height, this.x, this.y + this.height);
    }

    public moveTailRight() {
        this.x = this.x + this.width;
        this.indexX++;
    }

    public moveTailDown() {
        this.y = this.y + this.height;
        this.indexX = 1;
        this.x = this.baseX;
        this.indexY++;
    }
}

interface GridStyle {
    baseColor: string;
    drawGrid: boolean;
    drawTileIds: boolean;
    drawCircle: boolean;
    drawCross: boolean;
    gridColor:string;
    idFontColor:string;
    fontColor: string;
}

class DefaultStyle implements GridStyle {
    baseColor: string;
    drawGrid: boolean = true;
    drawTileIds: boolean = true;
    drawCircle: boolean = true;
    drawCross: boolean = true;
    gridColor:string = "#fff";
    idFontColor:string =  "#fff";
    fontColor: string = "#ff860a";

    public constructor() {
        this.baseColor = "#fff";
    }
}

class GridOptions {
}



window.onload = () => {
    new App();
};
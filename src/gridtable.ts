export class GridTable {
    private tableElement: HTMLTableElement;
    private tableBody: HTMLTableSectionElement;

    public constructor(id:string) {
        this.tableElement = document.getElementById(id) as HTMLTableElement;
        this.tableBody = this.tableElement.querySelector('tbody') as HTMLTableSectionElement;
        this.connectEvents()
    }

    private connectEvents() {

    }

    public addRow(cols:number, rows:number, tileWidth:number, tileHeight:number, offsetX:number = 0, offsetY:number = 0, name:string = "Screen") {
        let row: HTMLTableRowElement = this.tableBody.insertRow();
        let colList: Array<number | string> = [cols, rows, tileWidth, tileHeight, offsetX, offsetY, name];

        colList.forEach((c:number | string) => {
            let cell = row.insertCell();
            cell.innerText = c.toString();
        });
    }

    public delRow() {}

    private selectRow(e: Event) {

    }

}
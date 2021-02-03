export class GridTable {
    private tableElement: HTMLTableElement;
    private tableBody: HTMLTableSectionElement;

    public constructor(id:string) {
        this.tableElement = document.getElementById(id) as HTMLTableElement;
        this.tableBody = this.tableElement.querySelector('tbody') as HTMLTableSectionElement;
        this.connectEvents()
    }

    private connectEvents() {
        this.tableBody.addEventListener('click', (e: Event) => {
            this.selectRow(e.target as HTMLTableCellElement);
        });

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

    private selectRow(td: HTMLTableCellElement) {
        let tr = td.parentNode as HTMLTableRowElement;
        let rows: NodeListOf<Element> = this.tableBody.querySelectorAll('tr.selected');
        rows.forEach((row:Element) => {
            row.classList.remove('selected')
        });
        tr.classList.add('selected');
    }

}
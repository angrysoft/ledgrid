export class GridTable {
    public tableElement: HTMLTableElement;
    private tableBody: HTMLTableSectionElement;
    private gridChangeEvent: Event = new Event('gridchange');

    public constructor(id:string) {
        this.tableElement = document.getElementById(id) as HTMLTableElement;
        this.tableBody = this.tableElement.querySelector('tbody') as HTMLTableSectionElement;
        this.connectEvents()
    }

    private connectEvents() {
        this.tableBody.addEventListener('click', (e: Event) => {
            this.selectRow(e.target as HTMLTableCellElement);
        });

        this.tableBody.addEventListener('dblclick', (e: Event) => {
            this.setEditable(e.target as HTMLTableCellElement);
        });
    }

    private setEditable(td: HTMLTableCellElement):void {
        let currentValue = td.innerText;
        td.contentEditable = 'true';
        td.focus();
        td.addEventListener('focusout', () => {
            td.contentEditable = 'false';
            if (currentValue != td.innerText) {
                if (isNaN(Number(td.innerText))) {
                    td.innerText = currentValue;
                    return;
                }
                this.tableElement.dispatchEvent(this.gridChangeEvent);
                console.log(td.innerText);
            }
        }, {'once': true});

        td.addEventListener('input', (e: Event) => {
            console.log(`${e.target}`);
        }, {'once': true});
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
            row.classList.remove('selected');
        });
        tr.classList.add('selected');
    }

    public getGridFromRows(): (number | string| null)[][] {
        let ret: (number | string| null)[][] = [];
        let rows: NodeListOf<Element> = this.tableBody.querySelectorAll('tr');
        rows.forEach((row:Element) => {
            let grid: (number | string| null)[] = [];
            row.childNodes.forEach((cell) => {
                grid.push(cell.textContent);
            }); 
            ret.push(grid);       
        });
        return ret;
    }

}
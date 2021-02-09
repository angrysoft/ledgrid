import { GridInfo } from "./grid.js";

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
        document.execCommand('selectAll', false);
        
        td.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              td.blur();
            }
        });
        
        td.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                td.innerText = currentValue;
                td.contentEditable = 'false';
                return;
            }
        });


        td.addEventListener('focusout', () => {
            td.contentEditable = 'false';
            if (currentValue != td.innerText) {
                if (isNaN(Number(td.innerText))) {
                    td.innerText = currentValue;
                    return;
                }
                this.tableElement.dispatchEvent(this.gridChangeEvent);
            }
        }, {'once': true});
    }


    public addRow(cols:number, rows:number, tileWidth:number, tileHeight:number, offsetX:number = 0, offsetY:number = 0, name:string = "Screen") {
        let row: HTMLTableRowElement = this.tableBody.insertRow();
        
        let cell = row.insertCell();
        cell.innerText = cols.toString();
        cell.setAttribute('data-name', 'cols');

        cell = row.insertCell();
        cell.innerText = rows.toString();
        cell.setAttribute('data-name', 'rows');

        cell = row.insertCell();
        cell.innerText = tileWidth.toString();
        cell.setAttribute('data-name', 'tileWidth');

        cell = row.insertCell();
        cell.innerText = tileHeight.toString();
        cell.setAttribute('data-name', 'tileHeight');

        cell = row.insertCell();
        cell.innerText = offsetX.toString();
        cell.setAttribute('data-name', 'offsetX');

        cell = row.insertCell();
        cell.innerText = offsetY.toString();
        cell.setAttribute('data-name', 'offsetY');

        cell = row.insertCell();
        cell.innerText = name.toString();
        cell.setAttribute('data-name', 'name');

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
        let rows: NodeListOf<HTMLElement> = this.tableBody.querySelectorAll('tr');
        rows.forEach((row:HTMLElement) => {
            let grid: (number | string| null)[] = [];
            row.childNodes.forEach((cell) => {
                grid.push(cell.textContent);
            }); 
            ret.push(grid);       
        });
        return ret;
    }

    public getGridInfoList(): GridInfo[] {
        let ret:GridInfo[] = [];
        let rows: NodeListOf<HTMLTableRowElement> = this.tableBody.querySelectorAll('tr');
        rows.forEach((row:HTMLTableRowElement) => {
            let grid:GridInfo = new GridInfo();
            for (let cell of row.cells) {
                let name:string | null = cell.getAttribute('data-name');
                if (typeof name == "string") {
                    grid.set(name, cell.innerText);
                }
            }
            ret.push(grid);
        });
        return ret;

    }

    public clear() {
        this.tableBody.innerHTML = '';
    }

}
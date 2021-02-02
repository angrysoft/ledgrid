export class GridTable {
    private tableElement: HTMLTableElement;

    public constructor(id:string) {
        this.tableElement = document.getElementById(id) as HTMLTableElement;
        this.connectEvents()
    }

    private connectEvents() {

    }

    public addRow() {}

    public delRow() {}

}
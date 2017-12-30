import {Pool} from "mysql";
import {JoinTableGateway} from "../../src/JoinTableGateway";

export class OrdersProductsGateway {
    private tableName = 'orders_products';
    private id1Name = 'table1_id';
    private id2Name = 'table2_id';
    private joinTableGateway: JoinTableGateway;

    constructor(connectionPool: Pool) {
        let table = this.tableName;
        let id1 = this.id1Name;
        let id2 = this.id2Name;
        this.joinTableGateway = new JoinTableGateway(connectionPool, table, id1, id2);
        this.joinTableGateway.setCreatedColumnName('created');
    }

    public async createRow(id1: number, id2: number, callback: (err: Error, isSuccess: boolean) => void) {
        try {
            const isSuccess = await this.joinTableGateway.createRowWithPromise(id1, id2);
            callback(null, isSuccess);
        }
        catch(e) {
            callback(e, null);
        }
    }

    public async retrieveRow(id1: number, id2: number, callback: (err: Error, row: any[]) => void) {
        try {
            const row = await this.joinTableGateway.retrieveRowWithPromise(id1, id2);
            callback(null, row);
        }
        catch(e) {
            callback(e, null);
        }
    }

    public async deleteRow(id1: number, id2: number, callback: (err: Error, affectedRows: number) => void) {
        try {
            const affectedRows = await this.joinTableGateway.deleteRowWithPromise(id1, id2);
            callback(null, affectedRows);
        }
        catch(e) {
            callback(e, null);
        }
    }

    public async retrieveByTable1Id(id1: number, callback: (err: Error, rows: any[]) => void) {
        try {
            const rows = await this.joinTableGateway.retrieveByIdWithPromise('table1_id', id1);
            callback(null, rows);
        }
        catch(e) {
            callback(e, null);
        }
    }

    public async deleteByTable1Id(id1: number, callback: (err: Error, affectedRows: number) => void) {
        try {
            const affectedRows = await this.joinTableGateway.deleteByIdWithPromise('table1_id', id1);
            callback(null, affectedRows);
        }
        catch(e) {
            callback(e, null);
        }
    }
}

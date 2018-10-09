import {Pool} from "mysql";
import {JoinTableGateway} from "../../src/JoinTableGateway";

export class OrdersProductsGateway {
    private readonly tableName = 'orders_products';
    private readonly id1Name   = 'table1_id';
    private readonly id2Name   = 'table2_id';

    private joinTableGateway: JoinTableGateway;

    constructor(connectionPool: Pool) {
        let table = this.tableName;
        let id1   = this.id1Name;
        let id2   = this.id2Name;
        this.joinTableGateway = new JoinTableGateway(connectionPool, table, id1, id2);
        this.joinTableGateway.setCreatedColumnName('created');
    }

    public createRow(id1: number, id2: number): Promise<boolean> {
        return this.joinTableGateway.createRow(id1, id2);
    }

    public retrieveRow(id1: number, id2: number): Promise<any> {
        return this.joinTableGateway.retrieveRow(id1, id2);
    }

    public async deleteRow(id1: number, id2: number, callback: (err: Error, affectedRows: number) => void) {
        try {
            const affectedRows = await this.joinTableGateway.deleteRow(id1, id2);
            callback(null, affectedRows);
        }
        catch(e) {
            callback(e, null);
        }
    }

    public deleteRowWithPromise(id1: number, id2: number): Promise<number> {
        return this.joinTableGateway.deleteRow(id1, id2);
    }

    public async retrieveByTable1Id(id1: number, callback: (err: Error, rows: any[]) => void) {
        try {
            const rows = await this.joinTableGateway.retrieveById('table1_id', id1);
            callback(null, rows);
        }
        catch(e) {
            callback(e, null);
        }
    }

    public retrieveByTable1IdWithPromise(id1: number): Promise<any[]> {
        return this.joinTableGateway.retrieveById('table1_id', id1);
    }

    public async deleteByTable1Id(id1: number, callback: (err: Error, affectedRows: number) => void) {
        try {
            const affectedRows = await this.joinTableGateway.deleteById('table1_id', id1);
            callback(null, affectedRows);
        }
        catch(e) {
            callback(e, null);
        }
    }

    public deleteByTable1IdWithPromise(id1: number): Promise<number> {
        return this.joinTableGateway.deleteById('table1_id', id1);
    }
}

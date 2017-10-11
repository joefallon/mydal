import {IPool} from "mysql";
import {JoinTableGateway} from "../../src/JoinTableGateway";

export class OrdersProductsGateway {
    private tableName = 'orders_products';
    private id1Name = 'table1_id';
    private id2Name = 'table2_id';
    private joinTableGateway: JoinTableGateway;

    constructor(connectionPool: IPool) {
        let table = this.tableName;
        let id1 = this.id1Name;
        let id2 = this.id2Name;
        this.joinTableGateway = new JoinTableGateway(connectionPool, table, id1, id2);
        this.joinTableGateway.setCreatedColumnName('created');
    }

    public createRow(id1: number, id2: number, callback: (err: Error, isSuccess: boolean) => void) {
        this.joinTableGateway.createRow(id1, id2, createRowCallback);

        function createRowCallback(err: Error, isSuccess: boolean) {
            if(err) {
                callback(err, false);
            } else {
                callback(null, isSuccess);
            }
        }
    }

    public retrieveRow(id1: number, id2: number, callback: (err: Error, row: any[]) => void) {
        this.joinTableGateway.retrieveRow(id1, id2, retrieveRowCallback);

        function retrieveRowCallback(err: Error, row: any[]) {
            if(err) {
                callback(err, null);
            } else {
                callback(null, row);
            }
        }
    }

    public deleteRow(id1: number, id2: number, callback: (err: Error, affectedRows: number) => void) {
        this.joinTableGateway.deleteRow(id1, id2, callback);
    }

    public retrieveByTable1Id(id1: number, callback: (err: Error, rows: any[]) => void) {
        this.joinTableGateway.retrieveById('table1_id', id1, callback);
    }

    public deleteByTable1Id(id1: number, callback: (err: Error, affectedRows: number) => void) {
        this.joinTableGateway.deleteById('table1_id', id1, callback);
    }
}

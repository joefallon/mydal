import { IPool } from 'mysql';
import { IError } from 'mysql';
declare class OrdersProductsGateway {
    private tableName;
    private id1Name;
    private id2Name;
    private joinTableGateway;
    constructor(connectionPool: IPool);
    createRow(id1: number, id2: number, callback: (err: IError, isSuccess: boolean) => void): void;
    retrieveRow(id1: number, id2: number, callback: (err: IError, row: any[]) => void): void;
    deleteRow(id1: number, id2: number, callback: (err: IError, affectedRows: number) => void): void;
    retrieveByTable1Id(id1: number, callback: (err: IError, rows: any[]) => void): void;
    deleteByTable1Id(id1: number, callback: (err: IError, affectedRows: number) => void): void;
}
export = OrdersProductsGateway;

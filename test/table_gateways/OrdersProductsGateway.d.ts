import { Pool } from "mysql";
export declare class OrdersProductsGateway {
    private tableName;
    private id1Name;
    private id2Name;
    private joinTableGateway;
    constructor(connectionPool: Pool);
    createRow(id1: number, id2: number, callback: (err: Error, isSuccess: boolean) => void): void;
    retrieveRow(id1: number, id2: number, callback: (err: Error, row: any[]) => void): void;
    deleteRow(id1: number, id2: number, callback: (err: Error, affectedRows: number) => void): void;
    retrieveByTable1Id(id1: number, callback: (err: Error, rows: any[]) => void): void;
    deleteByTable1Id(id1: number, callback: (err: Error, affectedRows: number) => void): void;
}

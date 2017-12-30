import { Pool } from "mysql";
export declare class OrdersProductsGateway {
    private tableName;
    private id1Name;
    private id2Name;
    private joinTableGateway;
    constructor(connectionPool: Pool);
    createRow(id1: number, id2: number, callback: (err: Error, isSuccess: boolean) => void): Promise<void>;
    retrieveRow(id1: number, id2: number, callback: (err: Error, row: any[]) => void): Promise<void>;
    deleteRow(id1: number, id2: number, callback: (err: Error, affectedRows: number) => void): Promise<void>;
    retrieveByTable1Id(id1: number, callback: (err: Error, rows: any[]) => void): Promise<void>;
    deleteByTable1Id(id1: number, callback: (err: Error, affectedRows: number) => void): Promise<void>;
}

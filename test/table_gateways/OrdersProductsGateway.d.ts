import { Pool } from "mysql";
export declare class OrdersProductsGateway {
    private readonly tableName;
    private readonly id1Name;
    private readonly id2Name;
    private joinTableGateway;
    constructor(connectionPool: Pool);
    createRow(id1: number, id2: number): Promise<boolean>;
    retrieveRow(id1: number, id2: number): Promise<any>;
    deleteRow(id1: number, id2: number): Promise<number>;
    retrieveByTable1Id(id1: number): Promise<any[]>;
    deleteByTable1Id(id1: number): Promise<number>;
}

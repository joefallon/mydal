import { Pool } from 'mysql';
export declare class JoinTableGateway {
    private _pool;
    private _tableName;
    private _id1Name;
    private _id2Name;
    private _createdColumnName;
    constructor(connectionPool: Pool, tableName: string, id1Name: string, id2Name: string);
    setCreatedColumnName(value: string): void;
    createRow(id1: any, id2: any, callback: (err: Error, isSuccess: boolean) => void): void;
    retrieveRow(id1: any, id2: any, callback: (err: Error, row: any[]) => void): void;
    deleteRow(id1: any, id2: any, callback: (err: Error, affectedRows: number) => void): void;
    retrieveById(idName: string, idValue: any, callback: (err: Error, rows: any[]) => void): void;
    deleteById(idName: string, idValue: any, callback: (err: Error, affectedRows: number) => void): void;
    private static mySqlDatetimeString(date);
}

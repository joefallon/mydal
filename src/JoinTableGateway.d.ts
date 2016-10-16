import { IPool } from 'mysql';
import { IError } from 'mysql';
declare class JoinTableGateway {
    private pool;
    private tableName;
    private id1Name;
    private id2Name;
    private createdColumnName;
    constructor(connectionPool: IPool, tableName: string, id1Name: string, id2Name: string);
    setCreatedColumnName(value: string): void;
    createRow(id1: any, id2: any, callback: (err: IError, isSuccess: boolean) => void): void;
    retrieveRow(id1: any, id2: any, callback: (err: IError, row: any[]) => void): void;
    deleteRow(id1: any, id2: any, callback: (err: IError, affectedRows: number) => void): void;
    retrieveById(idName: string, idValue: any, callback: (err: IError, rows: any[]) => void): void;
    deleteById(idName: string, idValue: any, callback: (err: IError, affectedRows: number) => void): void;
    private static mySqlDatetimeString(date);
}
export = JoinTableGateway;

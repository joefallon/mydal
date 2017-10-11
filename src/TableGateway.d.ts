import { IPool } from 'mysql';
export declare class TableGateway {
    private _pool;
    private _tableName;
    private _primaryKey;
    private _createdColumnName;
    private _updatedColumnName;
    constructor(connectionPool: IPool, tableName: string, primaryKey?: string);
    setCreatedColumnName(value: string): void;
    setUpdatedColumnName(value: string): void;
    createRow(obj: any, callback: (err: Error, insertId: number) => void): void;
    retrieveRow(id: number, callback: (err: Error, row: Object) => void): void;
    updateRow(row: any, callback: (err: Error, affectedRows: number) => void): void;
    deleteRow(id: number, callback: (err: Error, affectedRows: number) => void): void;
    retrieveRowsBy(fieldName: string, fieldValue: any, callback: (err: Error, rows: any[]) => void): void;
    retrieveRowsByIds(ids: number[], callback: (err: Error, rows: any[]) => void): void;
    retrieveRowsByIsNull(fieldName: string, callback: (err: Error, rows: any[]) => void): void;
    retrieveRowsByNotEqual(fieldName: string, fieldValue: any, callback: (err: Error, rows: any[]) => void): void;
    setFieldNullWhere(fieldName: string, fieldValue: any, callback: (err: Error, affectedRows: number) => void): void;
    deleteRowsBy(fieldName: string, fieldValue: any, callback: (err: Error, affectedRows: number) => void): void;
    countRowsByValue(fieldName: string, fieldValue: any, callback: (err: Error, count: number) => void): void;
    private timestampCreatedColumn(obj);
    private timestampUpdatedColumn(obj);
    private static getPlaceholders(obj);
    private static getColumnNames(obj);
    private static mySqlDatetimeString(date);
    private static getParameterizedValues(obj);
    private static getObjectValues(obj);
}

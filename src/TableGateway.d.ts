/// <reference types="chai" />
import { IError, IPool } from 'mysql';
declare class TableGateway {
    private pool;
    private tableName;
    private primaryKey;
    private createdColumnName;
    private updatedColumnName;
    constructor(connectionPool: IPool, tableName: string, primaryKey?: string);
    setCreatedColumnName(value: string): void;
    setUpdatedColumnName(value: string): void;
    createRow(obj: any, callback: (err: IError, insertId: number) => void): void;
    retrieveRow(id: number, callback: (err: IError, row: Object) => void): void;
    updateRow(row: any, callback: (err: IError, affectedRows: number) => void): void;
    deleteRow(id: number, callback: (err: IError, affectedRows: number) => void): void;
    retrieveRowsBy(fieldName: string, fieldValue: any, callback: (err: IError, rows: any[]) => void): void;
    retrieveRowsByIds(ids: number[], callback: (err: IError, rows: any[]) => void): void;
    retrieveRowsByIsNull(fieldName: string, callback: (err: IError, rows: any[]) => void): void;
    retrieveRowsByNotEqual(fieldName: string, fieldValue: any, callback: (err: IError, rows: any[]) => void): void;
    setFieldNullWhere(fieldName: string, fieldValue: any, callback: (err: IError, affectedRows: number) => void): void;
    deleteRowsBy(fieldName: string, fieldValue: any, callback: (err: IError, affectedRows: number) => void): void;
    countRowsByValue(fieldName: string, fieldValue: any, callback: (err: IError, count: number) => void): void;
    private timestampCreatedColumn(obj);
    private timestampUpdatedColumn(obj);
    private static getPlaceholders(obj);
    private static getColumnNames(obj);
    private static mySqlDatetimeString(date);
    private static getParameterizedValues(obj);
    private static getObjectValues(obj);
}
export = TableGateway;

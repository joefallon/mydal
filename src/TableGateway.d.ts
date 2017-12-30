import { Pool } from 'mysql';
export declare class TableGateway {
    private _pool;
    private _tableName;
    private _primaryKey;
    private _createdColumnName;
    private _updatedColumnName;
    constructor(connectionPool: Pool, tableName: string, primaryKey?: string);
    setCreatedColumnName(value: string): void;
    setUpdatedColumnName(value: string): void;
    createRow(row: any, callback: (err: Error, insertId: number) => void): void;
    /**
     * Creates the row in the database.
     *
     * @param row
     * @returns {Promise<number>} Returns a promise containing the insert ID of the row.
     */
    createRowWithPromise(row: any): Promise<number>;
    retrieveRow(id: number, callback: (err: Error, row: Object) => void): void;
    /**
     * @param {number} id
     * @returns {Promise<any>} Returns a promise containing the retrieved row.
     */
    retrieveRowWithPromise(id: number): Promise<any>;
    updateRow(row: any, callback: (err: Error, affectedRows: number) => void): void;
    /**
     * @param row
     * @returns {Promise<number>} Returns a promise containing the number of affected rows (i.e. 0 or 1).
     */
    updateRowWithPromise(row: any): Promise<number>;
    deleteRow(id: number, callback: (err: Error, affectedRows: number) => void): void;
    /**
     * @param {number} id
     * @returns {Promise<number>} Returns a promise containing the number of affected rows (i.e. 0 or 1).
     */
    deleteRowWithPromise(id: number): Promise<number>;
    retrieveRowsBy(fieldName: string, fieldValue: any, callback: (err: Error, rows: any[]) => void): void;
    /**
     * @param {string} fieldName
     * @param fieldValue
     * @returns {Promise<any[]>} Returns a promise containing the retrieved rows.
     */
    retrieveRowsByWithPromise(fieldName: string, fieldValue: any): Promise<any[]>;
    retrieveRowsByIds(ids: number[], callback: (err: Error, rows: any[]) => void): void;
    /**
     * @param {number[]} ids
     * @returns {Promise<any[]>} Returns a promise containing the retrieved rows.
     */
    retrieveRowsByIdsWithPromise(ids: number[]): Promise<any[]>;
    retrieveRowsByIsNull(fieldName: string, callback: (err: Error, rows: any[]) => void): void;
    /**
     * @param {string} fieldName
     * @returns {Promise<any[]>} Returns a promise containing the retrieved rows.
     */
    retrieveRowsByIsNullWithPromise(fieldName: string): Promise<any[]>;
    retrieveRowsByNotEqual(fieldName: string, fieldValue: any, callback: (err: Error, rows: any[]) => void): void;
    /**
     * @param {string} fieldName
     * @param fieldValue
     * @returns {Promise<any[]>} Returns a promise containing the retrieved rows.
     */
    retrieveRowsByNotEqualWithPromise(fieldName: string, fieldValue: any): Promise<any[]>;
    setFieldNullWhere(fieldName: string, fieldValue: any, callback: (err: Error, affectedRows: number) => void): void;
    /**
     * @param {string} fieldName
     * @param fieldValue
     * @returns {Promise<number>} Returns a promise containing the number of affected rows.
     */
    setFieldNullWhereWithPromise(fieldName: string, fieldValue: any): Promise<number>;
    deleteRowsBy(fieldName: string, fieldValue: any, callback: (err: Error, affectedRows: number) => void): void;
    /**
     * @param {string} fieldName
     * @param fieldValue
     * @returns {Promise<number>} Returns a promise containing the number of affected rows.
     */
    deleteRowsByWithPromise(fieldName: string, fieldValue: any): Promise<number>;
    countRowsByValue(fieldName: string, fieldValue: any, callback: (err: Error, count: number) => void): void;
    /**
     * @param {string} fieldName
     * @param fieldValue
     * @returns {Promise<number>} Returns a promise containing the number of rows with the chosen value.
     */
    countRowsByValueWithPromise(fieldName: string, fieldValue: any): Promise<number>;
    private timestampCreatedColumn(obj);
    private timestampUpdatedColumn(obj);
    private static getPlaceholders(obj);
    private static getColumnNames(obj);
    private static getParameterizedValues(obj);
    private static getObjectValues(obj);
}

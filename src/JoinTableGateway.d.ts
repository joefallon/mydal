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
    /**
     * @param id1
     * @param id2
     * @returns {Promise<boolean>} Returns a promise containing true on success and false on failure.
     */
    createRowWithPromise(id1: any, id2: any): Promise<boolean>;
    retrieveRow(id1: any, id2: any, callback: (err: Error, row: any) => void): void;
    /**
     * @param id1
     * @param id2
     * @returns {Promise<any>} Returns a promise containing the retrieved row if it exists.
     */
    retrieveRowWithPromise(id1: any, id2: any): Promise<any>;
    deleteRow(id1: any, id2: any, callback: (err: Error, affectedRows: number) => void): void;
    /**
     * @param id1
     * @param id2
     * @returns {Promise<number>} Returns a promise containing the number of affected rows (i.e. 0 or 1).
     */
    deleteRowWithPromise(id1: any, id2: any): Promise<number>;
    retrieveById(idName: string, idValue: any, callback: (err: Error, rows: any[]) => void): void;
    /**
     * @param {string} idName
     * @param idValue
     * @returns {Promise<any[]>} Returns a promise containing the retrieved rows.
     */
    retrieveByIdWithPromise(idName: string, idValue: any): Promise<any[]>;
    deleteById(idName: string, idValue: any, callback: (err: Error, affectedRows: number) => void): void;
    /**
     * @param {string} idName
     * @param idValue
     * @returns {Promise<number>} Returns a promise containing the number of affected rows.
     */
    deleteByIdWithPromise(idName: string, idValue: any): Promise<number>;
    private static mySqlDatetimeString(date);
}

import { Pool } from 'mysql';
export declare class JoinTableGateway {
    private readonly _tableName;
    private readonly _id1Name;
    private readonly _id2Name;
    private _pool;
    private _createdColumnName;
    constructor(connectionPool: Pool, tableName: string, id1Name: string, id2Name: string);
    setCreatedColumnName(value: string): void;
    /**
     * Creates a row in the database.
     *
     * @returns Returns true on row creation success, otherwise false.
     */
    createRow(id1: any, id2: any): Promise<boolean>;
    /**
     * @returns Returns the row with matching `id1` and `id2`.
     */
    retrieveRow(id1: any, id2: any): Promise<any>;
    /**
     * Deletes the row from the database with the matching `id1` and `id2`.
     *
     * @returns Returns the number of affected rows (i.e. 0 or 1).
     */
    deleteRow(id1: any, id2: any): Promise<number>;
    /**
     * @returns Returns the rows where `idName` matches `idValue`.
     */
    retrieveById(idName: string, idValue: any): Promise<any[]>;
    /**
     * Deletes the rows from the database were `idName` matches `idValue`.
     *
     * @returns Returns the number of affected rows.
     */
    deleteById(idName: string, idValue: any): Promise<number>;
    private static mySqlDatetimeString;
}

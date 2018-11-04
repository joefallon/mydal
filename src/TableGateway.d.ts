import { Pool } from 'mysql';
export declare class TableGateway {
    private readonly _tableName;
    private readonly _primaryKey;
    private _pool;
    private _createdColumnName;
    private _updatedColumnName;
    constructor(connectionPool: Pool, tableName: string, primaryKey?: string);
    setCreatedColumnName(value: string): void;
    setUpdatedColumnName(value: string): void;
    /**
     * Creates the row in the database.
     *
     * @returns The inserted row with inserted primary key.
     */
    createRow(row: any): Promise<any>;
    /**
     * Retrieves a row from the database.
     *
     * @returns Returns the row if found, null otherwise.
     */
    retrieveRow(id: number): Promise<any>;
    /**
     * Updates a row in the database.
     *
     * @returns Returns the number of affected rows (i.e. 0 or 1).
     */
    updateRow(row: any): Promise<number>;
    /**
     * Deletes a row from the database.
     *
     * @returns Returns the number of affected rows (i.e. 0 or 1).
     */
    deleteRow(id: number): Promise<number>;
    /**
     * @returns Returns the rows from the database where the `fieldName` matches the `fieldValue`.
     */
    retrieveRows(fieldName: string, fieldValue: any): Promise<any[] | null>;
    /**
     * @returns Returns the rows from the database with matching id's (i.e. primary keys).
     */
    retrieveRowsByIds(ids: number[]): Promise<any[]>;
    /**
     * @returns Returns the rows in the database where the `fieldName` is NULL.
     */
    retrieveRowsByIsNull(fieldName: string): Promise<any[]>;
    /**
     * @returns Returns the rows where the `fieldName` is not equal to the `fieldValue`.
     */
    retrieveRowsByNotEqual(fieldName: string, fieldValue: any): Promise<any[]>;
    /**
     * Sets the `fieldName` NULL where the `fieldName` matches the `fieldValue`.
     *
     * @returns Returns the number of affected rows.
     */
    setFieldNullWhere(fieldName: string, fieldValue: any): Promise<number>;
    /**
     * Deletes the rows where the `fieldName` matches the `fieldValue`.
     *
     * @returns Returns the number of affected rows.
     */
    deleteRowsBy(fieldName: string, fieldValue: any): Promise<number>;
    /**
     * @returns Returns the count of rows where the `fieldName` matches the `fieldValue`.
     */
    countRowsByValue(fieldName: string, fieldValue: any): Promise<number>;
    private timestampCreatedColumn;
    private timestampUpdatedColumn;
    private static getPlaceholders;
    private static getColumnNames;
    private static getParameterizedValues;
    private static getObjectValues;
}

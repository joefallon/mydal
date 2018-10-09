import mysql = require('mysql');
import { MySqlDate } from '@joefallon/mysql-date/src/MySqlDate';
import { Pool, PoolConnection } from 'mysql';

import { Util } from './Util';

export class TableGateway {
    private readonly _tableName:  string;
    private readonly _primaryKey: string;

    private _pool: Pool;
    private _createdColumnName = '';
    private _updatedColumnName = '';

    constructor(connectionPool: Pool, tableName: string, primaryKey = 'id') {
        this._pool       = connectionPool;
        this._tableName  = tableName;
        this._primaryKey = primaryKey;
    }

    public setCreatedColumnName(value: string) {
        this._createdColumnName = value;
    }

    public setUpdatedColumnName(value: string) {
        this._updatedColumnName = value;
    }

    /**
     * Creates the row in the database.
     *
     * @returns Returns the inserted ID of the row.
     */
    public createRow(row: any): Promise<number> {
        return new Promise((resolve, reject) => {
            row = Util.shallowClone(row); // prevents mysql from modifying source object
            const tableName  = this._tableName;
            const primaryKey = this._primaryKey;
            delete row[primaryKey];

            row = this.timestampCreatedColumn(row);
            row = this.timestampUpdatedColumn(row);

            const columnNames  = TableGateway.getColumnNames(row);
            const placeholders = TableGateway.getPlaceholders(row);

            let sql = `INSERT INTO ${tableName} ( ${columnNames} ) VALUES ( ${placeholders} )`;
            const values = TableGateway.getObjectValues(row);
            sql = mysql.format(sql, values);

            let connection: PoolConnection = null;
            this._pool.getConnection(performQuery);

            function performQuery(err: Error, conn: PoolConnection) {
                if(err) { return reject(err); }
                connection = conn;
                connection.query(sql, releaseConnection);
            }

            function releaseConnection(err: Error, result: any[]) {
                connection.release();
                if(err) {
                    reject(err);
                }
                else {
                    resolve(result['insertId']);
                }
            }
        });
    }

    /**
     * Retrieves a row from the database.
     *
     * @returns Returns the row if found, null otherwise.
     */
    public retrieveRow(id: number): Promise<any> {
        return new Promise((resolve, reject) => {
            let tableName  = this._tableName;
            let primaryKey = this._primaryKey;

            let sql = 'SELECT * FROM ' + tableName + ' WHERE `' + primaryKey + '`=' + id + ' LIMIT 1';

            let connection: PoolConnection = null;
            this._pool.getConnection(performQuery);

            function performQuery(err: Error, conn: PoolConnection) {
                if(err) {
                    reject(err);
                } else {
                    connection = conn;
                    connection.query(sql, releaseConnection);
                }
            }

            function releaseConnection(err: Error, row: any[]) {
                connection.release();

                if(err) {
                    reject(err);
                } else {
                    if(row.length == 0) {
                        resolve(null);
                    } else {
                        // prevents mysql from modifying source object
                        const clone = Util.shallowClone(row[0]);
                        resolve(clone);
                    }
                }
            }
        });
    }

    /**
     * Updates a row in the database.
     *
     * @returns Returns the number of affected rows (i.e. 0 or 1).
     */
    public updateRow(row: any): Promise<number> {
        return new Promise((resolve, reject) => {
            row = Util.shallowClone(row); // prevents mysql from modifying source object

            const tableName       = this._tableName;
            const primaryKeyName  = this._primaryKey;
            const primaryKeyValue = row[primaryKeyName];
            delete row[primaryKeyName];

            row = this.timestampUpdatedColumn(row);

            const params = TableGateway.getParameterizedValues(row);

            let sql = 'UPDATE ' + tableName
                + ' SET ' + params
                + ' WHERE `' + primaryKeyName + '`=' + primaryKeyValue;
            let values = TableGateway.getObjectValues(row);
            sql = mysql.format(sql, values);

            let connection: PoolConnection = null;
            this._pool.getConnection(performQuery);

            function performQuery(err: Error, conn: PoolConnection) {
                if(err) {
                    reject(err);
                } else {
                    connection = conn;
                    conn.query(sql, releaseConnection);
                }
            }

            function releaseConnection(err: Error, result: any[]) {
                connection.release();

                if(err) {
                    reject(err);
                } else {
                    resolve(result['affectedRows']);
                }
            }
        });
    }

    /**
     * Deletes a row from the database.
     *
     * @returns Returns the number of affected rows (i.e. 0 or 1).
     */
    public deleteRow(id: number): Promise<number> {
        return new Promise((resolve, reject) => {
            let tableName  = this._tableName;
            let primaryKey = this._primaryKey;
            let sql = 'DELETE FROM `' + tableName + '` WHERE `' + primaryKey + '`=' + id;

            let connection: PoolConnection = null;
            this._pool.getConnection(performQuery);

            function performQuery(err: Error, conn: PoolConnection) {
                if(err) {
                    reject(err);
                } else {
                    connection = conn;
                    connection.query(sql, releaseConnection);
                }
            }

            function releaseConnection(err: Error, result: any[]) {
                connection.release();

                if(err) {
                    reject(err);
                } else {
                    resolve(result['affectedRows']);
                }
            }
        });
    }

    /**
     * @returns Returns the rows from the database where the `fieldName` matches the `fieldValue`.
     */
    public retrieveRows(fieldName: string, fieldValue: any): Promise<any[]|null> {
        return new Promise((resolve, reject) => {
            const tableName = this._tableName;
            const values    = [fieldName, fieldValue];
            let sql = 'SELECT * FROM `' + tableName + '` WHERE ??=?';
            sql = mysql.format(sql, values);

            let connection: PoolConnection = null;
            this._pool.getConnection(performQuery);

            function performQuery(err: Error, conn: PoolConnection) {
                if(err) {
                    reject(err);
                } else {
                    connection = conn;
                    conn.query(sql, releaseConnection);
                }
            }

            function releaseConnection(err: Error, rows: any[]) {
                connection.release();

                if(err) {
                    reject(err);
                } else {
                    const out = Util.shallowCloneArray(rows); // remove mysql metadata
                    resolve(out);
                }
            }
        });
    }

    /**
     * @returns Returns the rows from the database with matching id's (i.e. primary keys).
     */
    public retrieveRowsByIds(ids: number[]): Promise<any[]> {
        return new Promise(async (resolve, reject) => {
            let table      = this._tableName;
            let primaryKey = this._primaryKey;

            for(let i = 0; i < ids.length; i++) {
                ids[i] = Math.floor(ids[i]); // ensure the ids are integers
            }

            let idsString = ids.join(', ');
            let sql = 'SELECT * FROM `' + table + '` WHERE `'
                + primaryKey + '` IN (' + idsString + ') ORDER BY `' + primaryKey + '`';

            let connection: PoolConnection = null;
            this._pool.getConnection(performQuery);

            function performQuery(err: Error, conn: PoolConnection) {
                if(err) {
                    reject(err);
                } else {
                    connection = conn;
                    connection.query(sql, releaseConnection);
                }
            }

            function releaseConnection(err: Error, rows: any[]) {
                connection.release();

                if(err) {
                    reject(err);
                } else {
                    const clone = Util.shallowCloneArray(rows); // remove mysql metadata
                    resolve(clone);
                }
            }
        });
    }

    /**
     * @returns Returns the rows in the database where the `fieldName` is NULL.
     */
    public retrieveRowsByIsNull(fieldName: string): Promise<any[]> {
        return new Promise(async (resolve, reject) => {
            const tableName  = this._tableName;
            const primaryKey = this._primaryKey;
            let sql = 'SELECT * FROM `' + tableName + '` WHERE `' + fieldName
                + '` IS NULL ORDER BY ' + primaryKey;

            let connection: PoolConnection = null;
            this._pool.getConnection(performQuery);

            function performQuery(err: Error, conn: PoolConnection) {
                if(err) {
                    reject(err);
                } else {
                    connection = conn;
                    connection.query(sql, releaseConnection);
                }
            }

            function releaseConnection(err: Error, rows: any[]) {
                connection.release();

                if(err) {
                    reject(err);
                } else {
                    const clone = Util.shallowCloneArray(rows); // remove mysql metadata
                    resolve(clone);
                }
            }
        });
    }

    /**
     * @returns Returns the rows where the `fieldName` is not equal to the `fieldValue`.
     */
    public retrieveRowsByNotEqual(fieldName: string, fieldValue: any): Promise<any[]> {
        return new Promise((resolve, reject) => {
            const tableName = this._tableName;
            const values    = [fieldName, fieldValue];
            let sql = 'SELECT * FROM `' + tableName + '` WHERE ?? <> ?';
            sql = mysql.format(sql, values);

            let connection: PoolConnection = null;
            this._pool.getConnection(performQuery);

            function performQuery(err: Error, conn: PoolConnection) {
                if(err) {
                    reject(err);
                } else {
                    connection = conn;
                    connection.query(sql, releaseConnection);
                }
            }

            function releaseConnection(err: Error, rows: any[]) {
                connection.release();

                if(err) {
                    reject(err);
                } else {
                    const clone = Util.shallowCloneArray(rows); // remove mysql metadata
                    resolve(clone);
                }
            }
        });
    }

    /**
     * Sets the `fieldName` NULL where the `fieldName` matches the `fieldValue`.
     *
     * @returns Returns the number of affected rows.
     */
    public setFieldNullWhere(fieldName: string, fieldValue: any): Promise<number> {
        return new Promise(async (resolve, reject) => {
            const tableName = this._tableName;
            const values    = [fieldName, fieldName, fieldValue];

            let sql = 'UPDATE `' + tableName + '` SET ?? = NULL WHERE ?? = ?';
            sql = mysql.format(sql, values);

            let connection: PoolConnection = null;
            this._pool.getConnection(performQuery);

            function performQuery(err: Error, conn: PoolConnection) {
                if(err) {
                    reject(err);
                } else {
                    connection = conn;
                    connection.query(sql, releaseConnection);
                }
            }

            function releaseConnection(err: Error, result: any[]) {
                connection.release();

                if(err) {
                    reject(err);
                } else {
                    resolve(result['affectedRows']);
                }
            }
        });
    }

    /**
     * Deletes the rows where the `fieldName` matches the `fieldValue`.
     *
     * @returns Returns the number of affected rows.
     */
    public deleteRowsBy(fieldName: string, fieldValue: any): Promise<number> {
        return new Promise(async (resolve, reject) => {
            const tableName = this._tableName;
            const values    = [fieldName, fieldValue];
            let sql = 'DELETE FROM `' + tableName + '` WHERE ?? = ?';
            sql = mysql.format(sql, values);

            let connection: PoolConnection = null;
            this._pool.getConnection(getConnectionCallback);

            function getConnectionCallback(err: Error, conn: PoolConnection) {
                if(err) {
                    reject(err);
                } else {
                    connection = conn;
                    connection.query(sql, queryCallback);
                }
            }

            function queryCallback(err: Error, result: any[]) {
                connection.release();

                if(err) {
                    reject(err);
                } else {
                    resolve(result['affectedRows']);
                }
            }
        });
    }

    /**
     * @returns Returns the count of rows where the `fieldName` matches the `fieldValue`.
     */
    public countRowsByValue(fieldName: string, fieldValue: any): Promise<number> {
        return new Promise(async (resolve, reject) => {
            const tableName = this._tableName;
            const values    = [fieldName, fieldValue];

            let sql = 'SELECT COUNT(*) FROM `' + tableName + '` WHERE ?? = ?';
            sql = mysql.format(sql, values);

            this._pool.getConnection(getConnectionCallback);
            let connection: PoolConnection = null;

            function getConnectionCallback(err: Error, conn: PoolConnection) {
                if(err) {
                    reject(err);
                } else {
                    connection = conn;
                    connection.query(sql, queryCallback);
                }
            }

            function queryCallback(err: Error, result: any[]) {
                connection.release();

                if(err) {
                    reject(err);
                } else {
                    resolve(result[0]['COUNT(*)']);
                }
            }
        });
    }

    private timestampCreatedColumn(obj: Object): Object {
        if(this._createdColumnName.length > 0) {
            let date = new Date();
            obj[this._createdColumnName] = MySqlDate.toMySqlDate(date);
        }

        return obj;
    }

    private timestampUpdatedColumn(obj: Object): Object {
        if(this._updatedColumnName.length > 0) {
            let date = new Date();
            obj[this._updatedColumnName] = MySqlDate.toMySqlDate(date);
        }

        return obj;
    }

    private static getPlaceholders(obj: any) {
        let keys = Object.keys(obj);
        let placeholders: string[] = [];

        for(let i = 0; i < keys.length; i++) {
            placeholders.push('?');
        }

        let placeholdersString = placeholders.join(', ');

        return placeholdersString;
    }

    private static getColumnNames(obj: any): string {
        let keys = Object.keys(obj);
        let columnNames: string[] = [];

        for(let i = 0; i < keys.length; i++) {
            columnNames.push('`' + keys[i] + '`');
        }

        let colNamesString = columnNames.join(', ');

        return colNamesString;
    }

    private static getParameterizedValues(obj: any) {
        const keys = Object.keys(obj);
        const parameters: string[] = [];

        for(let i = 0; i < keys.length; i++) {
            let item = '`' + keys[i] + '`=?';
            parameters.push(item);
        }

        let paramsString = parameters.join(', ');

        return paramsString;
    }

    private static getObjectValues(obj: any): any {
        let keys: string[] = Object.keys(obj);
        let results = [];

        for(let i = 0; i < keys.length; i++) {
            let key: string = keys[i];
            results.push(obj[key]);
        }

        return results;
    }
}

import mysql = require('mysql');
import { Pool, PoolConnection } from 'mysql';
import { MySqlDate } from '@joefallon/mysql-date/src/MySqlDate';

import { Util } from './Util';

export class TableGateway {
    private _pool: Pool;
    private _tableName: string;
    private _primaryKey: string;
    private _createdColumnName = '';
    private _updatedColumnName = '';

    constructor(connectionPool: Pool, tableName: string, primaryKey = 'id') {
        this._pool = connectionPool;
        this._tableName = tableName;
        this._primaryKey = primaryKey;
    }

    public setCreatedColumnName(value: string) {
        this._createdColumnName = value;
    }

    public setUpdatedColumnName(value: string) {
        this._updatedColumnName = value;
    }

    public createRow(row: any, callback: (err: Error, insertId: number) => void) {
        row = Util.shallowClone(row); // prevents mysql from modifying source object
        let tableName = this._tableName;
        let primaryKey = this._primaryKey;
        delete row[primaryKey];

        // noinspection AssignmentToFunctionParameterJS
        row = this.timestampCreatedColumn(row);
        // noinspection AssignmentToFunctionParameterJS
        row = this.timestampUpdatedColumn(row);

        let columnNames = TableGateway.getColumnNames(row);
        let placeholders = TableGateway.getPlaceholders(row);

        let sql = `INSERT INTO ${tableName} ( ${columnNames} ) VALUES ( ${placeholders} )`;
        let values = TableGateway.getObjectValues(row);
        sql = mysql.format(sql, values);

        let connection: PoolConnection = null;
        this._pool.getConnection(performQuery);

        function performQuery(err: Error, conn: PoolConnection) {
            if(err) {
                callback(err, null);
            } else {
                connection = conn;
                connection.query(sql, releaseConnection);
            }
        }

        function releaseConnection(err: Error, result: any[]) {
            if(err) {
                connection.release();
                callback(err, null);
            } else {
                connection.release();
                callback(null, result['insertId']);
            }
        }
    }

    /**
     * Creates the row in the database.
     *
     * @param row
     * @returns {Promise<number>} Returns a promise containing the insert ID of the row.
     */
    public createRowWithPromise(row: any): Promise<number> {
        return new Promise(async (resolve, reject) => {
            this.createRow(row, (err: Error, insertId: number) => {
                if(err) { return reject(err); }
                resolve(insertId);
            });
        });
    }

    public retrieveRow(id: number, callback: (err: Error, row: Object) => void) {
        let tableName = this._tableName;
        let primaryKey = this._primaryKey;

        let sql = 'SELECT * FROM ' + tableName + ' WHERE `' + primaryKey + '`=' + id + ' LIMIT 1';

        let connection: PoolConnection = null;
        this._pool.getConnection(performQuery);

        function performQuery(err: Error, conn: PoolConnection) {
            if(err) {
                callback(err, null);
            } else {
                connection = conn;
                connection.query(sql, releaseConnection);
            }
        }

        function releaseConnection(err: Error, row: any[]) {
            if(err) {
                connection.release();
                callback(err, null);
            } else {
                connection.release();

                if(row.length == 0) {
                    callback(null, null);
                } else {
                    const out = Util.shallowClone(row[0]); // prevents mysql from modifying source object
                    callback(null, out);
                }
            }
        }
    }

    /**
     * @param {number} id
     * @returns {Promise<any>} Returns a promise containing the retrieved row.
     */
    public retrieveRowWithPromise(id: number): Promise<any> {
        return new Promise(async (resolve, reject) => {
            this.retrieveRow(id, (err: Error, row: Object) => {
                if(err) { return reject(err); }
                resolve(row);
            });
        });
    }

    public updateRow(row: any, callback: (err: Error, affectedRows: number) => void) {
        row = Util.shallowClone(row); // prevents mysql from modifying source object
        let tableName = this._tableName;
        let primaryKeyName = this._primaryKey;
        let primaryKeyValue = row[primaryKeyName];

        delete row[primaryKeyName];
        // noinspection AssignmentToFunctionParameterJS
        row = this.timestampUpdatedColumn(row);
        let params = TableGateway.getParameterizedValues(row);

        let sql = 'UPDATE ' + tableName
            + ' SET ' + params
            + ' WHERE `' + primaryKeyName + '`=' + primaryKeyValue;
        let values = TableGateway.getObjectValues(row);
        sql = mysql.format(sql, values);

        let connection: PoolConnection = null;
        this._pool.getConnection(performQuery);

        function performQuery(err: Error, conn: PoolConnection) {
            if(err) {
                callback(err, null);
            } else {
                connection = conn;
                conn.query(sql, releaseConnection);
            }
        }

        function releaseConnection(err: Error, result: any[]) {
            if(err) {
                connection.release();
                callback(err, null);
            } else {
                connection.release();
                callback(null, result['affectedRows']);
            }
        }
    }

    /**
     * @param row
     * @returns {Promise<number>} Returns a promise containing the number of affected rows (i.e. 0 or 1).
     */
    public updateRowWithPromise(row: any): Promise<number> {
        return new Promise(async (resolve, reject) => {
            this.updateRow(row, (err: Error, affectedRows: number) => {
                if(err) { return reject(err); }
                resolve(affectedRows);
            });
        });
    }

    public deleteRow(id: number, callback: (err: Error, affectedRows: number) => void) {
        let tableName = this._tableName;
        let primaryKey = this._primaryKey;
        let sql = 'DELETE FROM `' + tableName + '` WHERE `' + primaryKey + '`=' + id;

        let connection: PoolConnection = null;
        this._pool.getConnection(performQuery);

        function performQuery(err: Error, conn: PoolConnection) {
            if(err) {
                callback(err, null);
            } else {
                connection = conn;
                connection.query(sql, releaseConnection);
            }
        }

        function releaseConnection(err: Error, result: any[]) {
            if(err) {
                connection.release();
                callback(err, null);
            } else {
                connection.release();
                callback(null, result['affectedRows']);
            }
        }
    }

    /**
     * @param {number} id
     * @returns {Promise<number>} Returns a promise containing the number of affected rows (i.e. 0 or 1).
     */
    public deleteRowWithPromise(id: number): Promise<number> {
        return new Promise(async (resolve, reject) => {
            this.deleteRow(id, (err: Error, affectedRows: number) => {
                if(err) { return reject(err); }
                resolve(affectedRows);
            });
        });
    }

    public retrieveRowsBy(fieldName: string, fieldValue: any,
                          callback: (err: Error, rows: any[]) => void) {
        let tableName = this._tableName;
        let sql = 'SELECT * FROM `' + tableName + '` WHERE ??=?';
        let values = [fieldName, fieldValue];
        sql = mysql.format(sql, values);

        let connection: PoolConnection = null;
        this._pool.getConnection(performQuery);

        function performQuery(err: Error, conn: PoolConnection) {
            if(err) {
                callback(err, null);
            } else {
                connection = conn;
                conn.query(sql, releaseConnection);
            }
        }

        function releaseConnection(err: Error, rows: any[]) {
            if(err) {
                connection.release();
                callback(err, null);
            } else {
                connection.release();
                const out = Util.shallowCloneArray(rows);
                callback(null, out);
            }
        }
    }

    /**
     * @param {string} fieldName
     * @param fieldValue
     * @returns {Promise<any[]>} Returns a promise containing the retrieved rows.
     */
    public retrieveRowsByWithPromise(fieldName: string, fieldValue: any): Promise<any[]> {
        return new Promise(async (resolve, reject) => {
            this.retrieveRowsBy(fieldName, fieldValue, (err: Error, rows: any[]) => {
                if(err) { return reject(err); }
                resolve(rows);
            });
        });
    }

    public retrieveRowsByIds(ids: number[], callback: (err: Error, rows: any[]) => void) {
        let table = this._tableName;
        let primaryKey = this._primaryKey;

        for(let i = 0; i < ids.length; i++) {
            // Ensure the ids are all integers.
            ids[i] = Math.floor(ids[i]);
        }

        let idsString = ids.join(', ');
        let sql = 'SELECT * FROM `' + table + '` WHERE `'
            + primaryKey + '` IN (' + idsString + ') ORDER BY `' + primaryKey + '`';

        let connection: PoolConnection = null;
        this._pool.getConnection(performQuery);

        function performQuery(err: Error, conn: PoolConnection) {
            if(err) {
                callback(err, null);
            } else {
                connection = conn;
                conn.query(sql, releaseConnection);
            }
        }

        function releaseConnection(err: Error, rows: any[]) {
            if(err) {
                connection.release();
                callback(err, null);
            } else {
                connection.release();
                const out = Util.shallowCloneArray(rows);
                callback(null, out);
            }
        }
    }

    /**
     * @param {number[]} ids
     * @returns {Promise<any[]>} Returns a promise containing the retrieved rows.
     */
    public retrieveRowsByIdsWithPromise(ids: number[]): Promise<any[]> {
        return new Promise(async (resolve, reject) => {
            this.retrieveRowsByIds(ids, (err: Error, rows: any[]) => {
                if(err) { return reject(err); }
                resolve(rows);
            });
        });
    }

    public retrieveRowsByIsNull(fieldName: string, callback: (err: Error, rows: any[]) => void) {
        let table = this._tableName;
        let sql = 'SELECT * FROM `' + table + '` WHERE `' + fieldName + '` IS NULL ORDER BY '
            + this._primaryKey;

        let connection: PoolConnection = null;
        this._pool.getConnection(performQuery);

        function performQuery(err: Error, conn: PoolConnection) {
            if(err) {
                callback(err, null);
            } else {
                connection = conn;
                conn.query(sql, releaseConnection);
            }
        }

        function releaseConnection(err: Error, rows: any[]) {
            if(err) {
                connection.release();
                callback(err, null);
            } else {
                connection.release();
                const out = Util.shallowCloneArray(rows);
                callback(null, out);
            }
        }
    }

    /**
     * @param {string} fieldName
     * @returns {Promise<any[]>} Returns a promise containing the retrieved rows.
     */
    public retrieveRowsByIsNullWithPromise(fieldName: string): Promise<any[]> {
        return new Promise(async (resolve, reject) => {
            this.retrieveRowsByIsNull(fieldName, (err: Error, rows: any[]) => {
                if(err) { return reject(err); }
                resolve(rows);
            });
        });
    }

    public retrieveRowsByNotEqual(fieldName: string, fieldValue: any,
                                  callback: (err: Error, rows: any[]) => void) {
        let table = this._tableName;
        let sql = 'SELECT * FROM `' + table + '` WHERE ?? <> ?';
        let values = [fieldName, fieldValue];
        sql = mysql.format(sql, values);

        let connection: PoolConnection = null;
        this._pool.getConnection(performQuery);

        function performQuery(err: Error, conn: PoolConnection) {
            if(err) {
                callback(err, null);
            } else {
                connection = conn;
                conn.query(sql, releaseConnection);
            }
        }

        function releaseConnection(err: Error, rows: any[]) {
            if(err) {
                connection.release();
                callback(err, null);
            } else {
                connection.release();
                const out = Util.shallowCloneArray(rows);
                callback(null, out);
            }
        }
    }

    /**
     * @param {string} fieldName
     * @param fieldValue
     * @returns {Promise<any[]>} Returns a promise containing the retrieved rows.
     */
    public retrieveRowsByNotEqualWithPromise(fieldName: string, fieldValue: any): Promise<any[]> {
        return new Promise(async (resolve, reject) => {
            this.retrieveRowsByNotEqual(fieldName, fieldValue, (err: Error, rows: any[]) => {
                if(err) { return reject(err); }
                resolve(rows);
            });
        });
    }

    public setFieldNullWhere(fieldName: string, fieldValue: any,
                             callback: (err: Error, affectedRows: number) => void) {
        let table = this._tableName;
        let sql = 'UPDATE `' + table + '` SET ?? = NULL WHERE ?? = ?';
        let values = [fieldName, fieldName, fieldValue];
        sql = mysql.format(sql, values);

        let connection: PoolConnection = null;
        this._pool.getConnection(performQuery);

        function performQuery(err: Error, conn: PoolConnection) {
            if(err) {
                callback(err, null);
            } else {
                connection = conn;
                connection.query(sql, releaseConnection);
            }
        }

        function releaseConnection(err: Error, result: any[]) {
            if(err) {
                connection.release();
                callback(err, null);
            } else {
                connection.release();
                callback(null, result['affectedRows']);
            }
        }
    }

    /**
     * @param {string} fieldName
     * @param fieldValue
     * @returns {Promise<number>} Returns a promise containing the number of affected rows.
     */
    public setFieldNullWhereWithPromise(fieldName: string, fieldValue: any): Promise<number> {
        return new Promise(async (resolve, reject) => {
            this.setFieldNullWhere(fieldName, fieldValue, (err: Error, affectedRows: number) => {
                if(err) { return reject(err); }
                resolve(affectedRows);
            });
        });
    }

    public deleteRowsBy(fieldName: string, fieldValue: any,
                        callback: (err: Error, affectedRows: number) => void) {
        let table = this._tableName;
        let sql = 'DELETE FROM `' + table + '` WHERE ?? = ?';
        let values = [fieldName, fieldValue];
        sql = mysql.format(sql, values);

        let connection: PoolConnection = null;
        this._pool.getConnection(getConnectionCallback);

        function getConnectionCallback(err: Error, conn: PoolConnection) {
            if(err) {
                callback(err, null);
            } else {
                connection = conn;
                connection.query(sql, queryCallback);
            }
        }

        function queryCallback(err: Error, result: any[]) {
            if(err) {
                connection.release();
                callback(err, null);
            } else {
                connection.release();
                callback(null, result['affectedRows']);
            }
        }
    }

    /**
     * @param {string} fieldName
     * @param fieldValue
     * @returns {Promise<number>} Returns a promise containing the number of affected rows.
     */
    public deleteRowsByWithPromise(fieldName: string, fieldValue: any): Promise<number> {
        return new Promise(async (resolve, reject) => {
            this.deleteRowsBy(fieldName, fieldValue, (err: Error, affectedRows: number) => {
                if(err) { return reject(err); }
                resolve(affectedRows);
            });
        });
    }

    public countRowsByValue(fieldName: string, fieldValue: any,
                            callback: (err: Error, count: number) => void) {
        let table = this._tableName;
        let sql = 'SELECT COUNT(*) FROM `' + table + '` WHERE ?? = ?';
        let values = [fieldName, fieldValue];
        sql = mysql.format(sql, values);

        this._pool.getConnection(getConnectionCallback);
        let connection: PoolConnection = null;

        function getConnectionCallback(err: Error, conn: PoolConnection) {
            if(err) {
                callback(err, null);
            } else {
                connection = conn;
                connection.query(sql, queryCallback);
            }
        }

        function queryCallback(err: Error, result: any[]) {
            if(err) {
                connection.release();
                callback(err, null);
            } else {
                connection.release();
                callback(null, result[0]['COUNT(*)']);
            }
        }
    }

    /**
     * @param {string} fieldName
     * @param fieldValue
     * @returns {Promise<number>} Returns a promise containing the number of rows with the chosen value.
     */
    public countRowsByValueWithPromise(fieldName: string, fieldValue: any): Promise<number> {
        return new Promise(async (resolve, reject) => {
            this.countRowsByValue(fieldName, fieldValue, (err: Error, count: number) => {
                if(err) { return reject(err); }
                resolve(count);
            });
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
        let keys = Object.keys(obj);
        let parameters = [];

        for(let i = 0; i < keys.length; i++) {
            parameters.push('`' + keys[i] + '`=?');
        }

        let paramsString = parameters.join(', ');

        return paramsString;
    }

    private static getObjectValues(obj: Object): Array<any> {
        let keys = Object.keys(obj);
        let results = [];

        for(let i = 0; i < keys.length; i++) {
            let key = keys[i];
            results.push(obj[key]);
        }

        return results;
    }
}

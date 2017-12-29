import mysql = require('mysql');
import { Pool, PoolConnection } from 'mysql';
import { MySqlDate } from '@joefallon/mysql-date/src/MySqlDate';


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

    public createRow(obj: any, callback: (err: Error, insertId: number) => void) {
        let tableName = this._tableName;
        let primaryKey = this._primaryKey;
        delete obj[primaryKey];

        // noinspection AssignmentToFunctionParameterJS
        obj = this.timestampCreatedColumn(obj);
        // noinspection AssignmentToFunctionParameterJS
        obj = this.timestampUpdatedColumn(obj);

        let columnNames = TableGateway.getColumnNames(obj);
        let placeholders = TableGateway.getPlaceholders(obj);

        let sql = `INSERT INTO ${tableName} ( ${columnNames} ) VALUES ( ${placeholders} )`;
        let values = TableGateway.getObjectValues(obj);
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
                    callback(null, row[0]);
                }
            }
        }
    }

    public updateRow(row: any, callback: (err: Error, affectedRows: number) => void) {
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
                callback(null, rows);
            }
        }
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
                callback(null, rows);
            }
        }
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
                callback(null, rows);
            }
        }
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
                callback(null, rows);
            }
        }
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

    private timestampCreatedColumn(obj: Object): Object {
        if(this._createdColumnName.length > 0) {
            let date = new Date();
            obj[this._createdColumnName] = TableGateway.mySqlDatetimeString(date);
        }

        return obj;
    }

    private timestampUpdatedColumn(obj: Object): Object {
        if(this._updatedColumnName.length > 0) {
            let date = new Date();
            obj[this._updatedColumnName] = TableGateway.mySqlDatetimeString(date);
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

    private static mySqlDatetimeString(date: Date): string {
        return MySqlDate.toMySqlDate(date);
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

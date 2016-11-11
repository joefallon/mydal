import mysql = require('mysql');
import MySQLDateTimeFormatter = require('./MySQLDateTimeFormatter');

import {IConnection, IError, IPool } from 'mysql';

class TableGateway {
    private pool:IPool;
    private tableName:string;
    private primaryKey:string;
    private createdColumnName = '';
    private updatedColumnName = '';

    constructor(connectionPool:IPool, tableName:string, primaryKey = 'id') {
        this.pool       = connectionPool;
        this.tableName  = tableName;
        this.primaryKey = primaryKey;
    }

    public setCreatedColumnName(value:string) {
        this.createdColumnName = value;
    }

    public setUpdatedColumnName(value:string) {
        this.updatedColumnName = value;
    }

    public createRow(obj:any, callback:(err:IError, insertId:number)=>void) {
        let tableName  = this.tableName;
        let primaryKey = this.primaryKey;
        delete obj[primaryKey];

        obj = this.timestampCreatedColumn(obj);
        obj = this.timestampUpdatedColumn(obj);

        let columnNames  = TableGateway.getColumnNames(obj);
        let placeholders = TableGateway.getPlaceholders(obj);

        let sql = `INSERT INTO ${tableName} ( ${columnNames} ) VALUES ( ${placeholders} )`;
        let values = TableGateway.getObjectValues(obj);
        sql = mysql.format(sql, values);

        let connection:IConnection = null;
        this.pool.getConnection(performQuery);

        function performQuery(err:IError, conn:IConnection) {
            if(err) {
                callback(err, null);
            } else {
                connection = conn;
                connection.query(sql, releaseConnection);
            }
        }

        function releaseConnection(err:IError, result:any[]) {
            if(err) {
                connection.release();
                callback(err, null);
            } else {
                connection.release();
                callback(null, result['insertId']);
            }
        }
    }

    public retrieveRow(id:number, callback:(err:IError, row:Object)=>void) {
        let tableName  = this.tableName;
        let primaryKey = this.primaryKey;

        let sql = 'SELECT * FROM ' + tableName + ' WHERE `' + primaryKey + '`=' + id + ' LIMIT 1';

        let connection:IConnection = null;
        this.pool.getConnection(performQuery);

        function performQuery(err:IError, conn:IConnection) {
            if(err) {
                callback(err, null);
            } else {
                connection = conn;
                connection.query(sql, releaseConnection);
            }
        }

        function releaseConnection(err:IError, row:any[]) {
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

    public updateRow(row:any, callback:(err:IError, affectedRows:number)=>void) {
        let tableName       = this.tableName;
        let primaryKeyName  = this.primaryKey;
        let primaryKeyValue = row[primaryKeyName];

        delete row[primaryKeyName];
        row = this.timestampUpdatedColumn(row);
        let params = TableGateway.getParameterizedValues(row);

        let sql = 'UPDATE ' + tableName
                + ' SET ' + params
                + ' WHERE `' + primaryKeyName + '`=' + primaryKeyValue;
        let values = TableGateway.getObjectValues(row);
        sql = mysql.format(sql, values);

        let connection:IConnection = null;
        this.pool.getConnection(performQuery);

        function performQuery(err:IError, conn:IConnection) {
            if(err) {
                callback(err, null);
            } else {
                connection = conn;
                conn.query(sql, releaseConnection);
            }
        }

        function releaseConnection(err:IError, result:any[]) {
            if(err) {
                connection.release();
                callback(err, null);
            } else {
                connection.release();
                callback(null, result['affectedRows']);
            }
        }
    }

    public deleteRow(id:number, callback:(err:IError, affectedRows:number)=>void) {
        let tableName  = this.tableName;
        let primaryKey = this.primaryKey;
        let sql = 'DELETE FROM `' + tableName + '` WHERE `' + primaryKey + '`=' + id;

        let connection:IConnection = null;
        this.pool.getConnection(performQuery);

        function performQuery(err:IError, conn:IConnection) {
            if(err) {
                callback(err, null);
            } else {
                connection = conn;
                connection.query(sql, releaseConnection);
            }
        }

        function releaseConnection(err: IError, result:any[]) {
            if(err) {
                connection.release();
                callback(err, null);
            } else {
                connection.release();
                callback(null, result['affectedRows']);
            }
        }
    }

    public retrieveRowsBy(fieldName:string, fieldValue:any,
                          callback:(err:IError, rows:any[])=>void) {
        let tableName = this.tableName;
        let sql = 'SELECT * FROM `' + tableName + '` WHERE ??=?';
        let values = [fieldName, fieldValue];
        sql = mysql.format(sql, values);

        let connection:IConnection = null;
        this.pool.getConnection(performQuery);

        function performQuery(err:IError, conn:IConnection) {
            if(err) {
                callback(err, null);
            } else {
                connection = conn;
                conn.query(sql, releaseConnection);
            }
        }

        function releaseConnection(err:IError, rows:any[]) {
            if(err) {
                connection.release();
                callback(err, null);
            } else {
                connection.release();
                callback(null, rows);
            }
        }
    }

    public retrieveRowsByIds(ids:number[], callback:(err:IError, rows:any[])=>void) {
        let table = this.tableName;
        let primaryKey = this.primaryKey;

        for(let i = 0; i < ids.length; i++) {
            // Ensure the ids are all integers.
            ids[i] = Math.floor(ids[i]);
        }

        let idsString = ids.join(', ');
        let sql = 'SELECT * FROM `' + table +'` WHERE `'
                + primaryKey + '` IN (' + idsString + ') ORDER BY `' + primaryKey + '`';

        let connection:IConnection = null;
        this.pool.getConnection(performQuery);

        function performQuery(err:IError, conn:IConnection) {
            if(err) {
                callback(err, null);
            } else {
                connection = conn;
                conn.query(sql, releaseConnection);
            }
        }

        function releaseConnection(err:IError, rows:any[]) {
            if(err) {
                connection.release();
                callback(err, null);
            } else {
                connection.release();
                callback(null, rows);
            }
        }
    }

    public retrieveRowsByIsNull(fieldName:string, callback:(err:IError, rows:any[])=>void) {
        let table = this.tableName;
        let sql = 'SELECT * FROM `' + table + '` WHERE `' + fieldName + '` IS NULL';

        let connection:IConnection = null;
        this.pool.getConnection(performQuery);

        function performQuery(err:IError, conn:IConnection) {
            if(err) {
                callback(err, null);
            } else {
                connection = conn;
                conn.query(sql, releaseConnection);
            }
        }

        function releaseConnection(err:IError, rows:any[]) {
            if(err) {
                connection.release();
                callback(err, null);
            } else {
                connection.release();
                callback(null, rows);
            }
        }
    }

    public retrieveRowsByNotEqual(fieldName:string, fieldValue:any,
                                  callback:(err:IError, rows:any[])=>void) {
        let table = this.tableName;
        let sql = 'SELECT * FROM `' + table +'` WHERE ?? <> ?';
        let values = [fieldName, fieldValue];
        sql = mysql.format(sql, values);

        let connection:IConnection = null;
        this.pool.getConnection(performQuery);

        function performQuery(err:IError, conn:IConnection) {
            if(err) {
                callback(err, null);
            } else {
                connection = conn;
                conn.query(sql, releaseConnection);
            }
        }

        function releaseConnection(err:IError, rows:any[]) {
            if(err) {
                connection.release();
                callback(err, null);
            } else {
                connection.release();
                callback(null, rows);
            }
        }
    }

    public setFieldNullWhere(fieldName:string, fieldValue:any,
                             callback:(err:IError, affectedRows:number) => void) {
        let table = this.tableName;
        let sql = 'UPDATE `' + table +'` SET ?? = NULL WHERE ?? = ?';
        let values = [fieldName, fieldName, fieldValue];
        sql = mysql.format(sql, values);

        let connection:IConnection = null;
        this.pool.getConnection(performQuery);

        function performQuery(err:IError, conn:IConnection) {
            if(err) {
                callback(err, null);
            } else {
                connection = conn;
                connection.query(sql, releaseConnection);
            }
        }

        function releaseConnection(err: IError, result:any[]) {
            if(err) {
                connection.release();
                callback(err, null);
            } else {
                connection.release();
                callback(null, result['affectedRows']);
            }
        }
    }

    public deleteRowsBy(fieldName:string, fieldValue:any,
                        callback:(err:IError, affectedRows:number) => void) {
        let table = this.tableName;
        let sql = 'DELETE FROM `' + table + '` WHERE ?? = ?';
        let values = [fieldName, fieldValue];
        sql = mysql.format(sql, values);

        let connection:IConnection = null;
        this.pool.getConnection(getConnectionCallback);

        function getConnectionCallback(err:IError, conn:IConnection) {
            if(err) {
                callback(err, null);
            } else {
                connection = conn;
                connection.query(sql, queryCallback);
            }
        }

        function queryCallback(err: IError, result:any[]) {
            if(err) {
                connection.release();
                callback(err, null);
            } else {
                connection.release();
                callback(null, result['affectedRows']);
            }
        }
    }

    public countRowsByValue(fieldName:string, fieldValue:any,
                            callback:(err:IError, count:number) => void) {
        let table = this.tableName;
        let sql = 'SELECT COUNT(*) FROM `' + table + '` WHERE ?? = ?';
        let values = [fieldName, fieldValue];
        sql = mysql.format(sql, values);

        this.pool.getConnection(getConnectionCallback);
        let connection:IConnection = null;

        function getConnectionCallback(err:IError, conn:IConnection) {
            if(err) {
                callback(err, null);
            } else {
                connection = conn;
                connection.query(sql, queryCallback);
            }
        }

        function queryCallback(err: IError, result:any[]) {
            if(err) {
                connection.release();
                callback(err, null);
            } else {
                connection.release();
                callback(null, result[0]['COUNT(*)']);
            }
        }
    }

    private timestampCreatedColumn(obj:Object):Object {
        if(this.createdColumnName.length > 0) {
            let date = new Date();
            obj[this.createdColumnName] = TableGateway.mySqlDatetimeString(date);
        }

        return obj;
    }

    private timestampUpdatedColumn(obj:Object):Object {
        if(this.updatedColumnName.length > 0) {
            let date = new Date();
            obj[this.updatedColumnName] = TableGateway.mySqlDatetimeString(date);
        }

        return obj;
    }

    private static getPlaceholders(obj:any) {
        let keys = Object.keys(obj);
        let placeholders:string[] = [];

        for(let i = 0; i < keys.length; i++) {
            placeholders.push('?');
        }

        let placeholdersString = placeholders.join(', ');

        return placeholdersString;
    }

    private static getColumnNames(obj:any):string {
        let keys = Object.keys(obj);
        let columnNames:string[] = [];

        for(let i = 0; i < keys.length; i++) {
            columnNames.push('`' + keys[i] + '`');
        }

        let colNamesString = columnNames.join(', ');

        return colNamesString;
    }

    private static mySqlDatetimeString(date:Date):string {
        return MySQLDateTimeFormatter.format(date);
    }

    private static getParameterizedValues(obj:any) {
        let keys = Object.keys(obj);
        let parameters = [];

        for(let i = 0; i < keys.length; i++) {
            parameters.push('`' + keys[i] + '`=?');
        }

        let paramsString = parameters.join(', ');

        return paramsString;
    }

    private static getObjectValues(obj:Object):Array<any> {
        let keys = Object.keys(obj);
        let results = [];

        for(let i = 0; i < keys.length; i++) {
            let key = keys[i];
            results.push(obj[key]);
        }

        return results;
    }
}

export = TableGateway;

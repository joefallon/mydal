import mysql = require('mysql');
import { PoolConnection, Pool } from 'mysql';
import { MySQLDateTimeFormatter } from "./MySQLDateTimeFormatter";

export class JoinTableGateway {
    private _pool: Pool;
    private _tableName: string;
    private _id1Name: string;
    private _id2Name: string;
    private _createdColumnName = '';

    constructor(connectionPool: Pool, tableName: string, id1Name: string, id2Name: string) {
        this._pool = connectionPool;
        this._tableName = tableName;
        this._id1Name = id1Name;
        this._id2Name = id2Name;
    }

    public setCreatedColumnName(value: string) {
        this._createdColumnName = value;
    }

    public createRow(id1: any, id2: any, callback: (err: Error, isSuccess: boolean) => void) {
        let tableName = this._tableName;
        let id1Name = this._id1Name;
        let id2Name = this._id2Name;
        let createdName = this._createdColumnName;
        let created = JoinTableGateway.mySqlDatetimeString(new Date());
        let columnNames = `\`${id1Name}\`, \`${id2Name}\``;
        let placeholders = '?, ?';
        let values = [id1, id2];

        if(createdName.length > 0) {
            columnNames += `, \`${createdName}\``;
            placeholders += ', ?';
            values.push(created);
        }

        let sql = `INSERT INTO ${tableName} ( ${columnNames} ) VALUES ( ${placeholders} )`;
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

                if(result['affectedRows'] == 1) {
                    callback(null, true);
                } else {
                    callback(null, false);
                }
            }
        }
    }

    public retrieveRow(id1: any, id2: any, callback: (err: Error, row: any[]) => void) {
        let sql = 'SELECT * FROM ' + this._tableName
            + ' WHERE ' + this._id1Name + '=? AND ' + this._id2Name + '=? LIMIT 1';
        let values = [id1, id2];
        sql = mysql.format(sql, values);

        let connection: PoolConnection= null;
        this._pool.getConnection(getConnectionCallback);

        function getConnectionCallback(err: Error, conn: PoolConnection) {
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

                if(result.length > 0) {
                    callback(null, result[0]);
                } else {
                    callback(null, null);
                }
            }
        }
    }

    public deleteRow(id1: any, id2: any, callback: (err: Error, affectedRows: number) => void) {
        let tableName = this._tableName;
        let id1Name = this._id1Name;
        let id2Name = this._id2Name;

        let sql = 'DELETE FROM `' + tableName
            + '` WHERE `' + id1Name + '`=? and `' + id2Name + '`=?';
        let values = [id1, id2];
        sql = mysql.format(sql, values);

        let connection: PoolConnection= null;
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

    public retrieveById(idName: string, idValue: any, callback: (err: Error, rows: any[]) => void) {
        let tableName = this._tableName;
        let sql = 'SELECT * FROM `' + tableName + '` where `' + idName + '`=?';
        sql = mysql.format(sql, [idValue]);

        let connection: PoolConnection= null;
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
                callback(null, result);
            }
        }
    }

    public deleteById(idName: string, idValue: any,
                      callback: (err: Error, affectedRows: number) => void) {
        let tableName = this._tableName;
        let sql = 'DELETE FROM `' + tableName + '` where `' + idName + '`=?';
        sql = mysql.format(sql, [idValue]);

        let connection: PoolConnection= null;
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

    private static mySqlDatetimeString(date: Date): string {
        return MySQLDateTimeFormatter.format(date);
    }
}

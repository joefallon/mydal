import mysql = require('mysql');
import { PoolConnection, Pool } from 'mysql';
import { MySqlDate } from '@joefallon/mysql-date/src/MySqlDate';

import { Util } from './Util';

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

    /**
     * @param id1
     * @param id2
     * @returns {Promise<boolean>} Returns a promise containing true on success and false on failure.
     */
    public createRowWithPromise(id1: any, id2: any): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            this.createRow(id1,id2, (err: Error, isSuccess: boolean) => {
                if(err) { return reject(err); }
                resolve(isSuccess);
            });
        });
    }

    public retrieveRow(id1: any, id2: any, callback: (err: Error, row: any) => void) {
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
                    const row = Util.shallowClone(result[0]); // prevents mysql from modifying source object
                    callback(null, row);
                } else {
                    callback(null, null);
                }
            }
        }
    }

    /**
     * @param id1
     * @param id2
     * @returns {Promise<any>} Returns a promise containing the retrieved row if it exists.
     */
    public retrieveRowWithPromise(id1: any, id2: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            this.retrieveRow(id1, id2, (err: Error, row: any) => {
                if(err) { return reject(err); }
                resolve(row);
            });
        });
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

    /**
     * @param id1
     * @param id2
     * @returns {Promise<number>} Returns a promise containing the number of affected rows (i.e. 0 or 1).
     */
    public deleteRowWithPromise(id1: any, id2: any): Promise<number> {
        return new Promise(async (resolve, reject) => {
            this.deleteRow(id1, id2, (err: Error, affectedRows: number) => {
                if(err) { return reject(err); }
                resolve(affectedRows);
            });
        });
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
                const rows = Util.shallowCloneArray(result);
                callback(null, rows);
            }
        }
    }

    /**
     * @param {string} idName
     * @param idValue
     * @returns {Promise<any[]>} Returns a promise containing the retrieved rows.
     */
    public retrieveByIdWithPromise(idName: string, idValue: any): Promise<any[]> {
        return new Promise(async (resolve, reject) => {
            this.retrieveById(idName, idValue, (err: Error, rows: any[]) => {
                if(err) { return reject(err); }
                resolve(rows);
            });
        });
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

    /**
     * @param {string} idName
     * @param idValue
     * @returns {Promise<number>} Returns a promise containing the number of affected rows.
     */
    public deleteByIdWithPromise(idName: string, idValue: any): Promise<number> {
        return new Promise(async (resolve, reject) => {
            this.deleteById(idName, idValue, (err: Error, affectedRows: number) => {
                if(err) { return reject(err); }
                resolve(affectedRows);
            });
        });
    }

    private static mySqlDatetimeString(date: Date): string {
        return MySqlDate.toMySqlDate(date);
    }
}

import mysql = require('mysql');
import { PoolConnection, Pool } from 'mysql';
import { MySqlDate } from '@joefallon/mysql-date/src/MySqlDate';

import { Util } from './Util';

export class JoinTableGateway {
    private readonly _tableName: string;
    private readonly _id1Name:   string;
    private readonly _id2Name:   string;

    private _pool: Pool;
    private _createdColumnName = '';

    constructor(connectionPool: Pool, tableName: string, id1Name: string, id2Name: string) {
        this._pool      = connectionPool;
        this._tableName = tableName;
        this._id1Name   = id1Name;
        this._id2Name   = id2Name;
    }

    public setCreatedColumnName(value: string) {
        this._createdColumnName = value;
    }

    /**
     * Creates a row in the database.
     *
     * @returns Returns true on row creation success, otherwise false.
     */
    public createRow(id1: any, id2: any): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const tableName   = this._tableName;
            const id1Name     = this._id1Name;
            const id2Name     = this._id2Name;
            const createdName = this._createdColumnName;
            const created     = JoinTableGateway.mySqlDatetimeString(new Date());
            const values      = [id1, id2];

            let columnNames  = `\`${id1Name}\`, \`${id2Name}\``;
            let placeholders = '?, ?';

            if(createdName.length > 0) {
                columnNames  += `, \`${createdName}\``;
                placeholders += ', ?';
                values.push(created);
            }

            let sql = `INSERT INTO ${tableName} ( ${columnNames} ) VALUES ( ${placeholders} )`;
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
                    if(result['affectedRows'] == 1) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                }
            }
        });
    }

    /**
     * @returns Returns the row with matching `id1` and `id2`.
     */
    public retrieveRow(id1: any, id2: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const tableName = this._tableName;
            const id1Name   = this._id1Name;
            const id2Name   = this._id2Name;
            const values    = [id1, id2];
            let sql = 'SELECT * FROM ' + tableName + ' WHERE ' + id1Name + '=? AND ' + id2Name + '=? LIMIT 1';
            sql = mysql.format(sql, values);

            let connection: PoolConnection = null;
            this._pool.getConnection(performQuery);

            function performQuery(err: Error, conn: PoolConnection) {
                if(err) {
                    return reject(err);
                } else {
                    connection = conn;
                    connection.query(sql, releaseConnection);
                }
            }

            function releaseConnection(err: Error, result: any[]) {
                connection.release();

                if(err) {
                    return reject(err);
                } else {
                    if(result.length > 0) {
                        const row = Util.shallowClone(result[0]); // removes mysql metadata
                        resolve(row);
                    } else {
                        resolve(null);
                    }
                }
            }
        });
    }

    /**
     * Deletes the row from the database with the matching `id1` and `id2`.
     *
     * @returns Returns the number of affected rows (i.e. 0 or 1).
     */
    public deleteRow(id1: any, id2: any): Promise<number> {
        return new Promise((resolve, reject) => {
            const tableName = this._tableName;
            const id1Name   = this._id1Name;
            const id2Name   = this._id2Name;
            const values    = [id1, id2];

            let sql = 'DELETE FROM `' + tableName + '` WHERE `' + id1Name + '`=? and `' + id2Name + '`=?';
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
     * @returns Returns the rows where `idName` matches `idValue`.
     */
    public retrieveById(idName: string, idValue: any): Promise<any[]> {
        return new Promise((resolve, reject) => {
            let tableName = this._tableName;
            let sql = 'SELECT * FROM `' + tableName + '` where `' + idName + '`=?';
            sql = mysql.format(sql, [idValue]);

            let connection: PoolConnection|null = null;
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
                    const rows = Util.shallowCloneArray(result); // removes mysql metadata
                    resolve(rows);
                }
            }
        });
    }

    /**
     * Deletes the rows from the database were `idName` matches `idValue`.
     *
     * @returns Returns the number of affected rows.
     */
    public deleteById(idName: string, idValue: any): Promise<number> {
        return new Promise((resolve, reject) => {
            const tableName = this._tableName;
            let sql = 'DELETE FROM `' + tableName + '` where `' + idName + '`=?';
            sql = mysql.format(sql, [idValue]);

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

    private static mySqlDatetimeString(date: Date): string {
        return MySqlDate.toMySqlDate(date);
    }
}

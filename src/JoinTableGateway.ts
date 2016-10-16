import mysql = require('mysql');
import MySQLDateTimeFormatter = require('./MySQLDateTimeFormatter');

import {IPool} from 'mysql';
import {IError} from 'mysql';
import {IConnection} from 'mysql';

class JoinTableGateway {
    private pool:IPool;
    private tableName:string;
    private id1Name:string;
    private id2Name:string;
    private createdColumnName = '';

    constructor(connectionPool:IPool, tableName:string, id1Name:string, id2Name:string) {
        this.pool      = connectionPool;
        this.tableName = tableName;
        this.id1Name   = id1Name;
        this.id2Name   = id2Name;
    }

    public setCreatedColumnName(value:string) {
        this.createdColumnName = value;
    }

    public createRow(id1:any, id2:any, callback:(err:IError, isSuccess:boolean)=>void) {
        let tableName    = this.tableName;
        let id1Name      = this.id1Name;
        let id2Name      = this.id2Name;
        let createdName  = this.createdColumnName;
        let created      = JoinTableGateway.mySqlDatetimeString(new Date());
        let columnNames  = `\`${id1Name}\`, \`${id2Name}\``;
        let placeholders = '?, ?';
        let values = [id1, id2];

        if(createdName.length > 0) {
            columnNames  += `, \`${createdName}\``;
            placeholders += ', ?';
            values.push(created);
        }

        let sql = `INSERT INTO ${tableName} ( ${columnNames} ) VALUES ( ${placeholders} )`;
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

                if(result['affectedRows'] == 1) {
                    callback(null, true);
                } else {
                    callback(null, false);
                }
            }
        }
    }

    public retrieveRow(id1:any, id2:any, callback:(err:IError, row:any[])=>void) {
        let sql = 'SELECT * FROM ' + this.tableName
                + ' WHERE ' + this.id1Name + '=? AND ' + this.id2Name + '=? LIMIT 1';
        let values = [id1, id2];
        sql = mysql.format(sql, values);

        let connection:IConnection = null;
        this.pool.getConnection(getConnectionCallback);

        function getConnectionCallback(err:IError, conn:IConnection) {
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

                if(result.length > 0) {
                    callback(null, result[0]);
                } else {
                    callback(null, null);
                }
            }
        }
    }

    public deleteRow(id1:any, id2:any, callback:(err:IError, affectedRows:number)=>void) {
        let tableName = this.tableName;
        let id1Name   = this.id1Name;
        let id2Name   = this.id2Name;

        let sql = 'DELETE FROM `' + tableName
            + '` WHERE `' + id1Name + '`=? and `' + id2Name + '`=?';
        let values = [id1, id2];
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
                callback(null, result['affectedRows']);
            }
        }
    }

    public retrieveById(idName:string, idValue:any, callback:(err:IError, rows:any[])=>void) {
        let tableName = this.tableName;
        let sql = 'SELECT * FROM `' + tableName + '` where `' + idName + '`=?';
        sql = mysql.format(sql, [idValue]);

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
                callback(null, result);
            }
        }
    }

    public deleteById(idName:string, idValue:any,
                      callback:(err:IError, affectedRows:number)=>void) {
        let tableName = this.tableName;
        let sql = 'DELETE FROM `' + tableName + '` where `' + idName + '`=?';
        sql = mysql.format(sql, [idValue]);

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
                callback(null, result['affectedRows']);
            }
        }
    }

    private static mySqlDatetimeString(date:Date):string {
        return MySQLDateTimeFormatter.format(date);
    }
}

export = JoinTableGateway;

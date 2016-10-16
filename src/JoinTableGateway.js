"use strict";
var mysql = require('mysql');
var MySQLDateTimeFormatter = require('./MySQLDateTimeFormatter');
var JoinTableGateway = (function () {
    function JoinTableGateway(connectionPool, tableName, id1Name, id2Name) {
        this.createdColumnName = '';
        this.pool = connectionPool;
        this.tableName = tableName;
        this.id1Name = id1Name;
        this.id2Name = id2Name;
    }
    JoinTableGateway.prototype.setCreatedColumnName = function (value) {
        this.createdColumnName = value;
    };
    JoinTableGateway.prototype.createRow = function (id1, id2, callback) {
        var tableName = this.tableName;
        var id1Name = this.id1Name;
        var id2Name = this.id2Name;
        var createdName = this.createdColumnName;
        var created = JoinTableGateway.mySqlDatetimeString(new Date());
        var columnNames = "`" + id1Name + "`, `" + id2Name + "`";
        var placeholders = '?, ?';
        var values = [id1, id2];
        if (createdName.length > 0) {
            columnNames += ", `" + createdName + "`";
            placeholders += ', ?';
            values.push(created);
        }
        var sql = "INSERT INTO " + tableName + " ( " + columnNames + " ) VALUES ( " + placeholders + " )";
        sql = mysql.format(sql, values);
        var connection = null;
        this.pool.getConnection(performQuery);
        function performQuery(err, conn) {
            if (err) {
                callback(err, null);
            }
            else {
                connection = conn;
                connection.query(sql, releaseConnection);
            }
        }
        function releaseConnection(err, result) {
            if (err) {
                connection.release();
                callback(err, null);
            }
            else {
                connection.release();
                if (result['affectedRows'] == 1) {
                    callback(null, true);
                }
                else {
                    callback(null, false);
                }
            }
        }
    };
    JoinTableGateway.prototype.retrieveRow = function (id1, id2, callback) {
        var sql = 'SELECT * FROM ' + this.tableName
            + ' WHERE ' + this.id1Name + '=? AND ' + this.id2Name + '=? LIMIT 1';
        var values = [id1, id2];
        sql = mysql.format(sql, values);
        var connection = null;
        this.pool.getConnection(getConnectionCallback);
        function getConnectionCallback(err, conn) {
            if (err) {
                callback(err, null);
            }
            else {
                connection = conn;
                connection.query(sql, releaseConnection);
            }
        }
        function releaseConnection(err, result) {
            if (err) {
                connection.release();
                callback(err, null);
            }
            else {
                connection.release();
                if (result.length > 0) {
                    callback(null, result[0]);
                }
                else {
                    callback(null, null);
                }
            }
        }
    };
    JoinTableGateway.prototype.deleteRow = function (id1, id2, callback) {
        var tableName = this.tableName;
        var id1Name = this.id1Name;
        var id2Name = this.id2Name;
        var sql = 'DELETE FROM `' + tableName
            + '` WHERE `' + id1Name + '`=? and `' + id2Name + '`=?';
        var values = [id1, id2];
        sql = mysql.format(sql, values);
        var connection = null;
        this.pool.getConnection(performQuery);
        function performQuery(err, conn) {
            if (err) {
                callback(err, null);
            }
            else {
                connection = conn;
                connection.query(sql, releaseConnection);
            }
        }
        function releaseConnection(err, result) {
            if (err) {
                connection.release();
                callback(err, null);
            }
            else {
                connection.release();
                callback(null, result['affectedRows']);
            }
        }
    };
    JoinTableGateway.prototype.retrieveById = function (idName, idValue, callback) {
        var tableName = this.tableName;
        var sql = 'SELECT * FROM `' + tableName + '` where `' + idName + '`=?';
        sql = mysql.format(sql, [idValue]);
        var connection = null;
        this.pool.getConnection(performQuery);
        function performQuery(err, conn) {
            if (err) {
                callback(err, null);
            }
            else {
                connection = conn;
                connection.query(sql, releaseConnection);
            }
        }
        function releaseConnection(err, result) {
            if (err) {
                connection.release();
                callback(err, null);
            }
            else {
                connection.release();
                callback(null, result);
            }
        }
    };
    JoinTableGateway.prototype.deleteById = function (idName, idValue, callback) {
        var tableName = this.tableName;
        var sql = 'DELETE FROM `' + tableName + '` where `' + idName + '`=?';
        sql = mysql.format(sql, [idValue]);
        var connection = null;
        this.pool.getConnection(performQuery);
        function performQuery(err, conn) {
            if (err) {
                callback(err, null);
            }
            else {
                connection = conn;
                connection.query(sql, releaseConnection);
            }
        }
        function releaseConnection(err, result) {
            if (err) {
                connection.release();
                callback(err, null);
            }
            else {
                connection.release();
                callback(null, result['affectedRows']);
            }
        }
    };
    JoinTableGateway.mySqlDatetimeString = function (date) {
        return MySQLDateTimeFormatter.format(date);
    };
    return JoinTableGateway;
}());
module.exports = JoinTableGateway;

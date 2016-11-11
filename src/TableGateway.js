"use strict";
var mysql = require('mysql');
var MySQLDateTimeFormatter = require('./MySQLDateTimeFormatter');
var TableGateway = (function () {
    function TableGateway(connectionPool, tableName, primaryKey) {
        if (primaryKey === void 0) { primaryKey = 'id'; }
        this.createdColumnName = '';
        this.updatedColumnName = '';
        this.pool = connectionPool;
        this.tableName = tableName;
        this.primaryKey = primaryKey;
    }
    TableGateway.prototype.setCreatedColumnName = function (value) {
        this.createdColumnName = value;
    };
    TableGateway.prototype.setUpdatedColumnName = function (value) {
        this.updatedColumnName = value;
    };
    TableGateway.prototype.createRow = function (obj, callback) {
        var tableName = this.tableName;
        var primaryKey = this.primaryKey;
        delete obj[primaryKey];
        obj = this.timestampCreatedColumn(obj);
        obj = this.timestampUpdatedColumn(obj);
        var columnNames = TableGateway.getColumnNames(obj);
        var placeholders = TableGateway.getPlaceholders(obj);
        var sql = "INSERT INTO " + tableName + " ( " + columnNames + " ) VALUES ( " + placeholders + " )";
        var values = TableGateway.getObjectValues(obj);
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
                callback(null, result['insertId']);
            }
        }
    };
    TableGateway.prototype.retrieveRow = function (id, callback) {
        var tableName = this.tableName;
        var primaryKey = this.primaryKey;
        var sql = 'SELECT * FROM ' + tableName + ' WHERE `' + primaryKey + '`=' + id + ' LIMIT 1';
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
        function releaseConnection(err, row) {
            if (err) {
                connection.release();
                callback(err, null);
            }
            else {
                connection.release();
                if (row.length == 0) {
                    callback(null, null);
                }
                else {
                    callback(null, row[0]);
                }
            }
        }
    };
    TableGateway.prototype.updateRow = function (row, callback) {
        var tableName = this.tableName;
        var primaryKeyName = this.primaryKey;
        var primaryKeyValue = row[primaryKeyName];
        delete row[primaryKeyName];
        row = this.timestampUpdatedColumn(row);
        var params = TableGateway.getParameterizedValues(row);
        var sql = 'UPDATE ' + tableName
            + ' SET ' + params
            + ' WHERE `' + primaryKeyName + '`=' + primaryKeyValue;
        var values = TableGateway.getObjectValues(row);
        sql = mysql.format(sql, values);
        var connection = null;
        this.pool.getConnection(performQuery);
        function performQuery(err, conn) {
            if (err) {
                callback(err, null);
            }
            else {
                connection = conn;
                conn.query(sql, releaseConnection);
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
    TableGateway.prototype.deleteRow = function (id, callback) {
        var tableName = this.tableName;
        var primaryKey = this.primaryKey;
        var sql = 'DELETE FROM `' + tableName + '` WHERE `' + primaryKey + '`=' + id;
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
    TableGateway.prototype.retrieveRowsBy = function (fieldName, fieldValue, callback) {
        var tableName = this.tableName;
        var sql = 'SELECT * FROM `' + tableName + '` WHERE ??=?';
        var values = [fieldName, fieldValue];
        sql = mysql.format(sql, values);
        var connection = null;
        this.pool.getConnection(performQuery);
        function performQuery(err, conn) {
            if (err) {
                callback(err, null);
            }
            else {
                connection = conn;
                conn.query(sql, releaseConnection);
            }
        }
        function releaseConnection(err, rows) {
            if (err) {
                connection.release();
                callback(err, null);
            }
            else {
                connection.release();
                callback(null, rows);
            }
        }
    };
    TableGateway.prototype.retrieveRowsByIds = function (ids, callback) {
        var table = this.tableName;
        var primaryKey = this.primaryKey;
        for (var i = 0; i < ids.length; i++) {
            // Ensure the ids are all integers.
            ids[i] = Math.floor(ids[i]);
        }
        var idsString = ids.join(', ');
        var sql = 'SELECT * FROM `' + table + '` WHERE `'
            + primaryKey + '` IN (' + idsString + ') ORDER BY `' + primaryKey + '`';
        var connection = null;
        this.pool.getConnection(performQuery);
        function performQuery(err, conn) {
            if (err) {
                callback(err, null);
            }
            else {
                connection = conn;
                conn.query(sql, releaseConnection);
            }
        }
        function releaseConnection(err, rows) {
            if (err) {
                connection.release();
                callback(err, null);
            }
            else {
                connection.release();
                callback(null, rows);
            }
        }
    };
    TableGateway.prototype.retrieveRowsByIsNull = function (fieldName, callback) {
        var table = this.tableName;
        var sql = 'SELECT * FROM `' + table + '` WHERE `' + fieldName + '` IS NULL';
        var connection = null;
        this.pool.getConnection(performQuery);
        function performQuery(err, conn) {
            if (err) {
                callback(err, null);
            }
            else {
                connection = conn;
                conn.query(sql, releaseConnection);
            }
        }
        function releaseConnection(err, rows) {
            if (err) {
                connection.release();
                callback(err, null);
            }
            else {
                connection.release();
                callback(null, rows);
            }
        }
    };
    TableGateway.prototype.retrieveRowsByNotEqual = function (fieldName, fieldValue, callback) {
        var table = this.tableName;
        var sql = 'SELECT * FROM `' + table + '` WHERE ?? <> ?';
        var values = [fieldName, fieldValue];
        sql = mysql.format(sql, values);
        var connection = null;
        this.pool.getConnection(performQuery);
        function performQuery(err, conn) {
            if (err) {
                callback(err, null);
            }
            else {
                connection = conn;
                conn.query(sql, releaseConnection);
            }
        }
        function releaseConnection(err, rows) {
            if (err) {
                connection.release();
                callback(err, null);
            }
            else {
                connection.release();
                callback(null, rows);
            }
        }
    };
    TableGateway.prototype.setFieldNullWhere = function (fieldName, fieldValue, callback) {
        var table = this.tableName;
        var sql = 'UPDATE `' + table + '` SET ?? = NULL WHERE ?? = ?';
        var values = [fieldName, fieldName, fieldValue];
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
    TableGateway.prototype.deleteRowsBy = function (fieldName, fieldValue, callback) {
        var table = this.tableName;
        var sql = 'DELETE FROM `' + table + '` WHERE ?? = ?';
        var values = [fieldName, fieldValue];
        sql = mysql.format(sql, values);
        var connection = null;
        this.pool.getConnection(getConnectionCallback);
        function getConnectionCallback(err, conn) {
            if (err) {
                callback(err, null);
            }
            else {
                connection = conn;
                connection.query(sql, queryCallback);
            }
        }
        function queryCallback(err, result) {
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
    TableGateway.prototype.countRowsByValue = function (fieldName, fieldValue, callback) {
        var table = this.tableName;
        var sql = 'SELECT COUNT(*) FROM `' + table + '` WHERE ?? = ?';
        var values = [fieldName, fieldValue];
        sql = mysql.format(sql, values);
        this.pool.getConnection(getConnectionCallback);
        var connection = null;
        function getConnectionCallback(err, conn) {
            if (err) {
                callback(err, null);
            }
            else {
                connection = conn;
                connection.query(sql, queryCallback);
            }
        }
        function queryCallback(err, result) {
            if (err) {
                connection.release();
                callback(err, null);
            }
            else {
                connection.release();
                callback(null, result[0]['COUNT(*)']);
            }
        }
    };
    TableGateway.prototype.timestampCreatedColumn = function (obj) {
        if (this.createdColumnName.length > 0) {
            var date = new Date();
            obj[this.createdColumnName] = TableGateway.mySqlDatetimeString(date);
        }
        return obj;
    };
    TableGateway.prototype.timestampUpdatedColumn = function (obj) {
        if (this.updatedColumnName.length > 0) {
            var date = new Date();
            obj[this.updatedColumnName] = TableGateway.mySqlDatetimeString(date);
        }
        return obj;
    };
    TableGateway.getPlaceholders = function (obj) {
        var keys = Object.keys(obj);
        var placeholders = [];
        for (var i = 0; i < keys.length; i++) {
            placeholders.push('?');
        }
        var placeholdersString = placeholders.join(', ');
        return placeholdersString;
    };
    TableGateway.getColumnNames = function (obj) {
        var keys = Object.keys(obj);
        var columnNames = [];
        for (var i = 0; i < keys.length; i++) {
            columnNames.push('`' + keys[i] + '`');
        }
        var colNamesString = columnNames.join(', ');
        return colNamesString;
    };
    TableGateway.mySqlDatetimeString = function (date) {
        return MySQLDateTimeFormatter.format(date);
    };
    TableGateway.getParameterizedValues = function (obj) {
        var keys = Object.keys(obj);
        var parameters = [];
        for (var i = 0; i < keys.length; i++) {
            parameters.push('`' + keys[i] + '`=?');
        }
        var paramsString = parameters.join(', ');
        return paramsString;
    };
    TableGateway.getObjectValues = function (obj) {
        var keys = Object.keys(obj);
        var results = [];
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            results.push(obj[key]);
        }
        return results;
    };
    return TableGateway;
}());
module.exports = TableGateway;

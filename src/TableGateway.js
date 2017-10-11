"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql");
var MySQLDateTimeFormatter_1 = require("./MySQLDateTimeFormatter");
var TableGateway = (function () {
    function TableGateway(connectionPool, tableName, primaryKey) {
        if (primaryKey === void 0) { primaryKey = 'id'; }
        this._createdColumnName = '';
        this._updatedColumnName = '';
        this._pool = connectionPool;
        this._tableName = tableName;
        this._primaryKey = primaryKey;
    }
    TableGateway.prototype.setCreatedColumnName = function (value) {
        this._createdColumnName = value;
    };
    TableGateway.prototype.setUpdatedColumnName = function (value) {
        this._updatedColumnName = value;
    };
    TableGateway.prototype.createRow = function (obj, callback) {
        var tableName = this._tableName;
        var primaryKey = this._primaryKey;
        delete obj[primaryKey];
        // noinspection AssignmentToFunctionParameterJS
        obj = this.timestampCreatedColumn(obj);
        // noinspection AssignmentToFunctionParameterJS
        obj = this.timestampUpdatedColumn(obj);
        var columnNames = TableGateway.getColumnNames(obj);
        var placeholders = TableGateway.getPlaceholders(obj);
        var sql = "INSERT INTO " + tableName + " ( " + columnNames + " ) VALUES ( " + placeholders + " )";
        var values = TableGateway.getObjectValues(obj);
        sql = mysql.format(sql, values);
        var connection = null;
        this._pool.getConnection(performQuery);
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
        var tableName = this._tableName;
        var primaryKey = this._primaryKey;
        var sql = 'SELECT * FROM ' + tableName + ' WHERE `' + primaryKey + '`=' + id + ' LIMIT 1';
        var connection = null;
        this._pool.getConnection(performQuery);
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
        var tableName = this._tableName;
        var primaryKeyName = this._primaryKey;
        var primaryKeyValue = row[primaryKeyName];
        delete row[primaryKeyName];
        // noinspection AssignmentToFunctionParameterJS
        row = this.timestampUpdatedColumn(row);
        var params = TableGateway.getParameterizedValues(row);
        var sql = 'UPDATE ' + tableName
            + ' SET ' + params
            + ' WHERE `' + primaryKeyName + '`=' + primaryKeyValue;
        var values = TableGateway.getObjectValues(row);
        sql = mysql.format(sql, values);
        var connection = null;
        this._pool.getConnection(performQuery);
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
        var tableName = this._tableName;
        var primaryKey = this._primaryKey;
        var sql = 'DELETE FROM `' + tableName + '` WHERE `' + primaryKey + '`=' + id;
        var connection = null;
        this._pool.getConnection(performQuery);
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
        var tableName = this._tableName;
        var sql = 'SELECT * FROM `' + tableName + '` WHERE ??=?';
        var values = [fieldName, fieldValue];
        sql = mysql.format(sql, values);
        var connection = null;
        this._pool.getConnection(performQuery);
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
        var table = this._tableName;
        var primaryKey = this._primaryKey;
        for (var i = 0; i < ids.length; i++) {
            // Ensure the ids are all integers.
            ids[i] = Math.floor(ids[i]);
        }
        var idsString = ids.join(', ');
        var sql = 'SELECT * FROM `' + table + '` WHERE `'
            + primaryKey + '` IN (' + idsString + ') ORDER BY `' + primaryKey + '`';
        var connection = null;
        this._pool.getConnection(performQuery);
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
        var table = this._tableName;
        var sql = 'SELECT * FROM `' + table + '` WHERE `' + fieldName + '` IS NULL ORDER BY '
            + this._primaryKey;
        var connection = null;
        this._pool.getConnection(performQuery);
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
        var table = this._tableName;
        var sql = 'SELECT * FROM `' + table + '` WHERE ?? <> ?';
        var values = [fieldName, fieldValue];
        sql = mysql.format(sql, values);
        var connection = null;
        this._pool.getConnection(performQuery);
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
        var table = this._tableName;
        var sql = 'UPDATE `' + table + '` SET ?? = NULL WHERE ?? = ?';
        var values = [fieldName, fieldName, fieldValue];
        sql = mysql.format(sql, values);
        var connection = null;
        this._pool.getConnection(performQuery);
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
        var table = this._tableName;
        var sql = 'DELETE FROM `' + table + '` WHERE ?? = ?';
        var values = [fieldName, fieldValue];
        sql = mysql.format(sql, values);
        var connection = null;
        this._pool.getConnection(getConnectionCallback);
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
        var table = this._tableName;
        var sql = 'SELECT COUNT(*) FROM `' + table + '` WHERE ?? = ?';
        var values = [fieldName, fieldValue];
        sql = mysql.format(sql, values);
        this._pool.getConnection(getConnectionCallback);
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
        if (this._createdColumnName.length > 0) {
            var date = new Date();
            obj[this._createdColumnName] = TableGateway.mySqlDatetimeString(date);
        }
        return obj;
    };
    TableGateway.prototype.timestampUpdatedColumn = function (obj) {
        if (this._updatedColumnName.length > 0) {
            var date = new Date();
            obj[this._updatedColumnName] = TableGateway.mySqlDatetimeString(date);
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
        return MySQLDateTimeFormatter_1.MySQLDateTimeFormatter.format(date);
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
exports.TableGateway = TableGateway;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFibGVHYXRld2F5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiVGFibGVHYXRld2F5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQWdDO0FBRWhDLG1FQUFrRTtBQUdsRTtJQU9JLHNCQUFZLGNBQXFCLEVBQUUsU0FBaUIsRUFBRSxVQUFpQjtRQUFqQiwyQkFBQSxFQUFBLGlCQUFpQjtRQUgvRCx1QkFBa0IsR0FBRyxFQUFFLENBQUM7UUFDeEIsdUJBQWtCLEdBQUcsRUFBRSxDQUFDO1FBRzVCLElBQUksQ0FBQyxLQUFLLEdBQUcsY0FBYyxDQUFDO1FBQzVCLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzVCLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO0lBQ2xDLENBQUM7SUFFTSwyQ0FBb0IsR0FBM0IsVUFBNEIsS0FBYTtRQUNyQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO0lBQ3BDLENBQUM7SUFFTSwyQ0FBb0IsR0FBM0IsVUFBNEIsS0FBYTtRQUNyQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO0lBQ3BDLENBQUM7SUFFTSxnQ0FBUyxHQUFoQixVQUFpQixHQUFRLEVBQUUsUUFBZ0Q7UUFDdkUsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUNoQyxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ2xDLE9BQU8sR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRXZCLCtDQUErQztRQUMvQyxHQUFHLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZDLCtDQUErQztRQUMvQyxHQUFHLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXZDLElBQUksV0FBVyxHQUFHLFlBQVksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkQsSUFBSSxZQUFZLEdBQUcs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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql");
var MySqlDate_1 = require("@joefallon/mysql-date/src/MySqlDate");
var JoinTableGateway = /** @class */ (function () {
    function JoinTableGateway(connectionPool, tableName, id1Name, id2Name) {
        this._createdColumnName = '';
        this._pool = connectionPool;
        this._tableName = tableName;
        this._id1Name = id1Name;
        this._id2Name = id2Name;
    }
    JoinTableGateway.prototype.setCreatedColumnName = function (value) {
        this._createdColumnName = value;
    };
    JoinTableGateway.prototype.createRow = function (id1, id2, callback) {
        var tableName = this._tableName;
        var id1Name = this._id1Name;
        var id2Name = this._id2Name;
        var createdName = this._createdColumnName;
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
        var sql = 'SELECT * FROM ' + this._tableName
            + ' WHERE ' + this._id1Name + '=? AND ' + this._id2Name + '=? LIMIT 1';
        var values = [id1, id2];
        sql = mysql.format(sql, values);
        var connection = null;
        this._pool.getConnection(getConnectionCallback);
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
        var tableName = this._tableName;
        var id1Name = this._id1Name;
        var id2Name = this._id2Name;
        var sql = 'DELETE FROM `' + tableName
            + '` WHERE `' + id1Name + '`=? and `' + id2Name + '`=?';
        var values = [id1, id2];
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
    JoinTableGateway.prototype.retrieveById = function (idName, idValue, callback) {
        var tableName = this._tableName;
        var sql = 'SELECT * FROM `' + tableName + '` where `' + idName + '`=?';
        sql = mysql.format(sql, [idValue]);
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
                callback(null, result);
            }
        }
    };
    JoinTableGateway.prototype.deleteById = function (idName, idValue, callback) {
        var tableName = this._tableName;
        var sql = 'DELETE FROM `' + tableName + '` where `' + idName + '`=?';
        sql = mysql.format(sql, [idValue]);
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
    JoinTableGateway.mySqlDatetimeString = function (date) {
        return MySqlDate_1.MySqlDate.toMySqlDate(date);
    };
    return JoinTableGateway;
}());
exports.JoinTableGateway = JoinTableGateway;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSm9pblRhYmxlR2F0ZXdheS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkpvaW5UYWJsZUdhdGV3YXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2QkFBZ0M7QUFFaEMsaUVBQWdFO0FBRWhFO0lBT0ksMEJBQVksY0FBb0IsRUFBRSxTQUFpQixFQUFFLE9BQWUsRUFBRSxPQUFlO1FBRjdFLHVCQUFrQixHQUFHLEVBQUUsQ0FBQztRQUc1QixJQUFJLENBQUMsS0FBSyxHQUFHLGNBQWMsQ0FBQztRQUM1QixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztJQUM1QixDQUFDO0lBRU0sK0NBQW9CLEdBQTNCLFVBQTRCLEtBQWE7UUFDckMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztJQUNwQyxDQUFDO0lBRU0sb0NBQVMsR0FBaEIsVUFBaUIsR0FBUSxFQUFFLEdBQVEsRUFBRSxRQUFrRDtRQUNuRixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ2hDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDNUIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUM1QixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUM7UUFDMUMsSUFBSSxPQUFPLEdBQUcsZ0JBQWdCLENBQUMsbUJBQW1CLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQy9ELElBQUksV0FBVyxHQUFHLE1BQUssT0FBTyxZQUFTLE9BQU8sTUFBSSxDQUFDO1FBQ25ELElBQUksWUFBWSxHQUFHLE1BQU0sQ0FBQztRQUMxQixJQUFJLE1BQU0sR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUV4QixFQUFFLENBQUEsQ0FBQyxXQUFX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
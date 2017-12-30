"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var mysql = require("mysql");
var MySqlDate_1 = require("@joefallon/mysql-date/src/MySqlDate");
var Util_1 = require("./Util");
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
    /**
     * @param id1
     * @param id2
     * @returns {Promise<boolean>} Returns a promise containing true on success and false on failure.
     */
    JoinTableGateway.prototype.createRowWithPromise = function (id1, id2) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.createRow(id1, id2, function (err, isSuccess) {
                    if (err) {
                        return reject(err);
                    }
                    resolve(isSuccess);
                });
                return [2 /*return*/];
            });
        }); });
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
                    var row = Util_1.Util.shallowClone(result[0]); // prevents mysql from modifying source object
                    callback(null, row);
                }
                else {
                    callback(null, null);
                }
            }
        }
    };
    /**
     * @param id1
     * @param id2
     * @returns {Promise<any>} Returns a promise containing the retrieved row if it exists.
     */
    JoinTableGateway.prototype.retrieveRowWithPromise = function (id1, id2) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.retrieveRow(id1, id2, function (err, row) {
                    if (err) {
                        return reject(err);
                    }
                    resolve(row);
                });
                return [2 /*return*/];
            });
        }); });
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
    /**
     * @param id1
     * @param id2
     * @returns {Promise<number>} Returns a promise containing the number of affected rows (i.e. 0 or 1).
     */
    JoinTableGateway.prototype.deleteRowWithPromise = function (id1, id2) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.deleteRow(id1, id2, function (err, affectedRows) {
                    if (err) {
                        return reject(err);
                    }
                    resolve(affectedRows);
                });
                return [2 /*return*/];
            });
        }); });
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
                var rows = Util_1.Util.shallowCloneArray(result);
                callback(null, rows);
            }
        }
    };
    /**
     * @param {string} idName
     * @param idValue
     * @returns {Promise<any[]>} Returns a promise containing the retrieved rows.
     */
    JoinTableGateway.prototype.retrieveByIdWithPromise = function (idName, idValue) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.retrieveById(idName, idValue, function (err, rows) {
                    if (err) {
                        return reject(err);
                    }
                    resolve(rows);
                });
                return [2 /*return*/];
            });
        }); });
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
    /**
     * @param {string} idName
     * @param idValue
     * @returns {Promise<number>} Returns a promise containing the number of affected rows.
     */
    JoinTableGateway.prototype.deleteByIdWithPromise = function (idName, idValue) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.deleteById(idName, idValue, function (err, affectedRows) {
                    if (err) {
                        return reject(err);
                    }
                    resolve(affectedRows);
                });
                return [2 /*return*/];
            });
        }); });
    };
    JoinTableGateway.mySqlDatetimeString = function (date) {
        return MySqlDate_1.MySqlDate.toMySqlDate(date);
    };
    return JoinTableGateway;
}());
exports.JoinTableGateway = JoinTableGateway;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSm9pblRhYmxlR2F0ZXdheS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkpvaW5UYWJsZUdhdGV3YXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkJBQWdDO0FBRWhDLGlFQUFnRTtBQUVoRSwrQkFBOEI7QUFFOUI7SUFPSSwwQkFBWSxjQUFvQixFQUFFLFNBQWlCLEVBQUUsT0FBZSxFQUFFLE9BQWU7UUFGN0UsdUJBQWtCLEdBQUcsRUFBRSxDQUFDO1FBRzVCLElBQUksQ0FBQyxLQUFLLEdBQUcsY0FBYyxDQUFDO1FBQzVCLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO0lBQzVCLENBQUM7SUFFTSwrQ0FBb0IsR0FBM0IsVUFBNEIsS0FBYTtRQUNyQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO0lBQ3BDLENBQUM7SUFFTSxvQ0FBUyxHQUFoQixVQUFpQixHQUFRLEVBQUUsR0FBUSxFQUFFLFFBQWtEO1FBQ25GLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDaEMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUM1QixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzVCLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztRQUMxQyxJQUFJLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7UUFDL0QsSUFBSSxXQUFXLEdBQUcsTUFBSyxPQUFPLFlBQVMsT0FBTyxNQUFJLENBQUM7UUFDbkQsSUFBSSxZQUFZLEdBQUcsTUFBTSxDQUFDO1FBQzFCLElBQUksTUFBTSxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRXhCLEVBQUUs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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var mysql = require("mysql");
var MySqlDate_1 = require("@joefallon/mysql-date/src/MySqlDate");
var Util_1 = require("./Util");
var TableGateway = /** @class */ (function () {
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
    TableGateway.prototype.createRow = function (row, callback) {
        row = Util_1.Util.shallowClone(row); // prevents mysql from modifying source object
        var tableName = this._tableName;
        var primaryKey = this._primaryKey;
        delete row[primaryKey];
        // noinspection AssignmentToFunctionParameterJS
        row = this.timestampCreatedColumn(row);
        // noinspection AssignmentToFunctionParameterJS
        row = this.timestampUpdatedColumn(row);
        var columnNames = TableGateway.getColumnNames(row);
        var placeholders = TableGateway.getPlaceholders(row);
        var sql = "INSERT INTO " + tableName + " ( " + columnNames + " ) VALUES ( " + placeholders + " )";
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
    /**
     * Creates the row in the database.
     *
     * @param row
     * @returns {Promise<number>} Returns a promise containing the insert ID of the row.
     */
    TableGateway.prototype.createRowWithPromise = function (row) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.createRow(row, function (err, insertId) {
                    if (err) {
                        return reject(err);
                    }
                    resolve(insertId);
                });
                return [2 /*return*/];
            });
        }); });
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
                    var out = Util_1.Util.shallowClone(row[0]); // prevents mysql from modifying source object
                    callback(null, out);
                }
            }
        }
    };
    /**
     * @param {number} id
     * @returns {Promise<any>} Returns a promise containing the retrieved row.
     */
    TableGateway.prototype.retrieveRowWithPromise = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.retrieveRow(id, function (err, row) {
                    if (err) {
                        return reject(err);
                    }
                    resolve(row);
                });
                return [2 /*return*/];
            });
        }); });
    };
    TableGateway.prototype.updateRow = function (row, callback) {
        row = Util_1.Util.shallowClone(row); // prevents mysql from modifying source object
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
    /**
     * @param row
     * @returns {Promise<number>} Returns a promise containing the number of affected rows (i.e. 0 or 1).
     */
    TableGateway.prototype.updateRowWithPromise = function (row) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.updateRow(row, function (err, affectedRows) {
                    if (err) {
                        return reject(err);
                    }
                    resolve(affectedRows);
                });
                return [2 /*return*/];
            });
        }); });
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
    /**
     * @param {number} id
     * @returns {Promise<number>} Returns a promise containing the number of affected rows (i.e. 0 or 1).
     */
    TableGateway.prototype.deleteRowWithPromise = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.deleteRow(id, function (err, affectedRows) {
                    if (err) {
                        return reject(err);
                    }
                    resolve(affectedRows);
                });
                return [2 /*return*/];
            });
        }); });
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
                var out = Util_1.Util.shallowCloneArray(rows);
                callback(null, out);
            }
        }
    };
    /**
     * @param {string} fieldName
     * @param fieldValue
     * @returns {Promise<any[]>} Returns a promise containing the retrieved rows.
     */
    TableGateway.prototype.retrieveRowsByWithPromise = function (fieldName, fieldValue) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.retrieveRowsBy(fieldName, fieldValue, function (err, rows) {
                    if (err) {
                        return reject(err);
                    }
                    resolve(rows);
                });
                return [2 /*return*/];
            });
        }); });
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
                var out = Util_1.Util.shallowCloneArray(rows);
                callback(null, out);
            }
        }
    };
    /**
     * @param {number[]} ids
     * @returns {Promise<any[]>} Returns a promise containing the retrieved rows.
     */
    TableGateway.prototype.retrieveRowsByIdsWithPromise = function (ids) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.retrieveRowsByIds(ids, function (err, rows) {
                    if (err) {
                        return reject(err);
                    }
                    resolve(rows);
                });
                return [2 /*return*/];
            });
        }); });
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
                var out = Util_1.Util.shallowCloneArray(rows);
                callback(null, out);
            }
        }
    };
    /**
     * @param {string} fieldName
     * @returns {Promise<any[]>} Returns a promise containing the retrieved rows.
     */
    TableGateway.prototype.retrieveRowsByIsNullWithPromise = function (fieldName) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.retrieveRowsByIsNull(fieldName, function (err, rows) {
                    if (err) {
                        return reject(err);
                    }
                    resolve(rows);
                });
                return [2 /*return*/];
            });
        }); });
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
                var out = Util_1.Util.shallowCloneArray(rows);
                callback(null, out);
            }
        }
    };
    /**
     * @param {string} fieldName
     * @param fieldValue
     * @returns {Promise<any[]>} Returns a promise containing the retrieved rows.
     */
    TableGateway.prototype.retrieveRowsByNotEqualWithPromise = function (fieldName, fieldValue) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.retrieveRowsByNotEqual(fieldName, fieldValue, function (err, rows) {
                    if (err) {
                        return reject(err);
                    }
                    resolve(rows);
                });
                return [2 /*return*/];
            });
        }); });
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
    /**
     * @param {string} fieldName
     * @param fieldValue
     * @returns {Promise<number>} Returns a promise containing the number of affected rows.
     */
    TableGateway.prototype.setFieldNullWhereWithPromise = function (fieldName, fieldValue) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.setFieldNullWhere(fieldName, fieldValue, function (err, affectedRows) {
                    if (err) {
                        return reject(err);
                    }
                    resolve(affectedRows);
                });
                return [2 /*return*/];
            });
        }); });
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
    /**
     * @param {string} fieldName
     * @param fieldValue
     * @returns {Promise<number>} Returns a promise containing the number of affected rows.
     */
    TableGateway.prototype.deleteRowsByWithPromise = function (fieldName, fieldValue) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.deleteRowsBy(fieldName, fieldValue, function (err, affectedRows) {
                    if (err) {
                        return reject(err);
                    }
                    resolve(affectedRows);
                });
                return [2 /*return*/];
            });
        }); });
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
    /**
     * @param {string} fieldName
     * @param fieldValue
     * @returns {Promise<number>} Returns a promise containing the number of rows with the chosen value.
     */
    TableGateway.prototype.countRowsByValueWithPromise = function (fieldName, fieldValue) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.countRowsByValue(fieldName, fieldValue, function (err, count) {
                    if (err) {
                        return reject(err);
                    }
                    resolve(count);
                });
                return [2 /*return*/];
            });
        }); });
    };
    TableGateway.prototype.timestampCreatedColumn = function (obj) {
        if (this._createdColumnName.length > 0) {
            var date = new Date();
            obj[this._createdColumnName] = MySqlDate_1.MySqlDate.toMySqlDate(date);
        }
        return obj;
    };
    TableGateway.prototype.timestampUpdatedColumn = function (obj) {
        if (this._updatedColumnName.length > 0) {
            var date = new Date();
            obj[this._updatedColumnName] = MySqlDate_1.MySqlDate.toMySqlDate(date);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFibGVHYXRld2F5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiVGFibGVHYXRld2F5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZCQUFnQztBQUVoQyxpRUFBZ0U7QUFFaEUsK0JBQThCO0FBRTlCO0lBT0ksc0JBQVksY0FBb0IsRUFBRSxTQUFpQixFQUFFLFVBQWlCO1FBQWpCLDJCQUFBLEVBQUEsaUJBQWlCO1FBSDlELHVCQUFrQixHQUFHLEVBQUUsQ0FBQztRQUN4Qix1QkFBa0IsR0FBRyxFQUFFLENBQUM7UUFHNUIsSUFBSSxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUM7UUFDNUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFDNUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7SUFDbEMsQ0FBQztJQUVNLDJDQUFvQixHQUEzQixVQUE0QixLQUFhO1FBQ3JDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7SUFDcEMsQ0FBQztJQUVNLDJDQUFvQixHQUEzQixVQUE0QixLQUFhO1FBQ3JDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7SUFDcEMsQ0FBQztJQUVNLGdDQUFTLEdBQWhCLFVBQWlCLEdBQVEsRUFBRSxRQUFnRDtRQUN2RSxHQUFHLEdBQUcsV0FBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLDhDQUE4QztRQUM1RSxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ2hDLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDbEMsT0FBTyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFdkIsK0NBQStDO1FBQy9DLEdBQUcsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdkMsK0NBQStDO1FBQy9DLEdBQUcsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsR0FBRyxDQUFDLENBQUM7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
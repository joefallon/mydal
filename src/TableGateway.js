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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFibGVHYXRld2F5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiVGFibGVHYXRld2F5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZCQUFnQztBQUVoQyxpRUFBZ0U7QUFFaEUsK0JBQThCO0FBRTlCO0lBT0ksc0JBQVksY0FBb0IsRUFBRSxTQUFpQixFQUFFLFVBQWlCO1FBQWpCLDJCQUFBLEVBQUEsaUJBQWlCO1FBSDlELHVCQUFrQixHQUFHLEVBQUUsQ0FBQztRQUN4Qix1QkFBa0IsR0FBRyxFQUFFLENBQUM7UUFHNUIsSUFBSSxDQUFDLEtBQUssR0FBRyxjQUFjLENBQUM7UUFDNUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFDNUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7SUFDbEMsQ0FBQztJQUVNLDJDQUFvQixHQUEzQixVQUE0QixLQUFhO1FBQ3JDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7SUFDcEMsQ0FBQztJQUVNLDJDQUFvQixHQUEzQixVQUE0QixLQUFhO1FBQ3JDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7SUFDcEMsQ0FBQztJQUVNLGdDQUFTLEdBQWhCLFVBQWlCLEdBQVEsRUFBRSxRQUFnRDtRQUN2RSxHQUFHLEdBQUcsV0FBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLDhDQUE4QztRQUM1RSxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ2hDLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDbEMsT0FBTyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFdkIsK0NBQStDO1FBQy9DLEdBQUcsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdkMsK0NBQStDO1FBQy9DLEdBQUcsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFdkMsSUFBSSxXQUFXLEdBQUcsWUFBWSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuRCxJQUFJLFlBQVksR0FBRyxZQUFZLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXJELElBQUksR0FBRyxHQUFHLGlCQUFlLFNBQVMsV0FBTSxXQUFXLG9CQUFlLFlBQVksT0FBSSxDQUFDO1FBQ25GLElBQUksTUFBTSxHQUFHLFlBQVksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDL0MsR0FBRyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRWhDLElBQUksVUFBVSxHQUFtQixJQUFJLENBQUM7UUFDdEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFdkMsc0JBQXNCLEdBQVUsRUFBRSxJQUFvQjtZQUNsRCxFQUFFLENBQUEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNMLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDeEIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLFVBQVUsR0FBRyxJQUFJLENBQUM7Z0JBQ2xCLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLGlCQUFpQixDQUFDLENBQUM7WUFDN0MsQ0FBQztRQUNMLENBQUM7UUFFRCwyQkFBMkIsR0FBVSxFQUFFLE1BQWE7WUFDaEQsRUFBRSxDQUFBLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDTCxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ3JCLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDeEIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDckIsUUFBUSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUN2QyxDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLDJDQUFvQixHQUEzQixVQUE0QixHQUFRO1FBQXBDLGlCQU9DO1FBTkcsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLFVBQU8sT0FBTyxFQUFFLE1BQU07O2dCQUNyQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxVQUFDLEdBQVUsRUFBRSxRQUFnQjtvQkFDN0MsRUFBRSxDQUFBLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUFDLENBQUM7b0JBQy9CLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDdEIsQ0FBQyxDQUFDLENBQUM7OzthQUNOLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSxrQ0FBVyxHQUFsQixVQUFtQixFQUFVLEVBQUUsUUFBMkM7UUFDdEUsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUNoQyxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBRWxDLElBQUksR0FBRyxHQUFHLGdCQUFnQixHQUFHLFNBQVMsR0FBRyxVQUFVLEdBQUcsVUFBVSxHQUFHLElBQUksR0FBRyxFQUFFLEdBQUcsVUFBVSxDQUFDO1FBRTFGLElBQUksVUFBVSxHQUFtQixJQUFJLENBQUM7UUFDdEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFdkMsc0JBQXNCLEdBQVUsRUFBRSxJQUFvQjtZQUNsRCxFQUFFLENBQUEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNMLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDeEIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLFVBQVUsR0FBRyxJQUFJLENBQUM7Z0JBQ2xCLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLGlCQUFpQixDQUFDLENBQUM7WUFDN0MsQ0FBQztRQUNMLENBQUM7UUFFRCwyQkFBMkIsR0FBVSxFQUFFLEdBQVU7WUFDN0MsRUFBRSxDQUFBLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDTCxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ3JCLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDeEIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFFckIsRUFBRSxDQUFBLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNqQixRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUN6QixDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLElBQU0sR0FBRyxHQUFHLFdBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyw4Q0FBOEM7b0JBQ3JGLFFBQVEsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ3hCLENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUM7SUFFRDs7O09BR0c7SUFDSSw2Q0FBc0IsR0FBN0IsVUFBOEIsRUFBVTtRQUF4QyxpQkFPQztRQU5HLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxVQUFPLE9BQU8sRUFBRSxNQUFNOztnQkFDckMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsVUFBQyxHQUFVLEVBQUUsR0FBVztvQkFDekMsRUFBRSxDQUFBLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUFDLENBQUM7b0JBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDakIsQ0FBQyxDQUFDLENBQUM7OzthQUNOLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSxnQ0FBUyxHQUFoQixVQUFpQixHQUFRLEVBQUUsUUFBb0Q7UUFDM0UsR0FBRyxHQUFHLFdBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyw4Q0FBOEM7UUFDNUUsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUNoQyxJQUFJLGNBQWMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3RDLElBQUksZUFBZSxHQUFHLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUUxQyxPQUFPLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMzQiwrQ0FBK0M7UUFDL0MsR0FBRyxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2QyxJQUFJLE1BQU0sR0FBRyxZQUFZLENBQUMsc0JBQXNCLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFdEQsSUFBSSxHQUFHLEdBQUcsU0FBUyxHQUFHLFNBQVM7Y0FDekIsT0FBTyxHQUFHLE1BQU07Y0FDaEIsVUFBVSxHQUFHLGNBQWMsR0FBRyxJQUFJLEdBQUcsZUFBZSxDQUFDO1FBQzNELElBQUksTUFBTSxHQUFHLFlBQVksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDL0MsR0FBRyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRWhDLElBQUksVUFBVSxHQUFtQixJQUFJLENBQUM7UUFDdEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFdkMsc0JBQXNCLEdBQVUsRUFBRSxJQUFvQjtZQUNsRCxFQUFFLENBQUEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNMLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDeEIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLFVBQVUsR0FBRyxJQUFJLENBQUM7Z0JBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLGlCQUFpQixDQUFDLENBQUM7WUFDdkMsQ0FBQztRQUNMLENBQUM7UUFFRCwyQkFBMkIsR0FBVSxFQUFFLE1BQWE7WUFDaEQsRUFBRSxDQUFBLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDTCxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ3JCLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDeEIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDckIsUUFBUSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUMzQyxDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUM7SUFFRDs7O09BR0c7SUFDSSwyQ0FBb0IsR0FBM0IsVUFBNEIsR0FBUTtRQUFwQyxpQkFPQztRQU5HLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxVQUFPLE9BQU8sRUFBRSxNQUFNOztnQkFDckMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsVUFBQyxHQUFVLEVBQUUsWUFBb0I7b0JBQ2pELEVBQUUsQ0FBQSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFBQyxDQUFDO29CQUMvQixPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQzFCLENBQUMsQ0FBQyxDQUFDOzs7YUFDTixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sZ0NBQVMsR0FBaEIsVUFBaUIsRUFBVSxFQUFFLFFBQW9EO1FBQzdFLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDaEMsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUNsQyxJQUFJLEdBQUcsR0FBRyxlQUFlLEdBQUcsU0FBUyxHQUFHLFdBQVcsR0FBRyxVQUFVLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUU3RSxJQUFJLFVBQVUsR0FBbUIsSUFBSSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRXZDLHNCQUFzQixHQUFVLEVBQUUsSUFBb0I7WUFDbEQsRUFBRSxDQUFBLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDTCxRQUFRLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3hCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixVQUFVLEdBQUcsSUFBSSxDQUFDO2dCQUNsQixVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1lBQzdDLENBQUM7UUFDTCxDQUFDO1FBRUQsMkJBQTJCLEdBQVUsRUFBRSxNQUFhO1lBQ2hELEVBQUUsQ0FBQSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ0wsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNyQixRQUFRLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3hCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ3JCLFFBQVEsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDM0MsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksMkNBQW9CLEdBQTNCLFVBQTRCLEVBQVU7UUFBdEMsaUJBT0M7UUFORyxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsVUFBTyxPQUFPLEVBQUUsTUFBTTs7Z0JBQ3JDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLFVBQUMsR0FBVSxFQUFFLFlBQW9CO29CQUNoRCxFQUFFLENBQUEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQUMsQ0FBQztvQkFDL0IsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUMxQixDQUFDLENBQUMsQ0FBQzs7O2FBQ04sQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLHFDQUFjLEdBQXJCLFVBQXNCLFNBQWlCLEVBQUUsVUFBZSxFQUNsQyxRQUEyQztRQUM3RCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ2hDLElBQUksR0FBRyxHQUFHLGlCQUFpQixHQUFHLFNBQVMsR0FBRyxjQUFjLENBQUM7UUFDekQsSUFBSSxNQUFNLEdBQUcsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDckMsR0FBRyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRWhDLElBQUksVUFBVSxHQUFtQixJQUFJLENBQUM7UUFDdEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFdkMsc0JBQXNCLEdBQVUsRUFBRSxJQUFvQjtZQUNsRCxFQUFFLENBQUEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNMLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDeEIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLFVBQVUsR0FBRyxJQUFJLENBQUM7Z0JBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLGlCQUFpQixDQUFDLENBQUM7WUFDdkMsQ0FBQztRQUNMLENBQUM7UUFFRCwyQkFBMkIsR0FBVSxFQUFFLElBQVc7WUFDOUMsRUFBRSxDQUFBLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDTCxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ3JCLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDeEIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDckIsSUFBTSxHQUFHLEdBQUcsV0FBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN6QyxRQUFRLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3hCLENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxnREFBeUIsR0FBaEMsVUFBaUMsU0FBaUIsRUFBRSxVQUFlO1FBQW5FLGlCQU9DO1FBTkcsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLFVBQU8sT0FBTyxFQUFFLE1BQU07O2dCQUNyQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsVUFBQyxHQUFVLEVBQUUsSUFBVztvQkFDL0QsRUFBRSxDQUFBLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUFDLENBQUM7b0JBQy9CLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbEIsQ0FBQyxDQUFDLENBQUM7OzthQUNOLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSx3Q0FBaUIsR0FBeEIsVUFBeUIsR0FBYSxFQUFFLFFBQTJDO1FBQy9FLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDNUIsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUVsQyxHQUFHLENBQUEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNqQyxtQ0FBbUM7WUFDbkMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEMsQ0FBQztRQUVELElBQUksU0FBUyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0IsSUFBSSxHQUFHLEdBQUcsaUJBQWlCLEdBQUcsS0FBSyxHQUFHLFdBQVc7Y0FDM0MsVUFBVSxHQUFHLFFBQVEsR0FBRyxTQUFTLEdBQUcsY0FBYyxHQUFHLFVBQVUsR0FBRyxHQUFHLENBQUM7UUFFNUUsSUFBSSxVQUFVLEdBQW1CLElBQUksQ0FBQztRQUN0QyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUV2QyxzQkFBc0IsR0FBVSxFQUFFLElBQW9CO1lBQ2xELEVBQUUsQ0FBQSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ0wsUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN4QixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osVUFBVSxHQUFHLElBQUksQ0FBQztnQkFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztZQUN2QyxDQUFDO1FBQ0wsQ0FBQztRQUVELDJCQUEyQixHQUFVLEVBQUUsSUFBVztZQUM5QyxFQUFFLENBQUEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNMLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDckIsUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN4QixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNyQixJQUFNLEdBQUcsR0FBRyxXQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3pDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDeEIsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksbURBQTRCLEdBQW5DLFVBQW9DLEdBQWE7UUFBakQsaUJBT0M7UUFORyxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsVUFBTyxPQUFPLEVBQUUsTUFBTTs7Z0JBQ3JDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsVUFBQyxHQUFVLEVBQUUsSUFBVztvQkFDaEQsRUFBRSxDQUFBLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUFDLENBQUM7b0JBQy9CLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbEIsQ0FBQyxDQUFDLENBQUM7OzthQUNOLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSwyQ0FBb0IsR0FBM0IsVUFBNEIsU0FBaUIsRUFBRSxRQUEyQztRQUN0RixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzVCLElBQUksR0FBRyxHQUFHLGlCQUFpQixHQUFHLEtBQUssR0FBRyxXQUFXLEdBQUcsU0FBUyxHQUFHLHFCQUFxQjtjQUMvRSxJQUFJLENBQUMsV0FBVyxDQUFDO1FBRXZCLElBQUksVUFBVSxHQUFtQixJQUFJLENBQUM7UUFDdEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFdkMsc0JBQXNCLEdBQVUsRUFBRSxJQUFvQjtZQUNsRCxFQUFFLENBQUEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNMLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDeEIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLFVBQVUsR0FBRyxJQUFJLENBQUM7Z0JBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLGlCQUFpQixDQUFDLENBQUM7WUFDdkMsQ0FBQztRQUNMLENBQUM7UUFFRCwyQkFBMkIsR0FBVSxFQUFFLElBQVc7WUFDOUMsRUFBRSxDQUFBLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDTCxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ3JCLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDeEIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDckIsSUFBTSxHQUFHLEdBQUcsV0FBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN6QyxRQUFRLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3hCLENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRztJQUNJLHNEQUErQixHQUF0QyxVQUF1QyxTQUFpQjtRQUF4RCxpQkFPQztRQU5HLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxVQUFPLE9BQU8sRUFBRSxNQUFNOztnQkFDckMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFNBQVMsRUFBRSxVQUFDLEdBQVUsRUFBRSxJQUFXO29CQUN6RCxFQUFFLENBQUEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQUMsQ0FBQztvQkFDL0IsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNsQixDQUFDLENBQUMsQ0FBQzs7O2FBQ04sQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLDZDQUFzQixHQUE3QixVQUE4QixTQUFpQixFQUFFLFVBQWUsRUFDbEMsUUFBMkM7UUFDckUsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUM1QixJQUFJLEdBQUcsR0FBRyxpQkFBaUIsR0FBRyxLQUFLLEdBQUcsaUJBQWlCLENBQUM7UUFDeEQsSUFBSSxNQUFNLEdBQUcsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDckMsR0FBRyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRWhDLElBQUksVUFBVSxHQUFtQixJQUFJLENBQUM7UUFDdEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFdkMsc0JBQXNCLEdBQVUsRUFBRSxJQUFvQjtZQUNsRCxFQUFFLENBQUEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNMLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDeEIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLFVBQVUsR0FBRyxJQUFJLENBQUM7Z0JBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLGlCQUFpQixDQUFDLENBQUM7WUFDdkMsQ0FBQztRQUNMLENBQUM7UUFFRCwyQkFBMkIsR0FBVSxFQUFFLElBQVc7WUFDOUMsRUFBRSxDQUFBLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDTCxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ3JCLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDeEIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDckIsSUFBTSxHQUFHLEdBQUcsV0FBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN6QyxRQUFRLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3hCLENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSx3REFBaUMsR0FBeEMsVUFBeUMsU0FBaUIsRUFBRSxVQUFlO1FBQTNFLGlCQU9DO1FBTkcsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLFVBQU8sT0FBTyxFQUFFLE1BQU07O2dCQUNyQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxVQUFDLEdBQVUsRUFBRSxJQUFXO29CQUN2RSxFQUFFLENBQUEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQUMsQ0FBQztvQkFDL0IsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNsQixDQUFDLENBQUMsQ0FBQzs7O2FBQ04sQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLHdDQUFpQixHQUF4QixVQUF5QixTQUFpQixFQUFFLFVBQWUsRUFDbEMsUUFBb0Q7UUFDekUsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUM1QixJQUFJLEdBQUcsR0FBRyxVQUFVLEdBQUcsS0FBSyxHQUFHLDhCQUE4QixDQUFDO1FBQzlELElBQUksTUFBTSxHQUFHLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNoRCxHQUFHLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFaEMsSUFBSSxVQUFVLEdBQW1CLElBQUksQ0FBQztRQUN0QyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUV2QyxzQkFBc0IsR0FBVSxFQUFFLElBQW9CO1lBQ2xELEVBQUUsQ0FBQSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ0wsUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN4QixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osVUFBVSxHQUFHLElBQUksQ0FBQztnQkFDbEIsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztZQUM3QyxDQUFDO1FBQ0wsQ0FBQztRQUVELDJCQUEyQixHQUFVLEVBQUUsTUFBYTtZQUNoRCxFQUFFLENBQUEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNMLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDckIsUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN4QixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNyQixRQUFRLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQzNDLENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxtREFBNEIsR0FBbkMsVUFBb0MsU0FBaUIsRUFBRSxVQUFlO1FBQXRFLGlCQU9DO1FBTkcsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLFVBQU8sT0FBTyxFQUFFLE1BQU07O2dCQUNyQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxVQUFDLEdBQVUsRUFBRSxZQUFvQjtvQkFDM0UsRUFBRSxDQUFBLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUFDLENBQUM7b0JBQy9CLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDMUIsQ0FBQyxDQUFDLENBQUM7OzthQUNOLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSxtQ0FBWSxHQUFuQixVQUFvQixTQUFpQixFQUFFLFVBQWUsRUFDbEMsUUFBb0Q7UUFDcEUsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUM1QixJQUFJLEdBQUcsR0FBRyxlQUFlLEdBQUcsS0FBSyxHQUFHLGdCQUFnQixDQUFDO1FBQ3JELElBQUksTUFBTSxHQUFHLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3JDLEdBQUcsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUVoQyxJQUFJLFVBQVUsR0FBbUIsSUFBSSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFFaEQsK0JBQStCLEdBQVUsRUFBRSxJQUFvQjtZQUMzRCxFQUFFLENBQUEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNMLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDeEIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLFVBQVUsR0FBRyxJQUFJLENBQUM7Z0JBQ2xCLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQ3pDLENBQUM7UUFDTCxDQUFDO1FBRUQsdUJBQXVCLEdBQVUsRUFBRSxNQUFhO1lBQzVDLEVBQUUsQ0FBQSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ0wsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNyQixRQUFRLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3hCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ3JCLFFBQVEsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDM0MsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLDhDQUF1QixHQUE5QixVQUErQixTQUFpQixFQUFFLFVBQWU7UUFBakUsaUJBT0M7UUFORyxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsVUFBTyxPQUFPLEVBQUUsTUFBTTs7Z0JBQ3JDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxVQUFDLEdBQVUsRUFBRSxZQUFvQjtvQkFDdEUsRUFBRSxDQUFBLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUFDLENBQUM7b0JBQy9CLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDMUIsQ0FBQyxDQUFDLENBQUM7OzthQUNOLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSx1Q0FBZ0IsR0FBdkIsVUFBd0IsU0FBaUIsRUFBRSxVQUFlLEVBQ2xDLFFBQTZDO1FBQ2pFLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDNUIsSUFBSSxHQUFHLEdBQUcsd0JBQXdCLEdBQUcsS0FBSyxHQUFHLGdCQUFnQixDQUFDO1FBQzlELElBQUksTUFBTSxHQUFHLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3JDLEdBQUcsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUVoQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ2hELElBQUksVUFBVSxHQUFtQixJQUFJLENBQUM7UUFFdEMsK0JBQStCLEdBQVUsRUFBRSxJQUFvQjtZQUMzRCxFQUFFLENBQUEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNMLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDeEIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLFVBQVUsR0FBRyxJQUFJLENBQUM7Z0JBQ2xCLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQ3pDLENBQUM7UUFDTCxDQUFDO1FBRUQsdUJBQXVCLEdBQVUsRUFBRSxNQUFhO1lBQzVDLEVBQUUsQ0FBQSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ0wsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNyQixRQUFRLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3hCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ3JCLFFBQVEsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDMUMsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLGtEQUEyQixHQUFsQyxVQUFtQyxTQUFpQixFQUFFLFVBQWU7UUFBckUsaUJBT0M7UUFORyxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsVUFBTyxPQUFPLEVBQUUsTUFBTTs7Z0JBQ3JDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFVBQUMsR0FBVSxFQUFFLEtBQWE7b0JBQ25FLEVBQUUsQ0FBQSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFBQyxDQUFDO29CQUMvQixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ25CLENBQUMsQ0FBQyxDQUFDOzs7YUFDTixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU8sNkNBQXNCLEdBQTlCLFVBQStCLEdBQVc7UUFDdEMsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7WUFDdEIsR0FBRyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLHFCQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9ELENBQUM7UUFFRCxNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVPLDZDQUFzQixHQUE5QixVQUErQixHQUFXO1FBQ3RDLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQyxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ3RCLEdBQUcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxxQkFBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvRCxDQUFDO1FBRUQsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFFYyw0QkFBZSxHQUE5QixVQUErQixHQUFRO1FBQ25DLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUIsSUFBSSxZQUFZLEdBQWEsRUFBRSxDQUFDO1FBRWhDLEdBQUcsQ0FBQSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ2xDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDM0IsQ0FBQztRQUVELElBQUksa0JBQWtCLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVqRCxNQUFNLENBQUMsa0JBQWtCLENBQUM7SUFDOUIsQ0FBQztJQUVjLDJCQUFjLEdBQTdCLFVBQThCLEdBQVE7UUFDbEMsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1QixJQUFJLFdBQVcsR0FBYSxFQUFFLENBQUM7UUFFL0IsR0FBRyxDQUFBLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDbEMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQzFDLENBQUM7UUFFRCxJQUFJLGNBQWMsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTVDLE1BQU0sQ0FBQyxjQUFjLENBQUM7SUFDMUIsQ0FBQztJQUVjLG1DQUFzQixHQUFyQyxVQUFzQyxHQUFRO1FBQzFDLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUIsSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBRXBCLEdBQUcsQ0FBQSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ2xDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQztRQUMzQyxDQUFDO1FBRUQsSUFBSSxZQUFZLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV6QyxNQUFNLENBQUMsWUFBWSxDQUFDO0lBQ3hCLENBQUM7SUFFYyw0QkFBZSxHQUE5QixVQUErQixHQUFXO1FBQ3RDLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUIsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBRWpCLEdBQUcsQ0FBQSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ2xDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQixPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzNCLENBQUM7UUFFRCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFDTCxtQkFBQztBQUFELENBQUMsQUF6bEJELElBeWxCQztBQXpsQlksb0NBQVkifQ==
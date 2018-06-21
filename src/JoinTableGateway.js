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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSm9pblRhYmxlR2F0ZXdheS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkpvaW5UYWJsZUdhdGV3YXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkJBQWdDO0FBRWhDLGlFQUFnRTtBQUVoRSwrQkFBOEI7QUFFOUI7SUFPSSwwQkFBWSxjQUFvQixFQUFFLFNBQWlCLEVBQUUsT0FBZSxFQUFFLE9BQWU7UUFGN0UsdUJBQWtCLEdBQUcsRUFBRSxDQUFDO1FBRzVCLElBQUksQ0FBQyxLQUFLLEdBQUcsY0FBYyxDQUFDO1FBQzVCLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO0lBQzVCLENBQUM7SUFFTSwrQ0FBb0IsR0FBM0IsVUFBNEIsS0FBYTtRQUNyQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO0lBQ3BDLENBQUM7SUFFTSxvQ0FBUyxHQUFoQixVQUFpQixHQUFRLEVBQUUsR0FBUSxFQUFFLFFBQWtEO1FBQ25GLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDaEMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUM1QixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzVCLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztRQUMxQyxJQUFJLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7UUFDL0QsSUFBSSxXQUFXLEdBQUcsTUFBSyxPQUFPLFlBQVMsT0FBTyxNQUFJLENBQUM7UUFDbkQsSUFBSSxZQUFZLEdBQUcsTUFBTSxDQUFDO1FBQzFCLElBQUksTUFBTSxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRXhCLElBQUcsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDdkIsV0FBVyxJQUFJLFFBQU8sV0FBVyxNQUFJLENBQUM7WUFDdEMsWUFBWSxJQUFJLEtBQUssQ0FBQztZQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3hCO1FBRUQsSUFBSSxHQUFHLEdBQUcsaUJBQWUsU0FBUyxXQUFNLFdBQVcsb0JBQWUsWUFBWSxPQUFJLENBQUM7UUFDbkYsR0FBRyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRWhDLElBQUksVUFBVSxHQUFtQixJQUFJLENBQUM7UUFDdEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFdkMsc0JBQXNCLEdBQVUsRUFBRSxJQUFvQjtZQUNsRCxJQUFHLEdBQUcsRUFBRTtnQkFDSixRQUFRLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ3ZCO2lCQUFNO2dCQUNILFVBQVUsR0FBRyxJQUFJLENBQUM7Z0JBQ2xCLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLGlCQUFpQixDQUFDLENBQUM7YUFDNUM7UUFDTCxDQUFDO1FBRUQsMkJBQTJCLEdBQVUsRUFBRSxNQUFhO1lBQ2hELElBQUcsR0FBRyxFQUFFO2dCQUNKLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDckIsUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUN2QjtpQkFBTTtnQkFDSCxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBRXJCLElBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDNUIsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztpQkFDeEI7cUJBQU07b0JBQ0gsUUFBUSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztpQkFDekI7YUFDSjtRQUNMLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLCtDQUFvQixHQUEzQixVQUE0QixHQUFRLEVBQUUsR0FBUTtRQUE5QyxpQkFPQztRQU5HLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBTyxPQUFPLEVBQUUsTUFBTTs7Z0JBQ3JDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBRSxVQUFDLEdBQVUsRUFBRSxTQUFrQjtvQkFDbkQsSUFBRyxHQUFHLEVBQUU7d0JBQUUsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQUU7b0JBQy9CLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDdkIsQ0FBQyxDQUFDLENBQUM7OzthQUNOLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSxzQ0FBVyxHQUFsQixVQUFtQixHQUFRLEVBQUUsR0FBUSxFQUFFLFFBQXdDO1FBQzNFLElBQUksR0FBRyxHQUFHLGdCQUFnQixHQUFHLElBQUksQ0FBQyxVQUFVO2NBQ2xDLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBQztRQUMvRSxJQUFJLE1BQU0sR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN4QixHQUFHLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFaEMsSUFBSSxVQUFVLEdBQWtCLElBQUksQ0FBQztRQUNyQyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBRWhELCtCQUErQixHQUFVLEVBQUUsSUFBb0I7WUFDM0QsSUFBRyxHQUFHLEVBQUU7Z0JBQ0osUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUN2QjtpQkFBTTtnQkFDSCxVQUFVLEdBQUcsSUFBSSxDQUFDO2dCQUNsQixVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO2FBQzVDO1FBQ0wsQ0FBQztRQUVELDJCQUEyQixHQUFVLEVBQUUsTUFBYTtZQUNoRCxJQUFHLEdBQUcsRUFBRTtnQkFDSixVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ3JCLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDdkI7aUJBQU07Z0JBQ0gsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUVyQixJQUFHLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUNsQixJQUFNLEdBQUcsR0FBRyxXQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsOENBQThDO29CQUN4RixRQUFRLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2lCQUN2QjtxQkFBTTtvQkFDSCxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUN4QjthQUNKO1FBQ0wsQ0FBQztJQUNMLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksaURBQXNCLEdBQTdCLFVBQThCLEdBQVEsRUFBRSxHQUFRO1FBQWhELGlCQU9DO1FBTkcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFPLE9BQU8sRUFBRSxNQUFNOztnQkFDckMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLFVBQUMsR0FBVSxFQUFFLEdBQVE7b0JBQzVDLElBQUcsR0FBRyxFQUFFO3dCQUFFLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FCQUFFO29CQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2pCLENBQUMsQ0FBQyxDQUFDOzs7YUFDTixDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU0sb0NBQVMsR0FBaEIsVUFBaUIsR0FBUSxFQUFFLEdBQVEsRUFBRSxRQUFvRDtRQUNyRixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ2hDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDNUIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUU1QixJQUFJLEdBQUcsR0FBRyxlQUFlLEdBQUcsU0FBUztjQUMvQixXQUFXLEdBQUcsT0FBTyxHQUFHLFdBQVcsR0FBRyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQzVELElBQUksTUFBTSxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCLEdBQUcsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUVoQyxJQUFJLFVBQVUsR0FBa0IsSUFBSSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRXZDLHNCQUFzQixHQUFVLEVBQUUsSUFBb0I7WUFDbEQsSUFBRyxHQUFHLEVBQUU7Z0JBQ0osUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUN2QjtpQkFBTTtnQkFDSCxVQUFVLEdBQUcsSUFBSSxDQUFDO2dCQUNsQixVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO2FBQzVDO1FBQ0wsQ0FBQztRQUVELDJCQUEyQixHQUFVLEVBQUUsTUFBYTtZQUNoRCxJQUFHLEdBQUcsRUFBRTtnQkFDSixVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ3JCLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDdkI7aUJBQU07Z0JBQ0gsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNyQixRQUFRLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO2FBQzFDO1FBQ0wsQ0FBQztJQUNMLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksK0NBQW9CLEdBQTNCLFVBQTRCLEdBQVEsRUFBRSxHQUFRO1FBQTlDLGlCQU9DO1FBTkcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFPLE9BQU8sRUFBRSxNQUFNOztnQkFDckMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLFVBQUMsR0FBVSxFQUFFLFlBQW9CO29CQUN0RCxJQUFHLEdBQUcsRUFBRTt3QkFBRSxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztxQkFBRTtvQkFDL0IsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUMxQixDQUFDLENBQUMsQ0FBQzs7O2FBQ04sQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUdNLHVDQUFZLEdBQW5CLFVBQW9CLE1BQWMsRUFBRSxPQUFZLEVBQUUsUUFBMkM7UUFDekYsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUNoQyxJQUFJLEdBQUcsR0FBRyxpQkFBaUIsR0FBRyxTQUFTLEdBQUcsV0FBVyxHQUFHLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDdkUsR0FBRyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUVuQyxJQUFJLFVBQVUsR0FBa0IsSUFBSSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRXZDLHNCQUFzQixHQUFVLEVBQUUsSUFBb0I7WUFDbEQsSUFBRyxHQUFHLEVBQUU7Z0JBQ0osUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUN2QjtpQkFBTTtnQkFDSCxVQUFVLEdBQUcsSUFBSSxDQUFDO2dCQUNsQixVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO2FBQzVDO1FBQ0wsQ0FBQztRQUVELDJCQUEyQixHQUFVLEVBQUUsTUFBYTtZQUNoRCxJQUFHLEdBQUcsRUFBRTtnQkFDSixVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ3JCLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDdkI7aUJBQU07Z0JBQ0gsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNyQixJQUFNLElBQUksR0FBRyxXQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzVDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDeEI7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxrREFBdUIsR0FBOUIsVUFBK0IsTUFBYyxFQUFFLE9BQVk7UUFBM0QsaUJBT0M7UUFORyxPQUFPLElBQUksT0FBTyxDQUFDLFVBQU8sT0FBTyxFQUFFLE1BQU07O2dCQUNyQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsVUFBQyxHQUFVLEVBQUUsSUFBVztvQkFDdkQsSUFBRyxHQUFHLEVBQUU7d0JBQUUsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQUU7b0JBQy9CLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDbEIsQ0FBQyxDQUFDLENBQUM7OzthQUNOLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSxxQ0FBVSxHQUFqQixVQUFrQixNQUFjLEVBQUUsT0FBWSxFQUM1QixRQUFvRDtRQUNsRSxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ2hDLElBQUksR0FBRyxHQUFHLGVBQWUsR0FBRyxTQUFTLEdBQUcsV0FBVyxHQUFHLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDckUsR0FBRyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUVuQyxJQUFJLFVBQVUsR0FBa0IsSUFBSSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRXZDLHNCQUFzQixHQUFVLEVBQUUsSUFBb0I7WUFDbEQsSUFBRyxHQUFHLEVBQUU7Z0JBQ0osUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUN2QjtpQkFBTTtnQkFDSCxVQUFVLEdBQUcsSUFBSSxDQUFDO2dCQUNsQixVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO2FBQzVDO1FBQ0wsQ0FBQztRQUVELDJCQUEyQixHQUFVLEVBQUUsTUFBYTtZQUNoRCxJQUFHLEdBQUcsRUFBRTtnQkFDSixVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ3JCLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDdkI7aUJBQU07Z0JBQ0gsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNyQixRQUFRLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO2FBQzFDO1FBQ0wsQ0FBQztJQUNMLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksZ0RBQXFCLEdBQTVCLFVBQTZCLE1BQWMsRUFBRSxPQUFZO1FBQXpELGlCQU9DO1FBTkcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFPLE9BQU8sRUFBRSxNQUFNOztnQkFDckMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLFVBQUMsR0FBVSxFQUFFLFlBQW9CO29CQUM5RCxJQUFHLEdBQUcsRUFBRTt3QkFBRSxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztxQkFBRTtvQkFDL0IsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUMxQixDQUFDLENBQUMsQ0FBQzs7O2FBQ04sQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVjLG9DQUFtQixHQUFsQyxVQUFtQyxJQUFVO1FBQ3pDLE9BQU8scUJBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUNMLHVCQUFDO0FBQUQsQ0FBQyxBQXpRRCxJQXlRQztBQXpRWSw0Q0FBZ0IifQ==
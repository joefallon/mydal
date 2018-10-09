"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mysql = require("mysql");
const MySqlDate_1 = require("@joefallon/mysql-date/src/MySqlDate");
const Util_1 = require("./Util");
class TableGateway {
    constructor(connectionPool, tableName, primaryKey = 'id') {
        this._createdColumnName = '';
        this._updatedColumnName = '';
        this._pool = connectionPool;
        this._tableName = tableName;
        this._primaryKey = primaryKey;
    }
    setCreatedColumnName(value) {
        this._createdColumnName = value;
    }
    setUpdatedColumnName(value) {
        this._updatedColumnName = value;
    }
    /**
     * Creates the row in the database.
     *
     * @returns Returns the inserted ID of the row.
     */
    createRow(row) {
        return new Promise((resolve, reject) => {
            row = Util_1.Util.shallowClone(row); // prevents mysql from modifying source object
            const tableName = this._tableName;
            const primaryKey = this._primaryKey;
            delete row[primaryKey];
            row = this.timestampCreatedColumn(row);
            row = this.timestampUpdatedColumn(row);
            const columnNames = TableGateway.getColumnNames(row);
            const placeholders = TableGateway.getPlaceholders(row);
            let sql = `INSERT INTO ${tableName} ( ${columnNames} ) VALUES ( ${placeholders} )`;
            const values = TableGateway.getObjectValues(row);
            sql = mysql.format(sql, values);
            let connection = null;
            this._pool.getConnection(performQuery);
            function performQuery(err, conn) {
                if (err) {
                    return reject(err);
                }
                connection = conn;
                connection.query(sql, releaseConnection);
            }
            function releaseConnection(err, result) {
                connection.release();
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result['insertId']);
                }
            }
        });
    }
    /**
     * Retrieves a row from the database.
     *
     * @returns Returns the row if found, null otherwise.
     */
    retrieveRow(id) {
        return new Promise((resolve, reject) => {
            let tableName = this._tableName;
            let primaryKey = this._primaryKey;
            let sql = 'SELECT * FROM ' + tableName + ' WHERE `' + primaryKey + '`=' + id + ' LIMIT 1';
            let connection = null;
            this._pool.getConnection(performQuery);
            function performQuery(err, conn) {
                if (err) {
                    reject(err);
                }
                else {
                    connection = conn;
                    connection.query(sql, releaseConnection);
                }
            }
            function releaseConnection(err, row) {
                connection.release();
                if (err) {
                    reject(err);
                }
                else {
                    if (row.length == 0) {
                        resolve(null);
                    }
                    else {
                        // prevents mysql from modifying source object
                        const clone = Util_1.Util.shallowClone(row[0]);
                        resolve(clone);
                    }
                }
            }
        });
    }
    /**
     * Updates a row in the database.
     *
     * @returns Returns the number of affected rows (i.e. 0 or 1).
     */
    updateRow(row) {
        return new Promise((resolve, reject) => {
            row = Util_1.Util.shallowClone(row); // prevents mysql from modifying source object
            const tableName = this._tableName;
            const primaryKeyName = this._primaryKey;
            const primaryKeyValue = row[primaryKeyName];
            delete row[primaryKeyName];
            row = this.timestampUpdatedColumn(row);
            const params = TableGateway.getParameterizedValues(row);
            let sql = 'UPDATE ' + tableName
                + ' SET ' + params
                + ' WHERE `' + primaryKeyName + '`=' + primaryKeyValue;
            let values = TableGateway.getObjectValues(row);
            sql = mysql.format(sql, values);
            let connection = null;
            this._pool.getConnection(performQuery);
            function performQuery(err, conn) {
                if (err) {
                    reject(err);
                }
                else {
                    connection = conn;
                    conn.query(sql, releaseConnection);
                }
            }
            function releaseConnection(err, result) {
                connection.release();
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result['affectedRows']);
                }
            }
        });
    }
    /**
     * Deletes a row from the database.
     *
     * @returns Returns the number of affected rows (i.e. 0 or 1).
     */
    deleteRow(id) {
        return new Promise((resolve, reject) => {
            let tableName = this._tableName;
            let primaryKey = this._primaryKey;
            let sql = 'DELETE FROM `' + tableName + '` WHERE `' + primaryKey + '`=' + id;
            let connection = null;
            this._pool.getConnection(performQuery);
            function performQuery(err, conn) {
                if (err) {
                    reject(err);
                }
                else {
                    connection = conn;
                    connection.query(sql, releaseConnection);
                }
            }
            function releaseConnection(err, result) {
                connection.release();
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result['affectedRows']);
                }
            }
        });
    }
    /**
     * @returns Returns the rows from the database where the `fieldName` matches the `fieldValue`.
     */
    retrieveRows(fieldName, fieldValue) {
        return new Promise((resolve, reject) => {
            const tableName = this._tableName;
            const values = [fieldName, fieldValue];
            let sql = 'SELECT * FROM `' + tableName + '` WHERE ??=?';
            sql = mysql.format(sql, values);
            let connection = null;
            this._pool.getConnection(performQuery);
            function performQuery(err, conn) {
                if (err) {
                    reject(err);
                }
                else {
                    connection = conn;
                    conn.query(sql, releaseConnection);
                }
            }
            function releaseConnection(err, rows) {
                connection.release();
                if (err) {
                    reject(err);
                }
                else {
                    const out = Util_1.Util.shallowCloneArray(rows); // remove mysql metadata
                    resolve(out);
                }
            }
        });
    }
    /**
     * @returns Returns the rows from the database with matching id's (i.e. primary keys).
     */
    retrieveRowsByIds(ids) {
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            let table = this._tableName;
            let primaryKey = this._primaryKey;
            for (let i = 0; i < ids.length; i++) {
                ids[i] = Math.floor(ids[i]); // ensure the ids are integers
            }
            let idsString = ids.join(', ');
            let sql = 'SELECT * FROM `' + table + '` WHERE `'
                + primaryKey + '` IN (' + idsString + ') ORDER BY `' + primaryKey + '`';
            let connection = null;
            this._pool.getConnection(performQuery);
            function performQuery(err, conn) {
                if (err) {
                    reject(err);
                }
                else {
                    connection = conn;
                    connection.query(sql, releaseConnection);
                }
            }
            function releaseConnection(err, rows) {
                connection.release();
                if (err) {
                    reject(err);
                }
                else {
                    const clone = Util_1.Util.shallowCloneArray(rows); // remove mysql metadata
                    resolve(clone);
                }
            }
        }));
    }
    /**
     * @returns Returns the rows in the database where the `fieldName` is NULL.
     */
    retrieveRowsByIsNull(fieldName) {
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const tableName = this._tableName;
            const primaryKey = this._primaryKey;
            let sql = 'SELECT * FROM `' + tableName + '` WHERE `' + fieldName
                + '` IS NULL ORDER BY ' + primaryKey;
            let connection = null;
            this._pool.getConnection(performQuery);
            function performQuery(err, conn) {
                if (err) {
                    reject(err);
                }
                else {
                    connection = conn;
                    connection.query(sql, releaseConnection);
                }
            }
            function releaseConnection(err, rows) {
                connection.release();
                if (err) {
                    reject(err);
                }
                else {
                    const clone = Util_1.Util.shallowCloneArray(rows); // remove mysql metadata
                    resolve(clone);
                }
            }
        }));
    }
    /**
     * @returns Returns the rows where the `fieldName` is not equal to the `fieldValue`.
     */
    retrieveRowsByNotEqual(fieldName, fieldValue) {
        return new Promise((resolve, reject) => {
            const tableName = this._tableName;
            const values = [fieldName, fieldValue];
            let sql = 'SELECT * FROM `' + tableName + '` WHERE ?? <> ?';
            sql = mysql.format(sql, values);
            let connection = null;
            this._pool.getConnection(performQuery);
            function performQuery(err, conn) {
                if (err) {
                    reject(err);
                }
                else {
                    connection = conn;
                    connection.query(sql, releaseConnection);
                }
            }
            function releaseConnection(err, rows) {
                connection.release();
                if (err) {
                    reject(err);
                }
                else {
                    const clone = Util_1.Util.shallowCloneArray(rows); // remove mysql metadata
                    resolve(clone);
                }
            }
        });
    }
    /**
     * Sets the `fieldName` NULL where the `fieldName` matches the `fieldValue`.
     *
     * @returns Returns the number of affected rows.
     */
    setFieldNullWhere(fieldName, fieldValue) {
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const tableName = this._tableName;
            const values = [fieldName, fieldName, fieldValue];
            let sql = 'UPDATE `' + tableName + '` SET ?? = NULL WHERE ?? = ?';
            sql = mysql.format(sql, values);
            let connection = null;
            this._pool.getConnection(performQuery);
            function performQuery(err, conn) {
                if (err) {
                    reject(err);
                }
                else {
                    connection = conn;
                    connection.query(sql, releaseConnection);
                }
            }
            function releaseConnection(err, result) {
                connection.release();
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result['affectedRows']);
                }
            }
        }));
    }
    /**
     * Deletes the rows where the `fieldName` matches the `fieldValue`.
     *
     * @returns Returns the number of affected rows.
     */
    deleteRowsBy(fieldName, fieldValue) {
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const tableName = this._tableName;
            const values = [fieldName, fieldValue];
            let sql = 'DELETE FROM `' + tableName + '` WHERE ?? = ?';
            sql = mysql.format(sql, values);
            let connection = null;
            this._pool.getConnection(getConnectionCallback);
            function getConnectionCallback(err, conn) {
                if (err) {
                    reject(err);
                }
                else {
                    connection = conn;
                    connection.query(sql, queryCallback);
                }
            }
            function queryCallback(err, result) {
                connection.release();
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result['affectedRows']);
                }
            }
        }));
    }
    /**
     * @returns Returns the count of rows where the `fieldName` matches the `fieldValue`.
     */
    countRowsByValue(fieldName, fieldValue) {
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const tableName = this._tableName;
            const values = [fieldName, fieldValue];
            let sql = 'SELECT COUNT(*) FROM `' + tableName + '` WHERE ?? = ?';
            sql = mysql.format(sql, values);
            this._pool.getConnection(getConnectionCallback);
            let connection = null;
            function getConnectionCallback(err, conn) {
                if (err) {
                    reject(err);
                }
                else {
                    connection = conn;
                    connection.query(sql, queryCallback);
                }
            }
            function queryCallback(err, result) {
                connection.release();
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result[0]['COUNT(*)']);
                }
            }
        }));
    }
    timestampCreatedColumn(obj) {
        if (this._createdColumnName.length > 0) {
            let date = new Date();
            obj[this._createdColumnName] = MySqlDate_1.MySqlDate.toMySqlDate(date);
        }
        return obj;
    }
    timestampUpdatedColumn(obj) {
        if (this._updatedColumnName.length > 0) {
            let date = new Date();
            obj[this._updatedColumnName] = MySqlDate_1.MySqlDate.toMySqlDate(date);
        }
        return obj;
    }
    static getPlaceholders(obj) {
        let keys = Object.keys(obj);
        let placeholders = [];
        for (let i = 0; i < keys.length; i++) {
            placeholders.push('?');
        }
        let placeholdersString = placeholders.join(', ');
        return placeholdersString;
    }
    static getColumnNames(obj) {
        let keys = Object.keys(obj);
        let columnNames = [];
        for (let i = 0; i < keys.length; i++) {
            columnNames.push('`' + keys[i] + '`');
        }
        let colNamesString = columnNames.join(', ');
        return colNamesString;
    }
    static getParameterizedValues(obj) {
        const keys = Object.keys(obj);
        const parameters = [];
        for (let i = 0; i < keys.length; i++) {
            let item = '`' + keys[i] + '`=?';
            parameters.push(item);
        }
        let paramsString = parameters.join(', ');
        return paramsString;
    }
    static getObjectValues(obj) {
        let keys = Object.keys(obj);
        let results = [];
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            results.push(obj[key]);
        }
        return results;
    }
}
exports.TableGateway = TableGateway;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFibGVHYXRld2F5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiVGFibGVHYXRld2F5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtCQUFnQztBQUNoQyxtRUFBZ0U7QUFHaEUsaUNBQThCO0FBRTlCLE1BQWEsWUFBWTtJQVFyQixZQUFZLGNBQW9CLEVBQUUsU0FBaUIsRUFBRSxVQUFVLEdBQUcsSUFBSTtRQUg5RCx1QkFBa0IsR0FBRyxFQUFFLENBQUM7UUFDeEIsdUJBQWtCLEdBQUcsRUFBRSxDQUFDO1FBRzVCLElBQUksQ0FBQyxLQUFLLEdBQVMsY0FBYyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxVQUFVLEdBQUksU0FBUyxDQUFDO1FBQzdCLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO0lBQ2xDLENBQUM7SUFFTSxvQkFBb0IsQ0FBQyxLQUFhO1FBQ3JDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7SUFDcEMsQ0FBQztJQUVNLG9CQUFvQixDQUFDLEtBQWE7UUFDckMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztJQUNwQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLFNBQVMsQ0FBQyxHQUFRO1FBQ3JCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDbkMsR0FBRyxHQUFHLFdBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyw4Q0FBOEM7WUFDNUUsTUFBTSxTQUFTLEdBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUNuQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQ3BDLE9BQU8sR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRXZCLEdBQUcsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkMsR0FBRyxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMs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
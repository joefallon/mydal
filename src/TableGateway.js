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
     * @returns The inserted row with inserted primary key.
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
                    if (result['insertId'] > 0) {
                        row[primaryKey] = result['insertId'];
                        resolve(row);
                    }
                    else {
                        resolve(null);
                    }
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
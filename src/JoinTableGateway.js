"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mysql = require("mysql");
const MySqlDate_1 = require("@joefallon/mysql-date/src/MySqlDate");
const Util_1 = require("./Util");
class JoinTableGateway {
    constructor(connectionPool, tableName, id1Name, id2Name) {
        this._createdColumnName = '';
        this._pool = connectionPool;
        this._tableName = tableName;
        this._id1Name = id1Name;
        this._id2Name = id2Name;
    }
    setCreatedColumnName(value) {
        this._createdColumnName = value;
    }
    /**
     * Creates a row in the database.
     *
     * @returns Returns true on row creation success, otherwise false.
     */
    createRow(id1, id2) {
        return new Promise((resolve, reject) => {
            const tableName = this._tableName;
            const id1Name = this._id1Name;
            const id2Name = this._id2Name;
            const createdName = this._createdColumnName;
            const created = JoinTableGateway.mySqlDatetimeString(new Date());
            const values = [id1, id2];
            let columnNames = `\`${id1Name}\`, \`${id2Name}\``;
            let placeholders = '?, ?';
            if (createdName.length > 0) {
                columnNames += `, \`${createdName}\``;
                placeholders += ', ?';
                values.push(created);
            }
            let sql = `INSERT INTO ${tableName} ( ${columnNames} ) VALUES ( ${placeholders} )`;
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
                    if (result['affectedRows'] == 1) {
                        resolve(true);
                    }
                    else {
                        resolve(false);
                    }
                }
            }
        });
    }
    /**
     * @returns Returns the row with matching `id1` and `id2`.
     */
    retrieveRow(id1, id2) {
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const tableName = this._tableName;
            const id1Name = this._id1Name;
            const id2Name = this._id2Name;
            const values = [id1, id2];
            let sql = 'SELECT * FROM ' + tableName + ' WHERE ' + id1Name + '=? AND ' + id2Name + '=? LIMIT 1';
            sql = mysql.format(sql, values);
            let connection = null;
            this._pool.getConnection(performQuery);
            function performQuery(err, conn) {
                if (err) {
                    return reject(err);
                }
                else {
                    connection = conn;
                    connection.query(sql, releaseConnection);
                }
            }
            function releaseConnection(err, result) {
                connection.release();
                if (err) {
                    return reject(err);
                }
                else {
                    if (result.length > 0) {
                        const row = Util_1.Util.shallowClone(result[0]); // removes mysql metadata
                        resolve(row);
                    }
                    else {
                        resolve(null);
                    }
                }
            }
        }));
    }
    /**
     * Deletes the row from the database with the matching `id1` and `id2`.
     *
     * @returns Returns the number of affected rows (i.e. 0 or 1).
     */
    deleteRow(id1, id2) {
        return new Promise((resolve, reject) => {
            const tableName = this._tableName;
            const id1Name = this._id1Name;
            const id2Name = this._id2Name;
            const values = [id1, id2];
            let sql = 'DELETE FROM `' + tableName + '` WHERE `' + id1Name + '`=? and `' + id2Name + '`=?';
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
        });
    }
    /**
     * @returns Returns the rows where `idName` matches `idValue`.
     */
    retrieveById(idName, idValue) {
        return new Promise((resolve, reject) => {
            let tableName = this._tableName;
            let sql = 'SELECT * FROM `' + tableName + '` where `' + idName + '`=?';
            sql = mysql.format(sql, [idValue]);
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
                    const rows = Util_1.Util.shallowCloneArray(result); // removes mysql metadata
                    resolve(rows);
                }
            }
        });
    }
    /**
     * Deletes the rows from the database were `idName` matches `idValue`.
     *
     * @returns Returns the number of affected rows.
     */
    deleteById(idName, idValue) {
        return new Promise((resolve, reject) => {
            const tableName = this._tableName;
            let sql = 'DELETE FROM `' + tableName + '` where `' + idName + '`=?';
            sql = mysql.format(sql, [idValue]);
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
    static mySqlDatetimeString(date) {
        return MySqlDate_1.MySqlDate.toMySqlDate(date);
    }
}
exports.JoinTableGateway = JoinTableGateway;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSm9pblRhYmxlR2F0ZXdheS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkpvaW5UYWJsZUdhdGV3YXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQWdDO0FBRWhDLG1FQUFnRTtBQUVoRSxpQ0FBOEI7QUFFOUIsTUFBYSxnQkFBZ0I7SUFRekIsWUFBWSxjQUFvQixFQUFFLFNBQWlCLEVBQUUsT0FBZSxFQUFFLE9BQWU7UUFGN0UsdUJBQWtCLEdBQUcsRUFBRSxDQUFDO1FBRzVCLElBQUksQ0FBQyxLQUFLLEdBQVEsY0FBYyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUssT0FBTyxDQUFDO1FBQzFCLElBQUksQ0FBQyxRQUFRLEdBQUssT0FBTyxDQUFDO0lBQzlCLENBQUM7SUFFTSxvQkFBb0IsQ0FBQyxLQUFhO1FBQ3JDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7SUFDcEMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxTQUFTLENBQUMsR0FBUSxFQUFFLEdBQVE7UUFDL0IsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNuQyxNQUFNLFNBQVMsR0FBSyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQ3BDLE1BQU0sT0FBTyxHQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDbEMsTUFBTSxPQUFPLEdBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUNsQyxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUM7WUFDNUMsTUFBTSxPQUFPLEdBQU8sZ0JBQWdCLENBQUMsbUJBQW1CLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ3JFLE1BQU0sTUFBTSxHQUFRLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBRS9CLElBQUksV0FBVyxHQUFJLEtBQUssT0FBTyxTQUFTLE9B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
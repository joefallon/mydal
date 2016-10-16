"use strict";
var ConnectionPoolTestFactory = require('./ConnectionPoolTestFactory');
var chai = require('chai');
var assert = chai.assert;
var DatabaseUtilities = (function () {
    function DatabaseUtilities() {
    }
    DatabaseUtilities.clean = function (callback) {
        var pool = ConnectionPoolTestFactory.create();
        var connection = null;
        pool.getConnection(disableForeignKeyChecks);
        function disableForeignKeyChecks(err, conn) {
            if (err) {
                callback(err);
            }
            else {
                connection = conn;
                var sql = 'SET FOREIGN_KEY_CHECKS=0';
                connection.query(sql, truncateProductsTable);
            }
        }
        function truncateProductsTable(err, result) {
            if (err) {
                connection.release();
                callback(err);
            }
            else {
                var sql = 'TRUNCATE TABLE `products`';
                connection.query(sql, truncateOrdersProductsTable);
            }
        }
        function truncateOrdersProductsTable(err, result) {
            if (err) {
                connection.release();
                callback(err);
            }
            else {
                var sql = 'TRUNCATE TABLE `orders_products`';
                connection.query(sql, enableForeignKeyChecks);
            }
        }
        function enableForeignKeyChecks(err, result) {
            if (err) {
                connection.release();
                callback(err);
            }
            else {
                var sql = 'SET FOREIGN_KEY_CHECKS=1';
                connection.query(sql, releaseConnection);
            }
        }
        function releaseConnection(err, result) {
            if (err) {
                assert.fail(null, null, err.message);
            }
            connection.release();
            callback(err);
        }
    };
    return DatabaseUtilities;
}());
module.exports = DatabaseUtilities;

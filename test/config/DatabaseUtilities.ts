import ConnectionPoolTestFactory = require('./ConnectionPoolTestFactory');

import {IConnection} from 'mysql';
import {IError} from 'mysql';

import chai = require('chai');
let assert = chai.assert;

class DatabaseUtilities {
    public static clean(callback:(err:IError)=>void) {
        let pool = ConnectionPoolTestFactory.create();
        let connection:IConnection = null;
        pool.getConnection(disableForeignKeyChecks);

        function disableForeignKeyChecks(err:IError, conn:IConnection) {
            if(err) {
                callback(err);
            } else {
                connection = conn;
                let sql = 'SET FOREIGN_KEY_CHECKS=0';
                connection.query(sql, truncateProductsTable);
            }
        }

        function truncateProductsTable(err:IError, result:any[]) {
            if(err) {
                connection.release();
                callback(err);
            } else {
                let sql = 'TRUNCATE TABLE `products`';
                connection.query(sql, truncateOrdersProductsTable);
            }
        }

        function truncateOrdersProductsTable(err:IError, result:any[]) {
            if(err) {
                connection.release();
                callback(err);
            } else {
                let sql = 'TRUNCATE TABLE `orders_products`';
                connection.query(sql, enableForeignKeyChecks);
            }
        }

        function enableForeignKeyChecks(err:IError, result:any[]) {
            if(err) {
                connection.release();
                callback(err);
            } else {
                let sql = 'SET FOREIGN_KEY_CHECKS=1';
                connection.query(sql, releaseConnection);
            }
        }

        function releaseConnection(err:IError, result:any[]) {
            if(err) {
                assert.fail(null, null, err.message);
            }

            connection.release();
            callback(err);
        }
    }
}

export = DatabaseUtilities;

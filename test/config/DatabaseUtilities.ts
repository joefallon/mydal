import assert = require('assert');
import { ConnectionPoolTestFactory } from './ConnectionPoolTestFactory';
import { PoolConnection } from 'mysql';

export class DatabaseUtilities {
    
    public static clean(callback:(err:Error)=>void) {
        let pool = ConnectionPoolTestFactory.create();
        let connection:PoolConnection = null;
        pool.getConnection(disableForeignKeyChecks);

        function disableForeignKeyChecks(err:Error, conn:PoolConnection) {
            if(err) {
                callback(err);
            } else {
                connection = conn;
                let sql = 'SET FOREIGN_KEY_CHECKS=0';
                connection.query(sql, truncateProductsTable);
            }
        }

        function truncateProductsTable(err:Error, result:any[]) {
            if(err) {
                connection.release();
                callback(err);
            } else {
                let sql = 'TRUNCATE TABLE `products`';
                connection.query(sql, truncateOrdersProductsTable);
            }
        }

        function truncateOrdersProductsTable(err:Error, result:any[]) {
            if(err) {
                connection.release();
                callback(err);
            } else {
                let sql = 'TRUNCATE TABLE `orders_products`';
                connection.query(sql, enableForeignKeyChecks);
            }
        }

        function enableForeignKeyChecks(err:Error, result:any[]) {
            if(err) {
                connection.release();
                callback(err);
            } else {
                let sql = 'SET FOREIGN_KEY_CHECKS=1';
                connection.query(sql, releaseConnection);
            }
        }

        function releaseConnection(err:Error, result:any[]) {
            if(err) {
                assert.fail(null, null, err.message);
            }

            connection.release();
            callback(err);
        }
    }

    public static shutdownPool() {
        const pool = ConnectionPoolTestFactory.create();
        pool.end();
    }
}

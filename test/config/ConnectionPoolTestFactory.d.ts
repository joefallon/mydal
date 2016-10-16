import mysql = require('mysql');
declare class ConnectionPoolTestFactory {
    private static pool;
    static create(): mysql.IPool;
}
export = ConnectionPoolTestFactory;

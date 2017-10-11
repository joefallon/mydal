import mysql = require('mysql');
export declare class ConnectionPoolTestFactory {
    private static pool;
    static create(): mysql.IPool;
}

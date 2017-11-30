import mysql = require('mysql');
import { Pool, PoolConfig } from 'mysql';

export class ConnectionPoolFactory {
    private static pool: Pool;

    public static create(poolConfig: PoolConfig): Pool {
        if(ConnectionPoolFactory.pool == null) {
            ConnectionPoolFactory.pool = mysql.createPool(poolConfig);
        }

        return ConnectionPoolFactory.pool;
    }
}

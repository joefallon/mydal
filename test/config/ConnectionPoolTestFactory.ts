import config = require('./main');
import mysql  = require('mysql');
import { Pool, PoolConfig } from 'mysql';

export class ConnectionPoolTestFactory {
    private static pool: Pool;

    public static create() {
        if(ConnectionPoolTestFactory.pool == null) {
            let connectionOptions: PoolConfig = {
                host:            config.host,
                port:            config.port,
                database:        config.database,
                user:            config.user,
                password:        config.password,
                connectionLimit: config.connectionLimit,
                dateStrings:     config.dateStrings
            };

            ConnectionPoolTestFactory.pool = mysql.createPool(connectionOptions);
        }

        return ConnectionPoolTestFactory.pool;
    }
}

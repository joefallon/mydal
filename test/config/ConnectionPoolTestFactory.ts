import config = require('./main');
import mysql  = require('mysql');

import {IPool}       from 'mysql';
import {IPoolConfig} from 'mysql';

class ConnectionPoolTestFactory {
    private static pool:IPool;

    public static create() {
        if(ConnectionPoolTestFactory.pool == null) {
            let connectionOptions:IPoolConfig = {
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

export = ConnectionPoolTestFactory;

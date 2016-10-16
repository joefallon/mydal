import mysql = require('mysql');

import {IPool, IPoolConfig} from 'mysql';

class ConnectionPoolFactory {
    private static pool:IPool;

    public static create(poolConfig:IPoolConfig):IPool {
        if(ConnectionPoolFactory.pool == null) {
            ConnectionPoolFactory.pool = mysql.createPool(poolConfig);
        }

        return ConnectionPoolFactory.pool;
    }
}

export = ConnectionPoolFactory;

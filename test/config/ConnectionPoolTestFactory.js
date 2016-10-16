"use strict";
var config = require('./main');
var mysql = require('mysql');
var ConnectionPoolTestFactory = (function () {
    function ConnectionPoolTestFactory() {
    }
    ConnectionPoolTestFactory.create = function () {
        if (ConnectionPoolTestFactory.pool == null) {
            var connectionOptions = {
                host: config.host,
                port: config.port,
                database: config.database,
                user: config.user,
                password: config.password,
                connectionLimit: config.connectionLimit,
                dateStrings: config.dateStrings
            };
            ConnectionPoolTestFactory.pool = mysql.createPool(connectionOptions);
        }
        return ConnectionPoolTestFactory.pool;
    };
    return ConnectionPoolTestFactory;
}());
module.exports = ConnectionPoolTestFactory;

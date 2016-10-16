"use strict";
var mysql = require('mysql');
var ConnectionPoolFactory = (function () {
    function ConnectionPoolFactory() {
    }
    ConnectionPoolFactory.create = function (poolConfig) {
        if (ConnectionPoolFactory.pool == null) {
            ConnectionPoolFactory.pool = mysql.createPool(poolConfig);
        }
        return ConnectionPoolFactory.pool;
    };
    return ConnectionPoolFactory;
}());
module.exports = ConnectionPoolFactory;

"use strict";
var JoinTableGateway = require('../../src/JoinTableGateway');
var OrdersProductsGateway = (function () {
    function OrdersProductsGateway(connectionPool) {
        this.tableName = 'orders_products';
        this.id1Name = 'table1_id';
        this.id2Name = 'table2_id';
        var table = this.tableName;
        var id1 = this.id1Name;
        var id2 = this.id2Name;
        this.joinTableGateway = new JoinTableGateway(connectionPool, table, id1, id2);
        this.joinTableGateway.setCreatedColumnName('created');
    }
    OrdersProductsGateway.prototype.createRow = function (id1, id2, callback) {
        this.joinTableGateway.createRow(id1, id2, createRowCallback);
        function createRowCallback(err, isSuccess) {
            if (err) {
                callback(err, false);
            }
            else {
                callback(null, isSuccess);
            }
        }
    };
    OrdersProductsGateway.prototype.retrieveRow = function (id1, id2, callback) {
        this.joinTableGateway.retrieveRow(id1, id2, retrieveRowCallback);
        function retrieveRowCallback(err, row) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, row);
            }
        }
    };
    OrdersProductsGateway.prototype.deleteRow = function (id1, id2, callback) {
        this.joinTableGateway.deleteRow(id1, id2, callback);
    };
    OrdersProductsGateway.prototype.retrieveByTable1Id = function (id1, callback) {
        this.joinTableGateway.retrieveById('table1_id', id1, callback);
    };
    OrdersProductsGateway.prototype.deleteByTable1Id = function (id1, callback) {
        this.joinTableGateway.deleteById('table1_id', id1, callback);
    };
    return OrdersProductsGateway;
}());
module.exports = OrdersProductsGateway;

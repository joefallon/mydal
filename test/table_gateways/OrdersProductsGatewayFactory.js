"use strict";
var ConnectionPoolTestFactory = require('../config/ConnectionPoolTestFactory');
var OrdersProductsGateway = require('./OrdersProductsGateway');
var OrdersProductsGatewayFactory = (function () {
    function OrdersProductsGatewayFactory() {
    }
    OrdersProductsGatewayFactory.create = function () {
        var pool = ConnectionPoolTestFactory.create();
        var gateway = new OrdersProductsGateway(pool);
        return gateway;
    };
    return OrdersProductsGatewayFactory;
}());
module.exports = OrdersProductsGatewayFactory;

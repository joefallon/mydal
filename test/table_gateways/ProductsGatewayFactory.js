"use strict";
var ConnectionPoolTestFactory = require('../config/ConnectionPoolTestFactory');
var ProductsGateway = require('./ProductsGateway');
var ProductsGatewayFactory = (function () {
    function ProductsGatewayFactory() {
    }
    ProductsGatewayFactory.create = function () {
        var pool = ConnectionPoolTestFactory.create();
        var gateway = new ProductsGateway(pool);
        return gateway;
    };
    return ProductsGatewayFactory;
}());
module.exports = ProductsGatewayFactory;

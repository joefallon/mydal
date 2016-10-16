import ConnectionPoolTestFactory = require('../config/ConnectionPoolTestFactory');
import OrdersProductsGateway     = require('./OrdersProductsGateway');

class OrdersProductsGatewayFactory {

    public static create() {
        let pool = ConnectionPoolTestFactory.create();
        let gateway = new OrdersProductsGateway(pool);

        return gateway;
    }
}

export = OrdersProductsGatewayFactory;
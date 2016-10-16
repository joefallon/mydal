import ConnectionPoolTestFactory = require('../config/ConnectionPoolTestFactory');
import ProductsGateway           = require('./ProductsGateway');

class ProductsGatewayFactory {

    public static create() {
        let pool = ConnectionPoolTestFactory.create();
        let gateway = new ProductsGateway(pool);

        return gateway;
    }
}

export = ProductsGatewayFactory;

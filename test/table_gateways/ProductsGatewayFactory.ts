import {ConnectionPoolTestFactory} from '../config/ConnectionPoolTestFactory';
import {ProductsGateway} from './ProductsGateway';

export class ProductsGatewayFactory {

    public static create() {
        let pool = ConnectionPoolTestFactory.create();
        let gateway = new ProductsGateway(pool);

        return gateway;
    }
}

import {ConnectionPoolTestFactory} from '../config/ConnectionPoolTestFactory';
import {OrdersProductsGateway} from './OrdersProductsGateway';

export class OrdersProductsGatewayFactory {
    public static create() {
        const pool    = ConnectionPoolTestFactory.create();
        const gateway = new OrdersProductsGateway(pool);

        return gateway;
    }
}

import {ConnectionPoolTestFactory} from "../config/ConnectionPoolTestFactory";
import {OrdersProductsGateway} from "./OrdersProductsGateway";

export class OrdersProductsGatewayFactory {

    public static create() {
        let pool = ConnectionPoolTestFactory.create();
        let gateway = new OrdersProductsGateway(pool);

        return gateway;
    }
}

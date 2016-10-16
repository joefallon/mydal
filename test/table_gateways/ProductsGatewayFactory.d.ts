import ProductsGateway = require('./ProductsGateway');
declare class ProductsGatewayFactory {
    static create(): ProductsGateway;
}
export = ProductsGatewayFactory;

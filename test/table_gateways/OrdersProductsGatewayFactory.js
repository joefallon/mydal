"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConnectionPoolTestFactory_1 = require("../config/ConnectionPoolTestFactory");
const OrdersProductsGateway_1 = require("./OrdersProductsGateway");
class OrdersProductsGatewayFactory {
    static create() {
        const pool = ConnectionPoolTestFactory_1.ConnectionPoolTestFactory.create();
        const gateway = new OrdersProductsGateway_1.OrdersProductsGateway(pool);
        return gateway;
    }
}
exports.OrdersProductsGatewayFactory = OrdersProductsGatewayFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3JkZXJzUHJvZHVjdHNHYXRld2F5RmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIk9yZGVyc1Byb2R1Y3RzR2F0ZXdheUZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtRkFBOEU7QUFDOUUsbUVBQThEO0FBRTlELE1BQWEsNEJBQTRCO0lBRTlCLE1BQU0sQ0FBQyxNQUFNO1FBQ2hCLE1BQU0sSUFBSSxHQUFNLHFEQUF5QixDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ25ELE1BQU0sT0FBTyxHQUFHLElBQUksNkNBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFaEQsT0FBTyxPQUFPLENBQUM7SUFDbkIsQ0FBQztDQUNKO0FBUkQsb0VBUUMifQ==
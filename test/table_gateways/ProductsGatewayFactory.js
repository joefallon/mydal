"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConnectionPoolTestFactory_1 = require("../config/ConnectionPoolTestFactory");
const ProductsGateway_1 = require("./ProductsGateway");
class ProductsGatewayFactory {
    static create() {
        let pool = ConnectionPoolTestFactory_1.ConnectionPoolTestFactory.create();
        let gateway = new ProductsGateway_1.ProductsGateway(pool);
        return gateway;
    }
}
exports.ProductsGatewayFactory = ProductsGatewayFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZHVjdHNHYXRld2F5RmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlByb2R1Y3RzR2F0ZXdheUZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtRkFBOEU7QUFDOUUsdURBQWtEO0FBRWxELE1BQWEsc0JBQXNCO0lBRXhCLE1BQU0sQ0FBQyxNQUFNO1FBQ2hCLElBQUksSUFBSSxHQUFHLHFEQUF5QixDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzlDLElBQUksT0FBTyxHQUFHLElBQUksaUNBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV4QyxPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDO0NBQ0o7QUFSRCx3REFRQyJ9
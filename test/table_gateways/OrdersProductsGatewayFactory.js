"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConnectionPoolTestFactory_1 = require("../config/ConnectionPoolTestFactory");
var OrdersProductsGateway_1 = require("./OrdersProductsGateway");
var OrdersProductsGatewayFactory = /** @class */ (function () {
    function OrdersProductsGatewayFactory() {
    }
    OrdersProductsGatewayFactory.create = function () {
        var pool = ConnectionPoolTestFactory_1.ConnectionPoolTestFactory.create();
        var gateway = new OrdersProductsGateway_1.OrdersProductsGateway(pool);
        return gateway;
    };
    return OrdersProductsGatewayFactory;
}());
exports.OrdersProductsGatewayFactory = OrdersProductsGatewayFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3JkZXJzUHJvZHVjdHNHYXRld2F5RmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIk9yZGVyc1Byb2R1Y3RzR2F0ZXdheUZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpRkFBOEU7QUFDOUUsaUVBQThEO0FBRTlEO0lBQUE7SUFRQSxDQUFDO0lBTmlCLG1DQUFNLEdBQXBCO1FBQ0ksSUFBSSxJQUFJLEdBQUcscURBQXlCLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDOUMsSUFBSSxPQUFPLEdBQUcsSUFBSSw2Q0FBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUU5QyxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFDTCxtQ0FBQztBQUFELENBQUMsQUFSRCxJQVFDO0FBUlksb0VBQTRCIn0=
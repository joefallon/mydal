"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConnectionPoolTestFactory_1 = require("../config/ConnectionPoolTestFactory");
var ProductsGateway_1 = require("./ProductsGateway");
var ProductsGatewayFactory = /** @class */ (function () {
    function ProductsGatewayFactory() {
    }
    ProductsGatewayFactory.create = function () {
        var pool = ConnectionPoolTestFactory_1.ConnectionPoolTestFactory.create();
        var gateway = new ProductsGateway_1.ProductsGateway(pool);
        return gateway;
    };
    return ProductsGatewayFactory;
}());
exports.ProductsGatewayFactory = ProductsGatewayFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZHVjdHNHYXRld2F5RmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlByb2R1Y3RzR2F0ZXdheUZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpRkFBOEU7QUFDOUUscURBQWtEO0FBRWxEO0lBQUE7SUFRQSxDQUFDO0lBTmlCLDZCQUFNLEdBQXBCO1FBQ0ksSUFBSSxJQUFJLEdBQUcscURBQXlCLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDOUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxpQ0FBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXhDLE9BQU8sT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFDTCw2QkFBQztBQUFELENBQUMsQUFSRCxJQVFDO0FBUlksd0RBQXNCIn0=
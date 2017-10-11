"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConnectionPoolTestFactory_1 = require("../config/ConnectionPoolTestFactory");
var ProductsGateway_1 = require("./ProductsGateway");
var ProductsGatewayFactory = (function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZHVjdHNHYXRld2F5RmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlByb2R1Y3RzR2F0ZXdheUZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpRkFBOEU7QUFDOUUscURBQWtEO0FBRWxEO0lBQUE7SUFRQSxDQUFDO0lBTmlCLDZCQUFNLEdBQXBCO1FBQ0ksSUFBSSxJQUFJLEdBQUcscURBQXlCLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDOUMsSUFBSSxPQUFPLEdBQUcsSUFBSSxpQ0FBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXhDLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDbkIsQ0FBQztJQUNMLDZCQUFDO0FBQUQsQ0FBQyxBQVJELElBUUM7QUFSWSx3REFBc0IifQ==
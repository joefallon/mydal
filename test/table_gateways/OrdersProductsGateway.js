"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JoinTableGateway_1 = require("../../src/JoinTableGateway");
var OrdersProductsGateway = (function () {
    function OrdersProductsGateway(connectionPool) {
        this.tableName = 'orders_products';
        this.id1Name = 'table1_id';
        this.id2Name = 'table2_id';
        var table = this.tableName;
        var id1 = this.id1Name;
        var id2 = this.id2Name;
        this.joinTableGateway = new JoinTableGateway_1.JoinTableGateway(connectionPool, table, id1, id2);
        this.joinTableGateway.setCreatedColumnName('created');
    }
    OrdersProductsGateway.prototype.createRow = function (id1, id2, callback) {
        this.joinTableGateway.createRow(id1, id2, createRowCallback);
        function createRowCallback(err, isSuccess) {
            if (err) {
                callback(err, false);
            }
            else {
                callback(null, isSuccess);
            }
        }
    };
    OrdersProductsGateway.prototype.retrieveRow = function (id1, id2, callback) {
        this.joinTableGateway.retrieveRow(id1, id2, retrieveRowCallback);
        function retrieveRowCallback(err, row) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, row);
            }
        }
    };
    OrdersProductsGateway.prototype.deleteRow = function (id1, id2, callback) {
        this.joinTableGateway.deleteRow(id1, id2, callback);
    };
    OrdersProductsGateway.prototype.retrieveByTable1Id = function (id1, callback) {
        this.joinTableGateway.retrieveById('table1_id', id1, callback);
    };
    OrdersProductsGateway.prototype.deleteByTable1Id = function (id1, callback) {
        this.joinTableGateway.deleteById('table1_id', id1, callback);
    };
    return OrdersProductsGateway;
}());
exports.OrdersProductsGateway = OrdersProductsGateway;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3JkZXJzUHJvZHVjdHNHYXRld2F5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiT3JkZXJzUHJvZHVjdHNHYXRld2F5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsK0RBQTREO0FBRTVEO0lBTUksK0JBQVksY0FBcUI7UUFMekIsY0FBUyxHQUFHLGlCQUFpQixDQUFDO1FBQzlCLFlBQU8sR0FBRyxXQUFXLENBQUM7UUFDdEIsWUFBTyxHQUFHLFdBQVcsQ0FBQztRQUkxQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzNCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDdkIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxtQ0FBZ0IsQ0FBQyxjQUFjLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM5RSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsb0JBQW9CLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVNLHlDQUFTLEdBQWhCLFVBQWlCLEdBQVcsRUFBRSxHQUFXLEVBQUUsUUFBa0Q7UUFDekYsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFFN0QsMkJBQTJCLEdBQVUsRUFBRSxTQUFrQjtZQUNyRCxFQUFFLENBQUEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNMLFFBQVEsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDekIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLFFBQVEsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDOUIsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDO0lBRU0sMkNBQVcsR0FBbEIsVUFBbUIsR0FBVyxFQUFFLEdBQVcsRUFBRSxRQUEwQztRQUNuRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztRQUVqRSw2QkFBNkIsR0FBVSxFQUFFLEdBQVU7WUFDL0MsRUFBRSxDQUFBLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDTCxRQUFRLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3hCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixRQUFRLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3hCLENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQUVNLHlDQUFTLEdBQWhCLFVBQWlCLEdBQVcsRUFBRSxHQUFXLEVBQUUsUUFBb0Q7UUFDM0YsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFTSxrREFBa0IsR0FBekIsVUFBMEIsR0FBVyxFQUFFLFFBQTJDO1FBQzlFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRU0sZ0RBQWdCLEdBQXZCLFVBQXdCLEdBQVcsRUFBRSxRQUFvRDtRQUNyRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUNMLDRCQUFDO0FBQUQsQ0FBQyxBQWpERCxJQWlEQztBQWpEWSxzREFBcUIifQ==
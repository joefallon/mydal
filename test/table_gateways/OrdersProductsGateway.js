"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var JoinTableGateway_1 = require("../../src/JoinTableGateway");
var OrdersProductsGateway = /** @class */ (function () {
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var isSuccess, e_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.joinTableGateway.createRowWithPromise(id1, id2)];
                    case 1:
                        isSuccess = _a.sent();
                        callback(null, isSuccess);
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        callback(e_1, null);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrdersProductsGateway.prototype.retrieveRow = function (id1, id2, callback) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var row, e_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.joinTableGateway.retrieveRowWithPromise(id1, id2)];
                    case 1:
                        row = _a.sent();
                        callback(null, row);
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        callback(e_2, null);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrdersProductsGateway.prototype.deleteRow = function (id1, id2, callback) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var affectedRows, e_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.joinTableGateway.deleteRowWithPromise(id1, id2)];
                    case 1:
                        affectedRows = _a.sent();
                        callback(null, affectedRows);
                        return [3 /*break*/, 3];
                    case 2:
                        e_3 = _a.sent();
                        callback(e_3, null);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrdersProductsGateway.prototype.retrieveByTable1Id = function (id1, callback) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var rows, e_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.joinTableGateway.retrieveByIdWithPromise('table1_id', id1)];
                    case 1:
                        rows = _a.sent();
                        callback(null, rows);
                        return [3 /*break*/, 3];
                    case 2:
                        e_4 = _a.sent();
                        callback(e_4, null);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrdersProductsGateway.prototype.deleteByTable1Id = function (id1, callback) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var affectedRows, e_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.joinTableGateway.deleteByIdWithPromise('table1_id', id1)];
                    case 1:
                        affectedRows = _a.sent();
                        callback(null, affectedRows);
                        return [3 /*break*/, 3];
                    case 2:
                        e_5 = _a.sent();
                        callback(e_5, null);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return OrdersProductsGateway;
}());
exports.OrdersProductsGateway = OrdersProductsGateway;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3JkZXJzUHJvZHVjdHNHYXRld2F5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiT3JkZXJzUHJvZHVjdHNHYXRld2F5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLCtEQUE0RDtBQUU1RDtJQU1JLCtCQUFZLGNBQW9CO1FBTHhCLGNBQVMsR0FBRyxpQkFBaUIsQ0FBQztRQUM5QixZQUFPLEdBQUcsV0FBVyxDQUFDO1FBQ3RCLFlBQU8sR0FBRyxXQUFXLENBQUM7UUFJMUIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMzQixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3ZCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksbUNBQWdCLENBQUMsY0FBYyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDOUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFWSx5Q0FBUyxHQUF0QixVQUF1QixHQUFXLEVBQUUsR0FBVyxFQUFFLFFBQWtEOzs7Ozs7O3dCQUV6RSxxQkFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsb0JBQW9CLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFBOzt3QkFBdEUsU0FBUyxHQUFHLFNBQTBEO3dCQUM1RSxRQUFRLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDOzs7O3dCQUcxQixRQUFRLENBQUMsR0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDOzs7Ozs7S0FFekI7SUFFWSwyQ0FBVyxHQUF4QixVQUF5QixHQUFXLEVBQUUsR0FBVyxFQUFFLFFBQTBDOzs7Ozs7O3dCQUV6RSxxQkFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsc0JBQXNCLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFBOzt3QkFBbEUsR0FBRyxHQUFHLFNBQTREO3dCQUN4RSxRQUFRLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDOzs7O3dCQUdwQixRQUFRLENBQUMsR0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDOzs7Ozs7S0FFekI7SUFFWSx5Q0FBUyxHQUF0QixVQUF1QixHQUFXLEVBQUUsR0FBVyxFQUFFLFFBQW9EOzs7Ozs7O3dCQUV4RSxxQkFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsb0JBQW9CLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFBOzt3QkFBekUsWUFBWSxHQUFHLFNBQTBEO3dCQUMvRSxRQUFRLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDOzs7O3dCQUc3QixRQUFRLENBQUMsR0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDOzs7Ozs7S0FFekI7SUFFWSxrREFBa0IsR0FBL0IsVUFBZ0MsR0FBVyxFQUFFLFFBQTJDOzs7Ozs7O3dCQUVuRSxxQkFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsdUJBQXVCLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxFQUFBOzt3QkFBNUUsSUFBSSxHQUFHLFNBQXFFO3dCQUNsRixRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDOzs7O3dCQUdyQixRQUFRLENBQUMsR0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDOzs7Ozs7S0FFekI7SUFFWSxnREFBZ0IsR0FBN0IsVUFBOEIsR0FBVyxFQUFFLFFBQW9EOzs7Ozs7O3dCQUVsRSxxQkFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQUMscUJBQXFCLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxFQUFBOzt3QkFBbEYsWUFBWSxHQUFHLFNBQW1FO3dCQUN4RixRQUFRLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDOzs7O3dCQUc3QixRQUFRLENBQUMsR0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDOzs7Ozs7S0FFekI7SUFDTCw0QkFBQztBQUFELENBQUMsQUEvREQsSUErREM7QUEvRFksc0RBQXFCIn0=
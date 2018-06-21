"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Product_1 = require("../entities/Product");
var TableGateway_1 = require("../../src/TableGateway");
var ProductsGateway = /** @class */ (function () {
    function ProductsGateway(connectionPool) {
        this.tableName = 'products';
        this.tableGateway = new TableGateway_1.TableGateway(connectionPool, this.tableName);
        this.tableGateway.setCreatedColumnName('created');
        this.tableGateway.setUpdatedColumnName('updated');
    }
    ProductsGateway.prototype.createRow = function (product, callback) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var row, insertId, e_1, err;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        row = ProductsGateway.mapProductToRow(product);
                        return [4 /*yield*/, this.tableGateway.createRowWithPromise(row)];
                    case 1:
                        insertId = _a.sent();
                        callback(null, insertId);
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        err = e_1;
                        callback(err, null);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProductsGateway.prototype.retrieveRow = function (id, callback) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var row, product, e_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.tableGateway.retrieveRowWithPromise(id)];
                    case 1:
                        row = _a.sent();
                        product = ProductsGateway.mapRowToProduct(row);
                        callback(null, product);
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
    ProductsGateway.prototype.updateRow = function (product, callback) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var row, affectedRows, e_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        row = ProductsGateway.mapProductToRow(product);
                        return [4 /*yield*/, this.tableGateway.updateRowWithPromise(row)];
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
    ProductsGateway.prototype.deleteRow = function (id, callback) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var affectedRows, e_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.tableGateway.deleteRowWithPromise(id)];
                    case 1:
                        affectedRows = _a.sent();
                        callback(null, affectedRows);
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
    ProductsGateway.prototype.retrieveByDescription = function (description, callback) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var rows, products_1, e_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.tableGateway.retrieveRowsByWithPromise('description', description)];
                    case 1:
                        rows = _a.sent();
                        products_1 = [];
                        rows.map(function (row) {
                            var product = ProductsGateway.mapRowToProduct(row);
                            products_1.push(product);
                        });
                        callback(null, products_1);
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
    ProductsGateway.prototype.retrieveByIds = function (ids, callback) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var rows, products_2, e_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.tableGateway.retrieveRowsByIdsWithPromise(ids)];
                    case 1:
                        rows = _a.sent();
                        products_2 = [];
                        rows.map(function (row) {
                            var p = ProductsGateway.mapRowToProduct(row);
                            products_2.push(p);
                        });
                        callback(null, products_2);
                        return [3 /*break*/, 3];
                    case 2:
                        e_6 = _a.sent();
                        callback(e_6, null);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProductsGateway.prototype.retrieveByNullDescription = function (callback) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var rows, products_3, e_7;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.tableGateway.retrieveRowsByIsNullWithPromise('description')];
                    case 1:
                        rows = _a.sent();
                        products_3 = [];
                        rows.map(function (row) {
                            var p = ProductsGateway.mapRowToProduct(row);
                            products_3.push(p);
                        });
                        callback(null, products_3);
                        return [3 /*break*/, 3];
                    case 2:
                        e_7 = _a.sent();
                        callback(e_7, null);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProductsGateway.prototype.retrieveByDescriptionNotEqual = function (description, callback) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var gateway, rows, products_4, e_8;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        gateway = this.tableGateway;
                        return [4 /*yield*/, gateway.retrieveRowsByNotEqualWithPromise('description', description)];
                    case 1:
                        rows = _a.sent();
                        products_4 = [];
                        rows.map(function (row) {
                            var p = ProductsGateway.mapRowToProduct(row);
                            products_4.push(p);
                        });
                        callback(null, products_4);
                        return [3 /*break*/, 3];
                    case 2:
                        e_8 = _a.sent();
                        callback(e_8, null);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProductsGateway.prototype.setDescriptionNullWhereNameIs = function (value, callback) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var affectedRows, e_9;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.tableGateway.setFieldNullWhereWithPromise('description', value)];
                    case 1:
                        affectedRows = _a.sent();
                        callback(null, affectedRows);
                        return [3 /*break*/, 3];
                    case 2:
                        e_9 = _a.sent();
                        callback(e_9, null);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProductsGateway.prototype.deleteWhereNameIs = function (name, callback) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var affectedRows, e_10;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.tableGateway.deleteRowsByWithPromise('name', name)];
                    case 1:
                        affectedRows = _a.sent();
                        callback(null, affectedRows);
                        return [3 /*break*/, 3];
                    case 2:
                        e_10 = _a.sent();
                        callback(e_10, null);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProductsGateway.prototype.countProductsByName = function (name, callback) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var count, e_11;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.tableGateway.countRowsByValueWithPromise('name', name)];
                    case 1:
                        count = _a.sent();
                        callback(null, count);
                        return [3 /*break*/, 3];
                    case 2:
                        e_11 = _a.sent();
                        callback(e_11, null);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProductsGateway.mapProductToRow = function (product) {
        return {
            'id': product.getId(),
            'name': product.getName(),
            'description': product.getDescription(),
            'price': product.getPrice(),
            'created': product.getCreated(),
            'updated': product.getUpdated()
        };
    };
    ProductsGateway.mapRowToProduct = function (row) {
        if (row == null) {
            return null;
        }
        var product = new Product_1.Product();
        product.setId(row['id']);
        product.setName(row['name']);
        product.setDescription(row['description']);
        product.setPrice(row['price']);
        product.setCreated(row['created']);
        product.setUpdated(row['updated']);
        return product;
    };
    return ProductsGateway;
}());
exports.ProductsGateway = ProductsGateway;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZHVjdHNHYXRld2F5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiUHJvZHVjdHNHYXRld2F5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLCtDQUE0QztBQUM1Qyx1REFBb0Q7QUFFcEQ7SUFJSSx5QkFBWSxjQUFvQjtRQUh4QixjQUFTLEdBQVcsVUFBVSxDQUFDO1FBSW5DLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSwyQkFBWSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsWUFBWSxDQUFDLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFWSxtQ0FBUyxHQUF0QixVQUF1QixPQUFnQixFQUFFLFFBQWdEOzs7Ozs7O3dCQUU3RSxHQUFHLEdBQUcsZUFBZSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDbEMscUJBQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsRUFBQTs7d0JBQTVELFFBQVEsR0FBRyxTQUFpRDt3QkFDbEUsUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQzs7Ozt3QkFHbkIsR0FBRyxHQUFVLEdBQUMsQ0FBQzt3QkFDckIsUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQzs7Ozs7O0tBRTNCO0lBRVkscUNBQVcsR0FBeEIsVUFBeUIsRUFBVSxFQUFFLFFBQWdEOzs7Ozs7O3dCQUU3RCxxQkFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLHNCQUFzQixDQUFDLEVBQUUsQ0FBQyxFQUFBOzt3QkFBNUQsR0FBRyxHQUFPLFNBQWtEO3dCQUM1RCxPQUFPLEdBQUcsZUFBZSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDckQsUUFBUSxDQUFDLElBQUksRUFBRSxP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
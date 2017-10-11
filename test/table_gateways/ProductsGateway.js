"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Product_1 = require("../entities/Product");
var TableGateway_1 = require("../../src/TableGateway");
var ProductsGateway = (function () {
    function ProductsGateway(connectionPool) {
        this.tableName = 'products';
        this.tableGateway = new TableGateway_1.TableGateway(connectionPool, this.tableName);
        this.tableGateway.setCreatedColumnName('created');
        this.tableGateway.setUpdatedColumnName('updated');
    }
    ProductsGateway.prototype.createRow = function (product, callback) {
        var row = ProductsGateway.mapProductToRow(product);
        this.tableGateway.createRow(row, callback);
    };
    ProductsGateway.prototype.retrieveRow = function (id, callback) {
        this.tableGateway.retrieveRow(id, retrieveRowCallback);
        function retrieveRowCallback(err, row) {
            if (err) {
                callback(err, null);
            }
            else if (row) {
                var product = ProductsGateway.mapRowToProduct(row);
                callback(null, product);
            }
            else {
                callback(null, null);
            }
        }
    };
    ProductsGateway.prototype.updateRow = function (product, callback) {
        var row = ProductsGateway.mapProductToRow(product);
        this.tableGateway.updateRow(row, updateRowCallback);
        function updateRowCallback(err, affectedRows) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, affectedRows);
            }
        }
    };
    ProductsGateway.prototype.deleteRow = function (id, callback) {
        this.tableGateway.deleteRow(id, callback);
    };
    ProductsGateway.prototype.retrieveByDescription = function (description, callback) {
        this.tableGateway.retrieveRowsBy('description', description, retrieveRowsCallback);
        function retrieveRowsCallback(err, rows) {
            if (err) {
                callback(err, null);
            }
            else {
                var products = [];
                for (var i = 0; i < rows.length; i++) {
                    var product = ProductsGateway.mapRowToProduct(rows[i]);
                    products.push(product);
                }
                callback(null, products);
            }
        }
    };
    ProductsGateway.prototype.retrieveByIds = function (ids, callback) {
        this.tableGateway.retrieveRowsByIds(ids, retrieveRowsCallback);
        function retrieveRowsCallback(err, rows) {
            if (err) {
                callback(err, null);
            }
            else {
                var products = [];
                for (var i = 0; i < rows.length; i++) {
                    var p = ProductsGateway.mapRowToProduct(rows[i]);
                    products.push(p);
                }
                callback(null, products);
            }
        }
    };
    ProductsGateway.prototype.retrieveByNullDescription = function (callback) {
        this.tableGateway.retrieveRowsByIsNull('description', retrieveCallback);
        function retrieveCallback(err, rows) {
            if (err) {
                callback(err, null);
            }
            else {
                var products = [];
                for (var i = 0; i < rows.length; i++) {
                    var p = ProductsGateway.mapRowToProduct(rows[i]);
                    products.push(p);
                }
                callback(null, products);
            }
        }
    };
    ProductsGateway.prototype.retrieveByDescriptionNotEqual = function (description, callback) {
        this.tableGateway.retrieveRowsByNotEqual('description', description, retrieveRowsCallback);
        function retrieveRowsCallback(err, rows) {
            if (err) {
                callback(err, null);
            }
            else {
                var products = [];
                for (var i = 0; i < rows.length; i++) {
                    var p = ProductsGateway.mapRowToProduct(rows[i]);
                    products.push(p);
                }
                callback(null, products);
            }
        }
    };
    ProductsGateway.prototype.setDescriptionNullWhereNameIs = function (value, callback) {
        this.tableGateway.setFieldNullWhere('description', value, setFieldNullCallback);
        function setFieldNullCallback(err, affectedRows) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, affectedRows);
            }
        }
    };
    ProductsGateway.prototype.deleteWhereNameIs = function (name, callback) {
        this.tableGateway.deleteRowsBy('name', name, setFieldNullCallback);
        function setFieldNullCallback(err, affectedRows) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, affectedRows);
            }
        }
    };
    ProductsGateway.prototype.countProductsByName = function (name, callback) {
        this.tableGateway.countRowsByValue('name', name, countRowsByValueCallback);
        function countRowsByValueCallback(err, count) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, count);
            }
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZHVjdHNHYXRld2F5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiUHJvZHVjdHNHYXRld2F5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsK0NBQTRDO0FBQzVDLHVEQUFvRDtBQUdwRDtJQUlJLHlCQUFZLGNBQXFCO1FBSHpCLGNBQVMsR0FBVyxVQUFVLENBQUM7UUFJbkMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLDJCQUFZLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsWUFBWSxDQUFDLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxZQUFZLENBQUMsb0JBQW9CLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVNLG1DQUFTLEdBQWhCLFVBQWlCLE9BQWdCLEVBQUUsUUFBZ0Q7UUFDL0UsSUFBSSxHQUFHLEdBQUcsZUFBZSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVNLHFDQUFXLEdBQWxCLFVBQW1CLEVBQVUsRUFBRSxRQUFnRDtRQUMzRSxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztRQUV2RCw2QkFBNkIsR0FBVSxFQUFFLEdBQWE7WUFDbEQsRUFBRSxDQUFBLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDTCxRQUFRLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3hCLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDWixJQUFJLE9BQU8sR0FBRyxlQUFlLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNuRCxRQUFRLENBQUMsSUFB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
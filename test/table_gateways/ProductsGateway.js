"use strict";
var Product = require('../entities/Product');
var TableGateway = require('../../src/TableGateway');
var ProductsGateway = (function () {
    function ProductsGateway(connectionPool) {
        this.tableName = 'products';
        this.tableGateway = new TableGateway(connectionPool, this.tableName);
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
        var product = new Product();
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
module.exports = ProductsGateway;

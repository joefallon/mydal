"use strict";
require('../config/global_before');
var Product = require('../entities/Product');
var ProductsGatewayFactory = require('./ProductsGatewayFactory');
var chai = require('chai');
var assert = chai.assert;
describe('ProductsGateway', function () {
    describe('#createRow and #retrieveRow', function () {
        it('creates and retrieves a row in the database', function (done) {
            var product = new Product();
            product.setDescription('test desc');
            product.setName('test name');
            product.setPrice(1.11);
            var productsGateway = ProductsGatewayFactory.create();
            var id = 0;
            productsGateway.createRow(product, retrieveRow);
            function retrieveRow(err, insertId) {
                if (err) {
                    assert.fail(null, null, err.message);
                    done();
                }
                else {
                    id = insertId;
                    productsGateway.retrieveRow(insertId, verifyRetrievedRow);
                }
            }
            function verifyRetrievedRow(err, product) {
                if (err) {
                    assert.fail(null, null, err.message);
                }
                else {
                    assert.equal(product.getDescription(), 'test desc');
                    assert.equal(product.getId(), id);
                    assert.equal(product.getName(), 'test name');
                    assert.equal(product.getPrice(), 1.11);
                    assert.isAbove(product.getId(), 0);
                    assert.isAbove(product.getCreated().length, 0);
                    assert.isAbove(product.getUpdated().length, 0);
                    assert.notEqual(product.getCreated(), '0000-00-00 00:00:00');
                    assert.notEqual(product.getUpdated(), '0000-00-00 00:00:00');
                }
                done();
            }
        });
    });
    describe('#updateRow', function () {
        it('updates a row in the database', function (done) {
            var product = new Product();
            product.setDescription('test update');
            product.setName('name update');
            product.setPrice(1.11);
            var id = null;
            var productsGateway = ProductsGatewayFactory.create();
            productsGateway.createRow(product, retrieveRow);
            function retrieveRow(err, insertId) {
                if (err) {
                    assert.fail(null, null, err.message);
                    done();
                }
                else {
                    id = insertId;
                    productsGateway.retrieveRow(id, updateRetrievedRow);
                }
            }
            function updateRetrievedRow(err, product) {
                if (err) {
                    assert.fail(null, null, err.message);
                    done();
                }
                else {
                    product.setDescription('updated desc');
                    product.setName('updated name');
                    product.setPrice(2.22);
                    productsGateway.updateRow(product, retrieveUpdatedRow);
                }
            }
            function retrieveUpdatedRow(err, affectedRows) {
                if (err) {
                    assert.fail(null, null, err.message);
                    done();
                }
                else {
                    assert.equal(affectedRows, 1, 'affected rows');
                    productsGateway.retrieveRow(id, verifyUpdatedRow);
                }
            }
            function verifyUpdatedRow(err, product) {
                if (err) {
                    assert.fail(null, null, err.message);
                }
                else {
                    assert.equal(product.getDescription(), 'updated desc');
                    assert.equal(product.getId(), id);
                    assert.equal(product.getName(), 'updated name');
                    assert.equal(product.getPrice(), 2.22);
                    assert.isAbove(product.getId(), 0);
                    assert.isAbove(product.getCreated().length, 0);
                    assert.isAbove(product.getUpdated().length, 0);
                    assert.notEqual(product.getCreated(), '0000-00-00 00:00:00');
                    assert.notEqual(product.getUpdated(), '0000-00-00 00:00:00');
                }
                done();
            }
        });
    });
    describe('#deleteRow', function () {
        it('deletes a row in the database', function (done) {
            var product = new Product();
            product.setDescription('test delete');
            product.setName('name delete');
            product.setPrice(1.11);
            var id = null;
            var productsGateway = ProductsGatewayFactory.create();
            productsGateway.createRow(product, retrieveRow);
            function retrieveRow(err, insertId) {
                if (err) {
                    assert.fail(null, null, err.message);
                    done();
                }
                else {
                    id = insertId;
                    productsGateway.retrieveRow(id, deleteRow);
                }
            }
            function deleteRow(err, product) {
                if (err) {
                    assert.fail(null, null, err.message);
                    done();
                }
                else {
                    productsGateway.deleteRow(id, retrieveDeletedRow);
                }
            }
            function retrieveDeletedRow(err, affectedRows) {
                if (err) {
                    assert.fail(null, null, err.message);
                    done();
                }
                else {
                    assert.equal(affectedRows, 1);
                    productsGateway.retrieveRow(id, verifyRowDeleted);
                }
            }
            function verifyRowDeleted(err, product) {
                if (err) {
                    assert.fail(null, null, err.message);
                    done();
                }
                else {
                    assert.isNull(product);
                }
                done();
            }
        });
    });
    describe('#retrieveRowsBy', function () {
        it('retrieves all rows with the given field value', function (done) {
            var product1 = new Product();
            product1.setName('retrieveRowsBy1');
            product1.setDescription('retrieveRowsByDesc');
            product1.setPrice(1.11);
            var product2 = new Product();
            product2.setName('retrieveRowsBy2');
            product2.setDescription('retrieveRowsByDesc');
            product2.setPrice(2.22);
            var productsGateway = ProductsGatewayFactory.create();
            var id1 = null;
            var id2 = null;
            productsGateway.createRow(product1, createProduct1RowCallback);
            productsGateway.createRow(product2, createProduct2RowCallback);
            function createProduct1RowCallback(err, insertId) {
                if (err) {
                    assert.fail(null, null, err.message);
                    done();
                }
                else {
                    id1 = insertId;
                    retrieveRows();
                }
            }
            function createProduct2RowCallback(err, insertId) {
                if (err) {
                    assert.fail(null, null, err.message);
                    done();
                }
                else {
                    id2 = insertId;
                    retrieveRows();
                }
            }
            function retrieveRows() {
                if (id1 > 0 && id2 > 0) {
                    var description = 'retrieveRowsByDesc';
                    productsGateway.retrieveByDescription(description, verifyRetrievedRows);
                }
            }
            function verifyRetrievedRows(err, products) {
                if (err) {
                    assert.fail(null, null, err.message);
                    done();
                }
                else {
                    var p1 = products[0];
                    assert.equal(p1.getId(), id1);
                    var p2 = products[1];
                    assert.equal(p2.getId(), id2);
                    done();
                }
            }
        });
    });
    describe('#retrieveRowsByIds', function () {
        it('retrieves products given an array of ids', function (done) {
            var product1 = new Product();
            product1.setName('retrieveRowsByIds1');
            product1.setDescription('retrieve ids desc');
            product1.setPrice(1.11);
            var product2 = new Product();
            product2.setName('retrieveRowsByIds2');
            product2.setDescription('retrieve ids desc');
            product2.setPrice(2.22);
            var productsGateway = ProductsGatewayFactory.create();
            var id1 = null;
            var id2 = null;
            productsGateway.createRow(product1, createProduct1RowCallback);
            productsGateway.createRow(product2, createProduct2RowCallback);
            function createProduct1RowCallback(err, insertId) {
                if (err) {
                    assert.fail(null, null, err.message);
                    done();
                }
                else {
                    id1 = insertId;
                    retrieveRows();
                }
            }
            function createProduct2RowCallback(err, insertId) {
                if (err) {
                    assert.fail(null, null, err.message);
                    done();
                }
                else {
                    id2 = insertId;
                    retrieveRows();
                }
            }
            function retrieveRows() {
                if (id1 > 0 && id2 > 0) {
                    var ids = [id1, id2];
                    productsGateway.retrieveByIds(ids, verifyRetrievedRows);
                }
            }
            function verifyRetrievedRows(err, products) {
                if (err) {
                    assert.fail(null, null, err.message);
                    done();
                }
                else {
                    var p1 = products[0];
                    assert.equal(p1.getId(), id1);
                    var p2 = products[1];
                    assert.equal(p2.getId(), id2);
                    done();
                }
            }
        });
    });
    describe('#retrieveRowsByIsNull', function () {
        it('retrieves products with a NULL description', function (done) {
            var product1 = new Product();
            product1.setName('retrieveRowsByIds1');
            product1.setPrice(1.11);
            var product2 = new Product();
            product2.setName('retrieveRowsByIds2');
            product2.setPrice(2.22);
            var productsGateway = ProductsGatewayFactory.create();
            var id1 = null;
            var id2 = null;
            productsGateway.createRow(product1, createProduct1RowCallback);
            productsGateway.createRow(product2, createProduct2RowCallback);
            function createProduct1RowCallback(err, insertId) {
                if (err) {
                    assert.fail(null, null, err.message);
                    done();
                }
                else {
                    id1 = insertId;
                    retrieveRows();
                }
            }
            function createProduct2RowCallback(err, insertId) {
                if (err) {
                    assert.fail(null, null, err.message);
                    done();
                }
                else {
                    id2 = insertId;
                    retrieveRows();
                }
            }
            function retrieveRows() {
                if (id1 > 0 && id2 > 0) {
                    productsGateway.retrieveByNullDescription(verifyRetrievedRows);
                }
            }
            function verifyRetrievedRows(err, products) {
                if (err) {
                    assert.fail(null, null, err.message);
                    done();
                }
                else {
                    var p1 = products[0];
                    assert.equal(p1.getId(), id1);
                    var p2 = products[1];
                    assert.equal(p2.getId(), id2);
                    done();
                }
            }
        });
    });
    describe('#retrieveRowsByNotEqual', function () {
        it('retrieves products where the description does not equal the given value', function (done) {
            var product1 = new Product();
            product1.setName('retrieve not equal 1');
            product1.setDescription('description 1');
            product1.setPrice(1.11);
            var product2 = new Product();
            product2.setName('retrieve not equal 2');
            product2.setDescription('description 2');
            product2.setPrice(2.22);
            var productsGateway = ProductsGatewayFactory.create();
            var id1 = null;
            var id2 = null;
            productsGateway.createRow(product1, createProduct1RowCallback);
            productsGateway.createRow(product2, createProduct2RowCallback);
            function createProduct1RowCallback(err, insertId) {
                if (err) {
                    assert.fail(null, null, err.message);
                    done();
                }
                else {
                    id1 = insertId;
                    retrieveRows();
                }
            }
            function createProduct2RowCallback(err, insertId) {
                if (err) {
                    assert.fail(null, null, err.message);
                    done();
                }
                else {
                    id2 = insertId;
                    retrieveRows();
                }
            }
            function retrieveRows() {
                if (id1 > 0 && id2 > 0) {
                    var desc = 'description 1';
                    productsGateway.retrieveByDescriptionNotEqual(desc, verifyRetrievedRow);
                }
            }
            function verifyRetrievedRow(err, products) {
                if (err) {
                    assert.fail(null, null, err.message);
                    done();
                }
                else {
                    assert.isAbove(products.length, 0);
                    done();
                }
            }
        });
    });
    describe('#setFieldNullWhere', function () {
        it('sets the description null where', function (done) {
            var product1 = new Product();
            product1.setName('retrieve not equal 1');
            product1.setDescription('null description 1');
            product1.setPrice(1.11);
            var product2 = new Product();
            product2.setName('retrieve not equal 2');
            product2.setDescription('null description 2');
            product2.setPrice(2.22);
            var productsGateway = ProductsGatewayFactory.create();
            var id1 = null;
            var id2 = null;
            productsGateway.createRow(product1, createProduct1RowCallback);
            productsGateway.createRow(product2, createProduct2RowCallback);
            function createProduct1RowCallback(err, insertId) {
                if (err) {
                    assert.fail(null, null, err.message);
                    done();
                }
                else {
                    id1 = insertId;
                    retrieveRows();
                }
            }
            function createProduct2RowCallback(err, insertId) {
                if (err) {
                    assert.fail(null, null, err.message);
                    done();
                }
                else {
                    id2 = insertId;
                    retrieveRows();
                }
            }
            function retrieveRows() {
                if (id1 > 0 && id2 > 0) {
                    var desc = 'null description 2';
                    productsGateway.setDescriptionNullWhereNameIs(desc, retrieveNullRows);
                }
            }
            function retrieveNullRows(err, affectedRows) {
                if (err) {
                    assert.fail(null, null, err.message);
                    done();
                }
                else {
                    assert.equal(affectedRows, 1);
                    productsGateway.retrieveByIds([id1, id2], verifyRows);
                }
            }
            function verifyRows(err, products) {
                if (err) {
                    assert.fail(null, null, err.message);
                    done();
                }
                else {
                    var p1 = products[0];
                    assert.equal(p1.getDescription(), 'null description 1');
                    var p2 = products[1];
                    assert.equal(p2.getDescription(), null);
                    done();
                }
            }
        });
    });
    describe('#deleteRowsBy', function () {
        it('deletes rows where name is', function (done) {
            var product1 = new Product();
            product1.setName('deletes rows name 1');
            product1.setDescription('description 1');
            product1.setPrice(1.11);
            var product2 = new Product();
            product2.setName('deletes rows name 2');
            product2.setDescription('description 2');
            product2.setPrice(2.22);
            var productsGateway = ProductsGatewayFactory.create();
            var id1 = null;
            var id2 = null;
            productsGateway.createRow(product1, createProduct1RowCallback);
            productsGateway.createRow(product2, createProduct2RowCallback);
            function createProduct1RowCallback(err, insertId) {
                if (err) {
                    assert.fail(null, null, err.message);
                    done();
                }
                else {
                    id1 = insertId;
                    deleteRows();
                }
            }
            function createProduct2RowCallback(err, insertId) {
                if (err) {
                    assert.fail(null, null, err.message);
                    done();
                }
                else {
                    id2 = insertId;
                    deleteRows();
                }
            }
            function deleteRows() {
                if (id1 > 0 && id2 > 0) {
                    var desc = 'deletes rows name 1';
                    productsGateway.deleteWhereNameIs(desc, retrieveRows);
                }
            }
            function retrieveRows(err, affectedRows) {
                if (err) {
                    assert.fail(null, null, err.message);
                    done();
                }
                else {
                    assert.equal(affectedRows, 1);
                    productsGateway.retrieveByIds([id1, id2], verifyRows);
                }
            }
            function verifyRows(err, products) {
                if (err) {
                    assert.fail(null, null, err.message);
                    done();
                }
                else {
                    assert.equal(products.length, 1);
                    var p1 = products[0];
                    assert.equal(p1.getDescription(), 'description 2');
                    done();
                }
            }
        });
    });
    describe('#countRowsByValue', function () {
        it('counts the number of rows where the name is', function (done) {
            var product1 = new Product();
            product1.setName('name 1');
            product1.setDescription('description 1');
            product1.setPrice(1.11);
            var product2 = new Product();
            product2.setName('name 2');
            product2.setDescription('description 2');
            product2.setPrice(2.22);
            var productsGateway = ProductsGatewayFactory.create();
            var id1 = null;
            var id2 = null;
            productsGateway.createRow(product1, createProduct1RowCallback);
            productsGateway.createRow(product2, createProduct2RowCallback);
            function createProduct1RowCallback(err, insertId) {
                if (err) {
                    assert.fail(null, null, err.message);
                    done();
                }
                else {
                    id1 = insertId;
                    countRows();
                }
            }
            function createProduct2RowCallback(err, insertId) {
                if (err) {
                    assert.fail(null, null, err.message);
                    done();
                }
                else {
                    id2 = insertId;
                    countRows();
                }
            }
            function countRows() {
                if (id1 > 0 && id2 > 0) {
                    productsGateway.countProductsByName('name 1', verifyCount);
                }
            }
            function verifyCount(err, count) {
                if (err) {
                    assert.fail(null, null, err.message);
                    done();
                }
                else {
                    assert.equal(count, 1);
                    done();
                }
            }
        });
    });
});

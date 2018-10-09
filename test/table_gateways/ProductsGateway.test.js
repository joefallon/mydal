"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const Product_1 = require("../entities/Product");
const ProductsGatewayFactory_1 = require("./ProductsGatewayFactory");
describe('ProductsGateway', () => {
    describe('#createRow and #retrieveRow', () => {
        it('creates and retrieves a row in the database', (done) => {
            let product = new Product_1.Product();
            product.setDescription('test desc');
            product.setName('test name');
            product.setPrice(1.11);
            let productsGateway = ProductsGatewayFactory_1.ProductsGatewayFactory.create();
            let id = 0;
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
                    assert.ok(product.getId() > 0);
                    assert.ok(product.getCreated().length > 0);
                    assert.ok(product.getUpdated().length > 0);
                    assert.notEqual(product.getCreated(), '0000-00-00 00:00:00');
                    assert.notEqual(product.getUpdated(), '0000-00-00 00:00:00');
                }
                done();
            }
        });
    });
    describe('#updateRow', () => {
        it('updates a row in the database', (done) => {
            let product = new Product_1.Product();
            product.setDescription('test update');
            product.setName('name update');
            product.setPrice(1.11);
            let id = null;
            let productsGateway = ProductsGatewayFactory_1.ProductsGatewayFactory.create();
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
                    assert.ok(product.getId() > 0);
                    assert.ok(product.getCreated().length > 0);
                    assert.ok(product.getUpdated().length > 0);
                    assert.notEqual(product.getCreated(), '0000-00-00 00:00:00');
                    assert.notEqual(product.getUpdated(), '0000-00-00 00:00:00');
                }
                done();
            }
        });
    });
    describe('#deleteRow', () => {
        it('deletes a row in the database', (done) => {
            let product = new Product_1.Product();
            product.setDescription('test delete');
            product.setName('name delete');
            product.setPrice(1.11);
            let id = null;
            let productsGateway = ProductsGatewayFactory_1.ProductsGatewayFactory.create();
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
                    assert.equal(product, null);
                }
                done();
            }
        });
    });
    describe('#retrieveRowsBy', () => {
        it('retrieves all rows with the given field value', (done) => {
            let product1 = new Product_1.Product();
            product1.setName('retrieveRowsBy1');
            product1.setDescription('retrieveRowsByDesc');
            product1.setPrice(1.11);
            let product2 = new Product_1.Product();
            product2.setName('retrieveRowsBy2');
            product2.setDescription('retrieveRowsByDesc');
            product2.setPrice(2.22);
            let productsGateway = ProductsGatewayFactory_1.ProductsGatewayFactory.create();
            let id1 = null;
            let id2 = null;
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
                    // enforce ordering
                    if (id1 > id2) {
                        let temp = id1;
                        id1 = id2;
                        id2 = temp;
                    }
                    let description = 'retrieveRowsByDesc';
                    productsGateway.retrieveByDescription(description, verifyRetrievedRows);
                }
            }
            function verifyRetrievedRows(err, products) {
                if (err) {
                    assert.fail(null, null, err.message);
                    done();
                }
                else {
                    let p1 = products[0];
                    assert.equal(p1.getId(), id1, 'p1 id mismatch');
                    let p2 = products[1];
                    assert.equal(p2.getId(), id2, 'p2 id mismatch');
                    done();
                }
            }
        });
    });
    describe('#retrieveRowsByIds', () => {
        it('retrieves products given an array of ids', (done) => {
            let product1 = new Product_1.Product();
            product1.setName('retrieveRowsByIds1');
            product1.setDescription('retrieve ids desc');
            product1.setPrice(1.11);
            let product2 = new Product_1.Product();
            product2.setName('retrieveRowsByIds2');
            product2.setDescription('retrieve ids desc');
            product2.setPrice(2.22);
            let productsGateway = ProductsGatewayFactory_1.ProductsGatewayFactory.create();
            let id1 = null;
            let id2 = null;
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
                    // enforce ordering
                    if (id1 > id2) {
                        let temp = id1;
                        id1 = id2;
                        id2 = temp;
                    }
                    let ids = [id1, id2];
                    productsGateway.retrieveByIds(ids, verifyRetrievedRows);
                }
            }
            function verifyRetrievedRows(err, products) {
                if (err) {
                    assert.fail(null, null, err.message);
                    done();
                }
                else {
                    let p1 = products[0];
                    assert.equal(p1.getId(), id1);
                    let p2 = products[1];
                    assert.equal(p2.getId(), id2);
                    done();
                }
            }
        });
    });
    describe('#retrieveRowsByIsNull', () => {
        it('retrieves products with a NULL description', (done) => {
            let product1 = new Product_1.Product();
            product1.setName('retrieveRowsByIds1');
            product1.setPrice(1.11);
            let product2 = new Product_1.Product();
            product2.setName('retrieveRowsByIds2');
            product2.setPrice(2.22);
            let productsGateway = ProductsGatewayFactory_1.ProductsGatewayFactory.create();
            let id1 = null;
            let id2 = null;
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
                    // enforce ordering
                    if (id1 > id2) {
                        let temp = id1;
                        id1 = id2;
                        id2 = temp;
                    }
                    productsGateway.retrieveByNullDescription(verifyRetrievedRows);
                }
            }
            function verifyRetrievedRows(err, products) {
                if (err) {
                    assert.fail(null, null, err.message);
                    done();
                }
                else {
                    let p1 = products[0];
                    assert.equal(p1.getId(), id1, 'p1 id mismatch');
                    let p2 = products[1];
                    assert.equal(p2.getId(), id2, 'p2 id mismatch');
                    done();
                }
            }
        });
    });
    describe('#retrieveRowsByNotEqual', () => {
        it('retrieves products where the description does not equal the given value', (done) => {
            let product1 = new Product_1.Product();
            product1.setName('retrieve not equal 1');
            product1.setDescription('description 1');
            product1.setPrice(1.11);
            let product2 = new Product_1.Product();
            product2.setName('retrieve not equal 2');
            product2.setDescription('description 2');
            product2.setPrice(2.22);
            let productsGateway = ProductsGatewayFactory_1.ProductsGatewayFactory.create();
            let id1 = null;
            let id2 = null;
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
                    // enforce ordering
                    if (id1 > id2) {
                        let temp = id1;
                        id1 = id2;
                        id2 = temp;
                    }
                    let desc = 'description 1';
                    productsGateway.retrieveByDescriptionNotEqual(desc, verifyRetrievedRow);
                }
            }
            function verifyRetrievedRow(err, products) {
                if (err) {
                    assert.fail(null, null, err.message);
                    done();
                }
                else {
                    assert.ok(products.length > 0);
                    done();
                }
            }
        });
    });
    describe('#setFieldNullWhere', () => {
        it('sets the description null where', (done) => {
            let product1 = new Product_1.Product();
            product1.setName('retrieve not equal 1');
            product1.setDescription('null description 1');
            product1.setPrice(1.11);
            let product2 = new Product_1.Product();
            product2.setName('retrieve not equal 2');
            product2.setDescription('null description 2');
            product2.setPrice(2.22);
            let productsGateway = ProductsGatewayFactory_1.ProductsGatewayFactory.create();
            let id1 = null;
            let id2 = null;
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
                    let desc = 'null description 2';
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
                    productsGateway.retrieveRow(id1, verifyRow1);
                    // productsGateway.retrieveByIds([id1, id2], verifyRows);
                }
            }
            function verifyRow1(err, product) {
                if (err) {
                    assert.fail(null, null, err.message);
                    done();
                }
                else {
                    assert.equal(product.getDescription(), 'null description 1');
                    productsGateway.retrieveRow(id2, verifyRow2);
                }
            }
            function verifyRow2(err, product) {
                if (err) {
                    assert.fail(null, null, err.message);
                }
                else {
                    assert.equal(product.getDescription(), null);
                }
                done();
            }
        });
    });
    describe('#deleteRowsBy', () => {
        it('deletes rows where name is', (done) => {
            let product1 = new Product_1.Product();
            product1.setName('deletes rows name 1');
            product1.setDescription('description 1');
            product1.setPrice(1.11);
            let product2 = new Product_1.Product();
            product2.setName('deletes rows name 2');
            product2.setDescription('description 2');
            product2.setPrice(2.22);
            let productsGateway = ProductsGatewayFactory_1.ProductsGatewayFactory.create();
            let id1 = null;
            let id2 = null;
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
                    // enforce ordering
                    if (id1 > id2) {
                        let temp = id1;
                        id1 = id2;
                        id2 = temp;
                    }
                    let desc = 'deletes rows name 1';
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
                    let p1 = products[0];
                    assert.equal(p1.getDescription(), 'description 2');
                    done();
                }
            }
        });
    });
    describe('#countRowsByValue', () => {
        it('counts the number of rows where the name is', (done) => {
            let product1 = new Product_1.Product();
            product1.setName('name 1');
            product1.setDescription('description 1');
            product1.setPrice(1.11);
            let product2 = new Product_1.Product();
            product2.setName('name 2');
            product2.setDescription('description 2');
            product2.setPrice(2.22);
            let productsGateway = ProductsGatewayFactory_1.ProductsGatewayFactory.create();
            let id1 = null;
            let id2 = null;
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
                    // enforce ordering
                    if (id1 > id2) {
                        let temp = id1;
                        id1 = id2;
                        id2 = temp;
                    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZHVjdHNHYXRld2F5LnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJQcm9kdWN0c0dhdGV3YXkudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlDQUFrQztBQUNsQyxpREFBNEM7QUFDNUMscUVBQWdFO0FBRWhFLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLEVBQUU7SUFFN0IsUUFBUSxDQUFDLDZCQUE2QixFQUFFLEdBQUcsRUFBRTtRQUV6QyxFQUFFLENBQUMsNkNBQTZDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUN2RCxJQUFJLE9BQU8sR0FBRyxJQUFJLGlCQUFPLEVBQUUsQ0FBQztZQUM1QixPQUFPLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3BDLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDN0IsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUV2QixJQUFJLGVBQWUsR0FBRywrQ0FBc0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN0RCxJQUFJLEVBQUUsR0FBVyxDQUFDLENBQUM7WUFDbkIsZUFBZSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFFaEQsU0FBUyxXQUFXLENBQUMsR0FBVSxFQUFFLFFBQWdCO2dCQUM3QyxJQUFHLEdBQUcsRUFBRTtvQkFDSixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUNyQyxJQUFJLEVBQUUsQ0FBQztpQkFDVjtxQkFBTTtvQkFDSCxFQUFFLEdBQUcsUUFBUSxDQUFDO29CQUNkLGVBQWUsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLGtCQUFrQixDQUFDLENBQUM7aUJBQzdEO1lBQ0wsQ0FBQztZQUVELFNBQVMsa0JBQWtCLENBQUMsR0FBVSxFQUFFLE9BQWdCO2dCQUNwRCxJQUFHLEdBQUcsRUFB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
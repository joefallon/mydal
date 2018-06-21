"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var Product_1 = require("../entities/Product");
var ProductsGatewayFactory_1 = require("./ProductsGatewayFactory");
describe('ProductsGateway', function () {
    describe('#createRow and #retrieveRow', function () {
        it('creates and retrieves a row in the database', function (done) {
            var product = new Product_1.Product();
            product.setDescription('test desc');
            product.setName('test name');
            product.setPrice(1.11);
            var productsGateway = ProductsGatewayFactory_1.ProductsGatewayFactory.create();
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
    describe('#updateRow', function () {
        it('updates a row in the database', function (done) {
            var product = new Product_1.Product();
            product.setDescription('test update');
            product.setName('name update');
            product.setPrice(1.11);
            var id = null;
            var productsGateway = ProductsGatewayFactory_1.ProductsGatewayFactory.create();
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
    describe('#deleteRow', function () {
        it('deletes a row in the database', function (done) {
            var product = new Product_1.Product();
            product.setDescription('test delete');
            product.setName('name delete');
            product.setPrice(1.11);
            var id = null;
            var productsGateway = ProductsGatewayFactory_1.ProductsGatewayFactory.create();
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
    describe('#retrieveRowsBy', function () {
        it('retrieves all rows with the given field value', function (done) {
            var product1 = new Product_1.Product();
            product1.setName('retrieveRowsBy1');
            product1.setDescription('retrieveRowsByDesc');
            product1.setPrice(1.11);
            var product2 = new Product_1.Product();
            product2.setName('retrieveRowsBy2');
            product2.setDescription('retrieveRowsByDesc');
            product2.setPrice(2.22);
            var productsGateway = ProductsGatewayFactory_1.ProductsGatewayFactory.create();
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
                    // enforce ordering
                    if (id1 > id2) {
                        var temp = id1;
                        id1 = id2;
                        id2 = temp;
                    }
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
                    assert.equal(p1.getId(), id1, 'p1 id mismatch');
                    var p2 = products[1];
                    assert.equal(p2.getId(), id2, 'p2 id mismatch');
                    done();
                }
            }
        });
    });
    describe('#retrieveRowsByIds', function () {
        it('retrieves products given an array of ids', function (done) {
            var product1 = new Product_1.Product();
            product1.setName('retrieveRowsByIds1');
            product1.setDescription('retrieve ids desc');
            product1.setPrice(1.11);
            var product2 = new Product_1.Product();
            product2.setName('retrieveRowsByIds2');
            product2.setDescription('retrieve ids desc');
            product2.setPrice(2.22);
            var productsGateway = ProductsGatewayFactory_1.ProductsGatewayFactory.create();
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
                    // enforce ordering
                    if (id1 > id2) {
                        var temp = id1;
                        id1 = id2;
                        id2 = temp;
                    }
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
            var product1 = new Product_1.Product();
            product1.setName('retrieveRowsByIds1');
            product1.setPrice(1.11);
            var product2 = new Product_1.Product();
            product2.setName('retrieveRowsByIds2');
            product2.setPrice(2.22);
            var productsGateway = ProductsGatewayFactory_1.ProductsGatewayFactory.create();
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
                    // enforce ordering
                    if (id1 > id2) {
                        var temp = id1;
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
                    var p1 = products[0];
                    assert.equal(p1.getId(), id1, 'p1 id mismatch');
                    var p2 = products[1];
                    assert.equal(p2.getId(), id2, 'p2 id mismatch');
                    done();
                }
            }
        });
    });
    describe('#retrieveRowsByNotEqual', function () {
        it('retrieves products where the description does not equal the given value', function (done) {
            var product1 = new Product_1.Product();
            product1.setName('retrieve not equal 1');
            product1.setDescription('description 1');
            product1.setPrice(1.11);
            var product2 = new Product_1.Product();
            product2.setName('retrieve not equal 2');
            product2.setDescription('description 2');
            product2.setPrice(2.22);
            var productsGateway = ProductsGatewayFactory_1.ProductsGatewayFactory.create();
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
                    // enforce ordering
                    if (id1 > id2) {
                        var temp = id1;
                        id1 = id2;
                        id2 = temp;
                    }
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
                    assert.ok(products.length > 0);
                    done();
                }
            }
        });
    });
    describe('#setFieldNullWhere', function () {
        it('sets the description null where', function (done) {
            var product1 = new Product_1.Product();
            product1.setName('retrieve not equal 1');
            product1.setDescription('null description 1');
            product1.setPrice(1.11);
            var product2 = new Product_1.Product();
            product2.setName('retrieve not equal 2');
            product2.setDescription('null description 2');
            product2.setPrice(2.22);
            var productsGateway = ProductsGatewayFactory_1.ProductsGatewayFactory.create();
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
    describe('#deleteRowsBy', function () {
        it('deletes rows where name is', function (done) {
            var product1 = new Product_1.Product();
            product1.setName('deletes rows name 1');
            product1.setDescription('description 1');
            product1.setPrice(1.11);
            var product2 = new Product_1.Product();
            product2.setName('deletes rows name 2');
            product2.setDescription('description 2');
            product2.setPrice(2.22);
            var productsGateway = ProductsGatewayFactory_1.ProductsGatewayFactory.create();
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
                    // enforce ordering
                    if (id1 > id2) {
                        var temp = id1;
                        id1 = id2;
                        id2 = temp;
                    }
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
            var product1 = new Product_1.Product();
            product1.setName('name 1');
            product1.setDescription('description 1');
            product1.setPrice(1.11);
            var product2 = new Product_1.Product();
            product2.setName('name 2');
            product2.setDescription('description 2');
            product2.setPrice(2.22);
            var productsGateway = ProductsGatewayFactory_1.ProductsGatewayFactory.create();
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
                    // enforce ordering
                    if (id1 > id2) {
                        var temp = id1;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZHVjdHNHYXRld2F5LnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJQcm9kdWN0c0dhdGV3YXkudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUFrQztBQUNsQywrQ0FBNEM7QUFDNUMsbUVBQWdFO0FBRWhFLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRTtJQUV4QixRQUFRLENBQUMsNkJBQTZCLEVBQUU7UUFFcEMsRUFBRSxDQUFDLDZDQUE2QyxFQUFFLFVBQUMsSUFBSTtZQUNuRCxJQUFJLE9BQU8sR0FBRyxJQUFJLGlCQUFPLEVBQUUsQ0FBQztZQUM1QixPQUFPLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3BDLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDN0IsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUV2QixJQUFJLGVBQWUsR0FBRywrQ0FBc0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN0RCxJQUFJLEVBQUUsR0FBVyxDQUFDLENBQUM7WUFDbkIsZUFBZSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFFaEQscUJBQXFCLEdBQVUsRUFBRSxRQUFnQjtnQkFDN0MsSUFBRyxHQUFHLEVBQUU7b0JBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDckMsSUFBSSxFQUFFLENBQUM7aUJBQ1Y7cUJBQU07b0JBQ0gsRUFBRSxHQUFHLFFBQVEsQ0FBQztvQkFDZCxlQUFlLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO2lCQUM3RDtZQUNMLENBQUM7WUFFRCw0QkFBNEIsR0FBVSxFQUFFLE9BQWdCO2dCQUNwRCxJQUFHLEdBQUcsRUFBRTtvQkFDSixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUN4QztxQkFBTTtvQkFDSCxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQztvQkFDcEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7b0JBQ2xDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFDO29CQUM3QyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFFdkMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQy9CLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDM0MsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUMzQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO29CQUM3RCxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO2lCQUNoRTtnQkFFRCxJQUFJLEVBQUUsQ0FBQztZQUNYLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLFlBQVksRUFBRTtRQUNuQixFQUFFLENBQUMsK0JBQStCLEVBQUUsVUFBQyxJQUFJO1lBQ3JDLElBQUksT0FBTyxHQUFHLElBQUksaUJBQU8sRUFBRSxDQUFDO1lBQzVCLE9BQU8sQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDdEMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUMvQixPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXZCLElBQUksRUFBRSxHQUFXLElBQUksQ0FBQztZQUN0QixJQUFJLGVBQWUsR0FBRywrQ0FBc0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUV0RCxlQUFlLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQztZQUVoRCxxQkFBcUIsR0FBVSxFQUFFLFFBQWdCO2dCQUM3QyxJQUFHLEdBQUcsRUFBRTtvQkFDSixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUNyQyxJQUFJLEVBQUUsQ0FBQztpQkFDVjtxQkFBTTtvQkFDSCxFQUFFLEdBQUcsUUFBUSxDQUFDO29CQUNkLGVBQWUsQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLGtCQUFrQixDQUFDLENBQUM7aUJBQ3ZEO1lBQ0wsQ0FBQztZQUVELDRCQUE0QixHQUFVLEVBQUUsT0FBZ0I7Z0JBQ3BELElBQUcsR0FBRyxFQUFFO29CQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3JDLElBQUksRUFBRSxDQUFDO2lCQUNWO3FCQUFNO29CQUNILE9BQU8sQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLENBQUM7b0JBQ3ZDLE9BQU8sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7b0JBQ2hDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3ZCLGVBQWUsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLGtCQUFrQixDQUFDLENBQUM7aUJBQzFEO1lBQ0wsQ0FBQztZQUVELDRCQUE0QixHQUFVLEVBQUUsWUFBb0I7Z0JBQ3hELElBQUcsR0FBRyxFQUFFO29CQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3JDLElBQUksRUFBRSxDQUFDO2lCQUNWO3FCQUFNO29CQUNILE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUMsRUFBRSxlQUFlLENBQUMsQ0FBQztvQkFDL0MsZUFBZSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztpQkFDckQ7WUFDTCxDQUFDO1lBRUQsMEJBQTBCLEdBQVUsRUFBRSxPQUFnQjtnQkFDbEQsSUFBRyxHQUFHLEVBQUU7b0JBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDeEM7cUJBQU07b0JBQ0gsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLEVBQUUsY0FBYyxDQUFDLENBQUM7b0JBQ3ZELE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUNsQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxjQUFjLENBQUMsQ0FBQztvQkFDaEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBRXZDLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUMvQixNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQzNDLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDM0MsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUscUJBQXFCLENBQUMsQ0FBQztvQkFDN0QsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUscUJBQXFCLENBQUMsQ0FBQztpQkFDaEU7Z0JBRUQsSUFBSSxFQUFFLENBQUM7WUFDWCxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxZQUFZLEVBQUU7UUFDbkIsRUFBRSxDQUFDLCtCQUErQixFQUFFLFVBQUMsSUFBSTtZQUNyQyxJQUFJLE9BQU8sR0FBRyxJQUFJLGlCQUFPLEVBQUUsQ0FBQztZQUM1QixPQUFPLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3RDLE9BQU8sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDL0IsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUV2QixJQUFJLEVBQUUsR0FBVyxJQUFJLENBQUM7WUFDdEIsSUFBSSxlQUFlLEdBQUcsK0NBQXNCLENBQUMsTUFBTSxFQUFFLENBQUM7WUFFdEQsZUFBZSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFFaEQscUJBQXFCLEdBQVUsRUFBRSxRQUFnQjtnQkFDN0MsSUFBRyxHQUFHLEVBQUU7b0JBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDckMsSUFBSSxFQUFFLENBQUM7aUJBQ1Y7cUJBQU07b0JBQ0gsRUFBRSxHQUFHLFFBQVEsQ0FBQztvQkFDZCxlQUFlLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQztpQkFDOUM7WUFDTCxDQUFDO1lBRUQsbUJBQW1CLEdBQVUsRUFBRSxPQUFnQjtnQkFDM0MsSUFBRyxHQUFHLEVBQUU7b0JBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDckMsSUFBSSxFQUFFLENBQUM7aUJBQ1Y7cUJBQU07b0JBQ0gsZUFBZSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztpQkFDckQ7WUFDTCxDQUFDO1lBRUQsNEJBQTRCLEdBQVUsRUFBRSxZQUFvQjtnQkFDeEQsSUFBRyxHQUFHLEVBQUU7b0JBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDckMsSUFBSSxFQUFFLENBQUM7aUJBQ1Y7cUJBQU07b0JBQ0gsTUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQzlCLGVBQWUsQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLGdCQUFnQixDQUFDLENBQUM7aUJBQ3JEO1lBQ0wsQ0FBQztZQUVELDBCQUEwQixHQUFVLEVBQUUsT0FBZ0I7Z0JBQ2xELElBQUcsR0FBRyxFQUFFO29CQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3JDLElBQUksRUFBRSxDQUFDO2lCQUNWO3FCQUFNO29CQUNILE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUMvQjtnQkFFRCxJQUFJLEVBQUUsQ0FBQztZQUNYLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLGlCQUFpQixFQUFFO1FBRXhCLEVBQUUsQ0FBQywrQ0FBK0MsRUFBRSxVQUFDLElBQUk7WUFDckQsSUFBSSxRQUFRLEdBQUcsSUFBSSxpQkFBTyxFQUFFLENBQUM7WUFDN0IsUUFBUSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQ3BDLFFBQVEsQ0FBQyxjQUFjLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUM5QyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXhCLElBQUksUUFBUSxHQUFHLElBQUksaUJBQU8sRUFBRSxDQUFDO1lBQzdCLFFBQVEsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUNwQyxRQUFRLENBQUMsY0FBYyxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDOUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUV4QixJQUFJLGVBQWUsR0FBRywrQ0FBc0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN0RCxJQUFJLEdBQUcsR0FBVyxJQUFJLENBQUM7WUFDdkIsSUFBSSxHQUFHLEdBQVcsSUFBSSxDQUFDO1lBRXZCLGVBQWUsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLHlCQUF5QixDQUFDLENBQUM7WUFDL0QsZUFBZSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUseUJBQXlCLENBQUMsQ0FBQztZQUUvRCxtQ0FBbUMsR0FBVSxFQUFFLFFBQWdCO2dCQUMzRCxJQUFHLEdBQUcsRUFBRTtvQkFDSixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUNyQyxJQUFJLEVBQUUsQ0FBQztpQkFDVjtxQkFBTTtvQkFDSCxHQUFHLEdBQUcsUUFBUSxDQUFDO29CQUNmLFlBQVksRUFBRSxDQUFDO2lCQUNsQjtZQUNMLENBQUM7WUFFRCxtQ0FBbUMsR0FBVSxFQUFFLFFBQWdCO2dCQUMzRCxJQUFHLEdBQUcsRUFBRTtvQkFDSixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUNyQyxJQUFJLEVBQUUsQ0FBQztpQkFDVjtxQkFBTTtvQkFDSCxHQUFHLEdBQUcsUUFBUSxDQUFDO29CQUNmLFlBQVksRUFBRSxDQUFDO2lCQUNsQjtZQUNMLENBQUM7WUFFRDtnQkFDSSxJQUFHLEdBQUcsR0FBRyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsRUFBRTtvQkFDbkIsbUJBQW1CO29CQUNuQixJQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUU7d0JBQ1YsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDO3dCQUNmLEdBQUcsR0FBRyxHQUFHLENBQUM7d0JBQ1YsR0FBRyxHQUFHLElBQUksQ0FBQztxQkFDZDtvQkFFRCxJQUFJLFdBQVcsR0FBRyxvQkFBb0IsQ0FBQztvQkFDdkMsZUFBZSxDQUFDLHFCQUFxQixDQUFDLFdBQVcsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO2lCQUMzRTtZQUNMLENBQUM7WUFFRCw2QkFBNkIsR0FBVSxFQUFFLFFBQW1CO2dCQUN4RCxJQUFHLEdBQUcsRUFBRTtvQkFDSixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUNyQyxJQUFJLEVBQUUsQ0FBQztpQkFDVjtxQkFBTTtvQkFFSCxJQUFJLEVBQUUsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3JCLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFLEdBQUcsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO29CQUVoRCxJQUFJLEVBQUUsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3JCLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFLEdBQUcsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO29CQUVoRCxJQUFJLEVBQUUsQ0FBQztpQkFDVjtZQUNMLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLG9CQUFvQixFQUFFO1FBQzNCLEVBQUUsQ0FBQywwQ0FBMEMsRUFBRSxVQUFDLElBQUk7WUFDaEQsSUFBSSxRQUFRLEdBQUcsSUFBSSxpQkFBTyxFQUFFLENBQUM7WUFDN0IsUUFBUSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQ3ZDLFFBQVEsQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUM3QyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXhCLElBQUksUUFBUSxHQUFHLElBQUksaUJBQU8sRUFBRSxDQUFDO1lBQzdCLFFBQVEsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUN2QyxRQUFRLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDN0MsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUV4QixJQUFJLGVBQWUsR0FBRywrQ0FBc0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN0RCxJQUFJLEdBQUcsR0FBVyxJQUFJLENBQUM7WUFDdkIsSUFBSSxHQUFHLEdBQVcsSUFBSSxDQUFDO1lBRXZCLGVBQWUsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLHlCQUF5QixDQUFDLENBQUM7WUFDL0QsZUFBZSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUseUJBQXlCLENBQUMsQ0FBQztZQUUvRCxtQ0FBbUMsR0FBVSxFQUFFLFFBQWdCO2dCQUMzRCxJQUFHLEdBQUcsRUFBRTtvQkFDSixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUNyQyxJQUFJLEVBQUUsQ0FBQztpQkFDVjtxQkFBTTtvQkFDSCxHQUFHLEdBQUcsUUFBUSxDQUFDO29CQUNmLFlBQVksRUFBRSxDQUFDO2lCQUNsQjtZQUNMLENBQUM7WUFFRCxtQ0FBbUMsR0FBVSxFQUFFLFFBQWdCO2dCQUMzRCxJQUFHLEdBQUcsRUFBRTtvQkFDSixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUNyQyxJQUFJLEVBQUUsQ0FBQztpQkFDVjtxQkFBTTtvQkFDSCxHQUFHLEdBQUcsUUFBUSxDQUFDO29CQUNmLFlBQVksRUFBRSxDQUFDO2lCQUNsQjtZQUNMLENBQUM7WUFFRDtnQkFDSSxJQUFHLEdBQUcsR0FBRyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsRUFBRTtvQkFDbkIsbUJBQW1CO29CQUNuQixJQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUU7d0JBQ1YsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDO3dCQUNmLEdBQUcsR0FBRyxHQUFHLENBQUM7d0JBQ1YsR0FBRyxHQUFHLElBQUksQ0FBQztxQkFDZDtvQkFFRCxJQUFJLEdBQUcsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDckIsZUFBZSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztpQkFDM0Q7WUFDTCxDQUFDO1lBRUQsNkJBQTZCLEdBQVUsRUFBRSxRQUFtQjtnQkFDeEQsSUFBRyxHQUFHLEVBQUU7b0JBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDckMsSUFBSSxFQUFFLENBQUM7aUJBQ1Y7cUJBQU07b0JBQ0gsSUFBSSxFQUFFLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNyQixNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFFOUIsSUFBSSxFQUFFLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNyQixNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFFOUIsSUFBSSxFQUFFLENBQUM7aUJBQ1Y7WUFDTCxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyx1QkFBdUIsRUFBRTtRQUM5QixFQUFFLENBQUMsNENBQTRDLEVBQUUsVUFBQyxJQUFJO1lBQ2xELElBQUksUUFBUSxHQUFHLElBQUksaUJBQU8sRUFBRSxDQUFDO1lBQzdCLFFBQVEsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUN2QyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXhCLElBQUksUUFBUSxHQUFHLElBQUksaUJBQU8sRUFBRSxDQUFDO1lBQzdCLFFBQVEsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUN2QyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXhCLElBQUksZUFBZSxHQUFHLCtDQUFzQixDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3RELElBQUksR0FBRyxHQUFXLElBQUksQ0FBQztZQUN2QixJQUFJLEdBQUcsR0FBVyxJQUFJLENBQUM7WUFFdkIsZUFBZSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUseUJBQXlCLENBQUMsQ0FBQztZQUMvRCxlQUFlLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO1lBRS9ELG1DQUFtQyxHQUFVLEVBQUUsUUFBZ0I7Z0JBQzNELElBQUcsR0FBRyxFQUFFO29CQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3JDLElBQUksRUFBRSxDQUFDO2lCQUNWO3FCQUFNO29CQUNILEdBQUcsR0FBRyxRQUFRLENBQUM7b0JBQ2YsWUFBWSxFQUFFLENBQUM7aUJBQ2xCO1lBQ0wsQ0FBQztZQUVELG1DQUFtQyxHQUFVLEVBQUUsUUFBZ0I7Z0JBQzNELElBQUcsR0FBRyxFQUFFO29CQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3JDLElBQUksRUFBRSxDQUFDO2lCQUNWO3FCQUFNO29CQUNILEdBQUcsR0FBRyxRQUFRLENBQUM7b0JBQ2YsWUFBWSxFQUFFLENBQUM7aUJBQ2xCO1lBQ0wsQ0FBQztZQUVEO2dCQUNJLElBQUcsR0FBRyxHQUFHLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFO29CQUNuQixtQkFBbUI7b0JBQ25CLElBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRTt3QkFDVixJQUFJLElBQUksR0FBRyxHQUFHLENBQUM7d0JBQ2YsR0FBRyxHQUFHLEdBQUcsQ0FBQzt3QkFDVixHQUFHLEdBQUcsSUFBSSxDQUFDO3FCQUNkO29CQUVELGVBQWUsQ0FBQyx5QkFBeUIsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2lCQUNsRTtZQUNMLENBQUM7WUFFRCw2QkFBNkIsR0FBVSxFQUFFLFFBQW1CO2dCQUN4RCxJQUFHLEdBQUcsRUFBRTtvQkFDSixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUNyQyxJQUFJLEVBQUUsQ0FBQztpQkFDVjtxQkFBTTtvQkFDSCxJQUFJLEVBQUUsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3JCLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFLEdBQUcsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO29CQUVoRCxJQUFJLEVBQUUsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3JCLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFLEdBQUcsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO29CQUVoRCxJQUFJLEVBQUUsQ0FBQztpQkFDVjtZQUNMLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLHlCQUF5QixFQUFFO1FBQ2hDLEVBQUUsQ0FBQyx5RUFBeUUsRUFBRSxVQUFDLElBQUk7WUFDL0UsSUFBSSxRQUFRLEdBQUcsSUFBSSxpQkFBTyxFQUFFLENBQUM7WUFDN0IsUUFBUSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBQ3pDLFFBQVEsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDekMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUV4QixJQUFJLFFBQVEsR0FBRyxJQUFJLGlCQUFPLEVBQUUsQ0FBQztZQUM3QixRQUFRLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFDekMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUN6QyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXhCLElBQUksZUFBZSxHQUFHLCtDQUFzQixDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3RELElBQUksR0FBRyxHQUFXLElBQUksQ0FBQztZQUN2QixJQUFJLEdBQUcsR0FBVyxJQUFJLENBQUM7WUFFdkIsZUFBZSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUseUJBQXlCLENBQUMsQ0FBQztZQUMvRCxlQUFlLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO1lBRS9ELG1DQUFtQyxHQUFVLEVBQUUsUUFBZ0I7Z0JBQzNELElBQUcsR0FBRyxFQUFFO29CQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3JDLElBQUksRUFBRSxDQUFDO2lCQUNWO3FCQUFNO29CQUNILEdBQUcsR0FBRyxRQUFRLENBQUM7b0JBQ2YsWUFBWSxFQUFFLENBQUM7aUJBQ2xCO1lBQ0wsQ0FBQztZQUVELG1DQUFtQyxHQUFVLEVBQUUsUUFBZ0I7Z0JBQzNELElBQUcsR0FBRyxFQUFFO29CQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3JDLElBQUksRUFBRSxDQUFDO2lCQUNWO3FCQUFNO29CQUNILEdBQUcsR0FBRyxRQUFRLENBQUM7b0JBQ2YsWUFBWSxFQUFFLENBQUM7aUJBQ2xCO1lBQ0wsQ0FBQztZQUVEO2dCQUNJLElBQUcsR0FBRyxHQUFHLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFO29CQUNuQixtQkFBbUI7b0JBQ25CLElBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRTt3QkFDVixJQUFJLElBQUksR0FBRyxHQUFHLENBQUM7d0JBQ2YsR0FBRyxHQUFHLEdBQUcsQ0FBQzt3QkFDVixHQUFHLEdBQUcsSUFBSSxDQUFDO3FCQUNkO29CQUVELElBQUksSUFBSSxHQUFHLGVBQWUsQ0FBQztvQkFDM0IsZUFBZSxDQUFDLDZCQUE2QixDQUFDLElBQUksRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO2lCQUMzRTtZQUNMLENBQUM7WUFFRCw0QkFBNEIsR0FBVSxFQUFFLFFBQW1CO2dCQUN2RCxJQUFHLEdBQUcsRUFBRTtvQkFDSixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUNyQyxJQUFJLEVBQUUsQ0FBQztpQkFDVjtxQkFBTTtvQkFDSCxNQUFNLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBRS9CLElBQUksRUFBRSxDQUFDO2lCQUNWO1lBQ0wsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsb0JBQW9CLEVBQUU7UUFDM0IsRUFBRSxDQUFDLGlDQUFpQyxFQUFFLFVBQUMsSUFBSTtZQUN2QyxJQUFJLFFBQVEsR0FBRyxJQUFJLGlCQUFPLEVBQUUsQ0FBQztZQUM3QixRQUFRLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFDekMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQzlDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFeEIsSUFBSSxRQUFRLEdBQUcsSUFBSSxpQkFBTyxFQUFFLENBQUM7WUFDN0IsUUFBUSxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBQ3pDLFFBQVEsQ0FBQyxjQUFjLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUM5QyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXhCLElBQUksZUFBZSxHQUFHLCtDQUFzQixDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3RELElBQUksR0FBRyxHQUFXLElBQUksQ0FBQztZQUN2QixJQUFJLEdBQUcsR0FBVyxJQUFJLENBQUM7WUFFdkIsZUFBZSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUseUJBQXlCLENBQUMsQ0FBQztZQUMvRCxlQUFlLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO1lBRS9ELG1DQUFtQyxHQUFVLEVBQUUsUUFBZ0I7Z0JBQzNELElBQUcsR0FBRyxFQUFFO29CQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3JDLElBQUksRUFBRSxDQUFDO2lCQUNWO3FCQUFNO29CQUNILEdBQUcsR0FBRyxRQUFRLENBQUM7b0JBQ2YsWUFBWSxFQUFFLENBQUM7aUJBQ2xCO1lBQ0wsQ0FBQztZQUVELG1DQUFtQyxHQUFVLEVBQUUsUUFBZ0I7Z0JBQzNELElBQUcsR0FBRyxFQUFFO29CQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3JDLElBQUksRUFBRSxDQUFDO2lCQUNWO3FCQUFNO29CQUNILEdBQUcsR0FBRyxRQUFRLENBQUM7b0JBQ2YsWUFBWSxFQUFFLENBQUM7aUJBQ2xCO1lBQ0wsQ0FBQztZQUVEO2dCQUNJLElBQUcsR0FBRyxHQUFHLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUFFO29CQUNuQixJQUFJLElBQUksR0FBRyxvQkFBb0IsQ0FBQztvQkFDaEMsZUFBZSxDQUFDLDZCQUE2QixDQUFDLElBQUksRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO2lCQUN6RTtZQUNMLENBQUM7WUFFRCwwQkFBMEIsR0FBVSxFQUFFLFlBQW9CO2dCQUN0RCxJQUFHLEdBQUcsRUFBRTtvQkFDSixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUNyQyxJQUFJLEVBQUUsQ0FBQztpQkFDVjtxQkFBTTtvQkFDSCxNQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDOUIsZUFBZSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7b0JBQzdDLHlEQUF5RDtpQkFDNUQ7WUFDTCxDQUFDO1lBRUQsb0JBQW9CLEdBQVUsRUFBRSxPQUFnQjtnQkFDNUMsSUFBRyxHQUFHLEVBQUU7b0JBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDckMsSUFBSSxFQUFFLENBQUM7aUJBQ1Y7cUJBQU07b0JBQ0gsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztvQkFDN0QsZUFBZSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7aUJBQ2hEO1lBQ0wsQ0FBQztZQUVELG9CQUFvQixHQUFVLEVBQUUsT0FBZ0I7Z0JBQzVDLElBQUcsR0FBRyxFQUFFO29CQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ3hDO3FCQUFNO29CQUNILE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUNoRDtnQkFFRCxJQUFJLEVBQUUsQ0FBQztZQUNYLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLGVBQWUsRUFBRTtRQUN0QixFQUFFLENBQUMsNEJBQTRCLEVBQUUsVUFBQyxJQUFJO1lBQ2xDLElBQUksUUFBUSxHQUFHLElBQUksaUJBQU8sRUFBRSxDQUFDO1lBQzdCLFFBQVEsQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUN4QyxRQUFRLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ3pDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFeEIsSUFBSSxRQUFRLEdBQUcsSUFBSSxpQkFBTyxFQUFFLENBQUM7WUFDN0IsUUFBUSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ3hDLFFBQVEsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDekMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUV4QixJQUFJLGVBQWUsR0FBRywrQ0FBc0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN0RCxJQUFJLEdBQUcsR0FBVyxJQUFJLENBQUM7WUFDdkIsSUFBSSxHQUFHLEdBQVcsSUFBSSxDQUFDO1lBRXZCLGVBQWUsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLHlCQUF5QixDQUFDLENBQUM7WUFDL0QsZUFBZSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUseUJBQXlCLENBQUMsQ0FBQztZQUUvRCxtQ0FBbUMsR0FBVSxFQUFFLFFBQWdCO2dCQUMzRCxJQUFHLEdBQUcsRUFBRTtvQkFDSixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUNyQyxJQUFJLEVBQUUsQ0FBQztpQkFDVjtxQkFBTTtvQkFDSCxHQUFHLEdBQUcsUUFBUSxDQUFDO29CQUNmLFVBQVUsRUFBRSxDQUFDO2lCQUNoQjtZQUNMLENBQUM7WUFFRCxtQ0FBbUMsR0FBVSxFQUFFLFFBQWdCO2dCQUMzRCxJQUFHLEdBQUcsRUFBRTtvQkFDSixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUNyQyxJQUFJLEVBQUUsQ0FBQztpQkFDVjtxQkFBTTtvQkFDSCxHQUFHLEdBQUcsUUFBUSxDQUFDO29CQUNmLFVBQVUsRUFBRSxDQUFDO2lCQUNoQjtZQUNMLENBQUM7WUFFRDtnQkFDSSxJQUFHLEdBQUcsR0FBRyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsRUFBRTtvQkFDbkIsbUJBQW1CO29CQUNuQixJQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUU7d0JBQ1YsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDO3dCQUNmLEdBQUcsR0FBRyxHQUFHLENBQUM7d0JBQ1YsR0FBRyxHQUFHLElBQUksQ0FBQztxQkFDZDtvQkFFRCxJQUFJLElBQUksR0FBRyxxQkFBcUIsQ0FBQztvQkFDakMsZUFBZSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztpQkFDekQ7WUFDTCxDQUFDO1lBRUQsc0JBQXNCLEdBQVUsRUFBRSxZQUFvQjtnQkFDbEQsSUFBRyxHQUFHLEVBQUU7b0JBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDckMsSUFBSSxFQUFFLENBQUM7aUJBQ1Y7cUJBQU07b0JBQ0gsTUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQzlCLGVBQWUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUM7aUJBQ3pEO1lBQ0wsQ0FBQztZQUVELG9CQUFvQixHQUFVLEVBQUUsUUFBbUI7Z0JBQy9DLElBQUcsR0FBRyxFQUFFO29CQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3JDLElBQUksRUFBRSxDQUFDO2lCQUNWO3FCQUFNO29CQUNILE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFFakMsSUFBSSxFQUFFLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNyQixNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxjQUFjLEVBQUUsRUFBRSxlQUFlLENBQUMsQ0FBQztvQkFFbkQsSUFBSSxFQUFFLENBQUM7aUJBQ1Y7WUFDTCxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxtQkFBbUIsRUFBRTtRQUMxQixFQUFFLENBQUMsNkNBQTZDLEVBQUUsVUFBQyxJQUFJO1lBQ25ELElBQUksUUFBUSxHQUFHLElBQUksaUJBQU8sRUFBRSxDQUFDO1lBQzdCLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDM0IsUUFBUSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUN6QyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXhCLElBQUksUUFBUSxHQUFHLElBQUksaUJBQU8sRUFBRSxDQUFDO1lBQzdCLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDM0IsUUFBUSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUN6QyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXhCLElBQUksZUFBZSxHQUFHLCtDQUFzQixDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3RELElBQUksR0FBRyxHQUFXLElBQUksQ0FBQztZQUN2QixJQUFJLEdBQUcsR0FBVyxJQUFJLENBQUM7WUFFdkIsZUFBZSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUseUJBQXlCLENBQUMsQ0FBQztZQUMvRCxlQUFlLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO1lBRS9ELG1DQUFtQyxHQUFVLEVBQUUsUUFBZ0I7Z0JBQzNELElBQUcsR0FBRyxFQUFFO29CQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3JDLElBQUksRUFBRSxDQUFDO2lCQUNWO3FCQUFNO29CQUNILEdBQUcsR0FBRyxRQUFRLENBQUM7b0JBQ2YsU0FBUyxFQUFFLENBQUM7aUJBQ2Y7WUFDTCxDQUFDO1lBRUQsbUNBQW1DLEdBQVUsRUFBRSxRQUFnQjtnQkFDM0QsSUFBRyxHQUFHLEVBQUU7b0JBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDckMsSUFBSSxFQUFFLENBQUM7aUJBQ1Y7cUJBQU07b0JBQ0gsR0FBRyxHQUFHLFFBQVEsQ0FBQztvQkFDZixTQUFTLEVBQUUsQ0FBQztpQkFDZjtZQUNMLENBQUM7WUFFRDtnQkFDSSxJQUFHLEdBQUcsR0FBRyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsRUFBRTtvQkFDbkIsbUJBQW1CO29CQUNuQixJQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUU7d0JBQ1YsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDO3dCQUNmLEdBQUcsR0FBRyxHQUFHLENBQUM7d0JBQ1YsR0FBRyxHQUFHLElBQUksQ0FBQztxQkFDZDtvQkFFRCxlQUFlLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFDO2lCQUM5RDtZQUNMLENBQUM7WUFFRCxxQkFBcUIsR0FBVSxFQUFFLEtBQWE7Z0JBQzFDLElBQUcsR0FBRyxFQUFFO29CQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3JDLElBQUksRUFBRSxDQUFDO2lCQUNWO3FCQUFNO29CQUNILE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUN2QixJQUFJLEVBQUUsQ0FBQztpQkFDVjtZQUNMLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMifQ==
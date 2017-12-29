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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZHVjdHNHYXRld2F5VGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlByb2R1Y3RzR2F0ZXdheVRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFBa0M7QUFDbEMsK0NBQTRDO0FBQzVDLG1FQUFnRTtBQUVoRSxRQUFRLENBQUMsaUJBQWlCLEVBQUU7SUFFeEIsUUFBUSxDQUFDLDZCQUE2QixFQUFFO1FBRXBDLEVBQUUsQ0FBQyw2Q0FBNkMsRUFBRSxVQUFDLElBQUk7WUFDbkQsSUFBSSxPQUFPLEdBQUcsSUFBSSxpQkFBTyxFQUFFLENBQUM7WUFDNUIsT0FBTyxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNwQyxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzdCLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFdkIsSUFBSSxlQUFlLEdBQUcsK0NBQXNCLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDdEQsSUFBSSxFQUFFLEdBQVcsQ0FBQyxDQUFDO1lBQ25CLGVBQWUsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBRWhELHFCQUFxQixHQUFVLEVBQUUsUUFBZ0I7Z0JBQzdDLEVBQUUsQ0FBQSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDckMsSUFBSSxFQUFFLENBQUM7Z0JBQ1gsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDSixFQUFFLEdBQUcsUUFBUSxDQUFDO29CQUNkLGVBQWUsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLGtCQUFrQixDQUFDLENBQUM7Z0JBQzlELENBQUM7WUFDTCxDQUFDO1lBRUQsNEJBQTRCLEdBQVUsRUFBRSxPQUFnQjtnQkFDcEQsRUFBRSxDQUFBLENBQUMsR0FB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
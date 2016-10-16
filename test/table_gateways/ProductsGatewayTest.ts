require('../config/global_before');
import Product                = require('../entities/Product');
import ProductsGatewayFactory = require('./ProductsGatewayFactory');

import {IError} from 'mysql';

import chai = require('chai');
let assert  = chai.assert;

describe('ProductsGateway', () => {
    describe('#createRow and #retrieveRow', () => {
        it('creates and retrieves a row in the database', (done) => {
            let product = new Product();
            product.setDescription('test desc');
            product.setName('test name');
            product.setPrice(1.11);

            let productsGateway = ProductsGatewayFactory.create();
            let id:number = 0;
            productsGateway.createRow(product, retrieveRow);

            function retrieveRow(err:IError, insertId:number) {
                if(err) {
                    assert.fail(null, null, err.message);
                    done();
                } else {
                    id = insertId;
                    productsGateway.retrieveRow(insertId, verifyRetrievedRow);
                }
            }

            function verifyRetrievedRow(err:IError, product:Product) {
                if(err) {
                    assert.fail(null, null, err.message);
                } else {
                    assert.equal(product.getDescription(),  'test desc');
                    assert.equal(product.getId(),           id);
                    assert.equal(product.getName(),         'test name');
                    assert.equal(product.getPrice(),        1.11);

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

    describe('#updateRow', () => {
        it('updates a row in the database', (done) => {
            let product = new Product();
            product.setDescription('test update');
            product.setName('name update');
            product.setPrice(1.11);

            let id:number = null;
            let productsGateway = ProductsGatewayFactory.create();

            productsGateway.createRow(product, retrieveRow);

            function retrieveRow(err:IError, insertId:number) {
                if(err) {
                    assert.fail(null, null, err.message);
                    done();
                } else {
                    id = insertId;
                    productsGateway.retrieveRow(id, updateRetrievedRow);
                }
            }

            function updateRetrievedRow(err:IError, product:Product) {
                if(err) {
                    assert.fail(null, null, err.message);
                    done();
                } else {
                    product.setDescription('updated desc');
                    product.setName('updated name');
                    product.setPrice(2.22);
                    productsGateway.updateRow(product, retrieveUpdatedRow);
                }
            }

            function retrieveUpdatedRow(err:IError, affectedRows:number) {
                if(err) {
                    assert.fail(null, null, err.message);
                    done();
                } else {
                    assert.equal(affectedRows, 1, 'affected rows');
                    productsGateway.retrieveRow(id, verifyUpdatedRow);
                }
            }

            function verifyUpdatedRow(err:IError, product:Product) {
                if(err) {
                    assert.fail(null, null, err.message);
                } else {
                    assert.equal(product.getDescription(),  'updated desc');
                    assert.equal(product.getId(),           id);
                    assert.equal(product.getName(),         'updated name');
                    assert.equal(product.getPrice(),        2.22);

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

    describe('#deleteRow', () => {
        it('deletes a row in the database', (done) => {
            let product = new Product();
            product.setDescription('test delete');
            product.setName('name delete');
            product.setPrice(1.11);

            let id:number = null;
            let productsGateway = ProductsGatewayFactory.create();

            productsGateway.createRow(product, retrieveRow);

            function retrieveRow(err:IError, insertId:number) {
                if(err) {
                    assert.fail(null, null, err.message);
                    done();
                } else {
                    id = insertId;
                    productsGateway.retrieveRow(id, deleteRow);
                }
            }

            function deleteRow(err:IError, product:Product) {
                if(err) {
                    assert.fail(null, null, err.message);
                    done();
                } else {
                    productsGateway.deleteRow(id, retrieveDeletedRow);
                }
            }

            function retrieveDeletedRow(err:IError, affectedRows:number) {
                if(err) {
                    assert.fail(null, null, err.message);
                    done();
                } else {
                    assert.equal(affectedRows, 1);
                    productsGateway.retrieveRow(id, verifyRowDeleted);
                }
            }

            function verifyRowDeleted(err:IError, product:Product) {
                if(err) {
                    assert.fail(null, null, err.message);
                    done();
                } else {
                    assert.isNull(product);
                }

                done();
            }
        });
    });

    describe('#retrieveRowsBy', () => {
        it('retrieves all rows with the given field value', (done) => {
            let product1 = new Product();
            product1.setName('retrieveRowsBy1');
            product1.setDescription('retrieveRowsByDesc');
            product1.setPrice(1.11);

            let product2 = new Product();
            product2.setName('retrieveRowsBy2');
            product2.setDescription('retrieveRowsByDesc');
            product2.setPrice(2.22);

            let productsGateway = ProductsGatewayFactory.create();
            let id1:number = null;
            let id2:number = null;

            productsGateway.createRow(product1, createProduct1RowCallback);
            productsGateway.createRow(product2, createProduct2RowCallback);

            function createProduct1RowCallback(err:IError, insertId:number) {
                if(err) {
                    assert.fail(null, null, err.message);
                    done();
                } else {
                    id1 = insertId;
                    retrieveRows();
                }
            }

            function createProduct2RowCallback(err:IError, insertId:number) {
                if(err) {
                    assert.fail(null, null, err.message);
                    done();
                } else {
                    id2 = insertId;
                    retrieveRows();
                }
            }

            function retrieveRows() {
                if(id1 > 0 && id2 > 0) {
                    let description = 'retrieveRowsByDesc';
                    productsGateway.retrieveByDescription(description, verifyRetrievedRows);
                }
            }

            function verifyRetrievedRows(err:IError, products:Product[]) {
                if(err) {
                    assert.fail(null, null, err.message);
                    done();
                } else {
                    let p1 = products[0];
                    assert.equal(p1.getId(), id1);

                    let p2 = products[1];
                    assert.equal(p2.getId(), id2);

                    done();
                }
            }
        });
    });

    describe('#retrieveRowsByIds', () => {
        it('retrieves products given an array of ids', (done) => {
            let product1 = new Product();
            product1.setName('retrieveRowsByIds1');
            product1.setDescription('retrieve ids desc');
            product1.setPrice(1.11);

            let product2 = new Product();
            product2.setName('retrieveRowsByIds2');
            product2.setDescription('retrieve ids desc');
            product2.setPrice(2.22);

            let productsGateway = ProductsGatewayFactory.create();
            let id1:number = null;
            let id2:number = null;

            productsGateway.createRow(product1, createProduct1RowCallback);
            productsGateway.createRow(product2, createProduct2RowCallback);

            function createProduct1RowCallback(err:IError, insertId:number) {
                if(err) {
                    assert.fail(null, null, err.message);
                    done();
                } else {
                    id1 = insertId;
                    retrieveRows();
                }
            }

            function createProduct2RowCallback(err:IError, insertId:number) {
                if(err) {
                    assert.fail(null, null, err.message);
                    done();
                } else {
                    id2 = insertId;
                    retrieveRows();
                }
            }

            function retrieveRows() {
                if(id1 > 0 && id2 > 0) {
                    let ids = [id1, id2];
                    productsGateway.retrieveByIds(ids, verifyRetrievedRows);
                }
            }

            function verifyRetrievedRows(err:IError, products:Product[]) {
                if(err) {
                    assert.fail(null, null, err.message);
                    done();
                } else {
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
            let product1 = new Product();
            product1.setName('retrieveRowsByIds1');
            product1.setPrice(1.11);

            let product2 = new Product();
            product2.setName('retrieveRowsByIds2');
            product2.setPrice(2.22);

            let productsGateway = ProductsGatewayFactory.create();
            let id1:number = null;
            let id2:number = null;

            productsGateway.createRow(product1, createProduct1RowCallback);
            productsGateway.createRow(product2, createProduct2RowCallback);

            function createProduct1RowCallback(err:IError, insertId:number) {
                if(err) {
                    assert.fail(null, null, err.message);
                    done();
                } else {
                    id1 = insertId;
                    retrieveRows();
                }
            }

            function createProduct2RowCallback(err:IError, insertId:number) {
                if(err) {
                    assert.fail(null, null, err.message);
                    done();
                } else {
                    id2 = insertId;
                    retrieveRows();
                }
            }

            function retrieveRows() {
                if(id1 > 0 && id2 > 0) {
                    productsGateway.retrieveByNullDescription(verifyRetrievedRows);
                }
            }

            function verifyRetrievedRows(err:IError, products:Product[]) {
                if(err) {
                    assert.fail(null, null, err.message);
                    done();
                } else {
                    let p1 = products[0];
                    assert.equal(p1.getId(), id1);

                    let p2 = products[1];
                    assert.equal(p2.getId(), id2);

                    done();
                }
            }
        });
    });

    describe('#retrieveRowsByNotEqual', () => {
        it('retrieves products where the description does not equal the given value', (done) => {
            let product1 = new Product();
            product1.setName('retrieve not equal 1');
            product1.setDescription('description 1');
            product1.setPrice(1.11);

            let product2 = new Product();
            product2.setName('retrieve not equal 2');
            product2.setDescription('description 2');
            product2.setPrice(2.22);

            let productsGateway = ProductsGatewayFactory.create();
            let id1:number = null;
            let id2:number = null;

            productsGateway.createRow(product1, createProduct1RowCallback);
            productsGateway.createRow(product2, createProduct2RowCallback);

            function createProduct1RowCallback(err:IError, insertId:number) {
                if(err) {
                    assert.fail(null, null, err.message);
                    done();
                } else {
                    id1 = insertId;
                    retrieveRows();
                }
            }

            function createProduct2RowCallback(err:IError, insertId:number) {
                if(err) {
                    assert.fail(null, null, err.message);
                    done();
                } else {
                    id2 = insertId;
                    retrieveRows();
                }
            }

            function retrieveRows() {
                if(id1 > 0 && id2 > 0) {
                    let desc = 'description 1';
                    productsGateway.retrieveByDescriptionNotEqual(desc, verifyRetrievedRow);
                }
            }

            function verifyRetrievedRow(err:IError, products:Product[]) {
                if(err) {
                    assert.fail(null, null, err.message);
                    done();
                } else {
                    assert.isAbove(products.length, 0);

                    done();
                }
            }
        });
    });

    describe('#setFieldNullWhere', () => {
        it('sets the description null where', (done) => {
            let product1 = new Product();
            product1.setName('retrieve not equal 1');
            product1.setDescription('null description 1');
            product1.setPrice(1.11);

            let product2 = new Product();
            product2.setName('retrieve not equal 2');
            product2.setDescription('null description 2');
            product2.setPrice(2.22);

            let productsGateway = ProductsGatewayFactory.create();
            let id1:number = null;
            let id2:number = null;

            productsGateway.createRow(product1, createProduct1RowCallback);
            productsGateway.createRow(product2, createProduct2RowCallback);

            function createProduct1RowCallback(err:IError, insertId:number) {
                if(err) {
                    assert.fail(null, null, err.message);
                    done();
                } else {
                    id1 = insertId;
                    retrieveRows();
                }
            }

            function createProduct2RowCallback(err:IError, insertId:number) {
                if(err) {
                    assert.fail(null, null, err.message);
                    done();
                } else {
                    id2 = insertId;
                    retrieveRows();
                }
            }

            function retrieveRows() {
                if(id1 > 0 && id2 > 0) {
                    let desc = 'null description 2';
                    productsGateway.setDescriptionNullWhereNameIs(desc, retrieveNullRows);
                }
            }

            function retrieveNullRows(err:IError, affectedRows:number) {
                if(err) {
                    assert.fail(null, null, err.message);
                    done();
                } else {
                    assert.equal(affectedRows, 1);
                    productsGateway.retrieveByIds([id1, id2], verifyRows);
                }
            }

            function verifyRows(err:IError, products:Product[]) {
                if(err) {
                    assert.fail(null, null, err.message);
                    done();
                } else {
                    let p1 = products[0];
                    assert.equal(p1.getDescription(), 'null description 1');

                    let p2 = products[1];
                    assert.equal(p2.getDescription(), null);

                    done();
                }
            }
        });
    });

    describe('#deleteRowsBy', () => {
        it('deletes rows where name is', (done) => {
            let product1 = new Product();
            product1.setName('deletes rows name 1');
            product1.setDescription('description 1');
            product1.setPrice(1.11);

            let product2 = new Product();
            product2.setName('deletes rows name 2');
            product2.setDescription('description 2');
            product2.setPrice(2.22);

            let productsGateway = ProductsGatewayFactory.create();
            let id1:number = null;
            let id2:number = null;

            productsGateway.createRow(product1, createProduct1RowCallback);
            productsGateway.createRow(product2, createProduct2RowCallback);

            function createProduct1RowCallback(err:IError, insertId:number) {
                if(err) {
                    assert.fail(null, null, err.message);
                    done();
                } else {
                    id1 = insertId;
                    deleteRows();
                }
            }

            function createProduct2RowCallback(err:IError, insertId:number) {
                if(err) {
                    assert.fail(null, null, err.message);
                    done();
                } else {
                    id2 = insertId;
                    deleteRows();
                }
            }

            function deleteRows() {
                if(id1 > 0 && id2 > 0) {
                    let desc = 'deletes rows name 1';
                    productsGateway.deleteWhereNameIs(desc, retrieveRows);
                }
            }

            function retrieveRows(err:IError, affectedRows:number) {
                if(err) {
                    assert.fail(null, null, err.message);
                    done();
                } else {
                    assert.equal(affectedRows, 1);
                    productsGateway.retrieveByIds([id1, id2], verifyRows);
                }
            }

            function verifyRows(err:IError, products:Product[]) {
                if(err) {
                    assert.fail(null, null, err.message);
                    done();
                } else {
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
            let product1 = new Product();
            product1.setName('name 1');
            product1.setDescription('description 1');
            product1.setPrice(1.11);

            let product2 = new Product();
            product2.setName('name 2');
            product2.setDescription('description 2');
            product2.setPrice(2.22);

            let productsGateway = ProductsGatewayFactory.create();
            let id1:number = null;
            let id2:number = null;

            productsGateway.createRow(product1, createProduct1RowCallback);
            productsGateway.createRow(product2, createProduct2RowCallback);

            function createProduct1RowCallback(err:IError, insertId:number) {
                if(err) {
                    assert.fail(null, null, err.message);
                    done();
                } else {
                    id1 = insertId;
                    countRows();
                }
            }

            function createProduct2RowCallback(err:IError, insertId:number) {
                if(err) {
                    assert.fail(null, null, err.message);
                    done();
                } else {
                    id2 = insertId;
                    countRows();
                }
            }

            function countRows() {
                if(id1 > 0 && id2 > 0) {
                    productsGateway.countProductsByName('name 1', verifyCount);
                }
            }

            function verifyCount(err:IError, count:number) {
                if(err) {
                    assert.fail(null, null, err.message);
                    done();
                } else {
                    assert.equal(count, 1);
                    done();
                }
            }
        });
    });
});

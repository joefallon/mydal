"use strict";
require('../config/global_before');
var OrdersProductsGatewayFactory = require('./OrdersProductsGatewayFactory');
var chai = require('chai');
var assert = chai.assert;
describe('OrdersProductsGateway', function () {
    describe('#createRow and #retrieveRow', function () {
        it('creates and retrieves a row from the database', function (done) {
            var id1 = 1;
            var id2 = 2;
            var ordersProductsGateway = OrdersProductsGatewayFactory.create();
            ordersProductsGateway.createRow(id1, id2, createRowCallback);
            function createRowCallback(err, isSuccess) {
                if (err) {
                    assert.fail(null, null, err.message);
                    done();
                }
                else {
                    assert.equal(isSuccess, 1, 'row count');
                    ordersProductsGateway.retrieveRow(id1, id2, retrieveRowCallback);
                }
            }
            function retrieveRowCallback(err, row) {
                if (err) {
                    assert.fail(null, null, err.message);
                    done();
                }
                else {
                    assert.equal(row['table1_id'], 1);
                    assert.equal(row['table2_id'], 2);
                    var created = row['created'];
                    assert.equal(created.length, 19);
                    assert.notEqual(created, '0000-00-00 00:00:00');
                    done();
                }
            }
        });
    });
    describe('#deleteRow', function () {
        it('deletes a row from the database', function (done) {
            var id1 = 3;
            var id2 = 4;
            var ordersProductsGateway = OrdersProductsGatewayFactory.create();
            ordersProductsGateway.createRow(id1, id2, createRowCallback);
            function createRowCallback(err, isSuccess) {
                if (err) {
                    assert.fail(null, null, err.message);
                    done();
                }
                else {
                    assert.equal(isSuccess, 1, 'row count');
                    ordersProductsGateway.deleteRow(id1, id2, deleteRowCallback);
                }
            }
            function deleteRowCallback(err, affectedRows) {
                if (err) {
                    assert.fail(null, null, err.message);
                    done();
                }
                else {
                    assert.equal(affectedRows, 1);
                    ordersProductsGateway.retrieveRow(id1, id2, retrieveRowCallback);
                }
            }
            function retrieveRowCallback(err, row) {
                if (err) {
                    assert.fail(null, null, err.message);
                    done();
                }
                else {
                    assert.isNull(row);
                    done();
                }
            }
        });
    });
    describe('#retrieveById', function () {
        it('retrieves all rows given the table1_id', function (done) {
            var id1 = 5;
            var id2a = 6;
            var id2b = 7;
            var id2aCreated = false;
            var id2bCreated = false;
            var ordersProductsGateway = OrdersProductsGatewayFactory.create();
            ordersProductsGateway.createRow(id1, id2a, createRow2aComplete);
            ordersProductsGateway.createRow(id1, id2b, createRow2bComplete);
            function createRow2aComplete(err, isSuccess) {
                if (err) {
                    assert.fail(null, null, err.message);
                    done();
                }
                else {
                    if (isSuccess) {
                        id2aCreated = true;
                        retrieveRows();
                    }
                    else {
                        assert.fail(null, null, 'createRow2aComplete failed');
                        done();
                    }
                }
            }
            function createRow2bComplete(err, isSuccess) {
                if (err) {
                    assert.fail(null, null, err.message);
                    done();
                }
                else {
                    if (isSuccess) {
                        id2bCreated = true;
                        retrieveRows();
                    }
                    else {
                        assert.fail(null, null, 'createRow2bComplete failed');
                        done();
                    }
                }
            }
            function retrieveRows() {
                if (id2aCreated && id2bCreated) {
                    ordersProductsGateway.retrieveByTable1Id(5, retrieveRowsCallback);
                }
            }
            function retrieveRowsCallback(err, rows) {
                if (err) {
                    assert.fail(null, null, err.message);
                    done();
                }
                else {
                    assert.equal(rows.length, 2);
                    assert.equal(rows[0]['table1_id'], 5);
                    assert.equal(rows[0]['table2_id'], 6);
                    assert.equal(rows[1]['table1_id'], 5);
                    assert.equal(rows[1]['table2_id'], 7);
                    done();
                }
            }
        });
    });
    describe('#deleteById', function () {
        it('deletes all rows given the table1_id', function (done) {
            var id1 = 9;
            var id2a = 10;
            var id2b = 11;
            var id2aCreated = false;
            var id2bCreated = false;
            var ordersProductsGateway = OrdersProductsGatewayFactory.create();
            ordersProductsGateway.createRow(id1, id2a, createRow2aComplete);
            ordersProductsGateway.createRow(id1, id2b, createRow2bComplete);
            function createRow2aComplete(err, isSuccess) {
                if (err) {
                    assert.fail(null, null, err.message);
                    done();
                }
                else {
                    if (isSuccess) {
                        id2aCreated = true;
                        deleteRows();
                    }
                    else {
                        assert.fail(null, null, 'createRow2aComplete failed');
                        done();
                    }
                }
            }
            function createRow2bComplete(err, isSuccess) {
                if (err) {
                    assert.fail(null, null, err.message);
                    done();
                }
                else {
                    if (isSuccess) {
                        id2bCreated = true;
                        deleteRows();
                    }
                    else {
                        assert.fail(null, null, 'createRow2bComplete failed');
                        done();
                    }
                }
            }
            function deleteRows() {
                if (id2aCreated && id2bCreated) {
                    ordersProductsGateway.deleteByTable1Id(9, deleteRowsCallback);
                }
            }
            function deleteRowsCallback(err, affectedRows) {
                if (err) {
                    assert.fail(null, null, err.message);
                    done();
                }
                else {
                    assert.equal(affectedRows, 2);
                    done();
                }
            }
        });
    });
});

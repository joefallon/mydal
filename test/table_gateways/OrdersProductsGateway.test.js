"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var OrdersProductsGatewayFactory_1 = require("./OrdersProductsGatewayFactory");
describe('OrdersProductsGateway', function () {
    describe('#createRow and #retrieveRow', function () {
        it('creates and retrieves a row from the database', function (done) {
            var id1 = 1;
            var id2 = 2;
            var ordersProductsGateway = OrdersProductsGatewayFactory_1.OrdersProductsGatewayFactory.create();
            ordersProductsGateway.createRow(id1, id2, createRowCallback);
            function createRowCallback(err, isSuccess) {
                if (err) {
                    assert.fail(null, null, err.message);
                    done();
                }
                else {
                    assert.equal(isSuccess, true, 'row count');
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
            var ordersProductsGateway = OrdersProductsGatewayFactory_1.OrdersProductsGatewayFactory.create();
            ordersProductsGateway.createRow(id1, id2, createRowCallback);
            function createRowCallback(err, isSuccess) {
                if (err) {
                    assert.fail(null, null, err.message);
                    done();
                }
                else {
                    assert.equal(isSuccess, true, 'row count');
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
                    assert.equal(row, null, 'The row was expected to be null.');
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
            var ordersProductsGateway = OrdersProductsGatewayFactory_1.OrdersProductsGatewayFactory.create();
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
            var ordersProductsGateway = OrdersProductsGatewayFactory_1.OrdersProductsGatewayFactory.create();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3JkZXJzUHJvZHVjdHNHYXRld2F5LnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJPcmRlcnNQcm9kdWN0c0dhdGV3YXkudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUFrQztBQUNsQywrRUFBNEU7QUFHNUUsUUFBUSxDQUFDLHVCQUF1QixFQUFFO0lBRTlCLFFBQVEsQ0FBQyw2QkFBNkIsRUFBRTtRQUVwQyxFQUFFLENBQUMsK0NBQStDLEVBQUUsVUFBQyxJQUFJO1lBQ3JELElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztZQUNaLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztZQUVaLElBQUkscUJBQXFCLEdBQUcsMkRBQTRCLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDbEUscUJBQXFCLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztZQUU3RCwyQkFBMkIsR0FBVSxFQUFFLFNBQWtCO2dCQUNyRCxJQUFHLEdBQUcsRUFBRTtvQkFDSixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUNyQyxJQUFJLEVBQUUsQ0FBQztpQkFDVjtxQkFBTTtvQkFDSCxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7b0JBQzNDLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLG1CQUFtQixDQUFDLENBQUM7aUJBQ3BFO1lBQ0wsQ0FBQztZQUVELDZCQUE2QixHQUFVLEVBQUUsR0FBVTtnQkFDL0MsSUFBRyxHQUFHLEVBQUU7b0JBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDckMsSUFBSSxFQUFFLENBQUM7aUJBQ1Y7cUJBQU07b0JBQ0gsTUFBTSxDQUFD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
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3JkZXJzUHJvZHVjdHNHYXRld2F5VGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIk9yZGVyc1Byb2R1Y3RzR2F0ZXdheVRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFBa0M7QUFDbEMsK0VBQTRFO0FBRzVFLFFBQVEsQ0FBQyx1QkFBdUIsRUFBRTtJQUU5QixRQUFRLENBQUMsNkJBQTZCLEVBQUU7UUFFcEMsRUFBRSxDQUFDLCtDQUErQyxFQUFFLFVBQUMsSUFBSTtZQUNyRCxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDWixJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFFWixJQUFJLHFCQUFxQixHQUFHLDJEQUE0QixDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2xFLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLGlCQUFpQixDQUFDLENBQUM7WUFFN0QsMkJBQTJCLEdBQVUsRUFBRSxTQUFrQjtnQkFDckQsRUFBRSxDQUFBLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUNyQyxJQUFJLEVBQUUsQ0FBQztnQkFDWCxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztvQkFDM0MscUJBQXFCLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztnQkFDckUsQ0FBQztZQUNMLENBQUM7WUFFRCw2QkFBNkIsR0FBVSxFQUFFLEdBQVU7Z0JBQy9DLEVBQUUsQ0FBQSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxP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
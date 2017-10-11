import assert = require('assert');
import {OrdersProductsGatewayFactory} from "./OrdersProductsGatewayFactory";


describe('OrdersProductsGateway', () => {

    describe('#createRow and #retrieveRow', () => {

        it('creates and retrieves a row from the database', (done) => {
            let id1 = 1;
            let id2 = 2;

            let ordersProductsGateway = OrdersProductsGatewayFactory.create();
            ordersProductsGateway.createRow(id1, id2, createRowCallback);

            function createRowCallback(err: Error, isSuccess: boolean) {
                if(err) {
                    assert.fail(null, null, err.message);
                    done();
                } else {
                    assert.equal(isSuccess, true, 'row count');
                    ordersProductsGateway.retrieveRow(id1, id2, retrieveRowCallback);
                }
            }

            function retrieveRowCallback(err: Error, row: any[]) {
                if(err) {
                    assert.fail(null, null, err.message);
                    done();
                } else {
                    assert.equal(row['table1_id'], 1);
                    assert.equal(row['table2_id'], 2);

                    let created: string = row['created'];
                    assert.equal(created.length, 19);
                    assert.notEqual(created, '0000-00-00 00:00:00');
                    done();
                }
            }
        });
    });

    describe('#deleteRow', () => {

        it('deletes a row from the database', (done) => {
            let id1 = 3;
            let id2 = 4;

            let ordersProductsGateway = OrdersProductsGatewayFactory.create();
            ordersProductsGateway.createRow(id1, id2, createRowCallback);

            function createRowCallback(err: Error, isSuccess: boolean) {
                if(err) {
                    assert.fail(null, null, err.message);
                    done();
                } else {
                    assert.equal(isSuccess, true, 'row count');
                    ordersProductsGateway.deleteRow(id1, id2, deleteRowCallback);
                }
            }

            function deleteRowCallback(err: Error, affectedRows: number) {
                if(err) {
                    assert.fail(null, null, err.message);
                    done();
                } else {
                    assert.equal(affectedRows, 1);
                    ordersProductsGateway.retrieveRow(id1, id2, retrieveRowCallback);
                }
            }

            function retrieveRowCallback(err: Error, row: any[]) {
                if(err) {
                    assert.fail(null, null, err.message);
                    done();
                } else {
                    assert.equal(row, null, 'The row was expected to be null.');
                    done();
                }
            }
        });
    });

    describe('#retrieveById', () => {

        it('retrieves all rows given the table1_id', (done) => {
            let id1 = 5;
            let id2a = 6;
            let id2b = 7;

            let id2aCreated = false;
            let id2bCreated = false;

            let ordersProductsGateway = OrdersProductsGatewayFactory.create();
            ordersProductsGateway.createRow(id1, id2a, createRow2aComplete);
            ordersProductsGateway.createRow(id1, id2b, createRow2bComplete);

            function createRow2aComplete(err: Error, isSuccess: boolean) {
                if(err) {
                    assert.fail(null, null, err.message);
                    done();
                } else {
                    if(isSuccess) {
                        id2aCreated = true;
                        retrieveRows();
                    } else {
                        assert.fail(null, null, 'createRow2aComplete failed');
                        done();
                    }
                }
            }

            function createRow2bComplete(err: Error, isSuccess: boolean) {
                if(err) {
                    assert.fail(null, null, err.message);
                    done();
                } else {
                    if(isSuccess) {
                        id2bCreated = true;
                        retrieveRows();
                    } else {
                        assert.fail(null, null, 'createRow2bComplete failed');
                        done();
                    }
                }
            }

            function retrieveRows() {
                if(id2aCreated && id2bCreated) {
                    ordersProductsGateway.retrieveByTable1Id(5, retrieveRowsCallback);
                }
            }

            function retrieveRowsCallback(err: Error, rows: any[]) {
                if(err) {
                    assert.fail(null, null, err.message);
                    done();
                } else {
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

    describe('#deleteById', () => {

        it('deletes all rows given the table1_id', (done) => {
            let id1 = 9;
            let id2a = 10;
            let id2b = 11;

            let id2aCreated = false;
            let id2bCreated = false;

            let ordersProductsGateway = OrdersProductsGatewayFactory.create();
            ordersProductsGateway.createRow(id1, id2a, createRow2aComplete);
            ordersProductsGateway.createRow(id1, id2b, createRow2bComplete);

            function createRow2aComplete(err: Error, isSuccess: boolean) {
                if(err) {
                    assert.fail(null, null, err.message);
                    done();
                } else {
                    if(isSuccess) {
                        id2aCreated = true;
                        deleteRows();
                    } else {
                        assert.fail(null, null, 'createRow2aComplete failed');
                        done();
                    }
                }
            }

            function createRow2bComplete(err: Error, isSuccess: boolean) {
                if(err) {
                    assert.fail(null, null, err.message);
                    done();
                } else {
                    if(isSuccess) {
                        id2bCreated = true;
                        deleteRows();
                    } else {
                        assert.fail(null, null, 'createRow2bComplete failed');
                        done();
                    }
                }
            }

            function deleteRows() {
                if(id2aCreated && id2bCreated) {
                    ordersProductsGateway.deleteByTable1Id(9, deleteRowsCallback);
                }
            }

            function deleteRowsCallback(err: Error, affectedRows: number) {
                if(err) {
                    assert.fail(null, null, err.message);
                    done();
                } else {
                    assert.equal(affectedRows, 2);
                    done();
                }
            }
        });
    });
});

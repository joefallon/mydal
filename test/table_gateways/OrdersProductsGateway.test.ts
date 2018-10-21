import assert = require('assert');
import {OrdersProductsGatewayFactory} from './OrdersProductsGatewayFactory';


describe('OrdersProductsGateway', () => {

    describe('#createRow and #retrieveRow', () => {

        it('creates and retrieves a row from the database', async () => {
            let id1 = 1;
            let id2 = 2;

            let ordersProductsGateway = OrdersProductsGatewayFactory.create();
            const isSuccess = await ordersProductsGateway.createRow(id1, id2);
            assert.strictEqual(isSuccess, true, 'row count');

            const row = await ordersProductsGateway.retrieveRow(id1, id2);

            assert.strictEqual(row['table1_id'], 1);
            assert.strictEqual(row['table2_id'], 2);

            let created: string = row['created'];
            assert.strictEqual(created.length, 19);
            assert.notStrictEqual(created, '0000-00-00 00:00:00');
        });
    });

    describe('#deleteRow', () => {

        it('deletes a row from the database', async () => {
            let id1 = 3;
            let id2 = 4;

            let ordersProductsGateway = OrdersProductsGatewayFactory.create();
            const isSuccess = await ordersProductsGateway.createRow(id1, id2);
            assert.strictEqual(isSuccess, true, 'row count');

            const affectedRows = await ordersProductsGateway.deleteRow(id1, id2);
            assert.strictEqual(affectedRows, 1);

            const result = await ordersProductsGateway.retrieveRow(id1, id2);
            assert.strictEqual(result, null);
        });
    });

    describe('#retrieveById', () => {

        it('retrieves all rows given the table1_id', async () => {
            let id1  = 5;
            let id2a = 6;
            let id2b = 7;

            let ordersProductsGateway = OrdersProductsGatewayFactory.create();

            let [id2aCreated, id2bCreated] = await Promise.all([
                ordersProductsGateway.createRow(id1, id2a),
                ordersProductsGateway.createRow(id1, id2b)
            ]);

            assert.strictEqual(id2aCreated, true, 'createRow2aComplete failed');
            assert.strictEqual(id2bCreated, true, 'createRow2bComplete failed');

            const rows = await ordersProductsGateway.retrieveByTable1Id(5);
            assert.strictEqual(rows.length, 2);
            assert.strictEqual(rows[0]['table1_id'], 5);
            assert.strictEqual(rows[0]['table2_id'], 6);
            assert.strictEqual(rows[1]['table1_id'], 5);
            assert.strictEqual(rows[1]['table2_id'], 7);
        });
    });

    describe('#deleteById', () => {

        it('deletes all rows given the table1_id', async () => {
            let id1  = 9;
            let id2a = 10;
            let id2b = 11;


            let ordersProductsGateway = OrdersProductsGatewayFactory.create();

            let [id2aCreated, id2bCreated] = await Promise.all([
                ordersProductsGateway.createRow(id1, id2a),
                ordersProductsGateway.createRow(id1, id2b)
            ]);

            assert.strictEqual(id2aCreated, true, 'createRow2aComplete failed');
            assert.strictEqual(id2bCreated, true, 'createRow2bComplete failed');

            const affectedRows = await ordersProductsGateway.deleteByTable1Id(9);
            assert.strictEqual(affectedRows, 2);
        });
    });
});

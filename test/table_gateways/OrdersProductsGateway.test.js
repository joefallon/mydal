"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const assert = require("assert");
const OrdersProductsGatewayFactory_1 = require("./OrdersProductsGatewayFactory");
describe('OrdersProductsGateway', () => {
    describe('#createRow and #retrieveRow', () => {
        it('creates and retrieves a row from the database', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            let id1 = 1;
            let id2 = 2;
            let ordersProductsGateway = OrdersProductsGatewayFactory_1.OrdersProductsGatewayFactory.create();
            const isSuccess = yield ordersProductsGateway.createRow(id1, id2);
            assert.strictEqual(isSuccess, true, 'row count');
            const row = yield ordersProductsGateway.retrieveRow(id1, id2);
            assert.strictEqual(row['table1_id'], 1);
            assert.strictEqual(row['table2_id'], 2);
            let created = row['created'];
            assert.strictEqual(created.length, 19);
            assert.notStrictEqual(created, '0000-00-00 00:00:00');
        }));
    });
    describe('#deleteRow', () => {
        it('deletes a row from the database', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            let id1 = 3;
            let id2 = 4;
            let ordersProductsGateway = OrdersProductsGatewayFactory_1.OrdersProductsGatewayFactory.create();
            const isSuccess = yield ordersProductsGateway.createRow(id1, id2);
            assert.strictEqual(isSuccess, true, 'row count');
            const affectedRows = yield ordersProductsGateway.deleteRow(id1, id2);
            assert.strictEqual(affectedRows, 1);
            const result = yield ordersProductsGateway.retrieveRow(id1, id2);
            assert.strictEqual(result, null);
        }));
    });
    describe('#retrieveById', () => {
        it('retrieves all rows given the table1_id', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            let id1 = 5;
            let id2a = 6;
            let id2b = 7;
            let ordersProductsGateway = OrdersProductsGatewayFactory_1.OrdersProductsGatewayFactory.create();
            let [id2aCreated, id2bCreated] = yield Promise.all([
                ordersProductsGateway.createRow(id1, id2a),
                ordersProductsGateway.createRow(id1, id2b)
            ]);
            assert.strictEqual(id2aCreated, true, 'createRow2aComplete failed');
            assert.strictEqual(id2bCreated, true, 'createRow2bComplete failed');
            const rows = yield ordersProductsGateway.retrieveByTable1Id(5);
            assert.strictEqual(rows.length, 2);
            assert.strictEqual(rows[0]['table1_id'], 5);
            assert.strictEqual(rows[0]['table2_id'], 6);
            assert.strictEqual(rows[1]['table1_id'], 5);
            assert.strictEqual(rows[1]['table2_id'], 7);
        }));
    });
    describe('#deleteById', () => {
        it('deletes all rows given the table1_id', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            let id1 = 9;
            let id2a = 10;
            let id2b = 11;
            let ordersProductsGateway = OrdersProductsGatewayFactory_1.OrdersProductsGatewayFactory.create();
            let [id2aCreated, id2bCreated] = yield Promise.all([
                ordersProductsGateway.createRow(id1, id2a),
                ordersProductsGateway.createRow(id1, id2b)
            ]);
            assert.strictEqual(id2aCreated, true, 'createRow2aComplete failed');
            assert.strictEqual(id2bCreated, true, 'createRow2bComplete failed');
            const affectedRows = yield ordersProductsGateway.deleteByTable1Id(9);
            assert.strictEqual(affectedRows, 2);
        }));
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3JkZXJzUHJvZHVjdHNHYXRld2F5LnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJPcmRlcnNQcm9kdWN0c0dhdGV3YXkudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxpQ0FBa0M7QUFDbEMsaUZBQTRFO0FBRzVFLFFBQVEsQ0FBQyx1QkFBdUIsRUFBRSxHQUFHLEVBQUU7SUFFbkMsUUFBUSxDQUFDLDZCQUE2QixFQUFFLEdBQUcsRUFBRTtRQUV6QyxFQUFFLENBQUMsK0NBQStDLEVBQUUsR0FBUyxFQUFFO1lBQzNELElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztZQUNaLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztZQUVaLElBQUkscUJBQXFCLEdBQUcsMkRBQTRCLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDbEUsTUFBTSxTQUFTLEdBQUcsTUFBTSxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ2xFLE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztZQUVqRCxNQUFNLEdBQUcsR0FBRyxNQUFNLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFFOUQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDeEMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFeEMsSUFBSSxPQUFPLEdBQVcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3JDLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN2QyxNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1FBQzFELENBQUMsQ0FB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
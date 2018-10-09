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
            return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                let id1 = 3;
                let id2 = 4;
                let ordersProductsGateway = OrdersProductsGatewayFactory_1.OrdersProductsGatewayFactory.create();
                const isSuccess = yield ordersProductsGateway.createRow(id1, id2);
                assert.strictEqual(isSuccess, true, 'row count');
                ordersProductsGateway.deleteRow(id1, id2, deleteRowCallback);
                function deleteRowCallback(err, affectedRows) {
                    return tslib_1.__awaiter(this, void 0, void 0, function* () {
                        if (err) {
                            assert.fail(null, null, err.message);
                            reject();
                        }
                        else {
                            assert.equal(affectedRows, 1);
                            const result = yield ordersProductsGateway.retrieveRow(id1, id2);
                            assert.equal(result, null, 'The row was expected to be null.');
                            resolve();
                        }
                    });
                }
            }));
        }));
    });
    describe('#retrieveById', () => {
        it('retrieves all rows given the table1_id', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
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
                retrieveRows();
                function retrieveRows() {
                    if (id2aCreated && id2bCreated) {
                        ordersProductsGateway.retrieveByTable1Id(5, retrieveRowsCallback);
                    }
                }
                function retrieveRowsCallback(err, rows) {
                    if (err) {
                        assert.fail(null, null, err.message);
                        reject();
                    }
                    else {
                        assert.equal(rows.length, 2);
                        assert.equal(rows[0]['table1_id'], 5);
                        assert.equal(rows[0]['table2_id'], 6);
                        assert.equal(rows[1]['table1_id'], 5);
                        assert.equal(rows[1]['table2_id'], 7);
                        resolve();
                    }
                }
            }));
        }));
    });
    describe('#deleteById', () => {
        it('deletes all rows given the table1_id', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
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
                deleteRows();
                function deleteRows() {
                    if (id2aCreated && id2bCreated) {
                        ordersProductsGateway.deleteByTable1Id(9, deleteRowsCallback);
                    }
                }
                function deleteRowsCallback(err, affectedRows) {
                    if (err) {
                        assert.fail(null, null, err.message);
                        reject();
                    }
                    else {
                        assert.equal(affectedRows, 2);
                        resolve();
                    }
                }
            }));
        }));
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3JkZXJzUHJvZHVjdHNHYXRld2F5LnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJPcmRlcnNQcm9kdWN0c0dhdGV3YXkudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxpQ0FBa0M7QUFDbEMsaUZBQTRFO0FBRzVFLFFBQVEsQ0FBQyx1QkFBdUIsRUFBRSxHQUFHLEVBQUU7SUFFbkMsUUFBUSxDQUFDLDZCQUE2QixFQUFFLEdBQUcsRUFBRTtRQUV6QyxFQUFFLENBQUMsK0NBQStDLEVBQUUsR0FBUyxFQUFFO1lBQzNELElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztZQUNaLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztZQUVaLElBQUkscUJBQXFCLEdBQUcsMkRBQTRCLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDbEUsTUFBTSxTQUFTLEdBQUcsTUFBTSxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ2xFLE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztZQUVqRCxNQUFNLEdBQUcsR0FBRyxNQUFNLHFCQUFxQixDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFFOUQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDeEMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFeEMsSUFBSSxPQUFPLEdBQVcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3JDLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN2QyxNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1FBQzFELENBQUMsQ0FB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
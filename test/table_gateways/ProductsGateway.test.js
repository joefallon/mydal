"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const assert = require("assert");
const Product_1 = require("../entities/Product");
const ProductsGatewayFactory_1 = require("./ProductsGatewayFactory");
describe('ProductsGateway', () => {
    describe('#createRow and #retrieveRow', () => {
        it('creates and retrieves a row in the database', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            let product = new Product_1.Product();
            product.setDescription('test desc');
            product.setName('test name');
            product.setPrice(1.11);
            let productsGateway = ProductsGatewayFactory_1.ProductsGatewayFactory.create();
            let id = yield productsGateway.createRow(product);
            product = yield productsGateway.retrieveRow(id);
            assert.strictEqual(product.getDescription(), 'test desc');
            assert.strictEqual(product.getId(), id);
            assert.strictEqual(product.getName(), 'test name');
            assert.strictEqual(product.getPrice(), 1.11);
            assert.ok(product.getId() > 0);
            assert.ok(product.getCreated().length > 0);
            assert.ok(product.getUpdated().length > 0);
            assert.notStrictEqual(product.getCreated(), '0000-00-00 00:00:00');
            assert.notStrictEqual(product.getUpdated(), '0000-00-00 00:00:00');
        }));
    });
    describe('#updateRow', () => {
        it('updates a row in the database', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            let product = new Product_1.Product();
            product.setDescription('test update');
            product.setName('name update');
            product.setPrice(1.11);
            const productsGateway = ProductsGatewayFactory_1.ProductsGatewayFactory.create();
            const id = yield productsGateway.createRow(product);
            product = yield productsGateway.retrieveRow(id);
            product.setDescription('updated desc');
            product.setName('updated name');
            product.setPrice(2.22);
            const affectedRows = yield productsGateway.updateRow(product);
            assert.strictEqual(affectedRows, 1, 'affected rows');
            product = yield productsGateway.retrieveRow(id);
            assert.strictEqual(product.getDescription(), 'updated desc');
            assert.strictEqual(product.getId(), id);
            assert.strictEqual(product.getName(), 'updated name');
            assert.strictEqual(product.getPrice(), 2.22);
            assert.ok(product.getId() > 0);
            assert.ok(product.getCreated().length > 0);
            assert.ok(product.getUpdated().length > 0);
            assert.notStrictEqual(product.getCreated(), '0000-00-00 00:00:00');
            assert.notStrictEqual(product.getUpdated(), '0000-00-00 00:00:00');
        }));
    });
    describe('#deleteRow', () => {
        it('deletes a row in the database', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            let product = new Product_1.Product();
            product.setDescription('test delete');
            product.setName('name delete');
            product.setPrice(1.11);
            let productsGateway = ProductsGatewayFactory_1.ProductsGatewayFactory.create();
            const id = yield productsGateway.createRow(product);
            const affected = yield productsGateway.deleteRow(id);
            assert.strictEqual(affected, 1);
            product = yield productsGateway.retrieveRow(id);
            assert.strictEqual(product, null);
        }));
    });
    describe('#retrieveRowsBy', () => {
        it('retrieves all rows with the given field value', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const product1 = new Product_1.Product();
            product1.setName('retrieveRowsBy1');
            product1.setDescription('retrieveRowsByDesc');
            product1.setPrice(1.11);
            const product2 = new Product_1.Product();
            product2.setName('retrieveRowsBy2');
            product2.setDescription('retrieveRowsByDesc');
            product2.setPrice(2.22);
            const productsGateway = ProductsGatewayFactory_1.ProductsGatewayFactory.create();
            let [id1, id2] = yield Promise.all([
                productsGateway.createRow(product1),
                productsGateway.createRow(product2)
            ]);
            // enforce ordering
            if (id1 > id2) {
                let temp = id1;
                id1 = id2;
                id2 = temp;
            }
            const products = yield productsGateway.retrieveByDescription('retrieveRowsByDesc');
            const p1 = products[0];
            assert.strictEqual(p1.getId(), id1, 'p1 id mismatch');
            const p2 = products[1];
            assert.strictEqual(p2.getId(), id2, 'p2 id mismatch');
        }));
    });
    describe('#retrieveRowsByIds', () => {
        it('retrieves products given an array of ids', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            let product1 = new Product_1.Product();
            product1.setName('retrieveRowsByIds1');
            product1.setDescription('retrieve ids desc');
            product1.setPrice(1.11);
            let product2 = new Product_1.Product();
            product2.setName('retrieveRowsByIds2');
            product2.setDescription('retrieve ids desc');
            product2.setPrice(2.22);
            let productsGateway = ProductsGatewayFactory_1.ProductsGatewayFactory.create();
            let [id1, id2] = yield Promise.all([
                productsGateway.createRow(product1),
                productsGateway.createRow(product2)
            ]);
            // enforce ordering
            if (id1 > id2) {
                let temp = id1;
                id1 = id2;
                id2 = temp;
            }
            const products = yield productsGateway.retrieveByIds([id1, id2]);
            let p1 = products[0];
            assert.strictEqual(p1.getId(), id1);
            let p2 = products[1];
            assert.strictEqual(p2.getId(), id2);
        }));
    });
    describe('#retrieveRowsByIsNull', () => {
        it('retrieves products with a NULL description', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const product1 = new Product_1.Product();
            product1.setName('retrieveRowsByIds1');
            product1.setPrice(1.11);
            const product2 = new Product_1.Product();
            product2.setName('retrieveRowsByIds2');
            product2.setPrice(2.22);
            const productsGateway = ProductsGatewayFactory_1.ProductsGatewayFactory.create();
            let [id1, id2] = yield Promise.all([
                productsGateway.createRow(product1),
                productsGateway.createRow(product2)
            ]);
            // enforce ordering
            if (id1 > id2) {
                let temp = id1;
                id1 = id2;
                id2 = temp;
            }
            const products = yield productsGateway.retrieveByNullDescription();
            const p1 = products[0];
            assert.strictEqual(p1.getId(), id1, 'p1 id mismatch');
            const p2 = products[1];
            assert.strictEqual(p2.getId(), id2, 'p2 id mismatch');
        }));
    });
    describe('#retrieveRowsByNotEqual', () => {
        it('retrieves products where the description does not equal the given value', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            let product1 = new Product_1.Product();
            product1.setName('retrieve not equal 1');
            product1.setDescription('description 1');
            product1.setPrice(1.11);
            let product2 = new Product_1.Product();
            product2.setName('retrieve not equal 2');
            product2.setDescription('description 2');
            product2.setPrice(2.22);
            let productsGateway = ProductsGatewayFactory_1.ProductsGatewayFactory.create();
            yield Promise.all([
                productsGateway.createRow(product1),
                productsGateway.createRow(product2)
            ]);
            let desc = 'description 1';
            const products = yield productsGateway.retrieveByDescriptionNotEqual(desc);
            assert.ok(products.length > 0);
        }));
    });
    describe('#setFieldNullWhere', () => {
        it('sets the description null where', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            let product1 = new Product_1.Product();
            product1.setName('retrieve not equal 1');
            product1.setDescription('null description 1');
            product1.setPrice(1.11);
            let product2 = new Product_1.Product();
            product2.setName('retrieve not equal 2');
            product2.setDescription('null description 2');
            product2.setPrice(2.22);
            let productsGateway = ProductsGatewayFactory_1.ProductsGatewayFactory.create();
            let [id1, id2] = yield Promise.all([
                productsGateway.createRow(product1),
                productsGateway.createRow(product2)
            ]);
            let desc = 'null description 2';
            const affectedRows = yield productsGateway.setDescriptionNullWhereNameIs(desc);
            assert.strictEqual(affectedRows, 1);
            let [p1, p2] = yield Promise.all([
                productsGateway.retrieveRow(id1),
                productsGateway.retrieveRow(id2)
            ]);
            assert.strictEqual(p1.getDescription(), 'null description 1');
            assert.strictEqual(p2.getDescription(), null);
        }));
    });
    describe('#deleteRowsBy', () => {
        it('deletes rows where name is', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const product1 = new Product_1.Product();
            product1.setName('deletes rows name 1');
            product1.setDescription('description 1');
            product1.setPrice(1.11);
            const product2 = new Product_1.Product();
            product2.setName('deletes rows name 2');
            product2.setDescription('description 2');
            product2.setPrice(2.22);
            const productsGateway = ProductsGatewayFactory_1.ProductsGatewayFactory.create();
            let [id1, id2] = yield Promise.all([
                productsGateway.createRow(product1),
                productsGateway.createRow(product2)
            ]);
            // enforce ordering
            if (id1 > id2) {
                let temp = id1;
                id1 = id2;
                id2 = temp;
            }
            const desc = 'deletes rows name 1';
            const affectedRows = yield productsGateway.deleteWhereNameIs(desc);
            assert.strictEqual(affectedRows, 1);
            const products = yield productsGateway.retrieveByIds([id1, id2]);
            assert.strictEqual(products.length, 1);
            const p1 = products[0];
            assert.strictEqual(p1.getDescription(), 'description 2');
        }));
    });
    describe('#countRowsByValue', () => {
        it('counts the number of rows where the name is', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            let product1 = new Product_1.Product();
            product1.setName('name 1');
            product1.setDescription('description 1');
            product1.setPrice(1.11);
            let product2 = new Product_1.Product();
            product2.setName('name 2');
            product2.setDescription('description 2');
            product2.setPrice(2.22);
            let productsGateway = ProductsGatewayFactory_1.ProductsGatewayFactory.create();
            yield Promise.all([
                productsGateway.createRow(product1),
                productsGateway.createRow(product2)
            ]);
            const affectedRows = yield productsGateway.countProductsByName('name 1');
            assert.strictEqual(affectedRows, 1);
        }));
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZHVjdHNHYXRld2F5LnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJQcm9kdWN0c0dhdGV3YXkudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxpQ0FBa0M7QUFDbEMsaURBQThDO0FBQzlDLHFFQUFrRTtBQUVsRSxRQUFRLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxFQUFFO0lBRTdCLFFBQVEsQ0FBQyw2QkFBNkIsRUFBRSxHQUFHLEVBQUU7UUFDekMsRUFBRSxDQUFDLDZDQUE2QyxFQUFFLEdBQVMsRUFBRTtZQUN6RCxJQUFJLE9BQU8sR0FBRyxJQUFJLGlCQUFPLEVBQUUsQ0FBQztZQUM1QixPQUFPLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3BDLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDN0IsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUV2QixJQUFJLGVBQWUsR0FBRywrQ0FBc0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN0RCxJQUFJLEVBQUUsR0FBSSxNQUFNLGVBQWUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbkQsT0FBTyxHQUFHLE1BQU0sZUFBZSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUVoRCxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQztZQUMxRCxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN4QyxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQztZQUNuRCxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUU3QyxNQUFNLENBQUMsRUFBRSxDQUFDLE9B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
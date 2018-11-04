"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const assert = require("assert");
const ProductsGatewayFactory_1 = require("./ProductsGatewayFactory");
const Product_1 = require("../entities/Product");
describe('ProductsGateway', () => {
    describe('#createRow and #retrieveRow', () => {
        it('creates and retrieves a row in the database', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            let product = new Product_1.Product();
            product.description = 'test desc';
            product.name = 'test name';
            product.price = 1.11;
            let productsGateway = ProductsGatewayFactory_1.ProductsGatewayFactory.create();
            product = yield productsGateway.createRow(product);
            product = yield productsGateway.retrieveRow(product.id);
            assert.strictEqual(product.description, 'test desc');
            assert.strictEqual(product.name, 'test name');
            assert.strictEqual(product.price, 1.11);
            assert.ok(product.id > 0);
            assert.ok(product.created.length > 0);
            assert.ok(product.updated.length > 0);
            assert.notStrictEqual(product.created, '0000-00-00 00:00:00');
            assert.notStrictEqual(product.updated, '0000-00-00 00:00:00');
        }));
    });
    describe('#updateRow', () => {
        it('updates a row in the database', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            let product = new Product_1.Product();
            product.description = 'test update';
            product.name = 'name update';
            product.price = 1.11;
            const productsGateway = ProductsGatewayFactory_1.ProductsGatewayFactory.create();
            product = yield productsGateway.createRow(product);
            product = yield productsGateway.retrieveRow(product.id);
            product.description = 'updated desc';
            product.name = 'updated name';
            product.price = 2.22;
            const affectedRows = yield productsGateway.updateRow(product);
            assert.strictEqual(affectedRows, 1, 'affected rows');
            product = yield productsGateway.retrieveRow(product.id);
            assert.strictEqual(product.description, 'updated desc');
            assert.strictEqual(product.name, 'updated name');
            assert.strictEqual(product.price, 2.22);
            assert.ok(product.id > 0);
            assert.ok(product.created.length > 0);
            assert.ok(product.updated.length > 0);
            assert.notStrictEqual(product.created, '0000-00-00 00:00:00');
            assert.notStrictEqual(product.updated, '0000-00-00 00:00:00');
        }));
    });
    describe('#deleteRow', () => {
        it('deletes a row in the database', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            let product = new Product_1.Product();
            product.description = 'test delete';
            product.name = 'name delete';
            product.price = 1.11;
            let productsGateway = ProductsGatewayFactory_1.ProductsGatewayFactory.create();
            product = yield productsGateway.createRow(product);
            const affected = yield productsGateway.deleteRow(product.id);
            assert.strictEqual(affected, 1);
            product = yield productsGateway.retrieveRow(product.id);
            assert.strictEqual(product, null);
        }));
    });
    describe('#retrieveRowsBy', () => {
        it('retrieves all rows with the given field value', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            let product1 = new Product_1.Product();
            product1.name = 'retrieveRowsBy1';
            product1.description = 'retrieveRowsByDesc';
            product1.price = 1.11;
            let product2 = new Product_1.Product();
            product2.name = 'retrieveRowsBy2';
            product2.description = 'retrieveRowsByDesc';
            product2.price = 2.22;
            const productsGateway = ProductsGatewayFactory_1.ProductsGatewayFactory.create();
            [product1, product2] = yield Promise.all([
                productsGateway.createRow(product1),
                productsGateway.createRow(product2)
            ]);
            // enforce ordering
            if (product1.id > product2.id) {
                let temp = product1;
                product1 = product2;
                product2 = temp;
            }
            const products = yield productsGateway.retrieveByDescription('retrieveRowsByDesc');
            const p1 = products[0];
            assert.strictEqual(p1.id, product1.id, 'p1 id mismatch');
            const p2 = products[1];
            assert.strictEqual(p2.id, product2.id, 'p2 id mismatch');
        }));
    });
    describe('#retrieveRowsByIds', () => {
        it('retrieves products given an array of ids', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            let product1 = new Product_1.Product();
            product1.name = 'retrieveRowsByIds1';
            product1.description = 'retrieve ids desc';
            product1.price = 1.11;
            let product2 = new Product_1.Product();
            product2.name = 'retrieveRowsByIds2';
            product2.description = 'retrieve ids desc';
            product2.price = 2.22;
            let productsGateway = ProductsGatewayFactory_1.ProductsGatewayFactory.create();
            [product1, product2] = yield Promise.all([
                productsGateway.createRow(product1),
                productsGateway.createRow(product2)
            ]);
            // enforce ordering
            if (product1.id > product2.id) {
                let temp = product1;
                product1 = product2;
                product2 = temp;
            }
            const products = yield productsGateway.retrieveByIds([product1.id, product2.id]);
            let p1 = products[0];
            assert.strictEqual(p1.id, product1.id);
            let p2 = products[1];
            assert.strictEqual(p2.id, product2.id);
        }));
    });
    describe('#retrieveRowsByIsNull', () => {
        it('retrieves products with a NULL description', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            let product1 = new Product_1.Product();
            product1.name = 'retrieveRowsByIds1';
            product1.price = 1.11;
            let product2 = new Product_1.Product();
            product2.name = 'retrieveRowsByIds2';
            product2.price = 2.22;
            const productsGateway = ProductsGatewayFactory_1.ProductsGatewayFactory.create();
            [product1, product2] = yield Promise.all([
                productsGateway.createRow(product1),
                productsGateway.createRow(product2)
            ]);
            // enforce ordering
            if (product1.id > product2.id) {
                let temp = product1;
                product1 = product2;
                product2 = temp;
            }
            const products = yield productsGateway.retrieveByNullDescription();
            const p1 = products[0];
            assert.strictEqual(p1.id, product1.id, 'p1 id mismatch');
            const p2 = products[1];
            assert.strictEqual(p2.id, product2.id, 'p2 id mismatch');
        }));
    });
    describe('#retrieveRowsByNotEqual', () => {
        it('retrieves products where the description does not equal the given value', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            let product1 = new Product_1.Product();
            product1.name = 'retrieve not equal 1';
            product1.description = 'description 1';
            product1.price = 1.11;
            let product2 = new Product_1.Product();
            product2.name = 'retrieve not equal 2';
            product2.description = 'description 2';
            product2.price = 2.22;
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
            product1.name = 'retrieve not equal 1';
            product1.description = 'null description 1';
            product1.price = 1.11;
            let product2 = new Product_1.Product();
            product2.name = 'retrieve not equal 2';
            product2.description = 'null description 2';
            product2.price = 2.22;
            let productsGateway = ProductsGatewayFactory_1.ProductsGatewayFactory.create();
            [product1, product2] = yield Promise.all([
                productsGateway.createRow(product1),
                productsGateway.createRow(product2)
            ]);
            let desc = 'null description 2';
            const affectedRows = yield productsGateway.setDescriptionNullWhereNameIs(desc);
            assert.strictEqual(affectedRows, 1);
            [product1, product2] = yield Promise.all([
                productsGateway.retrieveRow(product1.id),
                productsGateway.retrieveRow(product2.id)
            ]);
            assert.strictEqual(product1.description, 'null description 1');
            assert.strictEqual(product2.description, null);
        }));
    });
    describe('#deleteRowsBy', () => {
        it('deletes rows where name is', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            let product1 = new Product_1.Product();
            product1.name = 'deletes rows name 1';
            product1.description = 'description 1';
            product1.price = 1.11;
            let product2 = new Product_1.Product();
            product2.name = 'deletes rows name 2';
            product2.description = 'description 2';
            product2.price = 2.22;
            const productsGateway = ProductsGatewayFactory_1.ProductsGatewayFactory.create();
            [product1, product2] = yield Promise.all([
                productsGateway.createRow(product1),
                productsGateway.createRow(product2)
            ]);
            // enforce ordering
            if (product1.id > product2.id) {
                let temp = product1;
                product1 = product2;
                product2 = temp;
            }
            const desc = 'deletes rows name 1';
            const affectedRows = yield productsGateway.deleteWhereNameIs(desc);
            assert.strictEqual(affectedRows, 1);
            const products = yield productsGateway.retrieveByIds([product1.id, product2.id]);
            assert.strictEqual(products.length, 1);
            product1 = products[0];
            assert.strictEqual(product1.description, 'description 2');
        }));
    });
    describe('#countRowsByValue', () => {
        it('counts the number of rows where the name is', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            let product1 = new Product_1.Product();
            product1.name = 'name 1';
            product1.description = 'description 1';
            product1.price = 1.11;
            let product2 = new Product_1.Product();
            product2.name = 'name 2';
            product2.description = 'description 2';
            product2.price = 2.22;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZHVjdHNHYXRld2F5LnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJQcm9kdWN0c0dhdGV3YXkudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxpQ0FBa0M7QUFFbEMscUVBQWtFO0FBQ2xFLGlEQUE4QztBQUU5QyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxFQUFFO0lBRTdCLFFBQVEsQ0FBQyw2QkFBNkIsRUFBRSxHQUFHLEVBQUU7UUFDekMsRUFBRSxDQUFDLDZDQUE2QyxFQUFFLEdBQVMsRUFBRTtZQUN6RCxJQUFJLE9BQU8sR0FBRyxJQUFJLGlCQUFPLEVBQUUsQ0FBQztZQUM1QixPQUFPLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztZQUNsQyxPQUFPLENBQUMsSUFBSSxHQUFVLFdBQVcsQ0FBQztZQUNsQyxPQUFPLENBQUMsS0FBSyxHQUFTLElBQUksQ0FBQztZQUUzQixJQUFJLGVBQWUsR0FBRywrQ0FBc0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN0RCxPQUFPLEdBQUcsTUFBTSxlQUFlLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ25ELE9BQU8sR0FBRyxNQUFNLGVBQWUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRXhELE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQztZQUNyRCxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFDOUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBRXhDLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUMxQixNQUFNLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENB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
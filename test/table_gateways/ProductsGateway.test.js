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
            let id = yield productsGateway.createRow(product);
            product = yield productsGateway.retrieveRow(id);
            assert.strictEqual(product.description, 'test desc');
            assert.strictEqual(product.id, id);
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
            const id = yield productsGateway.createRow(product);
            product = yield productsGateway.retrieveRow(id);
            product.description = 'updated desc';
            product.name = 'updated name';
            product.price = 2.22;
            const affectedRows = yield productsGateway.updateRow(product);
            assert.strictEqual(affectedRows, 1, 'affected rows');
            product = yield productsGateway.retrieveRow(id);
            assert.strictEqual(product.description, 'updated desc');
            assert.strictEqual(product.id, id);
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
            product1.name = 'retrieveRowsBy1';
            product1.description = 'retrieveRowsByDesc';
            product1.price = 1.11;
            const product2 = new Product_1.Product();
            product2.name = 'retrieveRowsBy2';
            product2.description = 'retrieveRowsByDesc';
            product2.price = 2.22;
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
            assert.strictEqual(p1.id, id1, 'p1 id mismatch');
            const p2 = products[1];
            assert.strictEqual(p2.id, id2, 'p2 id mismatch');
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
            assert.strictEqual(p1.id, id1);
            let p2 = products[1];
            assert.strictEqual(p2.id, id2);
        }));
    });
    describe('#retrieveRowsByIsNull', () => {
        it('retrieves products with a NULL description', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const product1 = new Product_1.Product();
            product1.name = 'retrieveRowsByIds1';
            product1.price = 1.11;
            const product2 = new Product_1.Product();
            product2.name = 'retrieveRowsByIds2';
            product2.price = 2.22;
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
            assert.strictEqual(p1.id, id1, 'p1 id mismatch');
            const p2 = products[1];
            assert.strictEqual(p2.id, id2, 'p2 id mismatch');
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
            assert.strictEqual(p1.description, 'null description 1');
            assert.strictEqual(p2.description, null);
        }));
    });
    describe('#deleteRowsBy', () => {
        it('deletes rows where name is', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const product1 = new Product_1.Product();
            product1.name = 'deletes rows name 1';
            product1.description = 'description 1';
            product1.price = 1.11;
            const product2 = new Product_1.Product();
            product2.name = 'deletes rows name 2';
            product2.description = 'description 2';
            product2.price = 2.22;
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
            assert.strictEqual(p1.description, 'description 2');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZHVjdHNHYXRld2F5LnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJQcm9kdWN0c0dhdGV3YXkudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxpQ0FBa0M7QUFFbEMscUVBQWtFO0FBQ2xFLGlEQUE4QztBQUU5QyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxFQUFFO0lBRTdCLFFBQVEsQ0FBQyw2QkFBNkIsRUFBRSxHQUFHLEVBQUU7UUFDekMsRUFBRSxDQUFDLDZDQUE2QyxFQUFFLEdBQVMsRUFBRTtZQUN6RCxJQUFJLE9BQU8sR0FBRyxJQUFJLGlCQUFPLEVBQUUsQ0FBQztZQUM1QixPQUFPLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztZQUNsQyxPQUFPLENBQUMsSUFBSSxHQUFVLFdBQVcsQ0FBQztZQUNsQyxPQUFPLENBQUMsS0FBSyxHQUFTLElBQUksQ0FBQztZQUUzQixJQUFJLGVBQWUsR0FBRywrQ0FBc0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN0RCxJQUFJLEVBQUUsR0FBSSxNQUFNLGVBQWUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbkQsT0FBTyxHQUFHLE1BQU0sZUFBZSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUVoRCxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFDckQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ25DLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztZQUM5QyxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFeEMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzFCLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDdEMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN0QyxNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUscUJBQXFCLENBQUMsQ0FBQztZQUM5RCxNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUscUJBQXFCLENBQUMsQ0FBQztRQUNsRSxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtRQUN4QixFQUFFLENBQUMsK0JBQStCLEVBQUUsR0FBUyxFQUFFO1lBQzNDLElBQUksT0FBTyxHQUFHLElBQUksaUJBQU8sRUFBRSxDQUFDO1lBQzVCLE9BQU8sQ0FBQyxXQUFXLEdBQUcsYUFBYSxDQUFDO1lBQ3BDLE9BQU8sQ0FBQyxJQUFJLEdBQUksYUFBYSxDQUFDO1lBQzlCLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBRXJCLE1BQU0sZUFBZSxHQUFHLCtDQUFzQixDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3hELE1BQU0sRUFBRSxHQUFHLE1BQU0sZUFBZSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNwRCxPQUFPLEdBQUksTUFBTSxlQUFlLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRWpELE9BQU8sQ0FBQyxXQUFXLEdBQUcsY0FBYyxDQUFDO1lBQ3JDLE9BQU8sQ0FBQyxJQUFJLEdBQUksY0FBYyxDQUFDO1lBQy9CLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBRXJCLE1BQU0sWUFBWSxHQUFHLE1BQU0sZUFBZSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM5RCxNQUFNLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxDQUFDLEVBQUUsZUFBZSxDQUFDLENBQUM7WUFFckQsT0FBTyxHQUFHLE1BQU0sZUFBZSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUVoRCxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsY0FBYyxDQUFDLENBQUM7WUFDeEQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ25DLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxjQUFjLENBQUMsQ0FBQztZQUNqRCxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFeEMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzFCLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDdEMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN0QyxNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUscUJBQXFCLENBQUMsQ0FBQztZQUM5RCxNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUscUJBQXFCLENBQUMsQ0FBQztRQUNsRSxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtRQUN4QixFQUFFLENBQUMsK0JBQStCLEVBQUUsR0FBUyxFQUFFO1lBQzNDLElBQUksT0FBTyxHQUFHLElBQUksaUJBQU8sRUFBRSxDQUFDO1lBQzVCLE9BQU8sQ0FBQyxXQUFXLEdBQUcsYUFBYSxDQUFDO1lBQ3BDLE9BQU8sQ0FBQyxJQUFJLEdBQUksYUFBYSxDQUFDO1lBQzlCLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBRXJCLElBQUksZUFBZSxHQUFHLCtDQUFzQixDQUFDLE1BQU0sRUFBRSxDQUFDO1lBRXRELE1BQU0sRUFBRSxHQUFTLE1BQU0sZUFBZSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMxRCxNQUFNLFFBQVEsR0FBRyxNQUFNLGVBQWUsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDckQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFaEMsT0FBTyxHQUFHLE1BQU0sZUFBZSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNoRCxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN0QyxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxFQUFFO1FBQzdCLEVBQUUsQ0FBQywrQ0FBK0MsRUFBRSxHQUFTLEVBQUU7WUFDM0QsTUFBTSxRQUFRLEdBQVMsSUFBSSxpQkFBTyxFQUFFLENBQUM7WUFDckMsUUFBUSxDQUFDLElBQUksR0FBVSxpQkFBaUIsQ0FBQztZQUN6QyxRQUFRLENBQUMsV0FBVyxHQUFHLG9CQUFvQixDQUFDO1lBQzVDLFFBQVEsQ0FBQyxLQUFLLEdBQVMsSUFBSSxDQUFDO1lBRTVCLE1BQU0sUUFBUSxHQUFTLElBQUksaUJBQU8sRUFBRSxDQUFDO1lBQ3JDLFFBQVEsQ0FBQyxJQUFJLEdBQVUsaUJBQWlCLENBQUM7WUFDekMsUUFBUSxDQUFDLFdBQVcsR0FBRyxvQkFBb0IsQ0FBQztZQUM1QyxRQUFRLENBQUMsS0FBSyxHQUFTLElBQUksQ0FBQztZQUU1QixNQUFNLGVBQWUsR0FBRywrQ0FBc0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUV4RCxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztnQkFDL0IsZUFBZSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7Z0JBQ25DLGVBQWUsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO2FBQ3RDLENBQUMsQ0FBQztZQUVILG1CQUFtQjtZQUNuQixJQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUU7Z0JBQ1YsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDO2dCQUNmLEdBQUcsR0FBRyxHQUFHLENBQUM7Z0JBQ1YsR0FBRyxHQUFHLElBQUksQ0FBQzthQUNkO1lBRUQsTUFBTSxRQUFRLEdBQUcsTUFBTSxlQUFlLENBQUMscUJBQXFCLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUVuRixNQUFNLEVBQUUsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1lBRWpELE1BQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QixNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDckQsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLG9CQUFvQixFQUFFLEdBQUcsRUFBRTtRQUNoQyxFQUFFLENBQUMsMENBQTBDLEVBQUUsR0FBUyxFQUFFO1lBQ3RELElBQUksUUFBUSxHQUFXLElBQUksaUJBQU8sRUFBRSxDQUFDO1lBQ3JDLFFBQVEsQ0FBQyxJQUFJLEdBQVUsb0JBQW9CLENBQUM7WUFDNUMsUUFBUSxDQUFDLFdBQVcsR0FBRyxtQkFBbUIsQ0FBQztZQUMzQyxRQUFRLENBQUMsS0FBSyxHQUFTLElBQUksQ0FBQztZQUU1QixJQUFJLFFBQVEsR0FBVyxJQUFJLGlCQUFPLEVBQUUsQ0FBQztZQUNyQyxRQUFRLENBQUMsSUFBSSxHQUFVLG9CQUFvQixDQUFDO1lBQzVDLFFBQVEsQ0FBQyxXQUFXLEdBQUcsbUJBQW1CLENBQUM7WUFDM0MsUUFBUSxDQUFDLEtBQUssR0FBUyxJQUFJLENBQUM7WUFFNUIsSUFBSSxlQUFlLEdBQUcsK0NBQXNCLENBQUMsTUFBTSxFQUFFLENBQUM7WUFFdEQsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUM7Z0JBQy9CLGVBQWUsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO2dCQUNuQyxlQUFlLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQzthQUN0QyxDQUFDLENBQUM7WUFFSCxtQkFBbUI7WUFDbkIsSUFBRyxHQUFHLEdBQUcsR0FBRyxFQUFFO2dCQUNWLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQztnQkFDZixHQUFHLEdBQUcsR0FBRyxDQUFDO2dCQUNWLEdBQUcsR0FBRyxJQUFJLENBQUM7YUFDZDtZQUVELE1BQU0sUUFBUSxHQUFHLE1BQU0sZUFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBRWpFLElBQUksRUFBRSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQixNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFFL0IsSUFBSSxFQUFFLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNuQyxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsdUJBQXVCLEVBQUUsR0FBRyxFQUFFO1FBQ25DLEVBQUUsQ0FBQyw0Q0FBNEMsRUFBRSxHQUFTLEVBQUU7WUFDeEQsTUFBTSxRQUFRLEdBQUcsSUFBSSxpQkFBTyxFQUFFLENBQUM7WUFDL0IsUUFBUSxDQUFDLElBQUksR0FBSSxvQkFBb0IsQ0FBQztZQUN0QyxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUV0QixNQUFNLFFBQVEsR0FBRyxJQUFJLGlCQUFPLEVBQUUsQ0FBQztZQUMvQixRQUFRLENBQUMsSUFBSSxHQUFJLG9CQUFvQixDQUFDO1lBQ3RDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBRXRCLE1BQU0sZUFBZSxHQUFHLCtDQUFzQixDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3hELElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO2dCQUMvQixlQUFlLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztnQkFDbkMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7YUFDdEMsQ0FBQyxDQUFDO1lBRUgsbUJBQW1CO1lBQ25CLElBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRTtnQkFDVixJQUFJLElBQUksR0FBRyxHQUFHLENBQUM7Z0JBQ2YsR0FBRyxHQUFHLEdBQUcsQ0FBQztnQkFDVixHQUFHLEdBQUcsSUFBSSxDQUFDO2FBQ2Q7WUFFRCxNQUFNLFFBQVEsR0FBRyxNQUFNLGVBQWUsQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1lBRW5FLE1BQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QixNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLGdCQUFnQixDQUFDLENBQUM7WUFFakQsTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUNyRCxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMseUJBQXlCLEVBQUUsR0FBRyxFQUFFO1FBQ3JDLEVBQUUsQ0FBQyx5RUFBeUUsRUFBRSxHQUFTLEVBQUU7WUFDckYsSUFBSSxRQUFRLEdBQVcsSUFBSSxpQkFBTyxFQUFFLENBQUM7WUFDckMsUUFBUSxDQUFDLElBQUksR0FBVSxzQkFBc0IsQ0FBQztZQUM5QyxRQUFRLENBQUMsV0FBVyxHQUFHLGVBQWUsQ0FBQztZQUN2QyxRQUFRLENBQUMsS0FBSyxHQUFTLElBQUksQ0FBQztZQUU1QixJQUFJLFFBQVEsR0FBVyxJQUFJLGlCQUFPLEVBQUUsQ0FBQztZQUNyQyxRQUFRLENBQUMsSUFBSSxHQUFVLHNCQUFzQixDQUFDO1lBQzlDLFFBQVEsQ0FBQyxXQUFXLEdBQUcsZUFBZSxDQUFDO1lBQ3ZDLFFBQVEsQ0FBQyxLQUFLLEdBQVMsSUFBSSxDQUFDO1lBRTVCLElBQUksZUFBZSxHQUFHLCtDQUFzQixDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3RELE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztnQkFDZCxlQUFlLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztnQkFDbkMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7YUFDdEMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxJQUFJLEdBQUcsZUFBZSxDQUFDO1lBQzNCLE1BQU0sUUFBUSxHQUFHLE1BQU0sZUFBZSxDQUFDLDZCQUE2QixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNFLE1BQU0sQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNuQyxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsb0JBQW9CLEVBQUUsR0FBRyxFQUFFO1FBQ2hDLEVBQUUsQ0FBQyxpQ0FBaUMsRUFBRSxHQUFTLEVBQUU7WUFDN0MsSUFBSSxRQUFRLEdBQVcsSUFBSSxpQkFBTyxFQUFFLENBQUM7WUFDckMsUUFBUSxDQUFDLElBQUksR0FBVSxzQkFBc0IsQ0FBQztZQUM5QyxRQUFRLENBQUMsV0FBVyxHQUFHLG9CQUFvQixDQUFDO1lBQzVDLFFBQVEsQ0FBQyxLQUFLLEdBQVMsSUFBSSxDQUFDO1lBRTVCLElBQUksUUFBUSxHQUFXLElBQUksaUJBQU8sRUFBRSxDQUFDO1lBQ3JDLFFBQVEsQ0FBQyxJQUFJLEdBQVUsc0JBQXNCLENBQUM7WUFDOUMsUUFBUSxDQUFDLFdBQVcsR0FBRyxvQkFBb0IsQ0FBQztZQUM1QyxRQUFRLENBQUMsS0FBSyxHQUFTLElBQUksQ0FBQztZQUU1QixJQUFJLGVBQWUsR0FBRywrQ0FBc0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN0RCxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQztnQkFDL0IsZUFBZSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7Z0JBQ25DLGVBQWUsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO2FBQ3RDLENBQUMsQ0FBQztZQUVILElBQUksSUFBSSxHQUFHLG9CQUFvQixDQUFDO1lBQ2hDLE1BQU0sWUFBWSxHQUFHLE1BQU0sZUFBZSxDQUFDLDZCQUE2QixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9FLE1BQU0sQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBRXBDLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO2dCQUM3QixlQUFlLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQztnQkFDaEMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUM7YUFDbkMsQ0FBQyxDQUFDO1lBRUgsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLG9CQUFvQixDQUFDLENBQUM7WUFDekQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzdDLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFO1FBQzNCLEVBQUUsQ0FBQyw0QkFBNEIsRUFBRSxHQUFTLEVBQUU7WUFDeEMsTUFBTSxRQUFRLEdBQVMsSUFBSSxpQkFBTyxFQUFFLENBQUM7WUFDckMsUUFBUSxDQUFDLElBQUksR0FBVSxxQkFBcUIsQ0FBQztZQUM3QyxRQUFRLENBQUMsV0FBVyxHQUFHLGVBQWUsQ0FBQztZQUN2QyxRQUFRLENBQUMsS0FBSyxHQUFTLElBQUksQ0FBQztZQUU1QixNQUFNLFFBQVEsR0FBUyxJQUFJLGlCQUFPLEVBQUUsQ0FBQztZQUNyQyxRQUFRLENBQUMsSUFBSSxHQUFVLHFCQUFxQixDQUFDO1lBQzdDLFFBQVEsQ0FBQyxXQUFXLEdBQUcsZUFBZSxDQUFDO1lBQ3ZDLFFBQVEsQ0FBQyxLQUFLLEdBQVMsSUFBSSxDQUFDO1lBRTVCLE1BQU0sZUFBZSxHQUFHLCtDQUFzQixDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3hELElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO2dCQUMvQixlQUFlLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztnQkFDbkMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7YUFDdEMsQ0FBQyxDQUFDO1lBRUgsbUJBQW1CO1lBQ25CLElBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRTtnQkFDVixJQUFJLElBQUksR0FBRyxHQUFHLENBQUM7Z0JBQ2YsR0FBRyxHQUFHLEdBQUcsQ0FBQztnQkFDVixHQUFHLEdBQUcsSUFBSSxDQUFDO2FBQ2Q7WUFFRCxNQUFNLElBQUksR0FBRyxxQkFBcUIsQ0FBQztZQUNuQyxNQUFNLFlBQVksR0FBRyxNQUFNLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuRSxNQUFNLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUVwQyxNQUFNLFFBQVEsR0FBRyxNQUFNLGVBQWUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNqRSxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFdkMsTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUN4RCxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxFQUFFO1FBQy9CLEVBQUUsQ0FBQyw2Q0FBNkMsRUFBRSxHQUFTLEVBQUU7WUFDekQsSUFBSSxRQUFRLEdBQVcsSUFBSSxpQkFBTyxFQUFFLENBQUM7WUFDckMsUUFBUSxDQUFDLElBQUksR0FBVSxRQUFRLENBQUM7WUFDaEMsUUFBUSxDQUFDLFdBQVcsR0FBRyxlQUFlLENBQUM7WUFDdkMsUUFBUSxDQUFDLEtBQUssR0FBUyxJQUFJLENBQUM7WUFFNUIsSUFBSSxRQUFRLEdBQVcsSUFBSSxpQkFBTyxFQUFFLENBQUM7WUFDckMsUUFBUSxDQUFDLElBQUksR0FBVSxRQUFRLENBQUM7WUFDaEMsUUFBUSxDQUFDLFdBQVcsR0FBRyxlQUFlLENBQUM7WUFDdkMsUUFBUSxDQUFDLEtBQUssR0FBUyxJQUFJLENBQUM7WUFFNUIsSUFBSSxlQUFlLEdBQUcsK0NBQXNCLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDdEQsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO2dCQUNkLGVBQWUsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO2dCQUNuQyxlQUFlLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQzthQUN0QyxDQUFDLENBQUM7WUFFSCxNQUFNLFlBQVksR0FBRyxNQUFNLGVBQWUsQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN6RSxNQUFNLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN4QyxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyJ9
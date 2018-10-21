import assert = require('assert');
import { Product } from "../entities/Product";
import { ProductsGatewayFactory } from "./ProductsGatewayFactory";

describe('ProductsGateway', () => {

    describe('#createRow and #retrieveRow', () => {
        it('creates and retrieves a row in the database', async () => {
            let product = new Product();
            product.setDescription('test desc');
            product.setName('test name');
            product.setPrice(1.11);

            let productsGateway = ProductsGatewayFactory.create();
            let id  = await productsGateway.createRow(product);
            product = await productsGateway.retrieveRow(id);

            assert.strictEqual(product.getDescription(), 'test desc');
            assert.strictEqual(product.getId(), id);
            assert.strictEqual(product.getName(), 'test name');
            assert.strictEqual(product.getPrice(), 1.11);

            assert.ok(product.getId() > 0);
            assert.ok(product.getCreated().length > 0);
            assert.ok(product.getUpdated().length > 0);
            assert.notStrictEqual(product.getCreated(), '0000-00-00 00:00:00');
            assert.notStrictEqual(product.getUpdated(), '0000-00-00 00:00:00');
        });
    });

    describe('#updateRow', () => {
        it('updates a row in the database', async () => {
            let product = new Product();
            product.setDescription('test update');
            product.setName('name update');
            product.setPrice(1.11);

            const productsGateway = ProductsGatewayFactory.create();
            const id = await productsGateway.createRow(product);
            product  = await productsGateway.retrieveRow(id);

            product.setDescription('updated desc');
            product.setName('updated name');
            product.setPrice(2.22);

            const affectedRows = await productsGateway.updateRow(product);
            assert.strictEqual(affectedRows, 1, 'affected rows');

            product = await productsGateway.retrieveRow(id);

            assert.strictEqual(product.getDescription(), 'updated desc');
            assert.strictEqual(product.getId(), id);
            assert.strictEqual(product.getName(), 'updated name');
            assert.strictEqual(product.getPrice(), 2.22);

            assert.ok(product.getId() > 0);
            assert.ok(product.getCreated().length > 0);
            assert.ok(product.getUpdated().length > 0);
            assert.notStrictEqual(product.getCreated(), '0000-00-00 00:00:00');
            assert.notStrictEqual(product.getUpdated(), '0000-00-00 00:00:00');
        });
    });

    describe('#deleteRow', () => {
        it('deletes a row in the database', async () => {
            let product = new Product();
            product.setDescription('test delete');
            product.setName('name delete');
            product.setPrice(1.11);

            let productsGateway = ProductsGatewayFactory.create();

            const id       = await productsGateway.createRow(product);
            const affected = await productsGateway.deleteRow(id);
            assert.strictEqual(affected, 1);

            product = await productsGateway.retrieveRow(id);
            assert.strictEqual(product, null);
        });
    });

    describe('#retrieveRowsBy', () => {
        it('retrieves all rows with the given field value', async () => {
            const product1 = new Product();
            product1.setName('retrieveRowsBy1');
            product1.setDescription('retrieveRowsByDesc');
            product1.setPrice(1.11);

            const product2 = new Product();
            product2.setName('retrieveRowsBy2');
            product2.setDescription('retrieveRowsByDesc');
            product2.setPrice(2.22);

            const productsGateway = ProductsGatewayFactory.create();

            let [id1, id2] = await Promise.all([
                productsGateway.createRow(product1),
                productsGateway.createRow(product2)
            ]);

            // enforce ordering
            if(id1 > id2) {
                let temp = id1;
                id1 = id2;
                id2 = temp;
            }

            const products = await productsGateway.retrieveByDescription('retrieveRowsByDesc');

            const p1 = products[0];
            assert.strictEqual(p1.getId(), id1, 'p1 id mismatch');

            const p2 = products[1];
            assert.strictEqual(p2.getId(), id2, 'p2 id mismatch');
        });
    });

    describe('#retrieveRowsByIds', () => {
        it('retrieves products given an array of ids', async () => {
            let product1 = new Product();
            product1.setName('retrieveRowsByIds1');
            product1.setDescription('retrieve ids desc');
            product1.setPrice(1.11);

            let product2 = new Product();
            product2.setName('retrieveRowsByIds2');
            product2.setDescription('retrieve ids desc');
            product2.setPrice(2.22);

            let productsGateway = ProductsGatewayFactory.create();

            let [id1, id2] = await Promise.all([
                productsGateway.createRow(product1),
                productsGateway.createRow(product2)
            ]);

            // enforce ordering
            if(id1 > id2) {
                let temp = id1;
                id1 = id2;
                id2 = temp;
            }

            const products = await productsGateway.retrieveByIds([id1, id2]);

            let p1 = products[0];
            assert.strictEqual(p1.getId(), id1);

            let p2 = products[1];
            assert.strictEqual(p2.getId(), id2);
        });
    });

    describe('#retrieveRowsByIsNull', () => {
        it('retrieves products with a NULL description', async () => {
            const product1 = new Product();
            product1.setName('retrieveRowsByIds1');
            product1.setPrice(1.11);

            const product2 = new Product();
            product2.setName('retrieveRowsByIds2');
            product2.setPrice(2.22);

            const productsGateway = ProductsGatewayFactory.create();
            let [id1, id2] = await Promise.all([
                productsGateway.createRow(product1),
                productsGateway.createRow(product2)
            ]);

            // enforce ordering
            if(id1 > id2) {
                let temp = id1;
                id1 = id2;
                id2 = temp;
            }

            const products = await productsGateway.retrieveByNullDescription();

            const p1 = products[0];
            assert.strictEqual(p1.getId(), id1, 'p1 id mismatch');

            const p2 = products[1];
            assert.strictEqual(p2.getId(), id2, 'p2 id mismatch');
        });
    });

    describe('#retrieveRowsByNotEqual', () => {
        it('retrieves products where the description does not equal the given value', async () => {
            let product1 = new Product();
            product1.setName('retrieve not equal 1');
            product1.setDescription('description 1');
            product1.setPrice(1.11);

            let product2 = new Product();
            product2.setName('retrieve not equal 2');
            product2.setDescription('description 2');
            product2.setPrice(2.22);

            let productsGateway = ProductsGatewayFactory.create();
            await Promise.all([
                productsGateway.createRow(product1),
                productsGateway.createRow(product2)
            ]);

            let desc = 'description 1';
            const products = await productsGateway.retrieveByDescriptionNotEqual(desc);
            assert.ok(products.length > 0);
        });
    });

    describe('#setFieldNullWhere', () => {
        it('sets the description null where', async () => {
            let product1 = new Product();
            product1.setName('retrieve not equal 1');
            product1.setDescription('null description 1');
            product1.setPrice(1.11);

            let product2 = new Product();
            product2.setName('retrieve not equal 2');
            product2.setDescription('null description 2');
            product2.setPrice(2.22);

            let productsGateway = ProductsGatewayFactory.create();
            let [id1, id2] = await Promise.all([
                productsGateway.createRow(product1),
                productsGateway.createRow(product2)
            ]);

            let desc = 'null description 2';
            const affectedRows = await productsGateway.setDescriptionNullWhereNameIs(desc);
            assert.strictEqual(affectedRows, 1);

            let [p1, p2] = await Promise.all([
                productsGateway.retrieveRow(id1),
                productsGateway.retrieveRow(id2)
            ]);

            assert.strictEqual(p1.getDescription(), 'null description 1');
            assert.strictEqual(p2.getDescription(), null);
        });
    });

    describe('#deleteRowsBy', () => {
        it('deletes rows where name is', async () => {
            const product1 = new Product();
            product1.setName('deletes rows name 1');
            product1.setDescription('description 1');
            product1.setPrice(1.11);

            const product2 = new Product();
            product2.setName('deletes rows name 2');
            product2.setDescription('description 2');
            product2.setPrice(2.22);

            const productsGateway = ProductsGatewayFactory.create();
            let [id1, id2] = await Promise.all([
                productsGateway.createRow(product1),
                productsGateway.createRow(product2)
            ]);

            // enforce ordering
            if(id1 > id2) {
                let temp = id1;
                id1 = id2;
                id2 = temp;
            }

            const desc = 'deletes rows name 1';
            const affectedRows = await productsGateway.deleteWhereNameIs(desc);
            assert.strictEqual(affectedRows, 1);

            const products = await productsGateway.retrieveByIds([id1, id2]);
            assert.strictEqual(products.length, 1);

            const p1 = products[0];
            assert.strictEqual(p1.getDescription(), 'description 2');
        });
    });

    describe('#countRowsByValue', () => {
        it('counts the number of rows where the name is', async () => {
            let product1 = new Product();
            product1.setName('name 1');
            product1.setDescription('description 1');
            product1.setPrice(1.11);

            let product2 = new Product();
            product2.setName('name 2');
            product2.setDescription('description 2');
            product2.setPrice(2.22);

            let productsGateway = ProductsGatewayFactory.create();
            await Promise.all([
                productsGateway.createRow(product1),
                productsGateway.createRow(product2)
            ]);

            const affectedRows = await productsGateway.countProductsByName('name 1');
            assert.strictEqual(affectedRows, 1);
        });
    });
});

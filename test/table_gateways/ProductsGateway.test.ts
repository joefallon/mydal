import assert = require('assert');

import { ProductsGatewayFactory } from "./ProductsGatewayFactory";
import { Product } from '../entities/Product';

describe('ProductsGateway', () => {

    describe('#createRow and #retrieveRow', () => {
        it('creates and retrieves a row in the database', async () => {
            let product = new Product();
            product.description = 'test desc';
            product.name        = 'test name';
            product.price       = 1.11;

            let productsGateway = ProductsGatewayFactory.create();
            product = await productsGateway.createRow(product);
            product = await productsGateway.retrieveRow(product.id);

            assert.strictEqual(product.description, 'test desc');
            assert.strictEqual(product.name, 'test name');
            assert.strictEqual(product.price, 1.11);

            assert.ok(product.id > 0);
            assert.ok(product.created.length > 0);
            assert.ok(product.updated.length > 0);
            assert.notStrictEqual(product.created, '0000-00-00 00:00:00');
            assert.notStrictEqual(product.updated, '0000-00-00 00:00:00');
        });
    });

    describe('#updateRow', () => {
        it('updates a row in the database', async () => {
            let product = new Product();
            product.description = 'test update';
            product.name  = 'name update';
            product.price = 1.11;

            const productsGateway = ProductsGatewayFactory.create();
            product = await productsGateway.createRow(product);
            product = await productsGateway.retrieveRow(product.id);

            product.description = 'updated desc';
            product.name  = 'updated name';
            product.price = 2.22;

            const affectedRows = await productsGateway.updateRow(product);
            assert.strictEqual(affectedRows, 1, 'affected rows');

            product = await productsGateway.retrieveRow(product.id);

            assert.strictEqual(product.description, 'updated desc');
            assert.strictEqual(product.name, 'updated name');
            assert.strictEqual(product.price, 2.22);

            assert.ok(product.id > 0);
            assert.ok(product.created.length > 0);
            assert.ok(product.updated.length > 0);
            assert.notStrictEqual(product.created, '0000-00-00 00:00:00');
            assert.notStrictEqual(product.updated, '0000-00-00 00:00:00');
        });
    });

    describe('#deleteRow', () => {
        it('deletes a row in the database', async () => {
            let product = new Product();
            product.description = 'test delete';
            product.name  = 'name delete';
            product.price = 1.11;

            let productsGateway = ProductsGatewayFactory.create();

            product        = await productsGateway.createRow(product);
            const affected = await productsGateway.deleteRow(product.id);
            assert.strictEqual(affected, 1);

            product = await productsGateway.retrieveRow(product.id);
            assert.strictEqual(product, null);
        });
    });

    describe('#retrieveRowsBy', () => {
        it('retrieves all rows with the given field value', async () => {
            let product1       = new Product();
            product1.name        = 'retrieveRowsBy1';
            product1.description = 'retrieveRowsByDesc';
            product1.price       = 1.11;

            let product2       = new Product();
            product2.name        = 'retrieveRowsBy2';
            product2.description = 'retrieveRowsByDesc';
            product2.price       = 2.22;

            const productsGateway = ProductsGatewayFactory.create();

            [product1, product2] = await Promise.all([
                productsGateway.createRow(product1),
                productsGateway.createRow(product2)
            ]);

            // enforce ordering
            if(product1.id > product2.id) {
                let temp = product1;
                product1 = product2;
                product2 = temp;
            }

            const products = await productsGateway.retrieveByDescription('retrieveRowsByDesc');

            const p1 = products[0];
            assert.strictEqual(p1.id, product1.id, 'p1 id mismatch');

            const p2 = products[1];
            assert.strictEqual(p2.id, product2.id, 'p2 id mismatch');
        });
    });

    describe('#retrieveRowsByIds', () => {
        it('retrieves products given an array of ids', async () => {
            let product1         = new Product();
            product1.name        = 'retrieveRowsByIds1';
            product1.description = 'retrieve ids desc';
            product1.price       = 1.11;

            let product2         = new Product();
            product2.name        = 'retrieveRowsByIds2';
            product2.description = 'retrieve ids desc';
            product2.price       = 2.22;

            let productsGateway = ProductsGatewayFactory.create();

            [product1, product2] = await Promise.all([
                productsGateway.createRow(product1),
                productsGateway.createRow(product2)
            ]);

            // enforce ordering
            if(product1.id > product2.id) {
                let temp = product1;
                product1 = product2;
                product2 = temp;
            }

            const products = await productsGateway.retrieveByIds([product1.id, product2.id]);

            let p1 = products[0];
            assert.strictEqual(p1.id, product1.id);

            let p2 = products[1];
            assert.strictEqual(p2.id, product2.id);
        });
    });

    describe('#retrieveRowsByIsNull', () => {
        it('retrieves products with a NULL description', async () => {
            let product1 = new Product();
            product1.name  = 'retrieveRowsByIds1';
            product1.price = 1.11;

            let product2 = new Product();
            product2.name  = 'retrieveRowsByIds2';
            product2.price = 2.22;

            const productsGateway = ProductsGatewayFactory.create();
            [product1, product2] = await Promise.all([
                productsGateway.createRow(product1),
                productsGateway.createRow(product2)
            ]);

            // enforce ordering
            if(product1.id > product2.id) {
                let temp = product1;
                product1 = product2;
                product2 = temp;
            }

            const products = await productsGateway.retrieveByNullDescription();

            const p1 = products[0];
            assert.strictEqual(p1.id, product1.id, 'p1 id mismatch');

            const p2 = products[1];
            assert.strictEqual(p2.id, product2.id, 'p2 id mismatch');
        });
    });

    describe('#retrieveRowsByNotEqual', () => {
        it('retrieves products where the description does not equal the given value', async () => {
            let product1         = new Product();
            product1.name        = 'retrieve not equal 1';
            product1.description = 'description 1';
            product1.price       = 1.11;

            let product2         = new Product();
            product2.name        = 'retrieve not equal 2';
            product2.description = 'description 2';
            product2.price       = 2.22;

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
            let product1         = new Product();
            product1.name        = 'retrieve not equal 1';
            product1.description = 'null description 1';
            product1.price       = 1.11;

            let product2         = new Product();
            product2.name        = 'retrieve not equal 2';
            product2.description = 'null description 2';
            product2.price       = 2.22;

            let productsGateway = ProductsGatewayFactory.create();
            [product1, product2] = await Promise.all([
                productsGateway.createRow(product1),
                productsGateway.createRow(product2)
            ]);

            let desc = 'null description 2';
            const affectedRows = await productsGateway.setDescriptionNullWhereNameIs(desc);
            assert.strictEqual(affectedRows, 1);

            [product1, product2] = await Promise.all([
                productsGateway.retrieveRow(product1.id),
                productsGateway.retrieveRow(product2.id)
            ]);

            assert.strictEqual(product1.description, 'null description 1');
            assert.strictEqual(product2.description, null);
        });
    });

    describe('#deleteRowsBy', () => {
        it('deletes rows where name is', async () => {
            let product1       = new Product();
            product1.name        = 'deletes rows name 1';
            product1.description = 'description 1';
            product1.price       = 1.11;

            let product2       = new Product();
            product2.name        = 'deletes rows name 2';
            product2.description = 'description 2';
            product2.price       = 2.22;

            const productsGateway = ProductsGatewayFactory.create();
            [product1, product2] = await Promise.all([
                productsGateway.createRow(product1),
                productsGateway.createRow(product2)
            ]);

            // enforce ordering
            if(product1.id > product2.id) {
                let temp = product1;
                product1 = product2;
                product2 = temp;
            }

            const desc = 'deletes rows name 1';
            const affectedRows = await productsGateway.deleteWhereNameIs(desc);
            assert.strictEqual(affectedRows, 1);

            const products = await productsGateway.retrieveByIds([product1.id, product2.id]);
            assert.strictEqual(products.length, 1);

            product1 = products[0];
            assert.strictEqual(product1.description, 'description 2');
        });
    });

    describe('#countRowsByValue', () => {
        it('counts the number of rows where the name is', async () => {
            let product1         = new Product();
            product1.name        = 'name 1';
            product1.description = 'description 1';
            product1.price       = 1.11;

            let product2         = new Product();
            product2.name        = 'name 2';
            product2.description = 'description 2';
            product2.price       = 2.22;

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

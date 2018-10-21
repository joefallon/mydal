import assert = require('assert');

import { Product } from './Product';

describe('ProductTest', () => {

    describe('Class Initialization', () => {
        it('initializes class with default values', (done) => {
            let product = new Product();

            assert.strictEqual(product.created,      '');
            assert.strictEqual(product.description,  null);
            assert.strictEqual(product.id,           0);
            assert.strictEqual(product.name,         '');
            assert.strictEqual(product.updated,      '');
            assert.strictEqual(product.created,      '');

            done();
        });
    });
});

require('../config/global_before');
import Product = require('./Product');

import chai = require('chai');
let assert  = chai.assert;

describe('ProductTest', () => {

    describe('Class Initialization', () => {
        it('initializes class with default values', (done) => {
            let product = new Product();

            assert.equal(product.getCreated(),      '', 'created');
            assert.equal(product.getDescription(),  null, 'desc');
            assert.equal(product.getId(),           0,  'id');
            assert.equal(product.getName(),         '', 'name');
            assert.equal(product.getUpdated(),      '', 'updated');
            assert.equal(product.getPrice(),        0,  'price');

            done();
        });
    });

    describe('Getters and Setters', () => {
        it('gets and sets object fields', (done) => {
            let product = new Product();

            product.setCreated('2012-12-12 12:12:12');
            product.setDescription('test desc');
            product.setId(1);
            product.setName('test name');
            product.setPrice(1.11);
            product.setUpdated('2012-12-12 11:11:11');

            assert.equal(product.getCreated(),      '2012-12-12 12:12:12',  'created');
            assert.equal(product.getDescription(),  'test desc',            'desc');
            assert.equal(product.getId(),           1,                      'id');
            assert.equal(product.getName(),         'test name',            'name');
            assert.equal(product.getPrice(),        1.11,                   'price');
            assert.equal(product.getUpdated(),      '2012-12-12 11:11:11',  'updated');

            done();
        });
    });
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Product_1 = require("./Product");
var assert = require("assert");
describe('ProductTest', function () {
    describe('Class Initialization', function () {
        it('initializes class with default values', function (done) {
            var product = new Product_1.Product();
            assert.equal(product.getCreated(), '', 'created');
            assert.equal(product.getDescription(), null, 'desc');
            assert.equal(product.getId(), 0, 'id');
            assert.equal(product.getName(), '', 'name');
            assert.equal(product.getUpdated(), '', 'updated');
            assert.equal(product.getPrice(), 0, 'price');
            done();
        });
    });
    describe('Getters and Setters', function () {
        it('gets and sets object fields', function (done) {
            var product = new Product_1.Product();
            product.setCreated('2012-12-12 12:12:12');
            product.setDescription('test desc');
            product.setId(1);
            product.setName('test name');
            product.setPrice(1.11);
            product.setUpdated('2012-12-12 11:11:11');
            assert.equal(product.getCreated(), '2012-12-12 12:12:12', 'created');
            assert.equal(product.getDescription(), 'test desc', 'desc');
            assert.equal(product.getId(), 1, 'id');
            assert.equal(product.getName(), 'test name', 'name');
            assert.equal(product.getPrice(), 1.11, 'price');
            assert.equal(product.getUpdated(), '2012-12-12 11:11:11', 'updated');
            done();
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZHVjdFRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJQcm9kdWN0VGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFDQUFrQztBQUNsQywrQkFBa0M7QUFFbEMsUUFBUSxDQUFDLGFBQWEsRUFBRTtJQUVwQixRQUFRLENBQUMsc0JBQXNCLEVBQUU7UUFDN0IsRUFBRSxDQUFDLHVDQUF1QyxFQUFFLFVBQUMsSUFBSTtZQUM3QyxJQUFJLE9BQU8sR0FBRyxJQUFJLGlCQUFPLEVBQUUsQ0FBQztZQUU1QixNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsRUFBTyxFQUFFLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDdkQsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLEVBQUcsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3RELE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFZLENBQUMsRUFBRyxJQUFJLENBQUMsQ0FBQztZQUNsRCxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBVSxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDcEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQU8sRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZELE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFTLENBQUMsRUFBRyxPQUFPLENBQUMsQ0FBQztZQUVyRCxJQUFJLEVBQUUsQ0FBQztRQUNYLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMscUJBQXFCLEVBQUU7UUFDNUIsRUFBRSxDQUFDLDZCQUE2QixFQUFFLFVBQUMsSUFBSTtZQUNuQyxJQUFJLE9BQU8sR0FBRyxJQUFJLGlCQUFPLEVBQUUsQ0FBQztZQUU1QixPQUFPLENBQUMsVUFBVSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDMUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNwQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDN0IsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2QixPQUFPLENBQUMsVUFBVSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFFMUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQU8scUJBQXFCLEVBQUcsU0FBUyxDQUFDLENBQUM7WUFDM0UsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLEVBQUcsV0FBVyxFQUFhLE1BQU0sQ0FBQyxDQUFDO1lBQ3hFLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFZLENBQUMsRUFBdUIsSUFBSSxDQUFDLENBQUM7WUFDdEUsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQVUsV0FBVyxFQUFhLE1BQU0sQ0FBQyxDQUFDO1lBQ3hFLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxFQUFTLElBQUksRUFBb0IsT0FBTyxDQUFDLENBQUM7WUFDekUsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQU8scUJBQXFCLEVBQUcsU0FBUyxDQUFDLENBQUM7WUFFM0UsSUFBSSxFQUFFLENBQUM7UUFDWCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUMifQ==
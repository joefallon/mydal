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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZHVjdC50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiUHJvZHVjdC50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscUNBQWtDO0FBQ2xDLCtCQUFrQztBQUVsQyxRQUFRLENBQUMsYUFBYSxFQUFFO0lBRXBCLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRTtRQUM3QixFQUFFLENBQUMsdUNBQXVDLEVBQUUsVUFBQyxJQUFJO1lBQzdDLElBQUksT0FBTyxHQUFHLElBQUksaUJBQU8sRUFBRSxDQUFDO1lBRTVCLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxFQUFPLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUN2RCxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsRUFBRyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDdEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQVksQ0FBQyxFQUFHLElBQUksQ0FBQyxDQUFDO1lBQ2xELE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFVLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUNwRCxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsRUFBTyxFQUFFLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDdkQsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQVMsQ0FBQyxFQUFHLE9BQU8sQ0FBQyxDQUFDO1lBRXJELElBQUksRUFBRSxDQUFDO1FBQ1gsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxxQkFBcUIsRUFBRTtRQUM1QixFQUFFLENBQUMsNkJBQTZCLEVBQUUsVUFBQyxJQUFJO1lBQ25DLElBQUksT0FBTyxHQUFHLElBQUksaUJBQU8sRUFBRSxDQUFDO1lBRTVCLE9BQU8sQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUMxQyxPQUFPLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3BDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUM3QixPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZCLE9BQU8sQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUUxQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsRUFBTyxxQkFBcUIsRUFBRyxTQUFTLENBQUMsQ0FBQztZQUMzRSxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsRUFBRyxXQUFXLEVBQWEsTUFBTSxDQUFDLENBQUM7WUFDeEUsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQVksQ0FBQyxFQUF1QixJQUFJLENBQUMsQ0FBQztZQUN0RSxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBVSxXQUFXLEVBQWEsTUFBTSxDQUFDLENBQUM7WUFDeEUsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQVMsSUFBSSxFQUFvQixPQUFPLENBQUMsQ0FBQztZQUN6RSxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsRUFBTyxxQkFBcUIsRUFBRyxTQUFTLENBQUMsQ0FBQztZQUUzRSxJQUFJLEVBQUUsQ0FBQztRQUNYLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyJ9
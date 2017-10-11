"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Product = (function () {
    function Product() {
        this._id = 0;
        this._name = '';
        this._description = null;
        this._price = 0;
        this._created = '';
        this._updated = '';
    }
    Product.prototype.getId = function () {
        return this._id;
    };
    Product.prototype.setId = function (value) {
        this._id = value;
    };
    Product.prototype.getName = function () {
        return this._name;
    };
    Product.prototype.setName = function (value) {
        this._name = value;
    };
    Product.prototype.getDescription = function () {
        return this._description;
    };
    Product.prototype.setDescription = function (value) {
        this._description = value;
    };
    Product.prototype.getPrice = function () {
        return this._price;
    };
    Product.prototype.setPrice = function (value) {
        this._price = value;
    };
    Product.prototype.getCreated = function () {
        return this._created;
    };
    Product.prototype.setCreated = function (value) {
        this._created = value;
    };
    Product.prototype.getUpdated = function () {
        return this._updated;
    };
    Product.prototype.setUpdated = function (value) {
        this._updated = value;
    };
    return Product;
}());
exports.Product = Product;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZHVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlByb2R1Y3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtJQVFJO1FBQ0ksSUFBSSxDQUFDLEdBQUcsR0FBWSxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLEtBQUssR0FBVSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDekIsSUFBSSxDQUFDLE1BQU0sR0FBUyxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBTyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBTyxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVNLHVCQUFLLEdBQVo7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNwQixDQUFDO0lBRU0sdUJBQUssR0FBWixVQUFhLEtBQWE7UUFDdEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUM7SUFDckIsQ0FBQztJQUVNLHlCQUFPLEdBQWQ7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBRU0seUJBQU8sR0FBZCxVQUFlLEtBQWE7UUFDeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDdkIsQ0FBQztJQUVNLGdDQUFjLEdBQXJCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDN0IsQ0FBQztJQUVNLGdDQUFjLEdBQXJCLFVBQXNCLEtBQWE7UUFDL0IsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7SUFDOUIsQ0FBQztJQUVNLDBCQUFRLEdBQWY7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRU0sMEJBQVEsR0FBZixVQUFnQixLQUFhO1FBQ3pCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3hCLENBQUM7SUFFTSw0QkFBVSxHQUFqQjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFFTSw0QkFBVSxHQUFqQixVQUFrQixLQUFhO1FBQzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQzFCLENBQUM7SUFFTSw0QkFBVSxHQUFqQjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFFTSw0QkFBVSxHQUFqQixVQUFrQixLQUFhO1FBQzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQzFCLENBQUM7SUFDTCxjQUFDO0FBQUQsQ0FBQyxBQWhFRCxJQWdFQztBQWhFWSwwQkFBTyJ9
"use strict";
var Product = (function () {
    function Product() {
        this.id = 0;
        this.name = '';
        this.description = null;
        this.price = 0;
        this.created = '';
        this.updated = '';
    }
    Product.prototype.getId = function () {
        return this.id;
    };
    Product.prototype.setId = function (value) {
        this.id = value;
    };
    Product.prototype.getName = function () {
        return this.name;
    };
    Product.prototype.setName = function (value) {
        this.name = value;
    };
    Product.prototype.getDescription = function () {
        return this.description;
    };
    Product.prototype.setDescription = function (value) {
        this.description = value;
    };
    Product.prototype.getPrice = function () {
        return this.price;
    };
    Product.prototype.setPrice = function (value) {
        this.price = value;
    };
    Product.prototype.getCreated = function () {
        return this.created;
    };
    Product.prototype.setCreated = function (value) {
        this.created = value;
    };
    Product.prototype.getUpdated = function () {
        return this.updated;
    };
    Product.prototype.setUpdated = function (value) {
        this.updated = value;
    };
    return Product;
}());
module.exports = Product;

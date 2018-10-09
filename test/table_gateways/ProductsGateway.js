"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Product_1 = require("../entities/Product");
const TableGateway_1 = require("../../src/TableGateway");
class ProductsGateway {
    constructor(connectionPool) {
        this.tableName = 'products';
        this.tableGateway = new TableGateway_1.TableGateway(connectionPool, this.tableName);
        this.tableGateway.setCreatedColumnName('created');
        this.tableGateway.setUpdatedColumnName('updated');
    }
    createRow(product, callback) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                let row = ProductsGateway.mapProductToRow(product);
                const insertId = yield this.tableGateway.createRow(row);
                callback(null, insertId);
            }
            catch (e) {
                const err = e;
                callback(err, null);
            }
        });
    }
    retrieveRow(id, callback) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const row = yield this.tableGateway.retrieveRow(id);
                const product = ProductsGateway.mapRowToProduct(row);
                callback(null, product);
            }
            catch (e) {
                callback(e, null);
            }
        });
    }
    updateRow(product, callback) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const row = ProductsGateway.mapProductToRow(product);
                const affectedRows = yield this.tableGateway.updateRow(row);
                callback(null, affectedRows);
            }
            catch (e) {
                callback(e, null);
            }
        });
    }
    deleteRow(id, callback) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const affectedRows = yield this.tableGateway.deleteRow(id);
                callback(null, affectedRows);
            }
            catch (e) {
                callback(e, null);
            }
        });
    }
    retrieveByDescription(description, callback) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const rows = yield this.tableGateway.retrieveRows('description', description);
                const products = [];
                rows.map((row) => {
                    const product = ProductsGateway.mapRowToProduct(row);
                    products.push(product);
                });
                callback(null, products);
            }
            catch (e) {
                callback(e, null);
            }
        });
    }
    retrieveByIds(ids, callback) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const rows = yield this.tableGateway.retrieveRowsByIds(ids);
                const products = [];
                rows.map((row) => {
                    const p = ProductsGateway.mapRowToProduct(row);
                    products.push(p);
                });
                callback(null, products);
            }
            catch (e) {
                callback(e, null);
            }
        });
    }
    retrieveByNullDescription(callback) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const rows = yield this.tableGateway.retrieveRowsByIsNull('description');
                const products = [];
                rows.map((row) => {
                    const p = ProductsGateway.mapRowToProduct(row);
                    products.push(p);
                });
                callback(null, products);
            }
            catch (e) {
                callback(e, null);
            }
        });
    }
    retrieveByDescriptionNotEqual(description, callback) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const gateway = this.tableGateway;
                const rows = yield gateway.retrieveRowsByNotEqual('description', description);
                const products = [];
                rows.map((row) => {
                    const p = ProductsGateway.mapRowToProduct(row);
                    products.push(p);
                });
                callback(null, products);
            }
            catch (e) {
                callback(e, null);
            }
        });
    }
    setDescriptionNullWhereNameIs(value, callback) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const affectedRows = yield this.tableGateway.setFieldNullWhere('description', value);
                callback(null, affectedRows);
            }
            catch (e) {
                callback(e, null);
            }
        });
    }
    deleteWhereNameIs(name, callback) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const affectedRows = yield this.tableGateway.deleteRowsBy('name', name);
                callback(null, affectedRows);
            }
            catch (e) {
                callback(e, null);
            }
        });
    }
    countProductsByName(name, callback) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const count = yield this.tableGateway.countRowsByValue('name', name);
                callback(null, count);
            }
            catch (e) {
                callback(e, null);
            }
        });
    }
    static mapProductToRow(product) {
        return {
            'id': product.getId(),
            'name': product.getName(),
            'description': product.getDescription(),
            'price': product.getPrice(),
            'created': product.getCreated(),
            'updated': product.getUpdated()
        };
    }
    static mapRowToProduct(row) {
        if (row == null) {
            return null;
        }
        let product = new Product_1.Product();
        product.setId(row['id']);
        product.setName(row['name']);
        product.setDescription(row['description']);
        product.setPrice(row['price']);
        product.setCreated(row['created']);
        product.setUpdated(row['updated']);
        return product;
    }
}
exports.ProductsGateway = ProductsGateway;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZHVjdHNHYXRld2F5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiUHJvZHVjdHNHYXRld2F5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLGlEQUE0QztBQUM1Qyx5REFBb0Q7QUFFcEQsTUFBYSxlQUFlO0lBSXhCLFlBQVksY0FBb0I7UUFIeEIsY0FBUyxHQUFXLFVBQVUsQ0FBQztRQUluQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksMkJBQVksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxZQUFZLENBQUMsb0JBQW9CLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRVksU0FBUyxDQUFDLE9BQWdCLEVBQUUsUUFBZ0Q7O1lBQ3JGLElBQUk7Z0JBQ0EsSUFBSSxHQUFHLEdBQUcsZUFBZSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDbkQsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDeEQsUUFBUSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQzthQUM1QjtZQUNELE9BQU0sQ0FBQyxFQUFFO2dCQUNMLE1BQU0sR0FBRyxHQUFVLENBQUMsQ0FBQztnQkFDckIsUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUN2QjtRQUNMLENBQUM7S0FBQTtJQUVZLFdBQVcsQ0FBQyxFQUFVLEVBQUUsUUFBZ0Q7O1lBQ2pGLElBQUk7Z0JBQ0EsTUFBTSxHQUFHLEdBQU8sTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDeEQsTUFBTSxPQUFPLEdBQUcsZUFBZSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQztn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
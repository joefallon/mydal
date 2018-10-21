"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Product_1 = require("../entities/Product");
const TableGateway_1 = require("../../src/TableGateway");
class ProductsGateway {
    constructor(connectionPool) {
        this._tableGateway = new TableGateway_1.TableGateway(connectionPool, ProductsGateway.TABLE_NAME);
        this._tableGateway.setCreatedColumnName('created');
        this._tableGateway.setUpdatedColumnName('updated');
    }
    /**
     * @returns Returns the insert id of the row.
     */
    createRow(product) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let row = ProductsGateway.mapProductToRow(product);
            const insertId = yield this._tableGateway.createRow(row);
            return insertId;
        });
    }
    /**
     * @returns Retrieves the row with the given id if found, null otherwise.
     */
    retrieveRow(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const row = yield this._tableGateway.retrieveRow(id);
            const product = ProductsGateway.mapRowToProduct(row);
            return product;
        });
    }
    /**
     * @returns Returns the number of affected rows (0 or 1).
     */
    updateRow(product) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const row = ProductsGateway.mapProductToRow(product);
            const affectedRows = yield this._tableGateway.updateRow(row);
            return affectedRows;
        });
    }
    /**
     * @returns Returns the number of affected rows (0 or 1).
     */
    deleteRow(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this._tableGateway.deleteRow(id);
        });
    }
    /**
     * @returns Returns an array of products.
     */
    retrieveByDescription(description) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const rows = yield this._tableGateway.retrieveRows('description', description);
            const products = [];
            rows.map((row) => {
                const product = ProductsGateway.mapRowToProduct(row);
                products.push(product);
            });
            return products;
        });
    }
    /**
     * @returns Returns an array of Products.
     */
    retrieveByIds(ids) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const rows = yield this._tableGateway.retrieveRowsByIds(ids);
            const products = [];
            rows.map((row) => {
                const p = ProductsGateway.mapRowToProduct(row);
                products.push(p);
            });
            return products;
        });
    }
    /**
     * @returns Returns an array of Products.
     */
    retrieveByNullDescription() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const rows = yield this._tableGateway.retrieveRowsByIsNull('description');
            const products = [];
            rows.map((row) => {
                const p = ProductsGateway.mapRowToProduct(row);
                products.push(p);
            });
            return products;
        });
    }
    /**
     * @returns Returns an array of Products.
     */
    retrieveByDescriptionNotEqual(description) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const gateway = this._tableGateway;
            const rows = yield gateway.retrieveRowsByNotEqual('description', description);
            const products = [];
            rows.map((row) => {
                const p = ProductsGateway.mapRowToProduct(row);
                products.push(p);
            });
            return products;
        });
    }
    /**
     * @returns Returns the number of affected rows.
     */
    setDescriptionNullWhereNameIs(value) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const affectedRows = yield this._tableGateway.setFieldNullWhere('description', value);
            return affectedRows;
        });
    }
    /**
     * @returns Returns the number of affected rows.
     */
    deleteWhereNameIs(name) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const affectedRows = yield this._tableGateway.deleteRowsBy('name', name);
            return affectedRows;
        });
    }
    /**
     * @returns Returns the count.
     */
    countProductsByName(name) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const count = yield this._tableGateway.countRowsByValue('name', name);
            return count;
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
ProductsGateway.TABLE_NAME = 'products';
exports.ProductsGateway = ProductsGateway;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZHVjdHNHYXRld2F5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiUHJvZHVjdHNHYXRld2F5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLGlEQUE0QztBQUM1Qyx5REFBb0Q7QUFFcEQsTUFBYSxlQUFlO0lBS3hCLFlBQVksY0FBb0I7UUFDNUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLDJCQUFZLENBQUMsY0FBYyxFQUFFLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNsRixJQUFJLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVEOztPQUVHO0lBQ1UsU0FBUyxDQUFDLE9BQWdCOztZQUNuQyxJQUFJLEdBQUcsR0FBVSxlQUFlLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzFELE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFekQsT0FBTyxRQUFRLENBQUM7UUFDcEIsQ0FBQztLQUFBO0lBRUQ7O09BRUc7SUFDVSxXQUFXLENBQUMsRUFBVTs7WUFDL0IsTUFBTSxHQUFHLEdBQU8sTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN6RCxNQUFNLE9BQU8sR0FBRyxlQUFlLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRXJELE9BQU8sT0FBTyxDQUFDO1FBQ25CLENBQUM7S0FBQTtJQUVEOztPQUVHO0lBQ1UsU0FBUyxDQUFDLE9BQWdCOztZQUNuQyxNQUFNLEdBQUcsR0FBWSxlQUFlLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzlELE1BQU0sWUFBWSxHQUFHLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFT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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
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
            return this._tableGateway.createRow(product);
        });
    }
    /**
     * @returns Retrieves the row with the given id if found, null otherwise.
     */
    retrieveRow(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this._tableGateway.retrieveRow(id);
        });
    }
    /**
     * @returns Returns the number of affected rows (0 or 1).
     */
    updateRow(product) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this._tableGateway.updateRow(product);
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
            return this._tableGateway.retrieveRows('description', description);
        });
    }
    /**
     * @returns Returns an array of Products.
     */
    retrieveByIds(ids) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this._tableGateway.retrieveRowsByIds(ids);
        });
    }
    /**
     * @returns Returns an array of Products.
     */
    retrieveByNullDescription() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this._tableGateway.retrieveRowsByIsNull('description');
        });
    }
    /**
     * @returns Returns an array of Products.
     */
    retrieveByDescriptionNotEqual(description) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this._tableGateway.retrieveRowsByNotEqual('description', description);
        });
    }
    /**
     * @returns Returns the number of affected rows.
     */
    setDescriptionNullWhereNameIs(value) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this._tableGateway.setFieldNullWhere('description', value);
        });
    }
    /**
     * @returns Returns the number of affected rows.
     */
    deleteWhereNameIs(name) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this._tableGateway.deleteRowsBy('name', name);
        });
    }
    /**
     * @returns Returns the count.
     */
    countProductsByName(name) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this._tableGateway.countRowsByValue('name', name);
        });
    }
}
ProductsGateway.TABLE_NAME = 'products';
exports.ProductsGateway = ProductsGateway;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZHVjdHNHYXRld2F5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiUHJvZHVjdHNHYXRld2F5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLHlEQUFvRDtBQUdwRCxNQUFhLGVBQWU7SUFLeEIsWUFBWSxjQUFvQjtRQUM1QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksMkJBQVksQ0FBQyxjQUFjLEVBQUUsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2xGLElBQUksQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQ7O09BRUc7SUFDVSxTQUFTLENBQUMsT0FBZ0I7O1lBQ25DLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakQsQ0FBQztLQUFBO0lBRUQ7O09BRUc7SUFDVSxXQUFXLENBQUMsRUFBVTs7WUFDL0IsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM5QyxDQUFDO0tBQUE7SUFFRDs7T0FFRztJQUNVLFNBQVMsQ0FBQyxPQUFnQjs7WUFDbkMsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqRCxDQUFDO0tBQUE7SUFFRDs7T0FFRztJQUNVLFNBQVMsQ0FBQyxFQUFVOztZQUM3QixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzVDLENBQUM7S0FBQTtJQUVEOztPQUVHO0lBQ1UscUJBQXFCLENBQUMsV0FBbUI7O1lBQ2xELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ3ZFLENBQUM7S0FBQTtJQUVEOztPQUVHO0lBQ1UsYUFBYSxDQUFDLEdBQWE7O1lBQ3BDLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyRCxDQUFDO0tBQUE7SUFFRDs7T0FFRztJQUNVLHlCQUF5Qjs7WUFDbEMsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2xFLENBQUM7S0FBQTtJQUVEOztPQUVHO0lBQ1UsNkJBQTZCLENBQUMsV0FBbUI7O1lBQzFELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDakYsQ0FBQztLQUFBO0lBRUQ7O09BRUc7SUFDVSw2QkFBNkIsQ0FBQyxLQUFhOztZQUNwRCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3RFLENBQUM7S0FBQTtJQUVEOztPQUVHO0lBQ1UsaUJBQWlCLENBQUMsSUFBWTs7WUFDdkMsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDekQsQ0FBQztLQUFBO0lBRUQ7O09BRUc7SUFDVSxtQkFBbUIsQ0FBQyxJQUFZOztZQUN6QyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzdELENBQUM7S0FBQTs7QUFyRnVCLDBCQUFVLEdBQUcsVUFBVSxDQUFDO0FBRHBELDBDQXVGQyJ9
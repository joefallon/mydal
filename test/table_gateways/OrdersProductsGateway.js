"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const JoinTableGateway_1 = require("../../src/JoinTableGateway");
class OrdersProductsGateway {
    constructor(connectionPool) {
        this.tableName = 'orders_products';
        this.id1Name = 'table1_id';
        this.id2Name = 'table2_id';
        let table = this.tableName;
        let id1 = this.id1Name;
        let id2 = this.id2Name;
        this.joinTableGateway = new JoinTableGateway_1.JoinTableGateway(connectionPool, table, id1, id2);
        this.joinTableGateway.setCreatedColumnName('created');
    }
    createRow(id1, id2) {
        return this.joinTableGateway.createRow(id1, id2);
    }
    retrieveRow(id1, id2) {
        return this.joinTableGateway.retrieveRow(id1, id2);
    }
    deleteRow(id1, id2, callback) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const affectedRows = yield this.joinTableGateway.deleteRow(id1, id2);
                callback(null, affectedRows);
            }
            catch (e) {
                callback(e, null);
            }
        });
    }
    deleteRowWithPromise(id1, id2) {
        return this.joinTableGateway.deleteRow(id1, id2);
    }
    retrieveByTable1Id(id1, callback) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const rows = yield this.joinTableGateway.retrieveById('table1_id', id1);
                callback(null, rows);
            }
            catch (e) {
                callback(e, null);
            }
        });
    }
    retrieveByTable1IdWithPromise(id1) {
        return this.joinTableGateway.retrieveById('table1_id', id1);
    }
    deleteByTable1Id(id1, callback) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const affectedRows = yield this.joinTableGateway.deleteById('table1_id', id1);
                callback(null, affectedRows);
            }
            catch (e) {
                callback(e, null);
            }
        });
    }
    deleteByTable1IdWithPromise(id1) {
        return this.joinTableGateway.deleteById('table1_id', id1);
    }
}
exports.OrdersProductsGateway = OrdersProductsGateway;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3JkZXJzUHJvZHVjdHNHYXRld2F5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiT3JkZXJzUHJvZHVjdHNHYXRld2F5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLGlFQUE0RDtBQUU1RCxNQUFhLHFCQUFxQjtJQU85QixZQUFZLGNBQW9CO1FBTmYsY0FBUyxHQUFHLGlCQUFpQixDQUFDO1FBQzlCLFlBQU8sR0FBSyxXQUFXLENBQUM7UUFDeEIsWUFBTyxHQUFLLFdBQVcsQ0FBQztRQUtyQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzNCLElBQUksR0FBRyxHQUFLLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDekIsSUFBSSxHQUFHLEdBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN6QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxtQ0FBZ0IsQ0FBQyxjQUFjLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM5RSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsb0JBQW9CLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVNLFNBQVMsQ0FBQyxHQUFXLEVBQUUsR0FBVztRQUNyQyxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFTSxXQUFXLENBQUMsR0FBVyxFQUFFLEdBQVc7UUFDdkMsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRVksU0FBUyxDQUFDLEdBQVcsRUFBRSxHQUFXLEVBQUUsUUFBb0Q7O1lBQ2pHLElBQUk7Z0JBQ0EsTUFBTSxZQUFZLEdBQUcsTUFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDckUsUUFBUSxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQzthQUNoQztZQUNELE9BQU0sQ0FBQyxFQUFFO2dCQUNMLFFBQVEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDckI7UUFDTCxDQUFDO0tBQUE7SUFFTSxvQkFBb0IsQ0FBQyxHQUFXLEVBQUUsR0FBVztRQUNoRCxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFWSxrQkFBa0IsQ0FBQyxHQUFXLEVBQUUsUUFBMkM7O1lBQ3BGLElBQUk7Z0JBQ0EsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDeEUsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQzthQUN4QjtZQUNELE9BQU0sQ0FBQyxFQUFFO2dCQUNMLFFBQVEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDckI7UUFDTCxDQUFDO0tBQUE7SUFFTSw2QkFBNkIsQ0FBQyxHQUFXO1FBQzVDLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVZLGdCQUFnQixDQUFDLEdBQVcsRUFBRSxRQUFvRDs7WUFDM0YsSUFBSTtnQkFDQSxNQUFNLFlBQVksR0FBRyxNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUM5RSxRQUFRLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO2FBQ2hDO1lBQ0QsT0FBTSxDQUFDLEVBQUU7Z0JBQ0wsUUFBUSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUNyQjtRQUNMLENBQUM7S0FBQTtJQUVNLDJCQUEyQixDQUFDLEdBQVc7UUFDMUMsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUM5RCxDQUFDO0NBQ0o7QUFoRUQsc0RBZ0VDIn0=
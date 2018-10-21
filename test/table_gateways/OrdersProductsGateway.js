"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    deleteRow(id1, id2) {
        return this.joinTableGateway.deleteRow(id1, id2);
    }
    retrieveByTable1Id(id1) {
        return this.joinTableGateway.retrieveById('table1_id', id1);
    }
    deleteByTable1Id(id1) {
        return this.joinTableGateway.deleteById('table1_id', id1);
    }
}
exports.OrdersProductsGateway = OrdersProductsGateway;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3JkZXJzUHJvZHVjdHNHYXRld2F5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiT3JkZXJzUHJvZHVjdHNHYXRld2F5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsaUVBQTREO0FBRTVELE1BQWEscUJBQXFCO0lBTzlCLFlBQVksY0FBb0I7UUFOZixjQUFTLEdBQUcsaUJBQWlCLENBQUM7UUFDOUIsWUFBTyxHQUFLLFdBQVcsQ0FBQztRQUN4QixZQUFPLEdBQUssV0FBVyxDQUFDO1FBS3JDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDM0IsSUFBSSxHQUFHLEdBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN6QixJQUFJLEdBQUcsR0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLG1DQUFnQixDQUFDLGNBQWMsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzlFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRU0sU0FBUyxDQUFDLEdBQVcsRUFBRSxHQUFXO1FBQ3JDLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVNLFdBQVcsQ0FBQyxHQUFXLEVBQUUsR0FBVztRQUN2QyxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFTSxTQUFTLENBQUMsR0FBVyxFQUFFLEdBQVc7UUFDckMsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRU0sa0JBQWtCLENBQUMsR0FBVztRQUNqQyxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFTSxnQkFBZ0IsQ0FBQyxHQUFXO1FBQy9CLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDOUQsQ0FBQztDQUNKO0FBbENELHNEQWtDQyJ9
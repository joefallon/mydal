"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const ConnectionPoolTestFactory_1 = require("./ConnectionPoolTestFactory");
class DatabaseUtilities {
    static clean(callback) {
        let pool = ConnectionPoolTestFactory_1.ConnectionPoolTestFactory.create();
        let connection = null;
        pool.getConnection(disableForeignKeyChecks);
        function disableForeignKeyChecks(err, conn) {
            if (err) {
                callback(err);
            }
            else {
                connection = conn;
                let sql = 'SET FOREIGN_KEY_CHECKS=0';
                connection.query(sql, truncateProductsTable);
            }
        }
        function truncateProductsTable(err, result) {
            if (err) {
                connection.release();
                callback(err);
            }
            else {
                let sql = 'TRUNCATE TABLE `products`';
                connection.query(sql, truncateOrdersProductsTable);
            }
        }
        function truncateOrdersProductsTable(err, result) {
            if (err) {
                connection.release();
                callback(err);
            }
            else {
                let sql = 'TRUNCATE TABLE `orders_products`';
                connection.query(sql, enableForeignKeyChecks);
            }
        }
        function enableForeignKeyChecks(err, result) {
            if (err) {
                connection.release();
                callback(err);
            }
            else {
                let sql = 'SET FOREIGN_KEY_CHECKS=1';
                connection.query(sql, releaseConnection);
            }
        }
        function releaseConnection(err, result) {
            if (err) {
                assert.fail(null, null, err.message);
            }
            connection.release();
            callback(err);
        }
    }
    static shutdownPool() {
        const pool = ConnectionPoolTestFactory_1.ConnectionPoolTestFactory.create();
        pool.end();
    }
}
exports.DatabaseUtilities = DatabaseUtilities;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0YWJhc2VVdGlsaXRpZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJEYXRhYmFzZVV0aWxpdGllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlDQUFrQztBQUNsQywyRUFBd0U7QUFHeEUsTUFBYSxpQkFBaUI7SUFFbkIsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUEwQjtRQUMxQyxJQUFJLElBQUksR0FBRyxxREFBeUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUM5QyxJQUFJLFVBQVUsR0FBa0IsSUFBSSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxhQUFhLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUU1QyxTQUFTLHVCQUF1QixDQUFDLEdBQVMsRUFBRSxJQUFtQjtZQUMzRCxJQUFHLEdBQUcsRUFBRTtnQkFDSixRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDakI7aUJBQU07Z0JBQ0gsVUFBVSxHQUFHLElBQUksQ0FBQztnQkFDbEIsSUFBSSxHQUFHLEdBQUcsMEJBQTBCLENBQUM7Z0JBQ3JDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLHFCQUFxQixDQUFDLENBQUM7YUFDaEQ7UUFDTCxDQUFDO1FBRUQsU0FBUyxxQkFBcUIsQ0FBQyxHQUFTLEVBQUUsTUFBWTtZQUNsRCxJQUFHLEdBQUcsRUFBRTtnQkFDSixVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ3JCLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNqQjtpQkFBTTtnQkFDSCxJQUFJLEdBQUcsR0FBRywyQkFBMkIsQ0FBQztnQkFDdEMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsMkJBQTJCLENBQUMsQ0FBQzthQUN0RDtRQUNMLENBQUM7UUFFRCxTQUFTLDJCQUEyQixDQUFDLEdBQVMsRUFBRSxNQUFZO1lBQ3hELElBQUcsR0FBRyxFQUFFO2dCQUNKLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDckIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ2pCO2lCQUFNO2dCQUNILElBQUksR0FBRyxHQUFHLGtDQUFrQyxDQUFDO2dCQUM3QyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO2FBQ2pEO1FBQ0wsQ0FBQztRQUVELFNBQVMsc0JBQXNCLENBQUMsR0FBUyxFQUFFLE1BQVk7WUFDbkQsSUFBRyxHQUFHLEVBQUU7Z0JBQ0osVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNyQixRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDakI7aUJBQU07Z0JBQ0gsSUFBSSxHQUFHLEdBQUcsMEJBQTBCLENBQUM7Z0JBQ3JDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLGlCQUFpQixDQUFDLENBQUM7YUFDNUM7UUFDTCxDQUFDO1FBRUQsU0FBUyxpQkFBaUIsQ0FBQyxHQUFTLEVBQUUsTUFBWTtZQUM5QyxJQUFHLEdBQUcsRUFBRTtnQkFDSixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3hDO1lBRUQsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3JCLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsQixDQUFDO0lBQ0wsQ0FBQztJQUVNLE1BQU0sQ0FBQyxZQUFZO1FBQ3RCLE1BQU0sSUFBSSxHQUFHLHFEQUF5QixDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2hELElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNmLENBQUM7Q0FDSjtBQTdERCw4Q0E2REMifQ==
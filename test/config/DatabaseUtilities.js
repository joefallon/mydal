"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var ConnectionPoolTestFactory_1 = require("./ConnectionPoolTestFactory");
var DatabaseUtilities = (function () {
    function DatabaseUtilities() {
    }
    DatabaseUtilities.clean = function (callback) {
        var pool = ConnectionPoolTestFactory_1.ConnectionPoolTestFactory.create();
        var connection = null;
        pool.getConnection(disableForeignKeyChecks);
        function disableForeignKeyChecks(err, conn) {
            if (err) {
                callback(err);
            }
            else {
                connection = conn;
                var sql = 'SET FOREIGN_KEY_CHECKS=0';
                connection.query(sql, truncateProductsTable);
            }
        }
        function truncateProductsTable(err, result) {
            if (err) {
                connection.release();
                callback(err);
            }
            else {
                var sql = 'TRUNCATE TABLE `products`';
                connection.query(sql, truncateOrdersProductsTable);
            }
        }
        function truncateOrdersProductsTable(err, result) {
            if (err) {
                connection.release();
                callback(err);
            }
            else {
                var sql = 'TRUNCATE TABLE `orders_products`';
                connection.query(sql, enableForeignKeyChecks);
            }
        }
        function enableForeignKeyChecks(err, result) {
            if (err) {
                connection.release();
                callback(err);
            }
            else {
                var sql = 'SET FOREIGN_KEY_CHECKS=1';
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
    };
    DatabaseUtilities.shutdownPool = function () {
        var pool = ConnectionPoolTestFactory_1.ConnectionPoolTestFactory.create();
        pool.end();
    };
    return DatabaseUtilities;
}());
exports.DatabaseUtilities = DatabaseUtilities;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0YWJhc2VVdGlsaXRpZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJEYXRhYmFzZVV0aWxpdGllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUFrQztBQUNsQyx5RUFBd0U7QUFHeEU7SUFBQTtJQTZEQSxDQUFDO0lBM0RpQix1QkFBSyxHQUFuQixVQUFvQixRQUEwQjtRQUMxQyxJQUFJLElBQUksR0FBRyxxREFBeUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUM5QyxJQUFJLFVBQVUsR0FBZSxJQUFJLENBQUM7UUFDbEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBRTVDLGlDQUFpQyxHQUFTLEVBQUUsSUFBZ0I7WUFDeEQsRUFBRSxDQUFBLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDTCxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLFVBQVUsR0FBRyxJQUFJLENBQUM7Z0JBQ2xCLElBQUksR0FBRyxHQUFHLDBCQUEwQixDQUFDO2dCQUNyQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1lBQ2pELENBQUM7UUFDTCxDQUFDO1FBRUQsK0JBQStCLEdBQVMsRUFBRSxNQUFZO1lBQ2xELEVBQUUsQ0FBQSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ0wsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNyQixRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksR0FBRyxHQUFHLDJCQUEyQixDQUFDO2dCQUN0QyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSwyQkFBMkIsQ0FBQyxDQUFDO1lBQ3ZELENBQUM7UUFDTCxDQUFDO1FBRUQscUNBQXFDLEdBQVMsRUFBRSxNQUFZO1lBQ3hELEVBQUUsQ0FBQSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ0wsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNyQixRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksR0FBRyxHQUFHLGtDQUFrQyxDQUFDO2dCQUM3QyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO1lBQ2xELENBQUM7UUFDTCxDQUFDO1FBRUQsZ0NBQWdDLEdBQVMsRUFBRSxNQUFZO1lBQ25ELEVBQUUsQ0FBQSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ0wsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNyQixRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksR0FBRyxHQUFHLDBCQUEwQixDQUFDO2dCQUNyQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1lBQzdDLENBQUM7UUFDTCxDQUFDO1FBRUQsMkJBQTJCLEdBQVMsRUFBRSxNQUFZO1lBQzlDLEVBQUUsQ0FBQSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN6QyxDQUFDO1lBRUQsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3JCLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsQixDQUFDO0lBQ0wsQ0FBQztJQUVhLDhCQUFZLEdBQTFCO1FBQ0ksSUFBTSxJQUFJLEdBQUcscURBQXlCLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDaEQsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUNMLHdCQUFDO0FBQUQsQ0FBQyxBQTdERCxJQTZEQztBQTdEWSw4Q0FBaUIifQ==
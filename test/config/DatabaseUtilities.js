"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var ConnectionPoolTestFactory_1 = require("./ConnectionPoolTestFactory");
var DatabaseUtilities = /** @class */ (function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0YWJhc2VVdGlsaXRpZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJEYXRhYmFzZVV0aWxpdGllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUFrQztBQUNsQyx5RUFBd0U7QUFHeEU7SUFBQTtJQTZEQSxDQUFDO0lBM0RpQix1QkFBSyxHQUFuQixVQUFvQixRQUEwQjtRQUMxQyxJQUFJLElBQUksR0FBRyxxREFBeUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUM5QyxJQUFJLFVBQVUsR0FBa0IsSUFBSSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxhQUFhLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUU1QyxpQ0FBaUMsR0FBUyxFQUFFLElBQW1CO1lBQzNELEVBQUUsQ0FBQSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ0wsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2xCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixVQUFVLEdBQUcsSUFBSSxDQUFDO2dCQUNsQixJQUFJLEdBQUcsR0FBRywwQkFBMEIsQ0FBQztnQkFDckMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUscUJBQXFCLENBQUMsQ0FBQztZQUNqRCxDQUFDO1FBQ0wsQ0FBQztRQUVELCtCQUErQixHQUFTLEVBQUUsTUFBWTtZQUNsRCxFQUFFLENBQUEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNMLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDckIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2xCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixJQUFJLEdBQUcsR0FBRywyQkFBMkIsQ0FBQztnQkFDdEMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsMkJBQTJCLENBQUMsQ0FBQztZQUN2RCxDQUFDO1FBQ0wsQ0FBQztRQUVELHFDQUFxQyxHQUFTLEVBQUUsTUFBWTtZQUN4RCxFQUFFLENBQUEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNMLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDckIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2xCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixJQUFJLEdBQUcsR0FBRyxrQ0FBa0MsQ0FBQztnQkFDN0MsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztZQUNsRCxDQUFDO1FBQ0wsQ0FBQztRQUVELGdDQUFnQyxHQUFTLEVBQUUsTUFBWTtZQUNuRCxFQUFFLENBQUEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNMLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDckIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2xCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixJQUFJLEdBQUcsR0FBRywwQkFBMEIsQ0FBQztnQkFDckMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztZQUM3QyxDQUFDO1FBQ0wsQ0FBQztRQUVELDJCQUEyQixHQUFTLEVBQUUsTUFBWTtZQUM5QyxFQUFFLENBQUEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDekMsQ0FBQztZQUVELFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNyQixRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEIsQ0FBQztJQUNMLENBQUM7SUFFYSw4QkFBWSxHQUExQjtRQUNJLElBQU0sSUFBSSxHQUFHLHFEQUF5QixDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2hELElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUNmLENBQUM7SUFDTCx3QkFBQztBQUFELENBQUMsQUE3REQsSUE2REM7QUE3RFksOENBQWlCIn0=
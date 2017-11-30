"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config = require("./main");
var mysql = require("mysql");
var ConnectionPoolTestFactory = /** @class */ (function () {
    function ConnectionPoolTestFactory() {
    }
    ConnectionPoolTestFactory.create = function () {
        if (ConnectionPoolTestFactory.pool == null) {
            var connectionOptions = {
                host: config.host,
                port: config.port,
                database: config.database,
                user: config.user,
                password: config.password,
                connectionLimit: config.connectionLimit,
                dateStrings: config.dateStrings
            };
            ConnectionPoolTestFactory.pool = mysql.createPool(connectionOptions);
        }
        return ConnectionPoolTestFactory.pool;
    };
    return ConnectionPoolTestFactory;
}());
exports.ConnectionPoolTestFactory = ConnectionPoolTestFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29ubmVjdGlvblBvb2xUZXN0RmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkNvbm5lY3Rpb25Qb29sVGVzdEZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFBa0M7QUFDbEMsNkJBQWlDO0FBSWpDO0lBQUE7SUFvQkEsQ0FBQztJQWpCaUIsZ0NBQU0sR0FBcEI7UUFDSSxFQUFFLENBQUEsQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN4QyxJQUFJLGlCQUFpQixHQUFlO2dCQUNoQyxJQUFJLEVBQWEsTUFBTSxDQUFDLElBQUk7Z0JBQzVCLElBQUksRUFBYSxNQUFNLENBQUMsSUFBSTtnQkFDNUIsUUFBUSxFQUFTLE1BQU0sQ0FBQyxRQUFRO2dCQUNoQyxJQUFJLEVBQWEsTUFBTSxDQUFDLElBQUk7Z0JBQzVCLFFBQVEsRUFBUyxNQUFNLENBQUMsUUFBUTtnQkFDaEMsZUFBZSxFQUFFLE1BQU0sQ0FBQyxlQUFlO2dCQUN2QyxXQUFXLEVBQU0sTUFBTSxDQUFDLFdBQVc7YUFDdEMsQ0FBQztZQUVGLHlCQUF5QixDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDekUsQ0FBQztRQUVELE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUM7SUFDMUMsQ0FBQztJQUNMLGdDQUFDO0FBQUQsQ0FBQyxBQXBCRCxJQW9CQztBQXBCWSw4REFBeUIifQ==
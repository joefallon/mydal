"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("./main");
const mysql = require("mysql");
class ConnectionPoolTestFactory {
    static create() {
        if (ConnectionPoolTestFactory.pool == null) {
            let connectionOptions = {
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
    }
}
exports.ConnectionPoolTestFactory = ConnectionPoolTestFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29ubmVjdGlvblBvb2xUZXN0RmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkNvbm5lY3Rpb25Qb29sVGVzdEZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpQ0FBa0M7QUFDbEMsK0JBQWlDO0FBR2pDLE1BQWEseUJBQXlCO0lBRzNCLE1BQU0sQ0FBQyxNQUFNO1FBQ2hCLElBQUcseUJBQXlCLENBQUMsSUFBSSxJQUFJLElBQUksRUFBRTtZQUN2QyxJQUFJLGlCQUFpQixHQUFlO2dCQUNoQyxJQUFJLEVBQWEsTUFBTSxDQUFDLElBQUk7Z0JBQzVCLElBQUksRUFBYSxNQUFNLENBQUMsSUFBSTtnQkFDNUIsUUFBUSxFQUFTLE1BQU0sQ0FBQyxRQUFRO2dCQUNoQyxJQUFJLEVBQWEsTUFBTSxDQUFDLElBQUk7Z0JBQzVCLFFBQVEsRUFBUyxNQUFNLENBQUMsUUFBUTtnQkFDaEMsZUFBZSxFQUFFLE1BQU0sQ0FBQyxlQUFlO2dCQUN2QyxXQUFXLEVBQU0sTUFBTSxDQUFDLFdBQVc7YUFDdEMsQ0FBQztZQUVGLHlCQUF5QixDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLENBQUM7U0FDeEU7UUFFRCxPQUFPLHlCQUF5QixDQUFDLElBQUksQ0FBQztJQUMxQyxDQUFDO0NBQ0o7QUFwQkQsOERBb0JDIn0=
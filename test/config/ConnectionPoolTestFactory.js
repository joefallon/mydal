"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config = require("./main");
var mysql = require("mysql");
var ConnectionPoolTestFactory = (function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29ubmVjdGlvblBvb2xUZXN0RmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkNvbm5lY3Rpb25Qb29sVGVzdEZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFBa0M7QUFDbEMsNkJBQWlDO0FBSWpDO0lBQUE7SUFvQkEsQ0FBQztJQWpCaUIsZ0NBQU0sR0FBcEI7UUFDSSxFQUFFLENBQUEsQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN4QyxJQUFJLGlCQUFpQixHQUFnQjtnQkFDakMsSUFBSSxFQUFhLE1BQU0sQ0FBQyxJQUFJO2dCQUM1QixJQUFJLEVBQWEsTUFBTSxDQUFDLElBQUk7Z0JBQzVCLFFBQVEsRUFBUyxNQUFNLENBQUMsUUFBUTtnQkFDaEMsSUFBSSxFQUFhLE1BQU0sQ0FBQyxJQUFJO2dCQUM1QixRQUFRLEVBQVMsTUFBTSxDQUFDLFFBQVE7Z0JBQ2hDLGVBQWUsRUFBRSxNQUFNLENBQUMsZUFBZTtnQkFDdkMsV0FBVyxFQUFNLE1BQU0sQ0FBQyxXQUFXO2FBQ3RDLENBQUM7WUFFRix5QkFBeUIsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3pFLENBQUM7UUFFRCxNQUFNLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDO0lBQzFDLENBQUM7SUFDTCxnQ0FBQztBQUFELENBQUMsQUFwQkQsSUFvQkM7QUFwQlksOERBQXlCIn0=
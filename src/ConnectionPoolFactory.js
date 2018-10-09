"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
class ConnectionPoolFactory {
    static create(poolConfig) {
        if (ConnectionPoolFactory.pool == null) {
            ConnectionPoolFactory.pool = mysql.createPool(poolConfig);
        }
        return ConnectionPoolFactory.pool;
    }
}
exports.ConnectionPoolFactory = ConnectionPoolFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29ubmVjdGlvblBvb2xGYWN0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQ29ubmVjdGlvblBvb2xGYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0JBQWdDO0FBR2hDLE1BQWEscUJBQXFCO0lBR3ZCLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBc0I7UUFDdkMsSUFBRyxxQkFBcUIsQ0FBQyxJQUFJLElBQUksSUFBSSxFQUFFO1lBQ25DLHFCQUFxQixDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzdEO1FBRUQsT0FBTyxxQkFBcUIsQ0FBQyxJQUFJLENBQUM7SUFDdEMsQ0FBQztDQUNKO0FBVkQsc0RBVUMifQ==
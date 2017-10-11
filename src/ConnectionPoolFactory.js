"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql");
var ConnectionPoolFactory = (function () {
    function ConnectionPoolFactory() {
    }
    ConnectionPoolFactory.create = function (poolConfig) {
        if (ConnectionPoolFactory.pool == null) {
            ConnectionPoolFactory.pool = mysql.createPool(poolConfig);
        }
        return ConnectionPoolFactory.pool;
    };
    return ConnectionPoolFactory;
}());
exports.ConnectionPoolFactory = ConnectionPoolFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29ubmVjdGlvblBvb2xGYWN0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQ29ubmVjdGlvblBvb2xGYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQWdDO0FBR2hDO0lBQUE7SUFVQSxDQUFDO0lBUGlCLDRCQUFNLEdBQXBCLFVBQXFCLFVBQXVCO1FBQ3hDLEVBQUUsQ0FBQSxDQUFDLHFCQUFxQixDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3BDLHFCQUFxQixDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzlELENBQUM7UUFFRCxNQUFNLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDO0lBQ3RDLENBQUM7SUFDTCw0QkFBQztBQUFELENBQUMsQUFWRCxJQVVDO0FBVlksc0RBQXFCIn0=
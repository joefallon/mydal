"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var DatabaseUtilities_1 = require("./DatabaseUtilities");
before(function (done) {
    DatabaseUtilities_1.DatabaseUtilities.clean(cleanCallback);
    function cleanCallback(err) {
        if (err) {
            assert.fail(null, null, err.message);
        }
        else {
            done();
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsX2JlZm9yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdsb2JhbF9iZWZvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFBa0M7QUFDbEMseURBQXdEO0FBRXhELE1BQU0sQ0FBQyxVQUFDLElBQUk7SUFDUixxQ0FBaUIsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7SUFFdkMsdUJBQXVCLEdBQVM7UUFDNUIsRUFBRSxDQUFBLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxFQUFFLENBQUM7UUFDWCxDQUFDO0lBQ0wsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsX2JlZm9yZS50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2xvYmFsX2JlZm9yZS50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0JBQWtDO0FBQ2xDLHlEQUF3RDtBQUV4RCxNQUFNLENBQUMsVUFBQyxJQUFJO0lBQ1IscUNBQWlCLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBRXZDLHVCQUF1QixHQUFTO1FBQzVCLEVBQUUsQ0FBQSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3pDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksRUFBRSxDQUFDO1FBQ1gsQ0FBQztJQUNMLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9
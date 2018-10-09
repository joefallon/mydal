"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const DatabaseUtilities_1 = require("./DatabaseUtilities");
before((done) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsX2JlZm9yZS50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2xvYmFsX2JlZm9yZS50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaUNBQWtDO0FBQ2xDLDJEQUF3RDtBQUV4RCxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtJQUNaLHFDQUFpQixDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUV2QyxTQUFTLGFBQWEsQ0FBQyxHQUFTO1FBQzVCLElBQUcsR0FBRyxFQUFFO1lBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN4QzthQUFNO1lBQ0gsSUFBSSxFQUFFLENBQUM7U0FDVjtJQUNMLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9
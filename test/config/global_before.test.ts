import assert = require('assert');
import { DatabaseUtilities } from "./DatabaseUtilities";

before((done) => {
    DatabaseUtilities.clean(cleanCallback);

    function cleanCallback(err:Error) {
        if(err) {
            assert.fail(null, null, err.message);
        } else {
            done();
        }
    }
});

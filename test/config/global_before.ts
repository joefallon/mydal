import DatabaseUtilities = require('./DatabaseUtilities');

import chai = require('chai');
let assert  = chai.assert;

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

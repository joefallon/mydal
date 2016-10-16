"use strict";
var DatabaseUtilities = require('./DatabaseUtilities');
var chai = require('chai');
var assert = chai.assert;
before(function (done) {
    DatabaseUtilities.clean(cleanCallback);
    function cleanCallback(err) {
        if (err) {
            assert.fail(null, null, err.message);
        }
        else {
            done();
        }
    }
});

"use strict";
var MySQLDateTimeFormatter = (function () {
    function MySQLDateTimeFormatter() {
    }
    MySQLDateTimeFormatter.format = function (date) {
        function pad(n) { return (n < 10) ? '0' + n : n; }
        var year = date.getUTCFullYear();
        var month = pad(date.getUTCMonth() + 1); // #getUTCMonth is zero indexed
        var day = pad(date.getUTCDate());
        var hours = pad(date.getUTCHours());
        var minutes = pad(date.getUTCMinutes());
        var seconds = pad(date.getUTCSeconds());
        return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    };
    return MySQLDateTimeFormatter;
}());
module.exports = MySQLDateTimeFormatter;

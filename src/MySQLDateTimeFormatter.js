"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MySQLDateTimeFormatter = (function () {
    function MySQLDateTimeFormatter() {
    }
    MySQLDateTimeFormatter.format = function (date) {
        function pad(n) { if (n < 10) {
            return '0' + n;
        }
        else {
            return n;
        } }
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
exports.MySQLDateTimeFormatter = MySQLDateTimeFormatter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTXlTUUxEYXRlVGltZUZvcm1hdHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIk15U1FMRGF0ZVRpbWVGb3JtYXR0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtJQUFBO0lBYUEsQ0FBQztJQVppQiw2QkFBTSxHQUFwQixVQUFxQixJQUFVO1FBQzNCLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQUEsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFBQSxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFBQSxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQUEsQ0FBQyxDQUFDLENBQUM7UUFFakUsSUFBSSxJQUFJLEdBQU0sSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3BDLElBQUksS0FBSyxHQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQywrQkFBK0I7UUFDMUUsSUFBSSxHQUFHLEdBQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQ3JDLElBQUksS0FBSyxHQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUN0QyxJQUFJLE9BQU8sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7UUFDeEMsSUFBSSxPQUFPLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO1FBRXhDLE1BQU0sQ0FBSSxJQUFJLFNBQUksS0FBSyxTQUFJLEdBQUcsU0FBSSxLQUFLLFNBQUksT0FBTyxTQUFJLE9BQVMsQ0FBQztJQUNwRSxDQUFDO0lBQ0wsNkJBQUM7QUFBRCxDQUFDLEFBYkQsSUFhQztBQWJZLHdEQUFzQiJ9
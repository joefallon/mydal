"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Util = /** @class */ (function () {
    function Util() {
    }
    /**
     * @param obj
     * @returns {any} Returns a very shallow clone of `obj` ignoring any inheritance hierarchy.
     */
    Util.shallowClone = function (obj) {
        var clone = {};
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                clone[prop] = obj[prop];
            }
        }
        return clone;
    };
    /**
     * @param arr
     * @returns {any} Returns a very shallow clone of an array ignoring any inheritance hierarchy.
     */
    Util.shallowCloneArray = function (arr) {
        var clone = [];
        arr.map(function (obj) {
            clone.push(Util.shallowClone(obj));
        });
        return clone;
    };
    return Util;
}());
exports.Util = Util;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtJQUFBO0lBMEJBLENBQUM7SUF6Qkc7OztPQUdHO0lBQ1csaUJBQVksR0FBMUIsVUFBMkIsR0FBUTtRQUMvQixJQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7UUFFakIsR0FBRyxDQUFBLENBQUMsSUFBSSxJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNsQixFQUFFLENBQUEsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQUMsQ0FBQztRQUM3RCxDQUFDO1FBRUQsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQ7OztPQUdHO0lBQ1csc0JBQWlCLEdBQS9CLFVBQWdDLEdBQVU7UUFDdEMsSUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBQyxHQUFRO1lBQ2IsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdkMsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFDTCxXQUFDO0FBQUQsQ0FBQyxBQTFCRCxJQTBCQztBQTFCWSxvQkFBSSJ9
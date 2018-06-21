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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtJQUFBO0lBMEJBLENBQUM7SUF6Qkc7OztPQUdHO0lBQ1csaUJBQVksR0FBMUIsVUFBMkIsR0FBUTtRQUMvQixJQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7UUFFakIsS0FBSSxJQUFJLElBQUksSUFBSSxHQUFHLEVBQUU7WUFDakIsSUFBRyxHQUFHLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7YUFBRTtTQUM1RDtRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRDs7O09BR0c7SUFDVyxzQkFBaUIsR0FBL0IsVUFBZ0MsR0FBVTtRQUN0QyxJQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDakIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFDLEdBQVE7WUFDYixLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN2QyxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFDTCxXQUFDO0FBQUQsQ0FBQyxBQTFCRCxJQTBCQztBQTFCWSxvQkFBSSJ9
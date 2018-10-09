"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Util {
    /**
     * @returns Returns a very shallow clone of `obj` ignoring any inheritance hierarchy.
     */
    static shallowClone(obj) {
        const clone = {};
        for (let prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                clone[prop] = obj[prop];
            }
        }
        return clone;
    }
    /**
     * @returns Returns a very shallow clone of each item in an array ignoring any inheritance hierarchy.
     */
    static shallowCloneArray(arr) {
        const clone = [];
        arr.map((obj) => {
            clone.push(Util.shallowClone(obj));
        });
        return clone;
    }
}
exports.Util = Util;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFhLElBQUk7SUFDYjs7T0FFRztJQUNJLE1BQU0sQ0FBQyxZQUFZLENBQUMsR0FBUTtRQUMvQixNQUFNLEtBQUssR0FBUSxFQUFFLENBQUM7UUFFdEIsS0FBSSxJQUFJLElBQUksSUFBSSxHQUFHLEVBQUU7WUFDakIsSUFBRyxHQUFHLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7YUFBRTtTQUM1RDtRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRDs7T0FFRztJQUNJLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFVO1FBQ3RDLE1BQU0sS0FBSyxHQUFRLEVBQUUsQ0FBQztRQUV0QixHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBUSxFQUFFLEVBQUU7WUFDakIsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdkMsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0NBQ0o7QUExQkQsb0JBMEJDIn0=
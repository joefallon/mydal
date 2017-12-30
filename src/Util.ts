export class Util {
    /**
     * @param obj
     * @returns {any} Returns a very shallow clone of `obj` ignoring any inheritance hierarchy.
     */
    public static shallowClone(obj: any): any {
        const clone = {};

        for(let prop in obj) {
            if(obj.hasOwnProperty(prop)) { clone[prop] = obj[prop]; }
        }

        return clone;
    }

    /**
     * @param arr
     * @returns {any} Returns a very shallow clone of an array ignoring any inheritance hierarchy.
     */
    public static shallowCloneArray(arr: any[]): any[] {
        const clone = [];
        arr.map((obj: any) => {
            clone.push(Util.shallowClone(obj));
        });
        return clone;
    }
}
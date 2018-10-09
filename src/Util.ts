export class Util {
    /**
     * @returns Returns a very shallow clone of `obj` ignoring any inheritance hierarchy.
     */
    public static shallowClone(obj: any): any {
        const clone: any = {};

        for(let prop in obj) {
            if(obj.hasOwnProperty(prop)) { clone[prop] = obj[prop]; }
        }

        return clone;
    }

    /**
     * @returns Returns a very shallow clone of each item in an array ignoring any inheritance hierarchy.
     */
    public static shallowCloneArray(arr: any[]): any[] {
        const clone: any = [];

        arr.map((obj: any) => {
            clone.push(Util.shallowClone(obj));
        });

        return clone;
    }
}
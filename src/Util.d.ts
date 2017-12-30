export declare class Util {
    /**
     * @param obj
     * @returns {any} Returns a very shallow clone of `obj` ignoring any inheritance hierarchy.
     */
    static shallowClone(obj: any): any;
    /**
     * @param arr
     * @returns {any} Returns a very shallow clone of an array ignoring any inheritance hierarchy.
     */
    static shallowCloneArray(arr: any[]): any[];
}

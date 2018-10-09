export declare class Util {
    /**
     * @returns Returns a very shallow clone of `obj` ignoring any inheritance hierarchy.
     */
    static shallowClone(obj: any): any;
    /**
     * @returns Returns a very shallow clone of each item in an array ignoring any inheritance hierarchy.
     */
    static shallowCloneArray(arr: any[]): any[];
}

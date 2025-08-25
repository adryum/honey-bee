import type { ComponentPublicInstance } from "vue";
// extended type
export {};

declare global {
    interface Array<T> {
        /** Returns last element of an array. Undefined if array is empty. */
        last(): T
        /** Index of last item in array. -1 if array is empty. */
        readonly lastIndex: number;
        /** Removes item from array. */
        remove(item: T): T[]
        /** Returns true if contains no items. */
        isEmpty(): boolean
    }
}

Array.prototype.isEmpty = function () {
    return this.length < 1
}

Array.prototype.last = function () {
    return this[this.lastIndex]
}

Array.prototype.remove = function <T>(item: T): T[] {
    const index = this.indexOf(item);
    if (index > -1) {
        this.splice(index, 1);
    }
    return this;
};

Object.defineProperty(Array.prototype, 'lastIndex', {
    get: function () {
        return this.length - 1
    },
    configurable: false,
    enumerable: true
});
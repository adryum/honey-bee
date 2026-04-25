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

        replace(item: T, expression: (item: T) => boolean): void

        groupBy(key: (item: T) => number | string): Map<number | string, T[]>
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

Array.prototype.replace = function<T>(item: T, expression: (item: T) => boolean) {
    var result = this.find(item => expression(item))

    if (!result) return;

    const index = this.indexOf(result)
    this[index] = item
}

Array.prototype.groupBy = function<T>(key: (item: T) => number | string): Map<number | string, T[]> {
    const grouped = new Map<number | string, T[]>();
    for (const item of this) {
        const k = key(item);
        if (!grouped.has(k)) grouped.set(k, []);
        grouped.get(k)!.push(item);
    }
    return grouped;
}
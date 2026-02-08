// Add an extension method to all strings
declare global {
    interface String {
        toFixed(val: number): string
        toSentenceCase(): string
    }
}

String.prototype.toFixed = function(val: number): string {
    // `this` is the string value
    return  Number(this.replace(',', '.')).toFixed(val)
}

String.prototype.toSentenceCase = function(): string {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
}
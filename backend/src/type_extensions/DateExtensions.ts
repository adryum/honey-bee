declare global {
    interface Date {
        toDDMMYYYY(separator: string): string;
        toYYYYMMDD(separator: string): string;
        toLoggerTimestamp(separator: string): string;
        firstDayOfMonth(): Date;
        lastDayOfMonth(): Date;
        previousMonth(): Date;
        nextMonth(): Date;
        in(from: Date, to: Date): boolean;
        isToday(): boolean;
        isThisMonth(): boolean;
        isWeekend(): boolean;
    }
}

Date.prototype.toDDMMYYYY = function(separator: string): string {
    // this is the date value
    return `${this.getDate().toString().padStart(2, '0')}${separator}${(this.getMonth() + 1).toString().padStart(2, '0')}${separator}${this.getFullYear()}`
}

Date.prototype.toYYYYMMDD = function(separator: string): string {
    // this is the date value
    return `${this.getFullYear()}${separator}${(this.getMonth() + 1).toString().padStart(2, '0')}${separator}${this.getDate().toString().padStart(2, '0')}`
}

Date.prototype.toLoggerTimestamp = function(): string {
    const h  = String(this.getHours()).padStart(2, '0')
    const m  = String(this.getMinutes()).padStart(2, '0')
    const s  = String(this.getSeconds()).padStart(2, '0')
    const ms = String(this.getMilliseconds()).padStart(3, '0')
    return `[${this.toLocaleDateString('en-GB').replace(/\//g, '-')} ${h}:${m}:${s}.${ms}]`
}

Date.prototype.firstDayOfMonth = function(): Date {
    return new Date(this.getFullYear(), this.getMonth(), 1);
}

Date.prototype.lastDayOfMonth = function(): Date {
    return new Date(this.getFullYear(), this.getMonth() + 1, 0);
}

Date.prototype.previousMonth = function(): Date {
    return new Date(this.getFullYear(), this.getMonth() - 1, 1);
}

Date.prototype.nextMonth = function(): Date {
    return new Date(this.getFullYear(), this.getMonth() + 1, 1);
}

Date.prototype.in = function(from: Date, to: Date): boolean {
    return this.getTime() >= from.getTime() && this.getTime() <= to.getTime();
}

Date.prototype.isToday = function(): boolean {
    const today = new Date();
    return this.getDate() === today.getDate() &&
           this.getMonth() === today.getMonth() &&
           this.getFullYear() === today.getFullYear();
}

Date.prototype.isThisMonth = function(): boolean {
    const today = new Date();
    return this.getMonth() === today.getMonth() &&
           this.getFullYear() === today.getFullYear();
}

Date.prototype.isWeekend = function(): boolean {
    const day = this.getDay();
    return day === 0 || day === 6; // Sunday = 0, Saturday = 6
}
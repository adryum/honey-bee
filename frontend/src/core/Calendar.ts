
export enum Days {
  Sunday = "Sunday",
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday"
}

export enum CalendarType {
    American = 0,
    Europian = 1
}

export enum CalendarDirection {
    Forward,
    Backward
}

export class CalendarDate {
    date!: Date
    year!: number
    month!: number
    day!: number

    constructor(year: number, month: number, day: number) {
        this.setDate(year, month, day)
    }

    copy(): CalendarDate {
        return new CalendarDate(this.year, this.getHumanMonth(), this.day)
    }

    getDayName() {
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        return dayNames[this.date.getDay()]
    }

    getMonthName() {
        return this.date.toLocaleString('default', { month: 'long' });
    }

    getHumanMonth() {
        return this.month + 1
    }

    isWeekend(): boolean {
        return this.getDayName() === Days.Sunday
        || this.getDayName() === Days.Saturday
    }

    isToday(): boolean {
        const today = new Date()

        return this.day === today.getDate() 
        && this.month === today.getMonth()
        && this.year === today.getFullYear()
    }

    isThisMonth(month: number): boolean {
        return this.month === month
    }

    setDate(year: number, month: number, day: number) {
        this.date = new Date(year, month - 1, day)
        this.year = year
        this.month = month - 1
        this.day = day
    }

    moveMonth(by: number): void {
        // +1 bc Date() months start from 0
        var newMonth = this.month + 1 + by
        console.log('month: ' + newMonth + ' year: ' + this.year );
        
        if (newMonth > 12) {
            this.setDate(
                this.year + 1, 
                newMonth - 12, 
                this.day
            )
        } else if (newMonth < 1) {
            this.setDate(
                this.year - 1, 
                newMonth + 12, 
                this.day
            )
        } else {
            this.setDate(
                this.year, 
                newMonth, 
                this.day
            )
        }
    }
}

export function getMonthCalendar(
    year: number,
    month: number,
    weekStartsOn: 0 | 1 = 0 // 0 = Sunday, 1 = Monday
): CalendarDate[][] {
    const weeks: CalendarDate[][] = []

    const monthsFirstDay = new Date(year, month - 1, 1)
    const monthsLastDay = new Date(year, month, 0)
    const daysInMonth = monthsLastDay.getDate()

    let currentWeek: CalendarDate[] = []

    // --- Fill days from previous month ---
    const prevMonthLastDay = new Date(year, month - 1, 0).getDate()

    // Shift weekday index depending on weekStartsOn
    let startWeekday = monthsFirstDay.getDay() // 0=Sun ... 6=Sat
    if (weekStartsOn === 1) {
        startWeekday = (startWeekday - 1 + 7) % 7 // shift so Monday=0
    }

    for (let i = 0; i < startWeekday; i++) {
        const day = prevMonthLastDay - startWeekday + i + 1
        const prevMonth = month - 1 === 0 ? 12 : month - 1
        const prevYear = month - 1 === 0 ? year - 1 : year

        currentWeek.push(new CalendarDate(prevYear, prevMonth, day))
    }

    // --- Fill current month days ---
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month - 1, day)
        let weekdayIndex = date.getDay()

        if (weekStartsOn === 1) {
            weekdayIndex = (weekdayIndex - 1 + 7) % 7
        }

        currentWeek.push(new CalendarDate(year, month, day))

        if (currentWeek.length === 7) {
            weeks.push(currentWeek)
            currentWeek = []
        }
    }

    // --- Fill next month days ---
    if (currentWeek.length > 0) {
        const nextMonth = month + 1 === 13 ? 1 : month + 1
        const nextYear = month + 1 === 13 ? year + 1 : year
        let nextDay = 1
        while (currentWeek.length < 7) {
            currentWeek.push(new CalendarDate(nextYear, nextMonth, nextDay))
            nextDay++
        }
        weeks.push(currentWeek)
    }

    return weeks
}
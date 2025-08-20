
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

export type CalendarEntry = {
    year: number
    month: number
    day: number
    dayName: string
}

export function getMonthCalendar(
    year: number,
    month: number,
    weekStartsOn: 0 | 1 = 0 // 0 = Sunday, 1 = Monday
): CalendarEntry[][] {
    const weeks: CalendarEntry[][] = []

    const monthsFirstDay = new Date(year, month - 1, 1)
    const monthsLastDay = new Date(year, month, 0)
    const daysInMonth = monthsLastDay.getDate()

    let currentWeek: CalendarEntry[] = []

    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

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

        // Find real weekday index
        const weekdayIndex = (i + (weekStartsOn === 1 ? 1 : 0)) % 7

        currentWeek.push({
            year: prevYear,
            month: prevMonth,
            day,
            dayName: dayNames[weekdayIndex]
        })
    }

    // --- Fill current month days ---
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month - 1, day)
        let weekdayIndex = date.getDay()

        // Adjust weekday index if Monday-first
        if (weekStartsOn === 1) {
            weekdayIndex = (weekdayIndex - 1 + 7) % 7
        }

            currentWeek.push({
            year,
            month,
            day,
            dayName: dayNames[weekdayIndex]
        })

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
            const date = new Date(nextYear, nextMonth - 1, nextDay)
            let weekdayIndex = date.getDay()
            if (weekStartsOn === 1) {
                weekdayIndex = (weekdayIndex - 1 + 7) % 7
            }

            currentWeek.push({
                year: nextYear,
                month: nextMonth,
                day: nextDay,
                dayName: dayNames[weekdayIndex]
            })
            nextDay++
        }
        weeks.push(currentWeek)
    }

    return weeks
}
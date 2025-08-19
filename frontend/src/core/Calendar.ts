export type MonthDay = {
    month: number
    day: number
}

export function getMonthCalendar(year: number, month: number): MonthDay[][] {
  const weeks: MonthDay[][] = []

  const firstDay = new Date(year, month - 1, 1)
  const lastDay = new Date(year, month, 0) // last day of this month
  const daysInMonth = lastDay.getDate()

  let currentWeek: MonthDay[] = []

  // --- Fill days from previous month ---
  const prevMonthLastDay = new Date(year, month - 1, 0).getDate()
  const startWeekday = firstDay.getDay() // 0 = Sunday, 6 = Saturday

  for (let i = 0; i < startWeekday; i++) {
    currentWeek.push({
      month: month - 1 === 0 ? 12 : month - 1,
      day: prevMonthLastDay - startWeekday + i + 1
    })
  }

  // --- Fill current month days ---
  for (let day = 1; day <= daysInMonth; day++) {
    currentWeek.push({ month, day })

    if (currentWeek.length === 7) {
      weeks.push(currentWeek)
      currentWeek = []
    }
  }

  // --- Fill next month days ---
  if (currentWeek.length > 0) {
    const nextMonth = month + 1 === 13 ? 1 : month + 1
    let nextDay = 1
    while (currentWeek.length < 7) {
      currentWeek.push({ month: nextMonth, day: nextDay++ })
    }
    weeks.push(currentWeek)
  }

  return weeks
}


// Example: September 2025
const calendar = getMonthCalendar(2025, 9);
console.log(calendar);
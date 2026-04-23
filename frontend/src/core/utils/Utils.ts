export function formatDateWithOrdinal(
    dateTime: string, 
    showHoursAndMinutes: boolean = false,
    showSeconds: boolean = false
): string {
    if (!dateTime) return ""
    
    const date = new Date(dateTime.replace(" ", "T"));

    if (isNaN(date.getTime())) {
        throw new Error("Invalid date string");
    }

    const day = date.getDate();

    const suffix =
        day >= 11 && day <= 13
        ? "th"
        : { 1: "st", 2: "nd", 3: "rd" }[day % 10] ?? "th";

    const month = date.toLocaleString("en-GB", { month: "long" });
    const year = date.getFullYear();

    const h = String(date.getHours()).padStart(2, '0')
    const m = String(date.getMinutes()).padStart(2, '0')
    const s = String(date.getSeconds()).padStart(2, '0')

    const hoursAndMinutes = showHoursAndMinutes ? `${h}:${m} ` : ""
    const seconds = showSeconds ? `${s} ` : ""

    return hoursAndMinutes + seconds + `${day}${suffix} ${month}, ${year}`;
}

export function getRandomId(prefix: string): string {
    return `${prefix}-${Math.random().toString(36).slice(2, 11)}`
}

export function getAge(bornTs: string, todayTs: string): string {
    const born = new Date(bornTs);
    const today = new Date(todayTs);

    let years = today.getFullYear() - born.getFullYear();
    let months = today.getMonth() - born.getMonth();

    if (months < 0) {
        years--;
        months += 12;
    }

    // If day hasn't been reached yet this month, subtract a month
    if (today.getDate() < born.getDate()) {
        months--;
        if (months < 0) {
        years--;
        months += 12;
        }
    }

    const parts: string[] = [];
    if (years > 0) parts.push(`${years} year${years !== 1 ? 's' : ''}`);
    if (months > 0) parts.push(`${months} month${months !== 1 ? 's' : ''}`);
    if (parts.length === 0) parts.push('0 months');

    return parts.join(' ');
}
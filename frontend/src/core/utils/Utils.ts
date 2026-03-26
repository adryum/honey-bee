export function formatDateWithOrdinal(
    dateTime: string, 
    showHoursAndMinutes: boolean = false,
    showSeconds: boolean = false
): string {
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
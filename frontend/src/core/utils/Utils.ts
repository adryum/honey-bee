export function formatDateWithOrdinal(dateTime: string): string {
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

    return `${day}${suffix} ${month}, ${year}`;
}
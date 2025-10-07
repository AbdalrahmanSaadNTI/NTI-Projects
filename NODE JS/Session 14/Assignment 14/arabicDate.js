export function formatArabicDate(date) {
    const dayName = getArabicDay(date.getDay());
    const day = String(date.getDate()).padStart(2, '0');
    const monthName = getArabicMonth(date.getMonth());
    const year = date.getFullYear();

    return `${dayName} ${day} ${monthName} ${year}`;
}
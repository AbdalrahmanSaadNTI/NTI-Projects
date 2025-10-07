const months = ["يناير", "فبراير", "مارس", "أبريل", "وماي", "يونيو", "يوليو", "اغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];

function getArabicMonth(month) {
    return months[month];
}
export function monthFromDate() {
    const date = new Date();
    const month = date.getMonth();
    return getArabicMonth(month);
}
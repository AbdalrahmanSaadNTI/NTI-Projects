const days = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

function getArabicDay(day) {
    return days[day];
}
export function dayFromDate() {
    const date = new Date();
    const day = date.getDay();
    return getArabicDay(day);
}
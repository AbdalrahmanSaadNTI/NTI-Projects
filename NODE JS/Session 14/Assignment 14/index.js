import { formatArabicDate } from './arabicDate.js';

// Get date from command line argument
const inputDate = process.argv[2]; // e.g. "2025-08-10"

if (!inputDate) {
    console.log("❌ Please provide a date. Example: node main.js 2025-08-10");
    process.exit(1);
}

const date = new Date(inputDate);

if (isNaN(date)) {
    console.log("❌ Invalid date format. Please use YYYY-MM-DD.");
    process.exit(1);
}

console.log(formatArabicDate(date));
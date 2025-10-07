"use strict";
// Step 1: Define Types & Interfaces
Object.defineProperty(exports, "__esModule", { value: true });
// Step 2: Implement Classes
// LibraryItem base class
class LibraryItem {
    id;
    title;
    constructor(id, title) {
        this.id = id;
        this.title = title;
    }
    getInfo() {
        return `ID: ${this.id}, Title: ${this.title}`;
    }
}
// BookItem class extending LibraryItem and implementing Borrowable
class BookItem extends LibraryItem {
    author;
    borrowedBy = null;
    constructor(id, title, author) {
        super(id, title);
        this.author = author;
    }
    // Override getInfo to include author
    getInfo() {
        const status = this.borrowedBy ? ` (Borrowed by: ${this.borrowedBy})` : ' (Available)';
        return `${super.getInfo()}, Author: ${this.author}${status}`;
    }
    // Implement Borrowable interface
    borrow(user) {
        if (this.borrowedBy) {
            console.log(`Book "${this.title}" is already borrowed by ${this.borrowedBy}`);
        }
        else {
            this.borrowedBy = user;
            console.log(`Book "${this.title}" has been borrowed by ${user}`);
        }
    }
    returnBook() {
        if (this.borrowedBy) {
            console.log(`Book "${this.title}" has been returned by ${this.borrowedBy}`);
            this.borrowedBy = null;
        }
        else {
            console.log(`Book "${this.title}" is not currently borrowed`);
        }
    }
    // Getter for author (read-only access)
    getAuthor() {
        return this.author;
    }
    // Check if book is available
    isAvailable() {
        return this.borrowedBy === null;
    }
}
// Step 3: Use Generics - Generic Library class
class Library {
    items = [];
    add(item) {
        this.items.push(item);
        console.log(`Item added to library`);
    }
    getAll() {
        return [...this.items]; // Return a copy to prevent external modification
    }
    // Additional utility methods
    getItemCount() {
        return this.items.length;
    }
    // Method to find items by a predicate function
    findItems(predicate) {
        return this.items.filter(predicate);
    }
}
// Step 4: Test the System
console.log("=== Mini Library System Demo ===\n");
// Create a new Library<BookItem>
const library = new Library();
// Add 2 books
const book1 = new BookItem(1, "The Great Gatsby", "F. Scott Fitzgerald");
const book2 = new BookItem(2, "To Kill a Mockingbird", "Harper Lee");
library.add(book1);
library.add(book2);
console.log("\n--- Initial Library State ---");
console.log(`Total items in library: ${library.getItemCount()}`);
library.getAll().forEach(book => console.log(book.getInfo()));
console.log("\n--- Borrowing Operations ---");
// Borrow one book
book1.borrow("Alice Johnson");
book2.borrow("Bob Smith");
console.log("\n--- After Borrowing ---");
library.getAll().forEach(book => console.log(book.getInfo()));
console.log("\n--- Return Operations ---");
// Return the first book
book1.returnBook();
console.log("\n--- Final Library State ---");
library.getAll().forEach(book => console.log(book.getInfo()));
// Additional demonstration of generics and polymorphism
console.log("\n--- Advanced Features Demo ---");
// Demonstrate finding available books using generics
const availableBooks = library.findItems((book) => book.isAvailable());
console.log(`Available books: ${availableBooks.length}`);
availableBooks.forEach(book => console.log(`Available: ${book.getInfo()}`));
class Magazine extends LibraryItem {
    issue;
    constructor(id, title, issue) {
        super(id, title);
        this.issue = issue;
    }
    getInfo() {
        return `${super.getInfo()}, Issue: ${this.issue}`;
    }
    read() {
        console.log(`Reading magazine: ${this.title} - ${this.issue}`);
    }
}
// Create a magazine library using the same generic Library class
const magazineLibrary = new Library();
const magazine1 = new Magazine(101, "National Geographic", "January 2024");
magazineLibrary.add(magazine1);
console.log("\n--- Magazine Library ---");
magazineLibrary.getAll().forEach(magazine => {
    console.log(magazine.getInfo());
    magazine.read();
});
console.log("\n=== Demo Complete ===");
//# sourceMappingURL=010.js.map
// Step 1: Define Types & Interfaces
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// Step 2: Implement Classes
// LibraryItem base class
var LibraryItem = /** @class */ (function () {
    function LibraryItem(id, title) {
        this.id = id;
        this.title = title;
    }
    LibraryItem.prototype.getInfo = function () {
        return "ID: ".concat(this.id, ", Title: ").concat(this.title);
    };
    return LibraryItem;
}());
// BookItem class extending LibraryItem and implementing Borrowable
var BookItem = /** @class */ (function (_super) {
    __extends(BookItem, _super);
    function BookItem(id, title, author) {
        var _this = _super.call(this, id, title) || this;
        _this.borrowedBy = null;
        _this.author = author;
        return _this;
    }
    // Override getInfo to include author
    BookItem.prototype.getInfo = function () {
        var status = this.borrowedBy ? " (Borrowed by: ".concat(this.borrowedBy, ")") : ' (Available)';
        return "".concat(_super.prototype.getInfo.call(this), ", Author: ").concat(this.author).concat(status);
    };
    // Implement Borrowable interface
    BookItem.prototype.borrow = function (user) {
        if (this.borrowedBy) {
            console.log("Book \"".concat(this.title, "\" is already borrowed by ").concat(this.borrowedBy));
        }
        else {
            this.borrowedBy = user;
            console.log("Book \"".concat(this.title, "\" has been borrowed by ").concat(user));
        }
    };
    BookItem.prototype.returnBook = function () {
        if (this.borrowedBy) {
            console.log("Book \"".concat(this.title, "\" has been returned by ").concat(this.borrowedBy));
            this.borrowedBy = null;
        }
        else {
            console.log("Book \"".concat(this.title, "\" is not currently borrowed"));
        }
    };
    // Getter for author (read-only access)
    BookItem.prototype.getAuthor = function () {
        return this.author;
    };
    // Check if book is available
    BookItem.prototype.isAvailable = function () {
        return this.borrowedBy === null;
    };
    return BookItem;
}(LibraryItem));
// Step 3: Use Generics - Generic Library class
var Library = /** @class */ (function () {
    function Library() {
        this.items = [];
    }
    Library.prototype.add = function (item) {
        this.items.push(item);
        console.log("Item added to library");
    };
    Library.prototype.getAll = function () {
        return __spreadArray([], this.items, true); // Return a copy to prevent external modification
    };
    // Additional utility methods
    Library.prototype.getItemCount = function () {
        return this.items.length;
    };
    // Method to find items by a predicate function
    Library.prototype.findItems = function (predicate) {
        return this.items.filter(predicate);
    };
    return Library;
}());
// Step 4: Test the System
console.log("=== Mini Library System Demo ===\n");
// Create a new Library<BookItem>
var library = new Library();
// Add 2 books
var book1 = new BookItem(1, "The Great Gatsby", "F. Scott Fitzgerald");
var book2 = new BookItem(2, "To Kill a Mockingbird", "Harper Lee");
library.add(book1);
library.add(book2);
console.log("\n--- Initial Library State ---");
console.log("Total items in library: ".concat(library.getItemCount()));
library.getAll().forEach(function (book) { return console.log(book.getInfo()); });
console.log("\n--- Borrowing Operations ---");
// Borrow one book
book1.borrow("Alice Johnson");
book2.borrow("Bob Smith");
console.log("\n--- After Borrowing ---");
library.getAll().forEach(function (book) { return console.log(book.getInfo()); });
console.log("\n--- Return Operations ---");
// Return the first book
book1.returnBook();
console.log("\n--- Final Library State ---");
library.getAll().forEach(function (book) { return console.log(book.getInfo()); });
// Additional demonstration of generics and polymorphism
console.log("\n--- Advanced Features Demo ---");
// Demonstrate finding available books using generics
var availableBooks = library.findItems(function (book) { return book.isAvailable(); });
console.log("Available books: ".concat(availableBooks.length));
availableBooks.forEach(function (book) { return console.log("Available: ".concat(book.getInfo())); });
var Magazine = /** @class */ (function (_super) {
    __extends(Magazine, _super);
    function Magazine(id, title, issue) {
        var _this = _super.call(this, id, title) || this;
        _this.issue = issue;
        return _this;
    }
    Magazine.prototype.getInfo = function () {
        return "".concat(_super.prototype.getInfo.call(this), ", Issue: ").concat(this.issue);
    };
    Magazine.prototype.read = function () {
        console.log("Reading magazine: ".concat(this.title, " - ").concat(this.issue));
    };
    return Magazine;
}(LibraryItem));
// Create a magazine library using the same generic Library class
var magazineLibrary = new Library();
var magazine1 = new Magazine(101, "National Geographic", "January 2024");
magazineLibrary.add(magazine1);
console.log("\n--- Magazine Library ---");
magazineLibrary.getAll().forEach(function (magazine) {
    console.log(magazine.getInfo());
    magazine.read();
});
console.log("\n=== Demo Complete ===");

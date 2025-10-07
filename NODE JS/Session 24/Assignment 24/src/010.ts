// Step 1: Define Types & Interfaces

// Book type
type Book = {
  id: number;
  title: string;
  author: string;
};

// Borrowable interface
interface Borrowable {
  borrow(user: string): void;
  returnBook(): void;
}

// Step 2: Implement Classes

// LibraryItem base class
class LibraryItem {
  protected id: number;
  protected title: string;

  constructor(id: number, title: string) {
    this.id = id;
    this.title = title;
  }

  getInfo(): string {
    return `ID: ${this.id}, Title: ${this.title}`;
  }
}

// BookItem class extending LibraryItem and implementing Borrowable
class BookItem extends LibraryItem implements Borrowable {
  private author: string;
  private borrowedBy: string | null = null;

  constructor(id: number, title: string, author: string) {
    super(id, title);
    this.author = author;
  }

  // Override getInfo to include author
  getInfo(): string {
    const status = this.borrowedBy ? ` (Borrowed by: ${this.borrowedBy})` : ' (Available)';
    return `${super.getInfo()}, Author: ${this.author}${status}`;
  }

  // Implement Borrowable interface
  borrow(user: string): void {
    if (this.borrowedBy) {
      console.log(`Book "${this.title}" is already borrowed by ${this.borrowedBy}`);
    } else {
      this.borrowedBy = user;
      console.log(`Book "${this.title}" has been borrowed by ${user}`);
    }
  }

  returnBook(): void {
    if (this.borrowedBy) {
      console.log(`Book "${this.title}" has been returned by ${this.borrowedBy}`);
      this.borrowedBy = null;
    } else {
      console.log(`Book "${this.title}" is not currently borrowed`);
    }
  }

  // Getter for author (read-only access)
  getAuthor(): string {
    return this.author;
  }

  // Check if book is available
  isAvailable(): boolean {
    return this.borrowedBy === null;
  }
}

// Step 3: Use Generics - Generic Library class
class Library<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
    console.log(`Item added to library`);
  }

  getAll(): T[] {
    return [...this.items]; // Return a copy to prevent external modification
  }

  // Additional utility methods
  getItemCount(): number {
    return this.items.length;
  }

  // Method to find items by a predicate function
  findItems(predicate: (item: T) => boolean): T[] {
    return this.items.filter(predicate);
  }
}

// Step 4: Test the System
console.log("=== Mini Library System Demo ===\n");

// Create a new Library<BookItem>
const library = new Library<BookItem>();

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
const availableBooks = library.findItems((book: BookItem) => book.isAvailable());
console.log(`Available books: ${availableBooks.length}`);
availableBooks.forEach(book => console.log(`Available: ${book.getInfo()}`));

// Demonstrate polymorphism with different types of library items
interface Readable {
  read(): void;
}

class Magazine extends LibraryItem implements Readable {
  private issue: string;

  constructor(id: number, title: string, issue: string) {
    super(id, title);
    this.issue = issue;
  }

  getInfo(): string {
    return `${super.getInfo()}, Issue: ${this.issue}`;
  }

  read(): void {
    console.log(`Reading magazine: ${this.title} - ${this.issue}`);
  }
}

// Create a magazine library using the same generic Library class
const magazineLibrary = new Library<Magazine>();
const magazine1 = new Magazine(101, "National Geographic", "January 2024");
magazineLibrary.add(magazine1);

console.log("\n--- Magazine Library ---");
magazineLibrary.getAll().forEach(magazine => {
  console.log(magazine.getInfo());
  magazine.read();
});

console.log("\n=== Demo Complete ===");

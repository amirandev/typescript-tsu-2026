# ლექცია 04: საშინაო დავალება

## ამოცანა: ბიბლიოთეკის მართვის სისტემა

შექმენით ბიბლიოთეკის მართვის სისტემის TypeScript ტიპები.

### 1. ძირითადი Type Aliases

```ts
// 1.1. ISBN — string (მაგ: "978-3-16-148410-0")
type ISBN = string;

// 1.2. Genre — Union ტიპი:
// "რომანი" | "სამეცნიერო" | "ისტორიული" | "პოეზია" | "სახელმძღვანელო" | "სხვა"

// 1.3. Language — "ქართული" | "ინგლისური" | "გერმანული" | "ფრანგული" | "რუსული"

// 1.4. BookStatus — "ხელმისაწვდომია" | "გაცემულია" | "სარემონტო"
```

### 2. Interfaces

```ts
// 2.1. Author
interface Author {
  id: number;
  firstName: string;
  lastName: string;
  birthYear?: number;
  nationality?: string;
}

// 2.2. Book (with full type annotations)
interface Book {
  id: number;
  isbn: ISBN;
  title: string;
  author: Author;
  genre: Genre;
  language: Language;
  publishedYear: number;
  pages: number;
  status: BookStatus;
  borrowedBy?: Member;
  borrowedAt?: Date;
  dueDate?: Date;
}

// 2.3. Member
interface Member {
  id: number;
  memberNumber: string; // "MEM-001"
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  registeredAt: Date;
  borrowedBooks: Book[];
  isActive: boolean;
}

// 2.4. Library (extends...)
interface Library {
  name: string;
  address: string;
  phone: string;
  email: string;
  books: Book[];
  members: Member[];
  readonly establishedYear: number;
}

// 2.5. BorrowRecord
interface BorrowRecord {
  id: number;
  book: Book;
  member: Member;
  borrowedAt: Date;
  returnedAt?: Date;
  isOverdue: boolean;
}
```

### 3. Additional Type Aliases

```ts
// 3.1. SearchResult — Union: Book | Member | null
type SearchResult = Book | Member | null;

// 3.2. LibraryStats
type LibraryStats = {
  totalBooks: number;
  availableBooks: number;
  borrowedBooks: number;
  totalMembers: number;
  activeMembers: number;
};

// 3.3. CreateBookPayload — Book-ის ნაწილი (id, status, borrowedBy... არ გვჭირდება)
type CreateBookPayload = {
  title: string;
  isbn: ISBN;
  author: Author;
  genre: Genre;
  language: Language;
  publishedYear: number;
  pages: number;
};
```

### 4. Functions

```ts
// 4.1. ფუნქცია — ეძებს წიგნს სათაურით
function findBookByTitle(books: Book[], title: string): Book | undefined {
  return books.find(b => b.title.toLowerCase().includes(title.toLowerCase()));
}

// 4.2. ფუნქცია — ითვლის სტატისტიკას
function getLibraryStats(library: Library): LibraryStats {
  return {
    totalBooks: library.books.length,
    availableBooks: library.books.filter(b => b.status === "ხელმისაწვდომია").length,
    borrowedBooks: library.books.filter(b => b.status === "გაცემულია").length,
    totalMembers: library.members.length,
    activeMembers: library.members.filter(m => m.isActive).length,
  };
}

// 4.3. ფუნქცია — წიგნის გაცემა
function borrowBook(
  library: Library,
  bookId: number,
  memberId: number
): BorrowRecord | string {
  const book = library.books.find(b => b.id === bookId);
  const member = library.members.find(m => m.id === memberId);

  if (!book || !member) return "წიგნი ან მომხმარებელი არ მოიძებნა";
  if (book.status !== "ხელმისაწვდომია") return "წიგნი დაკავებულია";
  if (!member.isActive) return "მომხმარებელი არააქტიურია";

  book.status = "გაცემულია";
  book.borrowedBy = member;
  book.borrowedAt = new Date();
  book.dueDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);

  member.borrowedBooks.push(book);

  return {
    id: Date.now(),
    book,
    member,
    borrowedAt: book.borrowedAt,
    isOverdue: false,
  };
}
```

### 5. Create Data

```ts
// შექმენით:
// - 2 Author
// - 4 Book (სხვადასხვა genres, statuses)
// - 3 Member (ერთი არააქტიური)
// - 1 Library (ყველა მონაცემით)

// გამოიყენეთ getLibraryStats()
// გამოიყენეთ borrowBook()
// ხელახლა გამოიძახეთ getLibraryStats() — გაცემის შემდეგ
```

## ჩაბარების პირობები

1. მინიმუმ 3 `interface` (Author, Book, Member)
2. მინიმუმ 3 `type` (Genre, Language, SearchResult)
3. Optional properties (`?`) — მინიმუმ 2
4. `readonly` — მინიმუმ 1
5. Extension (`extends`) — მინიმუმ 1
6. Union types — მინიმუმ 2
7. ყველა ფუნქცია მუშაობს
8. კოდი კომპილირდება

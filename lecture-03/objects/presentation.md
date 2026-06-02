# ლექცია 03: მასივები, Tuples, Enums, Object Types

## სასწავლო მიზნები

- ვისწავლოთ მასივების ტიპიზაცია
- გავეცნოთ Tuple-ებს — ფიქსირებული სიგრძის მასივებს
- ვიმუშაოთ Enum-ებთან (numeric, string)
- განვსაზღვროთ Object Types

---

## სლაიდი 1: Arrays — მასივები

```ts
// ორი გზა მასივის ტიპის მისანიჭებლად
let numbers: number[] = [1, 2, 3, 4, 5];
let names: Array<string> = ["ნინო", "გიორგი", "მარიამ"];

// მასივები ტიპებთან
let mixed: (string | number)[] = ["Hello", 42, "World", 100];

numbers.push(6);    // OK
// numbers.push("7"); // ❌ — string-ის number[]-ში დამატება

names[0] = "თამარი"; // OK
// names[0] = 42;      // ❌
```

---

## სლაიდი 2: ReadonlyArray

წაკითხვადი მასივები — მონაცემების დაცვა:

```ts
let colors: ReadonlyArray<string> = ["წითელი", "მწვანე", "ლურჯი"];
// colors.push("ყვითელი"); // ❌
// colors[0] = "ნარინჯისფერი"; // ❌

// მოკლე სინტაქსი:
let fruits: readonly string[] = ["ვაშლი", "მსხალი", "ატამი"];
```

---

## სლაიდი 3: Tuples — ფიქსირებული სიგრძის მასივები

Tuples საშუალებას გვაძლევს განვსაზღვროთ მასივი ფიქსირებული სიგრძით და ტიპებით თითოეული პოზიციისთვის:

```ts
// Tuple: [string, number]
let person: [string, number] = ["ნინო", 30];
// person = [30, "ნინო"]; // ❌ — არასწორი თანმიმდევრობა

// Tuple: [string, number, boolean]
let product: [string, number, boolean] = ["Laptop", 1500, true];

// Tuple-ის დეკომპოზიცია (destructuring)
const [productName, price, inStock] = product;
console.log(productName); // "Laptop"
console.log(price);       // 1500
```

---

## სლაიდი 4: Tuples — Optional Elements

```ts
// Optional ელემენტები Tuple-ში
let coordinates: [number, number, number?] = [10, 20];
coordinates = [10, 20, 30]; // OK

// Named Tuples (TypeScript 4.0+)
let user: [name: string, age: number, email?: string] = [
  "ნინო", 30, "nino@mail.com"
];
```

---

## სლაიდი 5: Enums — Numeric (რიცხვითი)

```ts
enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}

let dir: Direction = Direction.Up;
console.log(dir);   // 1
console.log(Direction.Left); // 3

// Reverse mapping
console.log(Direction[2]); // "Down"
```

**Reverse mapping:** TypeScript ქმნის ორმხრივ რუკას — რიცხვი → სტრიქონი, სტრიქონი → რიცხვი.

---

## სლაიდი 6: Enums — Default Values

```ts
// Default (იწყება 0-დან)
enum Status {
  Pending,    // 0
  Approved,   // 1
  Rejected,   // 2
}

// Custom numeric values
enum HttpStatus {
  OK = 200,
  NotFound = 404,
  InternalServerError = 500,
}

console.log(HttpStatus.NotFound); // 404
```

---

## სლაიდი 7: Enums — String Enums

```ts
enum Color {
  Red = "წითელი",
  Green = "მწვანე",
  Blue = "ლურჯი",
}

let bgColor: Color = Color.Red;
console.log(bgColor); // "წითელი"

// String Enums-ს არ აქვს reverse mapping
```

String Enums უფრო წაკითხვადია (debugging-ისთვის), მაგრამ იკავებს მეტ მეხსიერებას შედარებით Numeric-თან.

---

## სლაიდი 8: Object Types

```ts
// Object type ანოტაცია
let student: {
  name: string;
  age: number;
  isActive: boolean;
} = {
  name: "მარიამ",
  age: 21,
  isActive: true,
};
```

**Optional properties (`?`):**

```ts
let config: {
  apiUrl: string;
  timeout?: number;    // Optional
  retries?: number;    // Optional
} = {
  apiUrl: "https://api.example.com",
  // timeout — არ არის სავალდებულო
};
```

---

## სლაიდი 9: Nested Objects

```ts
let employee: {
  id: number;
  name: string;
  address: {
    city: string;
    street: string;
    zipCode?: number;
  };
  skills: string[];
} = {
  id: 1,
  name: "გიორგი",
  address: {
    city: "თბილისი",
    street: "რუსთაველი 12",
  },
  skills: ["TypeScript", "React"],
};
```

---

## შეჯამება

| კონსტრუქცია | მაგალითი |
|-------------|----------|
| Array | `number[]`, `Array<string>`, `(string \| number)[]` |
| ReadonlyArray | `readonly number[]` |
| Tuple | `[string, number]` |
| Numeric Enum | `enum Direction { Up = 1, Down, Left, Right }` |
| String Enum | `enum Color { Red = "წითელი" }` |
| Object Type | `{ name: string; age: number }` |
| Optional | `timeout?: number` |

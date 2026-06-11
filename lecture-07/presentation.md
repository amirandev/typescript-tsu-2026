# ლექცია 07 — ფუნქციის პარამეტრები, Return Types, Overloading

## სასწავლო მიზნები

- პარამეტრების ტიპების განსაზღვრა
- Optional პარამეტრები (`?`)
- Default პარამეტრები
- Rest პარამეტრები (`...`)
- Return ტიპები
- Function Overloading
- `void` და `never` ტიპები
- ტიპების ცალკე ფაილში გატანა (`import type`)

---

## 1. პარამეტრების ტიპები

TypeScript-ში თითოეულ პარამეტრს ენიჭება ტიპი.

```ts
function createUser(
  name: string,
  age: number,
  isAdmin: boolean
): string {
  return `${name}, ${age} წლის, ${isAdmin ? "ადმინი" : "მომხმარებელი"}`;
}

console.log(createUser("გიორგი", 25, true));
```

---

## 2. Optional პარამეტრები (`?`)

პარამეტრი, რომლის გადაცემაც არაა სავალდებულო.

```ts
function greet(name: string, title?: string): string {
  if (title) {
    return `გამარჯობა, ${title} ${name}!`;
  }
  return `გამარჯობა, ${name}!`;
}

console.log(greet("ნინო"));          // OK
console.log(greet("ნინო", "ქ-ნი")); // OK
```

Optional პარამეტრები ყოველთვის ბოლოს იწერება.

---

## 3. Default პარამეტრები

Default მნიშვნელობა, რომელიც გამოიყენება თუ არგუმენტი არ გადაეცა.

```ts
function createMessage(
  text: string,
  priority: string = "normal"
): string {
  return `[${priority.toUpperCase()}] ${text}`;
}

console.log(createMessage("შეცდომა ფაილში"));          // [NORMAL]
console.log(createMessage("შეცდომა ფაილში", "high")); // [HIGH]
```

Default პარამეტრები optional-ებს ჰგვანან, მაგრამ მნიშვნელობა აქვთ.

---

## 4. Rest პარამეტრები (`...`)

ვარიაციული რაოდენობის არგუმენტების მისაღებად.

```ts
function joinStrings(...strings: string[]): string {
  return strings.join(", ");
}

console.log(joinStrings("ნინო", "გიორგი", "მარიამ")); // "ნინო, გიორგი, მარიამ"
console.log(joinStrings("ა", "ბ", "გ", "დ"));          // "ა, ბ, გ, დ"
```

---

## 5. Return ტიპები

ფუნქციის დაბრუნების ტიპი იწერება `)`-ს შემდეგ.

```ts
function getUser(id: number): string {
  return `მომხმარებელი #${id}`;
}

function logMessage(msg: string): void {
  console.log(msg);
}
// void — ფუნქცია არ აბრუნებს მნიშვნელობას
```

---

## 6. void ტიპი

`void` ნიშნავს, რომ ფუნქცია არაფერს აბრუნებს (ან აბრუნებს `undefined`-ს).

```ts
function logError(message: string): void {
  console.error(`ERROR: ${message}`);
  // return არ არის საჭირო
}

const result: void = logError("რაღაც შეცდომა");
console.log(result); // undefined
```

---

## 7. never ტიპი

`never` — ფუნქცია არასდროს ასრულებს შესრულებას.

```ts
function throwError(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {
    console.log("გაუთავებელი ციკლი");
  }
}
```

---

## 8. void vs never

| void | never |
|------|-------|
| ფუნქცია სრულდება, მაგრამ არ აბრუნებს მნიშვნელობას | ფუნქცია არასდროს სრულდება |
| აბრუნებს `undefined`-ს | საერთოდ ვერ აღწევს დასასრულს |
| შეიძლება ჰქონდეს `return;` | არ შეიძლება ჰქონდეს `return` |

```ts
function exampleVoid(): void { }
function exampleNever(): never { throw new Error(); }
```

---

## 9. Function Overloading — შესავალი

Overloading საშუალებას გვაძლევს, განვსაზღვროთ ერთი ფუნქცია რამდენიმე განსხვავებული ხელმოწერით.

```ts
// Overload signatures
function getInfo(name: string): string;
function getInfo(id: number): string;

// Implementation
function getInfo(value: string | number): string {
  if (typeof value === "string") {
    return `მომხმარებლის სახელი: ${value}`;
  }
  return `მომხმარებლის ID: ${value}`;
}

console.log(getInfo("ნინო")); // მომხმარებლის სახელი
console.log(getInfo(42));      // მომხმარებლის ID
```

---

## 10. Overloading — მრავალი პარამეტრი

```ts
function buildUrl(base: string, path: string): string;
function buildUrl(base: string, path: string, query: Record<string, string>): string;
function buildUrl(base: string, path: string, query?: Record<string, string>): string {
  const url = `${base.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
  if (query) {
    const params = new URLSearchParams(query).toString();
    return `${url}?${params}`;
  }
  return url;
}

console.log(buildUrl("https://api.example.com", "users"));           // "https://api.example.com/users"
console.log(buildUrl("https://api.example.com", "users", { id: "42" })); // "https://api.example.com/users?id=42"
```

---

## 11. Overloading — სხვადასხვა ტიპები

```ts
function format(input: string): string;
function format(input: number): string;
function format(input: string | number): string {
  if (typeof input === "number") {
    return `$${input.toFixed(2)}`;
  }
  return input.trim();
}

console.log(format("  hello  ")); // "hello"
console.log(format(42.5));        // "$42.50"
```

---

## 12. Destructuring პარამეტრებში

```ts
interface UserConfig {
  name: string;
  age?: number;
  city?: string;
}

function registerUser({ name, age = 0, city = "უცნობი" }: UserConfig): string {
  return `${name}, ${age} წლის, ქალაქი: ${city}`;
}

console.log(registerUser({ name: "გიორგი", age: 25 }));
```

---

## 13. Callback ტიპები

```ts
type ErrorHandler = (message: string, code: number) => void;

function performAction(
  actionName: string,
  onSuccess: (result: string) => void,
  onError: ErrorHandler
): void {
  try {
    const result = `✅ ${actionName} შესრულდა`;
    onSuccess(result);
  } catch (e) {
    onError("შეცდომა", 500);
  }
}
```

---

## 14. ფუნქციის ტიპის ალიასი

```ts
type Fetcher = (url: string) => Promise<unknown>;

const fetchJSON: Fetcher = async (url) => {
  const res = await fetch(url);
  return res.json();
};

const fetchText: Fetcher = async (url) => {
  const res = await fetch(url);
  return res.text();
};

async function getData(url: string, fetcher: Fetcher): Promise<unknown> {
  return fetcher(url);
}
```

---

## 15. ტიპების ცალკე ფაილში გატანა (Separating Types)

როცა პროექტი იზრდება, ტიპების და ინტერფეისების ერთ ფაილში შენახვა ალაგებს კოდს.

**types.ts** — ცალკე ფაილი მხოლოდ ტიპებისთვის:

```ts
// src/types.ts
export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
}

export type Status = "active" | "inactive";
```

**import** — იმპორტი სხვა ფაილებიდან:

```ts
// src/data/users.ts
import type { User } from "../types";

const users: User[] = [
  { id: 1, name: "ნინო", email: "nino@example.com", role: "admin" },
];
```

> `import type` — იმპორტირებს მხოლოდ ტიპებს (რჩება მხოლოდ development-ში, წაიშლება build-ის დროს).

**ტიპების გადაზიარება მოდულებს შორის:**

```ts
// src/utils/userUtils.ts
import type { User, Status } from "../types";

function formatUser(user: User): string {
  return `${user.name} (${user.email})`;
}

function isActive(status: Status): boolean {
  return status === "active";
}
```

### სარგებელი

- **გადაზიარება** — ერთი და იგივე ტიპი შეიძლება მრავალ ფაილში გამოვიყენოთ
- **მოვლა** — ტიპის შეცვლა ერთ ადგილას ასწორებს ყველგან
- **წაკითხვადობა** — კოდი უფრო გასაგებია, ტიპები ცალკეა

### მაგალითი პროექტის სტრუქტურა

```
src/
├── types.ts              # ყველა ტიპი და ინტერფეისი
├── data/
│   └── orders.ts         # იმპორტს types.ts-დან
├── utils/
│   └── orderUtils.ts     # იმპორტს types.ts-დან
└── pages/
    ├── Orders.tsx        # იყენებს orders.ts-ს
    └── OrderDetail.tsx   # იყენებს orderUtils.ts-ს
```

---

## Summary

- **Parameter types**: `name: string`
- **Optional params**: `name?: string`
- **Default params**: `name: string = "მნიშვნელობა"`
- **Rest params**: `...names: string[]`
- **Return types**: `(): type`
- **void** — ფუნქცია არ აბრუნებს მნიშვნელობას
- **never** — ფუნქცია ვერ ასრულებს შესრულებას
- **Overloading** — მრავალი ხელმოწერა ერთი ფუნქციისთვის
- **Separate types** — ტიპების ცალკე `types.ts`-ში გატანა და `import type`-ით გამოყენება

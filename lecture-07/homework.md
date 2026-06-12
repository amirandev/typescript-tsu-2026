# საშინაო დავალება — ლექცია 07

---

## 🆕 7.1 — Language Buttons & Label Translations from Object

### დავალება: მრავალენოვანი პროფილის გვერდი

შექმენით React + TypeScript პროექტი Vite-ზე, სადაც იქნება 3 ენა: `en`, `ge`, `de`. თითოეულ ენას უნდა ჰქონდეს შემდეგი ველები:

```ts
interface PageContent {
  heroTitle: string;
  heroDescription: string;
  aboutTitle: string;
  aboutText: string;
  contactEmail: string;
  footerText: string;
}
```

**მოთხოვნები:**

1. **`src/data/translations.ts`** — 3 ენის თარგმანი PageContent ინტერფეისით
2. **`src/pages/Home.tsx`** — იღებს `:lang` პარამეტრს `useParams`-ით, აჩვენებს hero, about, contact, footer სექციებს translated ტექსტით
3. **ენის გადამრთველი** — 3 ღილაკი (EN / GE / DE), მიმდინარე ენა მონიშნულია
4. **Fallback** — თუ URL-ში ენა არ არსებობს (მაგ. `/es`), მაინც აჩვენეთ `en` ვერსია + console.warn
5. **`/:lang`** route, `/` redirect-ით `/en`-ზე

**დამატებით (bonus):** დაამატეთ `LanguageSelector` კომპონენტი `src/components/`-ში, რომელიც მიიღებს `currentLang` და `onChange` props-ებს (`onChange` იყენებს `useNavigate`-ს).

## Utility ფუნქციების ბიბლიოთეკა

შექმენით პროექტი შემდეგი სტრუქტურით:

```
homework-07/
├── types.ts           # ყველა type / interface
└── functions.ts       # ფუნქციები — import types.ts-დან
```

**types.ts** — განსაზღვრეთ აქ ყველა ინტერფეისი და ტიპი, შემდეგ `import type`-ით გამოიყენეთ `functions.ts`-ში.

### დავალება 1: Overloaded — `createUser`

```ts
interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
  role: "admin" | "user" | "guest";
}

// 1. მიიღოს მხოლოდ name - ავტომატურად მიანიჭოს id, guest როლი
// 2. მიიღოს name და role
// 3. მიიღოს სრული ინფორმაცია (name, email, age, role)
function createUser(name: string): User;
function createUser(name: string, role: "admin" | "user" | "guest"): User;
function createUser(name: string, email: string, age: number, role: "admin" | "user" | "guest"): User;
function createUser(
  name: string,
  param2?: string | "admin" | "user" | "guest",
  param3?: number,
  param4?: "admin" | "user" | "guest"
): User {
  // TODO: ააწყვეთ User ობიექტი გადაცემული პარამეტრების მიხედვით
}
```

### დავალება 2: `formatPrice`

Overloaded ფუნქცია:

```ts
function formatPrice(price: number): string;          // "$10.00"
function formatPrice(price: number, currency: string): string; // "€10.00"
function formatPrice(price: number, currency: string, locale: string): string; // "10,00 €"
```

### დავალება 3: `calculateTotal`

```ts
function calculateTotal(prices: number[]): number;           // ჯამი
function calculateTotal(prices: number[], discount: number): number; // ჯამი ფასდაკლებით
function calculateTotal(prices: number[], discount: number, taxRate: number): number; // ჯამი ფასდაკლებით + გადასახადი
```

### დავალება 4: `mergeArrays`

```ts
function mergeArrays<T>(arr1: T[], arr2: T[], unique?: boolean): T[] {
  // unique = true -> მხოლოდ უნიკალური ელემენტები
  // TODO
}
```

### დავალება 5: Error Handler

```ts
type LogLevel = "info" | "warn" | "error";

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: Date;
}

function createLogger(module: string) {
  // დააბრუნეთ ობიექტი მეთოდებით:
  // info(msg: string): void
  // warn(msg: string): void
  // error(msg: string): never (აგდებს შეცდომას)
  // getLogs(): LogEntry[] — აბრუნებს ყველა ჩანაწერს
}
```

### დავალება 6: Utility Types

```ts
// ფუნქცია, რომელიც იღებს ობიექტს და აბრუნებს მის გასაღებებს
function getKeys<T extends object>(obj: T): string[] {
  // TODO
}

// ფუნქცია, რომელიც უსაფრთხოდ იღებს ობიექტის ველს (ან default მნიშვნელობას)
function getSafe<T extends object, K extends keyof T>(
  obj: T,
  key: K,
  defaultValue?: T[K]
): T[K] | undefined {
  // TODO
}
```

### Bonus: Deep Clone

```ts
function deepClone<T>(obj: T): T {
  // TODO: ღრმა კლონირება JSON.parse(JSON.stringify(...))-ს გარეშე
}
```

### მოთხოვნები

- ყველა ფუნქციას უნდა ჰქონდეს სრული TypeScript ტიპიზაცია
- Overloaded ფუნქციებს უნდა ჰქონდეთ მინიმუმ 2 overload signature
- გამოიყენეთ default, optional და rest პარამეტრები
- ფუნქციებს უნდა ჰქონდეთ აღწერილობითი სახელები

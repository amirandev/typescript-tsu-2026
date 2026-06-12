# ლექცია 07 — TypeScript ფუნქციები + მულტილენგვალურობა

---

## 1. ფუნქციის პარამეტრების ტიპები

JavaScript-ში ფუნქციის პარამეტრებს ტიპი არ აქვთ — შეგიძლია ნებისმიერი მნიშვნელობა გადასცე. TypeScript ამას ამკაცრებს. თითოეულ პარამეტრს უნდა მივუთითოთ ტიპი.

```ts
function createUser(name: string, age: number, isAdmin: boolean) {
  // name შეიძლება იყოს მხოლოდ string
  // age შეიძლება იყოს მხოლოდ number
  // isAdmin შეიძლება იყოს მხოლოდ boolean
}
```

თუ ტიპს არ მივუთითებთ, TypeScript მაინც მიხვდება იმპლიციტურად (type inference), მაგრამ ჯობია ექსპლიციტურად მივუთითოთ.

```ts
// იმპლიციტური — TypeScript თავად ხვდება
function add(a: number, b: number) {
  return a + b; // return type ავტომატურად number
}

// ექსპლიციტური — ჩვენ ვუთითებთ
function add(a: number, b: number): number {
  return a + b;
}
```

## 2. Optional პარამეტრები (?)

ხანდახან ფუნქციას შეიძლება არგუმენტი არ გადაეცეს. მაგალითად, მომხმარებელს შეიძლება ჰქონდეს ტელეფონის ნომერი, ან არ ჰქონდეს. ასეთ დროს ვიყენებთ `?`-ს.

```ts
function createUser(name: string, age?: number) {
  // age — optional, შეიძლება იყოს undefined
  if (age !== undefined) {
    return `${name}, ${age} წლის`;
  }
  return `${name}`;
}

createUser("გიორგი");       // OK — age არ გადაეცა
createUser("გიორგი", 25);   // OK — age გადაეცა
createUser("გიორგი", "25"); // ERROR — string არ უნდა იყოს
```

**მნიშვნელოვანი:** Optional პარამეტრები ყოველთვის ბოლოს უნდა იწერებოდეს. ანუ `(name?: string, age: number)` — არასწორია.

## 3. Default პარამეტრები

Optional-ისგან განსხვავებით, Default პარამეტრს აქვს საწყისი მნიშვნელობა. თუ არგუმენტი არ გადაეცა, იყენებს default-ს.

```ts
function createUser(name: string, age: number = 18) {
  return `${name}, ${age} წლის`;
}

createUser("გიორგი");       // "გიორგი, 18 წლის"
createUser("გიორგი", 25);   // "გიორგი, 25 წლის"
```

სხვაობა optional-სა და default-ს შორის:

| Optional | Default |
|----------|---------|
| `age?: number` → `undefined` | `age: number = 18` → `18` |
| უნდა შეამოწმო `if (age !== undefined)` | პირდაპირ იყენებ |
| ტიპია `number \| undefined` | ტიპია `number` |

## 4. Rest პარამეტრები (...)

როცა არ ვიცით რამდენი არგუმენტი გადაეცემა ფუნქციას, ვიყენებთ rest-ს.

```ts
function joinStrings(separator: string, ...strings: string[]): string {
  return strings.join(separator);
}

joinStrings(", ", "ა", "ბ", "გ");                // "ა, ბ, გ"
joinStrings(" | ", "x", "y", "z", "w");          // "x | y | z | w"
```

`...strings` აგროვებს ყველა დარჩენილ არგუმენტს მასივში. Rest ასევე ბოლოს უნდა იყოს.

## 5. Return ტიპები

ფუნქციის დაბრუნების ტიპი იწერება `)`-ს შემდეგ `: type`.

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

### void

როცა ფუნქცია არ აბრუნებს მნიშვნელობას (ან აბრუნებს undefined-ს). მაგალითად, console.log-ის ტიპია void.

```ts
function sendEmail(to: string, message: string): void {
  console.log(`Email to ${to}: ${message}`);
  // return; — არაა საჭირო, მაგრამ შეიძლება
}

const result: void = sendEmail("test@test.com", "Hello");
console.log(result); // undefined
```

### never

როცა ფუნქცია არასდროს ამთავრებს შესრულებას — ან აგდებს error-ს, ან უსასრულო ციკლია.

```ts
function throwError(message: string): never {
  throw new Error(message);
  // console.log("ეს არასდროს შესრულდება")
}

function infiniteLoop(): never {
  while (true) {
    console.log("უსასრულოდ");
  }
}
```

**void vs never:**

```ts
// void — ფუნქცია სრულდება, უბრალოდ არაფერს აბრუნებს
function log(): void {
  console.log("✅");
} // აქ ფუნქცია მთავრდება

// never — ფუნქცია ვერ მთავრდება
function fail(): never {
  throw new Error("💥");
} // აქედან გამოსავალი არ არის
```

## 6. Function Overloading

Overloading გვაძლევს საშუალებას, ერთ ფუნქციას ჰქონდეს რამდენიმე განსხვავებული ხელმოწერა (signature). მაგალითად, `getInfo`-ს შეუძლია მიიღოს `string` (დააბრუნოს ინფო name-ით) ან `number` (დააბრუნოს ინფო id-ით).

```ts
// Overload signatures — ზუსტად ის ვარიანტები, რომლებიც დაშვებულია
function getInfo(name: string): string;
function getInfo(id: number): string;

// Implementation — ერთი რეალური ფუნქცია
function getInfo(value: string | number): string {
  if (typeof value === "string") {
    return `მომხმარებელი: ${value}`;
  }
  return `მომხმარებლის ID: ${value}`;
}

console.log(getInfo("ნინო"));  // "მომხმარებელი: ნინო"
console.log(getInfo(42));       // "მომხმარებლის ID: 42"
// console.log(getInfo(true));  // ERROR — boolean-ის overload არ არსებობს
```

სანამ implementation-ს წერთ, ზემოთ წერთ ყველა შესაძლებელ signature-ს. Implementation-ის ტიპი უნდა იყოს ისეთი, რომ ყველა signature-ს ფარავდეს (string | number, ან უფრო ზოგადი).

**კიდევ ერთი მაგალითი:** Build URL.

```ts
function buildUrl(base: string, path: string): string;
function buildUrl(base: string, path: string, query: Record<string, string>): string;
function buildUrl(base: string, path: string, query?: Record<string, string>): string {
  const url = `${base}/${path}`;
  if (query) {
    return url + "?" + new URLSearchParams(query).toString();
  }
  return url;
}

buildUrl("https://api.com", "users");
buildUrl("https://api.com", "users", { id: "42" });
```

## 7. Destructuring პარამეტრებში

ობიექტის ველების პირდაპირ ამოღება ფუნქციის პარამეტრში (interface-თან ერთად):

```ts
interface UserConfig {
  name: string;
  age?: number;
  city?: string;
}

function registerUser({ name, age = 0, city = "უცნობი" }: UserConfig): string {
  return `${name}, ${age} წლის, ქალაქი: ${city}`;
}

registerUser({ name: "გიორგი", age: 25, city: "თბილისი" });
registerUser({ name: "ნინო" }); // "ნინო, 0 წლის, ქალაქი: უცნობი"
```

## 8. Callback / Function Type

როცა ფუნქციას გადავცემთ სხვა ფუნქციას (callback), TypeScript-ში უნდა მივუთითოთ callback-ის ტიპი:

```ts
type ErrorHandler = (message: string, code: number) => void;

function doSomething(name: string, onSuccess: (result: string) => void, onError: ErrorHandler) {
  try {
    onSuccess(`✅ ${name} შესრულდა`);
  } catch {
    onError("შეცდომა", 500);
  }
}
```

**Function type alias** — ცალკე გატანილი ტიპი:

```ts
type Fetcher = (url: string) => Promise<unknown>;

const fetchJSON: Fetcher = async (url) => {
  const res = await fetch(url);
  return res.json();
};
```

## 9. ტიპების ცალკე ფაილში გატანა (Separate Types)

როცა პროექტი იზრდება, ტიპების ერთ ფაილში შენახვა კოდს უფრო სუფთას ხდის. იდეა: ყველა interface და type იყოს `types.ts`-ში, და `import type`-ით შემოვიტანოთ იქ, სადაც გვჭირდება.

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

```ts
// src/utils/userUtils.ts
import type { User, Status } from "../types";

function formatUser(user: User): string {
  return `${user.name} (${user.email})`;
}
```

`import type` — იმპორტირებს **მხოლოდ ტიპებს**. Build-ის დროს ეს იმპორტები წაიშლება, runtime-ში გავლენა არ აქვს.

**ტიპიური პროექტის სტრუქტურა:**
```
src/
├── types.ts              # ყველა type / interface
├── data/
│   └── orders.ts         # import type { Order }
├── utils/
│   └── orderUtils.ts     # import type { Order }
└── pages/
    ├── Orders.tsx
    └── OrderDetail.tsx
```

---

## 7.1 Language buttons & label translations from object

ახლა ვნახოთ, როგორ გამოვიყენოთ TypeScript-ის ცოდნა პრაქტიკაში — მულტილენგვალურობა route-პარამეტრებით.

**კონცეფცია:** გვაქვს ობიექტი, სადაც გასაღები ენის კოდია, მნიშვნელობა თარგმანები. Route-პარამეტრი `/:lang` იჭერს URL-იდან ენას. `useParams` კითხულობს მას. `t[lang]` ირჩევს სწორ თარგმანს. ღილაკები `Link`-ით უბრალოდ ცვლიან URL-ს.

### 1. Data — translations.ts

```ts
// src/data/translations.ts
export const t = {
  en: {
    title: "Welcome",
    subtitle: "This is a translation example",
    desc: "Change the URL or click buttons to switch languages.",
  },
  ge: {
    title: "მოგესალმებით",
    subtitle: "ეს არის თარგმანის მაგალითი",
    desc: "შეცვალეთ URL ან დააჭირეთ ღილაკებს ენის შესაცვლელად.",
  },
} as const;

export type Lang = keyof typeof t; // "en" | "ge"
```

`as const` აქცევს ობიექტს read-only-დ, რაც TypeScript-ს საშუალებას აძლევს ზუსტად განსაზღვროს თითოეული ველის ტიპი.

### 2. Routes — App.tsx

```tsx
// src/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/en" replace />} />
      <Route path="/:lang" element={<Home />} />
    </Routes>
  );
}
```

`/` მისამართზე ავტომატურად გადავდივართ `/en`-ზე. `/:lang` — ეს ნიშნავს, რომ `/en`, `/ge`, ან ნებისმიერი სხვა ტექსტი გახდება `lang` პარამეტრი.

### 3. Home.tsx — useParams + Link

```tsx
// src/pages/Home.tsx
import { useParams, Link } from "react-router-dom";
import { t, type Lang } from "../data/translations";

function Home() {
  const { lang } = useParams<{ lang: Lang }>();
  const labels = t[lang ?? "en"] ?? t.en;

  return (
    <div>
      <nav>
        <Link to="/en"><button>English</button></Link>
        <Link to="/ge"><button>ქართული</button></Link>
      </nav>
      <h1>{labels.title}</h1>
      <h2>{labels.subtitle}</h2>
      <p>{labels.desc}</p>
      <hr />
      <p>Current language: <strong>{lang}</strong></p>
    </div>
  );
}
```

**როგორ მუშაობს ეს კოდი:**

| ნაბიჯი | რა ხდება |
|--------|-----------|
| 1. URL: `/ge` | React Router ხვდება, რომ `:lang` = "ge" |
| 2. `useParams()` | აბრუნებს `{ lang: "ge" }` |
| 3. `t[lang]` | იღებს `t.ge` → Georgian თარგმანებს |
| 4. `labels.title` | "მოგესალმებით" |
| 5. ღილაკი `English` | `Link to="/en"` → URL ხდება `/en` → თავიდან რენდერი |

### Fallback — როცა ენა არ არსებობს

```tsx
const { lang } = useParams();
const labels = t[lang] ?? t.en; // lang = "fr", t.fr = undefined → t.en
```

`??` (nullish coalescing) — თუ `t[lang]` არის `undefined` ან `null`, იყენებს `t.en`-ს.

### 4. TypeScript-ით typed parameters

```tsx
const { lang } = useParams<{ lang: "en" | "ge" }>();
// lang-ის ტიპია string | undefined (useParams ყოველთვის აბრუნებს string | undefined-ს)
```

---

## 7.2 Multilingual website — TypeScript files JSON-ის ნაცვლად

JSON-ის ნაცვლად TypeScript ფაილს ვიყენებთ — ეს გვაძლევს ტიპიზაციას, autocomplete-ს და რეფაქტორინგის უპირატესობას.

```ts
// src/translations.ts
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  company: string;
  website: string;
}

export interface TranslationSet {
  labels: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    company: string;
    website: string;
  };
  title: string;
  back: string;
}

export type Locale = "en" | "ge";

export const translations: Record<Locale, TranslationSet> = {
  en: {
    labels: { name: "Name", email: "Email" /* ... */ },
    title: "User Profile",
    back: "Back to home",
  },
  ge: {
    labels: { name: "სახელი", email: "ელ-ფოსტა" /* ... */ },
    title: "მომხმარებლის პროფილი",
    back: "მთავარ გვერდზე დაბრუნება",
  },
};

export const users: User[] = [ /* ... */ ];
```

### გამოყენება:

```tsx
import { translations, users } from "../translations";

const { lang } = useParams();
const t = translations[lang as Locale] ?? translations.en;
```

---

## Extra: Route-დან ნებისმიერი პარამეტრის წამოღება

### path params (`/:param`)

```tsx
<Route path="/users/:id" element={<User />} />
<Route path="/:lang" element={<Home />} />
<Route path="/products/:category/:productId" element={<Product />} />
```

```tsx
const { id } = useParams();           // /users/42 → id = "42"
const { lang } = useParams();         // /en → lang = "en"
const { category, productId } = useParams();  // /products/electronics/99
```

### query params (`?key=value`)

```tsx
import { useSearchParams } from "react-router-dom";

function SearchPage() {
  const [params] = useSearchParams();
  const query = params.get("q");       // /search?q=hello → "hello"
  const page = params.get("page");     // /search?q=hello&page=2 → "2"
}
```

### navigate (დაპროგრამებული გადასვლა)

```tsx
import { useNavigate } from "react-router-dom";

function LanguageSwitcher() {
  const navigate = useNavigate();
  return <button onClick={() => navigate("/ge")}>ქართული</button>;
}
```

---

## Summary

| თემა | არსი |
|------|-------|
| **Parameter types** | `name: string` — თითოეულ პარამეტრს აქვს ტიპი |
| **Optional** | `name?: string` — შეიძლება არ გადაეცეს, ტიპია `string \| undefined` |
| **Default** | `name: string = "x"` — თუ არ გადაეცა, იყენებს default-ს |
| **Rest** | `...names: string[]` — ნებისმიერი რაოდენობის არგუმენტი |
| **Return types** | `(): type` — void (არაფერს აბრუნებს), never (ვერ სრულდება) |
| **Overloading** | მრავალი signature, ერთი implementation |
| **Separate types** | `types.ts` → `import type` |
| **7.1 Translations** | `useParams` + `t[lang]` ობიექტიდან + Link ღილაკები |
| **Route params** | `/:param` → `useParams()`, `?key=value` → `useSearchParams()` |
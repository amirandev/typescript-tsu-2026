# საკლასო დავალება — ლექცია 07

## დავალება 0: ტიპების ცალკე ფაილში გატანა

შექმენით ფაილი `types.ts` და გადაიტანეთ მასში ყველა ინტერფეისი და ტიპი. შემდეგ `import type`-ით გამოიყენეთ სხვა ფაილებში.

```ts
// types.ts
export interface Rectangle {
  width: number;
  height: number;
  unit?: string;
}

export type Operation = "add" | "subtract" | "multiply" | "divide";
```

```ts
// functions.ts
import type { Rectangle, Operation } from "./types";

function getArea({ width, height, unit = "px" }: Rectangle): string {
  return `${width * height}${unit}`;
}
```

## დავალება 1: Typed ფუნქციები

შექმენით ფუნქციები ტიპებით:

```ts
// 1. მიიღოს ორი რიცხვი, დააბრუნოს მათი ნამრავლი
function multiply(a: number, b: number): number {
  // TODO
}

// 2. მიიღოს სტრიქონი და არჩევითი გამეორების რაოდენობა,
//    დააბრუნოს გამეორებული სტრიქონი
function repeat(text: string, times?: number): string {
  // TODO
}

// 3. მიიღოს სტრიქონების მასივი და არჩევითი separator,
//    დააბრუნოს შეერთებული ტექსტი
function joinStrings(strings: string[], separator: string = ", "): string {
  // TODO
}
```

## დავალება 2: Overloaded calculate

შექმენით ფუნქცია `calculate`, რომელსაც აქვს შემდეგი overload სიგნატურები:

```ts
function calculate(a: number, b: number, operation: "add"): number;
function calculate(a: number, b: number, operation: "subtract"): number;
function calculate(a: number, b: number, operation: "multiply"): number;
function calculate(a: number, b: number, operation: "divide"): number;
// implementation
```

## დავალება 3: Rest params

```ts
// ფუნქცია, რომელიც იღებს რიცხვების ვარიაციულ რაოდენობას
// და აბრუნებს მაქსიმალურ მნიშვნელობას
function findMax(...numbers: number[]): number {
  // TODO
}
```

## დავალება 4: void და never

```ts
// 1. ფუნქცია, რომელიც ლოგავს გაფრთხილებას და არ აბრუნებს მნიშვნელობას
function logWarning(message: string): void {
  // TODO
}

// 2. ფუნქცია, რომელიც ამოწმებს პირობას და აგდებს შეცდომას
function assertNotEmpty(value: string): never | void {
  // TODO
}
```

## დავალება 5: Destructuring პარამეტრებში

```ts
interface Rectangle {
  width: number;
  height: number;
  unit?: string;
}

// ფუნქცია, რომელიც იღებს Rectangle-ს destructuring-ით
// და აბრუნებს ფართობს (unit-ის ჩათვლით)
function getArea({ width, height, unit = "px" }: Rectangle): string {
  // TODO
}
```

## დავალება 6: Overloading — formatDate

```ts
// Overload: format("2024-01-15") -> "15 იანვარი, 2024"
// Overload: format(2024, 0, 15) -> "15 იანვარი, 2024"
function formatDate(date: string): string;
function formatDate(year: number, month: number, day: number): string;
// implementation
```

---

## 🆕 7.1 — Language Buttons & Label Translations from Object

### დავალება A: translations ობიექტი

შექმენით `src/data/translations.ts` ფაილი translations ობიექტით 3 ენაზე (en, ge, fr). თითოეულ ენას უნდა ჰქონდეს: `title`, `subtitle`, `footer`.

```ts
// მაგალითი
export const translations = {
  en: { title: "...", subtitle: "...", footer: "..." },
  ge: { title: "...", subtitle: "...", footer: "..." },
  fr: { title: "...", subtitle: "...", footer: "..." },
} as const;

export type Lang = keyof typeof translations;
```

### დავალება B: Language Selector კომპონენტი

შექმენით `src/components/LanguageSelector.tsx` — კომპონენტი, რომელიც აჩვენებს ღილაკებს `/en`, `/ge`, `/fr` ლინკებით. მიმდინარე ენის ღილაკი უნდა იყოს highlighted.

**მინიშნება:** `useParams` + `Link`.

### დავალება C: Home გვერდი

შექმენით `src/pages/Home.tsx` — იყენებს `useParams`-ს `:lang`-ის წასაკითხად, ირჩევს შესაბამის თარგმანს ობიექტიდან და აჩვენებს ეკრანზე. თუ ენა არ არსებობს, გამოიყენეთ default-ად `en`.

### დავალება D: маршрутизація

`src/App.tsx`-ში Route-ის პარამეტრი `/:lang` და redirect `/` → `/en`. `BrowserRouter` `main.tsx`-ში.

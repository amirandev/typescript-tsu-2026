# ლექცია 09 — Type Assertions & Type Guards

## სასწავლო მიზნები

- `as` keyword — type assertion
- Angle bracket syntax `<type>`
- Non-null assertion `!`
- `typeof` type guard
- `instanceof` type guard
- Custom type guards
- Type narrowing

---

## 1. Type Assertion — `as` keyword

TypeScript-ს ვეუბნებით: "მე ვიცი, რა ტიპისაა ეს".

```ts
const input = document.querySelector("#email") as HTMLInputElement;
const value: string = input.value;

const someValue: unknown = "Hello, World!";
const strLength: number = (someValue as string).length;
```

---

## 2. Angle Bracket Syntax

`as` keyword-ის ალტერნატივა (არ მუშაობს JSX-ში).

```ts
const input = <HTMLInputElement>document.querySelector("#email");
const someValue: unknown = "Hello!";
const strLength: number = (<string>someValue).length;
```

---

## 3. as vs Angle Bracket

```ts
// as (რეკომენდირებული)
const value1 = document.querySelector("#input") as HTMLInputElement;

// Angle bracket (JSX-ში არ მუშაობს)
const value2 = <HTMLInputElement>document.querySelector("#input");

// as const — literal type
const status = "active" as const;
// status: "active" (not string)
```

---

## 4. as const

`as const` ქმნის literal ტიპს.

```ts
const role = "admin" as const;
// role: "admin"

const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
} as const;
// config: { readonly apiUrl: "https://api.example.com"; readonly timeout: 5000 }
```

---

## 5. Non-null assertion (!)

ვამბობთ, რომ მნიშვნელობა არ არის `null` ან `undefined`.

```ts
const input = document.querySelector("#username")!;
// input: Element (not Element | null)

const value = someString!; // ვიცით, რომ null არ არის
```

> **სიფრთხილე:** თუ მნიშვნელობა მაინც null-ია, runtime-ში შეცდომას მიიღებთ.

---

## 6. typeof Type Guard

`typeof` — პრიმიტიული ტიპების შემოწმება.

```ts
function processValue(value: string | number): string {
  if (typeof value === "string") {
    // TypeScript იცის: value აქ string-ია
    return value.toUpperCase();
  } else {
    // TypeScript იცის: value აქ number-ია
    return `$${value.toFixed(2)}`;
  }
}
```

---

## 7. typeof-ის შესაძლო მნიშვნელობები

```ts
typeof "hello"   // "string"
typeof 42        // "number"
typeof true      // "boolean"
typeof undefined // "undefined"
typeof Symbol()  // "symbol"
typeof {}        // "object"
typeof function(){} // "function"

// typeof null — "object" (ეს ხაფანგია!)
```

---

## 8. instanceof Type Guard

`instanceof` — კლასების/ობიექტების შემოწმება.

```ts
class User {
  constructor(public name: string) {}
}

class Admin {
  constructor(public name: string, public permissions: string[]) {}
}

function printPerson(person: User | Admin): void {
  console.log(`სახელი: ${person.name}`);

  if (person instanceof Admin) {
    console.log(`უფლებები: ${person.permissions.join(", ")}`);
  }
}
```

---

## 9. Custom Type Guards

ჩვენი საკუთარი ფუნქცია, რომელიც ამოწმებს ტიპს.

```ts
interface Cat {
  type: "cat";
  meow(): void;
}

interface Dog {
  type: "dog";
  bark(): void;
}

type Animal = Cat | Dog;

// Custom type guard
function isCat(animal: Animal): animal is Cat {
  return animal.type === "cat";
}

function handleAnimal(animal: Animal): void {
  if (isCat(animal)) {
    animal.meow(); // TypeScript იცის: Cat
  } else {
    animal.bark(); // TypeScript იცის: Dog
  }
}
```

---

## 10. Custom Type Guard — in ოპერატორი

```ts
interface Car {
  wheels: number;
  drive(): void;
}

interface Boat {
  length: number;
  sail(): void;
}

type Vehicle = Car | Boat;

function isCar(vehicle: Vehicle): vehicle is Car {
  return "wheels" in vehicle;
}

function operateVehicle(vehicle: Vehicle): void {
  if (isCar(vehicle)) {
    vehicle.drive();
  } else {
    vehicle.sail();
  }
}
```

---

## 11. Type Narrowing — Truthiness

```ts
function printLength(value: string | null): void {
  if (value) {
    // value: string (null გამორიცხულია)
    console.log(value.length);
  } else {
    console.log("მნიშვნელობა არ არის");
  }
}
```

---

## 12. Type Narrowing — Equality

```ts
function compareValues(a: string | number, b: string | boolean): void {
  if (a === b) {
    // a === b, ამიტომ ორივე string უნდა იყოს
    console.log(a.toUpperCase());
  }
}
```

---

## 13. Discriminated Union + Type Guard

```ts
type Notification =
  | { kind: "email"; address: string; subject: string }
  | { kind: "sms"; phone: string; body: string }
  | { kind: "push"; deviceToken: string; message: string };

function sendNotification(n: Notification): string {
  switch (n.kind) {
    case "email":
      return `📧 ${n.subject} → ${n.address}`;
    case "sms":
      return `📱 ${n.body} → ${n.phone}`;
    case "push":
      return `🔔 ${n.message} → ${n.deviceToken}`;
  }
}

---

## 14. never — exhaustive check

```ts
function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${value}`);
}

function sendNotification(n: Notification): string {
  switch (n.kind) {
    case "email":
      return `📧 ${n.subject} → ${n.address}`;
    case "sms":
      return `📱 ${n.body} → ${n.phone}`;
    case "push":
      return `🔔 ${n.message} → ${n.deviceToken}`;
    default:
      return assertNever(n); // თუ ახალი ტიპი დაემატება, კომპილაცია ჩაიშლება
  }
}
```

---

## Summary

- **Type assertions**: `as HTMLInputElement`, `<HTMLInputElement>`
- **as const**: literal types
- **Non-null**: `!`
- **typeof**: `typeof x === "string"`
- **instanceof**: `x instanceof Class`
- **Custom type guards**: `function isType(x): x is Type`
- **Type narrowing**: truthiness, equality, discriminated unions
- **Exhaustive checking**: `never`

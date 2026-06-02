# ლექცია 02: მარტივი ტიპები

## სასწავლო მიზნები

- გავეცნოთ TypeScript-ის ძირითად ტიპებს
- ვისწავლოთ ცვლადების ტიპების მინიჭება
- გავიგოთ `any`, `unknown`, `void`-ს გამოყენება
- ვნახოთ null და undefined-ის მართვა

---

## სლაიდი 1: string — ტექსტური ტიპი

სტრიქონები ტექსტური მონაცემებისთვის:

```ts
let name: string = "ნინო";
let greeting: string = `გამარჯობა, ${name}!`;
let text: string = 'მარტივი ბრჭყალები';

name = 42; // ❌ შეცდომა! number არ ენიჭება string-ს
```

სამივე ბრჭყალი მუშაობს: `'`, `"`, `` ` ``

---

## სლაიდი 2: number — რიცხვითი ტიპი

```ts
let age: number = 25;
let price: number = 49.99;
let hex: number = 0xff;   // 255
let binary: number = 0b1010; // 10

let message: string = `ასაკი: ${age}, ფასი: ₾${price}`;
```

TypeScript-ში ყველა რიცხვი (მთელი, წილადი, უარყოფითი) — `number` ტიპისაა.

---

## სლაიდი 3: boolean — ლოგიკური ტიპი

```ts
let isActive: boolean = true;
let isComplete: boolean = false;
let hasAccess: boolean = 1 > 0;  // true

if (isActive && hasAccess) {
  console.log("წვდომა მინიჭებულია");
}
```

მხოლოდ `true` ან `false`. JavaScript-ის truthy/falsy შესაძლებელია, მაგრამ ტიპი უნდა იყოს `boolean`.

---

## სლაიდი 4: any — "რაღაც" ტიპი

**any** — ტიპების სისტემის გამორთვა:

```ts
let data: any = "Hello";
data = 42;       // OK
data = true;     // OK
data = { a: 1 }; // OK
data();          // ❗ Runtime შეცდომა, მაგრამ TypeScript ვერ დაიჭერს
```

**გაფრთხილება:** `any`-ს გამოყენება უარყოფს TypeScript-ის მთავარ უპირატესობას. მოერიდეთ მას, სანამ სხვა ვარიანტი არ არსებობს.

---

## სლაიდი 5: unknown — უცნობი ტიპი

**unknown** — ტიპის უსაფრთხო ვერსია `any`-სთვის:

```ts
let input: unknown = "40";

input = 50;     // OK
input = "Text"; // OK

// ❌ ვერ გამოვიყენებთ შემოწმების გარეშე
// let age: number = input; // Error!

// ✅ ჯერ უნდა შევამოწმოთ
if (typeof input === "number") {
  let age: number = input; // OK
}
```

`unknown` გაიძულებთ ტიპის შემოწმებას, რაც უსაფრთხოებისთვის კარგია.

---

## სლაიდი 6: void — ცარიელი ტიპი

**void** — როდესაც ფუნქცია არაფერს აბრუნებს:

```ts
function logMessage(message: string): void {
  console.log(message);
  // return არ არის საჭირო
}

function noReturn(): void {
  return; // OK — ცარიელი return
}

// void-ს მნიშვნელობა ყოველთვის undefined-ია
const result: void = logMessage("Hi");
console.log(result); // undefined
```

---

## სლაიდი 7: null და undefined

TypeScript-ში `null` და `undefined` საკუთარი ტიპებია:

```ts
let value1: null = null;
let value2: undefined = undefined;

// strict: true-ს დროს:
let name: string = null; // ❌ Error!
let name2: string | null = null; // ✅ OK — Union ტიპი
```

**Union ტიპი (`|`):** საშუალებას გვაძლევს მივუთითოთ ერთზე მეტი ტიპი.

---

## სლაიდი 8: Type Inference — ტიპის გამოცნობა

TypeScript თავად განსაზღვრავს ტიპს მნიშვნელობის მიხედვით:

```ts
let name = "ნინო";      // TypeScript გამოიცნობს: string
let age = 30;            // number
let isStudent = true;    // boolean

// name = 42;            // ❌ — TypeScript-მა უკვე იცის, რომ name string-ია
```

**Explicit (ცხადი) vs Implicit (იმპლიციტური):**

```ts
let a: string = "Hello";  // explicit
let b = "Hello";          // implicit — TypeScript თავად ხვდება
```

---

## სლაიდი 9: Type Assertion

როდესაც თქვენ იცით მეტი ტიპის შესახებ, ვიდრე TypeScript:

```ts
let someValue: unknown = "Hello World";
let strLength: number = (someValue as string).length;

// ძველი სტილი (<ტიპი>)
let strLength2: number = (<string>someValue).length;
```

**გაფრთხილება:** Type Assertion არ ცვლის მონაცემს, მხოლოდ ეუბნება TypeScript-ს. ის **არ** ამოწმებს მონაცემს runtime-ში.

---

## შეჯამება

| ტიპი | მაგალითი |
|------|----------|
| `string` | `"Hello"`, `'Hi'`, `` `template` `` |
| `number` | `42`, `3.14`, `0xFF` |
| `boolean` | `true`, `false` |
| `any` | მოერიდეთ! |
| `unknown` | `typeof`-ის შემოწმება სავალდებულო |
| `void` | ფუნქციები დაბრუნების გარეშე |
| `null` / `undefined` | Union-თან ერთად |

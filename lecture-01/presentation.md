# ლექცია 01: TypeScript საფუძვლები + React Vite-ით

## სასწავლო მიზნები

- გავიგოთ რა არის TypeScript და რატომ გამოვიყენოთ
- ვცადოთ TypeScript ონლაინ Playground-ში
- გავეცნოთ ძირითად ტიპებს: `string`, `number`, `boolean`, `any`
- გავიგოთ როგორ მივუთითოთ ტიპები ცვლადებსა და ფუნქციებს
- შევქმნათ React + TypeScript პროექტი Vite-ით
- გავიგოთ `useState` და ღილაკზე დაკლიკება

---

## სლაიდი 1: რა არის TypeScript?

**TypeScript** არის JavaScript-ის გაფართოება, რომელიც ამატებს **ტიპებს** (types).

```
JavaScript + ტიპები = TypeScript
```

**რატომ TypeScript?**
- 🛡 **შეცდომების გამოვლენა** — შეცდომები ჩანს კოდის წერის დროს, გაშვებამდე
- 💡 **უკეთესი IDE მხარდაჭერა** — ავტომატური შევსება, მინიშნებები
- 📖 **თვითდოკუმენტირება** — კოდის ტიპები გვიხსნის რას ელოდება ფუნქცია

> TypeScript კომპილირდება JavaScript-ში — მუშაობს ნებისმიერ ბრაუზერსა და Node.js-ზე.

---

## სლაიდი 2: სცადე TypeScript ბრაუზერშივე

TypeScript-ის გასინჯვა არაფრის დაყენებას არ საჭიროებს!

### 🎮 TypeScript Playground
[https://www.typescriptlang.org/play/](https://www.typescriptlang.org/play/)

### 🎮 PlayCode.io
[https://playcode.io/typescript](https://playcode.io/typescript)

**სცადეთ:**
```ts
let message: string = "Hello TypeScript!";
console.log(message);

let age: number = 25;
let isStudent: boolean = true;

console.log(`სახელი: ${message}, ასაკი: ${age}, სტუდენტი: ${isStudent}`);
```

---

## სლაიდი 3: ძირითადი ტიპები

| ტიპი | მაგალითი | აღწერა |
|------|----------|---------|
| `string` | `let name: string = "ნიკა"` | ტექსტი |
| `number` | `let age: number = 25` | რიცხვი |
| `boolean` | `let isActive: boolean = true` | ჭეშმარიტი/მცდარი |
| `any` | `let data: any = "რამე"` | ნებისმიერი ტიპი (მოვერიდოთ) |

**ცვლადის ტიპის მითითება:**
```ts
let name: string = "ნიკა";
let age: number = 20;
let isStudent: boolean = true;
let something: any = "შეიძლება შეიცვალოს";
```

**ფუნქციის პარამეტრების და დაბრუნების ტიპი:**
```ts
// პროდუქტის ფასი + გადასახადი
function calculateTotal(price: number, tax: number): number {
  return price + price * tax;
}

// მომხმარებლის მისალმება
function welcomeUser(name: string): string {
  return `კეთილი იყოს შენი მობრძანება, ${name}!`;
}

// ასაკის შემოწმება
function canVote(age: number): boolean {
  return age >= 18;
}

// კონსოლში გამოტანა
function printReceipt(item: string): void {
  console.log(`შეძენილია: ${item}`);
}
```

---

## სლაიდი 4: Vite + React + TypeScript

**Vite** — თანამედროვე build ინსტრუმენტი. ქმნის პროექტს წამებში.

```bash
# შექმენით პროექტი
npx create-vite@latest my-ts-app --template react-ts

# გადადით პროექტში
cd my-ts-app

# დააინსტალირეთ
npm install

# გაუშვით
npm run dev
```

რას მივიღებთ:
- React + TypeScript მზა კონფიგურაციით
- HMR (Hot Module Replacement) — ცვლილებები მაშინვე ჩანს
- tsconfig.json უკვე კონფიგურირებულია

---

## სლაიდი 5: TypeScript React-ში

**src/App.tsx** — მთავარი კომპონენტი:

```tsx
function App(): JSX.Element {
  const title: string = "Hello TypeScript!";
  const year: number = 2026;

  return (
    <div>
      <h1>{title}</h1>
      <p>წელი: {year}</p>
    </div>
  );
}

export default App;
```

**useState + ღილაკზე დაკლიკება — მაგალითები:**

```tsx
import { useState } from "react";

// მაღაზიის კალათა
function Cart(): JSX.Element {
  const [items, setItems] = useState(0);

  return (
    <div>
      <p>კალათაში: {items} ცალი</p>
      <button onClick={() => setItems(items + 1)}>დამატება</button>
      <button onClick={() => setItems(items - 1)}>წაშლა</button>
    </div>
  );
}
```

```tsx
// ლაიქების მთვლელი
function LikeButton(): JSX.Element {
  const [likes, setLikes] = useState(0);

  return (
    <button onClick={() => setLikes(likes + 1)}>
      ❤️ {likes}
    </button>
  );
}
```

---

## შეჯამება

- **TypeScript** = JavaScript + ტიპები
- ძირითადი ტიპები: `string`, `number`, `boolean`
- `any` — მოვერიდოთ, თუ შესაძლებელია
- ფუნქციებს ვუწერთ პარამეტრების და დაბრუნების ტიპს
- ითამაშეთ **Playground**-ში — დაყენება არ სჭირდება
- **Vite** ქმნის React + TS პროექტს 1 ბრძანებით
- `useState` — TypeScript თავად ხვდება ტიპს საწყისი მნიშვნელობიდან
- გამოიყენეთ ცხოვრებისეული მაგალითები: ფასდაკლება, კალათა, ლაიქები, რეიტინგი

# ლექცია 01: საკლასო სამუშაო

## მიზანი

TypeScript-ის გაცნობა Playground-ის საშუალებით, შემდეგ React + TypeScript პროექტის შექმნა Vite-ით.

---

## ნაწილი 1: ითამაშეთ Playground-ზე (15 წთ)

გახსენით [TypeScript Playground](https://www.typescriptlang.org/play/) ან [PlayCode.io](https://playcode.io/typescript).

### დავალება 1.1: ცვლადები — მომხმარებელი

```ts
let userName: string = "გიორგი";
let userAge: number = 20;
let isPremium: boolean = false;

console.log(`მომხმარებელი: ${userName}`);
console.log(`ასაკი: ${userAge}`);
console.log(`პრემიუმი: ${isPremium}`);
```

### დავალება 1.2: ფუნქციები — ცხოვრებისეული

```ts
// ნივთის ფასი ფასდაკლებით
function discountPrice(price: number, percent: number): number {
  return price - (price * percent) / 100;
}

// მომხმარებლის მისალმება
function greetUser(name: string): string {
  return `გამარჯობა, ${name}! კეთილი იყოს შენი დაბრუნება.`;
}

console.log(discountPrice(200, 10));
console.log(greetUser("ნინო"));
```

### დავალება 1.3: boolean ფუნქცია

```ts
function isAdult(age: number): boolean {
  return age >= 18;
}

console.log(isAdult(20));
console.log(isAdult(15));
```

### დავალება 1.4: გააერთიანეთ — შეცვალეთ მნიშვნელობები თქვენით

---

## ნაწილი 2: Vite + React + TS პროექტი (25 წთ)

### ნაბიჯი 1: შექმენით პროექტი

```bash
npx create-vite@latest my-first-ts-app --template react-ts
```

### ნაბიჯი 2: გახსენით პროექტი

```bash
cd my-first-ts-app
npm install
npm run dev
```

### ნაბიჯი 3: გახსენით `src/App.tsx`

შეცვალეთ მთელი კოდი:

```tsx
function App(): JSX.Element {
  const title: string = "My First TypeScript App";
  const description: string = "ეს არის React + TypeScript პროექტი!";
  const year: number = 2026;

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>{title}</h1>
      <p>{description}</p>
      <p>წელი: {year}</p>
    </div>
  );
}

export default App;
```

### ნაბიჯი 4: ლაიქების მთვლელი — ყველაფერი App.tsx-ში

```tsx
import { useState } from "react";

function App(): JSX.Element {
  const [likes, setLikes] = useState(0);

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>👍 ლაიქები: {likes}</h1>
      <button onClick={() => setLikes(likes + 1)}>მომწონს</button>
      <button onClick={() => setLikes(0)}>განულება</button>
    </div>
  );
}

export default App;
```

### ნაბიჯი 5: გააკეთეთ კალათის მთვლელი (იგივე App.tsx-ში)

```tsx
import { useState } from "react";

function App(): JSX.Element {
  const [items, setItems] = useState(0);

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>🛒 კალათა</h1>
      <p>ნივთები: {items}</p>
      <button onClick={() => setItems(items + 1)}>➕</button>
      <button onClick={() => items > 0 && setItems(items - 1)}>➖</button>
      <button onClick={() => setItems(0)}>🗑️</button>
    </div>
  );
}

export default App;
```

## შედეგი

ბრაუზერში უნდა ხედავდეთ ღილაკებს, რომლებიც ცვლიან count-ს.

## კითხვები

1. რა ტიპის არის ცვლადი `title`?
2. როგორ ხვდება TypeScript რა ტიპის არის `items` useState-ში?
3. რატომ გვჭირდება `items > 0 &&` წაშლის ღილაკზე?

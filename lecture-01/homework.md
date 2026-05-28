# ლექცია 01: საშინაო დავალება

## ნაწილი 1: ითამაშეთ Playground-ზე

გახსენით [TypeScript Playground](https://www.typescriptlang.org/play/) ან [PlayCode.io](https://playcode.io/typescript) და შეასრულეთ ქვემოთ მოცემული ამოცანები. Playground-ში არაფრის დაყენება არ გჭირდებათ!

### ამოცანა 1: ცვლადები

შექმენით ცვლადები:

- `studentName: string` — თქვენი სახელი
- `studentAge: number` — თქვენი ასაკი
- `isEnrolled: boolean` — true
- `subjects: string[]` — 3 საგნის სახელი

დაბეჭდეთ ყველა console.log-ით.

### ამოცანა 2: ფუნქცია

```ts
function calculateArea(width: number, height: number): number {
  return width * height;
}

console.log(calculateArea(10, 5));
```

შეცვალეთ ფუნქცია ისე, რომ დათვალოს მართკუთხედის პერიმეტრი.

### ამოცანა 3: ფუნქცია მასივით

```ts
function getFirstElement(arr: string[]): string {
  return arr[0];
}

console.log(getFirstElement(["a", "b", "c"]));
```

შეცვალეთ ისე, რომ დააბრუნოს ბოლო ელემენტი. შემდეგ ისე, რომ გავარდეს `number[]`-ზეც.
(მინიშნება: `<T>` — generics)

---

## ნაწილი 2: Vite + React + TypeScript

### ამოცანა 4: ახალი პროექტი + კომპონენტი

1. შექმენით Vite + React + TS პროექტი:
   ```bash
   npx create-vite@latest ts-homework-1 --template react-ts
   cd ts-homework-1
   npm install
   npm run dev
   ```

2. **src/App.tsx** — შექმენით მარტივი სავიზიტო ბარათი:

```tsx
function App(): JSX.Element {
  const fullName: string = "თქვენი სახელი";
  const title: string = "პროგრამისტი";
  const experience: number = 2;
  const skills: string[] = ["TypeScript", "React", "JavaScript"];

  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>{fullName}</h1>
      <h2 style={{ color: "gray" }}>{title}</h2>
      <p>გამოცდილება: {experience} წელი</p>
      <h3>უნარები</h3>
      <ul>
        {skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

3. შეცვალეთ `fullName` თქვენს სახელზე, `skills` დაამატეთ 2 ახალი უნარი.

### ამოცანა 5: Props კომპონენტი

შექმენით `src/Product.tsx`:

```tsx
interface ProductProps {
  name: string;
  price: number;
  inStock: boolean;
}

function Product({ name, price, inStock }: ProductProps): JSX.Element {
  return (
    <div style={{
      border: "1px solid #ddd",
      padding: "1rem",
      margin: "0.5rem",
      borderRadius: "8px"
    }}>
      <h3>{name}</h3>
      <p>ფასი: ${price}</p>
      <p style={{ color: inStock ? "green" : "red" }}>
        {inStock ? "ხელმისაწვდომია" : "არ არის მარაგში"}
      </p>
    </div>
  );
}

export default Product;
```

გამოიყენეთ App.tsx-ში 2-3 სხვადასხვა პროდუქტით.

---

## ნაწილი 3: Bonus (სურვილისამებრ)

### ამოცანა 6: Counter კომპონენტი

**src/Counter.tsx** — useState-ის გამოყენებით:

```tsx
import { useState } from "react";

function Counter(): JSX.Element {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

export default Counter;
```

---

## ჩაბარების პირობები

1. Playground-ის ამოცანების კოდი (ამოცანები 1-3)
2. Vite პროექტი GitHub-ზე (ან ZIP ფაილი) — App.tsx, Product.tsx, Counter.tsx (Bonus)
3. პროექტი გადის `npm run dev`-ს შეცდომების გარეშე

# ლექცია 01: საკლასო სამუშაო

## მიზანი

TypeScript-ის გაცნობა Playground-ის საშუალებით, შემდეგ React + TypeScript პროექტის შექმნა Vite-ით.

---

## ნაწილი 1: ითამაშეთ Playground-ზე (15 წთ)

გახსენით [TypeScript Playground](https://www.typescriptlang.org/play/) ან [PlayCode.io](https://playcode.io/typescript).

### დავალება 1.1: ცვლადები და ტიპები

```ts
let courseName: string = "TypeScript";
let students: number = 30;
let isActive: boolean = true;

console.log(`კურსი: ${courseName}`);
console.log(`სტუდენტები: ${students}`);
console.log(`აქტიური: ${isActive}`);
```

### დავალება 1.2: ფუნქციები

```ts
function multiply(a: number, b: number): number {
  return a * b;
}

function sayHello(name: string): string {
  return `Hello, ${name}!`;
}

console.log(multiply(5, 3));
console.log(sayHello("Nika"));
```

### დავალება 1.3: მასივები

```ts
let fruits: string[] = ["apple", "banana", "orange"];
let scores: number[] = [95, 87, 92];

console.log(fruits[0]);
console.log(`საშუალო: ${(scores[0] + scores[1] + scores[2]) / scores.length}`);
```

### დავალება 1.4: აიღეთ 3-ვე წინა მაგალითი, გააერთიანეთ — შეცვალეთ მნიშვნელობები თქვენით

---

## ნაწილი 2: Vite + React + TS პროექტი (25 წთ)

### ნაბიჯი 1: შექმენით პროექტი

```bash
npx create-vite@latest my-first-ts-app --template react-ts
```

აირჩიეთ React და TypeScript (თუ ინტერაქტიულ რეჟიმშია).

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
  const isWorking: boolean = true;

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>{title}</h1>
      <p>{description}</p>
      <p>წელი: {year}</p>
      <p>სტატუსი: {isWorking ? "მუშაობს 🚀" : "გათიშული"}</p>
    </div>
  );
}

export default App;
```

### ნაბიჯი 4: დაამატეთ კომპონენტი

შექმენით ფაილი `src/Greeting.tsx`:

```tsx
interface GreetingProps {
  name: string;
  age: number;
}

function Greeting({ name, age }: GreetingProps): JSX.Element {
  return (
    <div style={{ background: "#f0f0f0", padding: "1rem", borderRadius: "8px" }}>
      <h2>გამარჯობა, {name}!</h2>
      <p>შენ ხარ {age} წლის.</p>
    </div>
  );
}

export default Greeting;
```

### ნაბიჯი 5: გამოიყენეთ App-ში

`src/App.tsx`-ში:

```tsx
import Greeting from "./Greeting";

function App(): JSX.Element {
  const title: string = "My First TypeScript App";
  const year: number = 2026;

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>{title}</h1>
      <Greeting name="Nika" age={20} />
      <Greeting name="Ana" age={22} />
      <p>წელი: {year}</p>
    </div>
  );
}

export default App;
```

## შედეგი

ბრაუზერში უნდა ხედავდეთ:
```
My First TypeScript App
გამარჯობა, Nika! — შენ ხარ 20 წლის.
გამარჯობა, Ana! — შენ ხარ 22 წლის.
წელი: 2026
```

## კითხვები

1. რა ტიპის არის ცვლადი `title` App.tsx-ში?
2. რას აკეთებს `GreetingProps` ინტერფეისი?
3. რა მოხდება თუ `<Greeting name="Nika" />`-ში age-ს არ მივუთითებთ?

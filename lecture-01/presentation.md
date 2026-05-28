# ლექცია 01: TypeScript საფუძვლები + React Vite-ით

## სასწავლო მიზნები

- გავიგოთ რა არის TypeScript და რატომ გამოვიყენოთ
- ვცადოთ TypeScript ონლაინ Playground-ში
- გავეცნოთ ძირითად ტიპებს
- შევქმნათ React + TypeScript პროექტი Vite-ით
- დავწეროთ პირველი TypeScript კომპონენტი

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
| `string[]` | `let names: string[] = ["ა", "ბ"]` | სტრინგების მასივი |
| `number[]` | `let nums: number[] = [1, 2, 3]` | რიცხვების მასივი |

**ფუნქციები ტიპებით:**
```ts
function greet(name: string): string {
  return `გამარჯობა, ${name}!`;
}

function add(a: number, b: number): number {
  return a + b;
}
```

სცადეთ Playground-ში!

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

**კომპონენტი Props-ით:**

```tsx
interface UserInfoProps {
  name: string;
  age: number;
}

function UserInfo({ name, age }: UserInfoProps): JSX.Element {
  return (
    <div>
      <h2>{name}</h2>
      <p>ასაკი: {age}</p>
    </div>
  );
}
```

---

## შეჯამება

- **TypeScript** = JavaScript + ტიპები
- ტიპები გვეხმარება შეცდომების ადრეულ გამოვლენაში
- ითამაშეთ **Playground**-ში — დაყენება არ სჭირდება
- **Vite** ქმნის React + TypeScript პროექტს 1 ბრძანებით
- ტიპების მითითება React-ში უფრო უსაფრთხო კოდს ქმნის

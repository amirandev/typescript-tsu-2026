# ლექცია 01: საკლასო სამუშაო

## მიზანი

TypeScript-ის გაცნობა Playground-ის საშუალებით, შემდეგ პროექტის დაყენება და "Hello TypeScript" აპლიკაციის შექმნა.

## ნაბიჯები

### ნაბიჯი 0: TypeScript Playground-ის ტესტირება (სანამ დააინსტალირებთ)

გახსენით ერთ-ერთი ონლაინ ინსტრუმენტი:

- **TypeScript Playground:** [https://www.typescriptlang.org/play/](https://www.typescriptlang.org/play/)
- **PlayCode.io:** [https://playcode.io/typescript](https://playcode.io/typescript)

სცადეთ შემდეგი კოდი:

```ts
let username: string = "გიორგი";
let age: number = 25;
let isStudent: boolean = true;

console.log(`სახელი: ${username}, ასაკი: ${age}, სტუდენტი: ${isStudent}`);

function greet(name: string): string {
  return `გამარჯობა, ${name}!`;
}

console.log(greet(username));
```

დააკვირდით: Playground რეალურ დროში აჩვენებს JavaScript-ში კომპილირებულ კოდს!

---

### ნაბიჯი 1: პროექტის შექმნა

```bash
mkdir my-hello-ts
cd my-hello-ts
npm init -y
```

### ნაბიჯი 2: TypeScript-ის დაყენება

```bash
npm install typescript --save-dev
```

### ნაბიჯი 3: tsconfig.json-ის გენერაცია

```bash
npx tsc --init
```

### ნაბიჯი 4: tsconfig.json-ის კონფიგურაცია

გახსენით `tsconfig.json` და დააკონფიგურირეთ:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

### ნაბიჯი 5: src/index.ts ფაილის შექმნა

შექმენით `src` საქაღალდე. მასში შექმენით `index.ts`:

```ts
let greeting: string = "Hello TypeScript!";
console.log(greeting);

const year: number = 2026;
console.log(`TypeScript გაშვებულია წელს: ${year}`);

function welcome(name: string): string {
  return `Welcome, ${name}!`;
}

console.log(welcome("Student"));
```

### ნაბიჯი 6: npm scripts-ის დამატება

`package.json`-ში დაამატეთ:

```json
{
  "scripts": {
    "build": "npx tsc",
    "start": "node dist/index.js",
    "build:start": "npx tsc && node dist/index.js"
  }
}
```

### ნაბიჯი 7: კომპილაცია და გაშვება

```bash
npm run build
npm run start
```

### ნაბიჯი 8: (დამატებითი) Watch რეჟიმის ტესტირება

```bash
npm run dev
```

(წინასწარ დაამატეთ `"dev": "npx tsc -w"` package.json-ში)

## შედეგი

კონსოლში უნდა გამოჩნდეს:

```
Hello TypeScript!
TypeScript გაშვებულია წელს: 2026
Welcome, Student!
```

## კითხვები

1. რატომ გვჭირდება `rootDir` და `outDir`?
2. რას ნიშნავს `strict: true`?
3. რა განსხვავებაა `npx tsc`-სა და `npx tsc -w`-ს შორის?

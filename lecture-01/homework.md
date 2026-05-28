# ლექცია 01: საშინაო დავალება

## 🎮 Bonus: ითამაშეთ Playground-ზე

სანამ ლოკალურ პროექტს დააყენებთ, სცადეთ TypeScript ამ ონლაინ ინსტრუმენტებით:

1. [TypeScript Playground](https://www.typescriptlang.org/play/) — ოფიციალური
2. [PlayCode.io](https://playcode.io/typescript) — მარტივი ინტერფეისი

**სცადეთ:** დაწერეთ type annotation-ები Playground-ში და ნახეთ, როგორ კომპილირდება JavaScript-ში.

---

## ამოცანა 1: TypeScript პროექტის დაყენება

დააყენეთ TypeScript პროექტი შემდეგი პირობებით:

1. შექმენით საქაღალდე `ts-homework`
2. დააინსტალირეთ TypeScript როგორც dev dependency
3. შექმენით `tsconfig.json` შემდეგი კონფიგურაციით:
   - target: ES2020
   - module: ESNext
   - rootDir: ./src
   - outDir: ./js
   - strict: true
   - sourceMap: true

## ამოცანა 2: მრავალი ფაილი

შექმენით `src` საქაღალდეში სამი ფაილი:

**src/utils.ts**
```ts
export function formatDate(date: Date): string {
  return date.toLocaleDateString("ka-GE");
}

export function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
```

**src/math.ts**
```ts
export function add(a: number, b: number): number {
  return a + b;
}

export function multiply(a: number, b: number): number {
  return a * b;
}
```

**src/index.ts** — გამოიყენეთ ორივე მოდული:
```ts
import { formatDate, capitalize } from "./utils.js";
import { add, multiply } from "./math.js";

console.log(capitalize("typescript"));
console.log(`2 + 3 = ${add(2, 3)}`);
console.log(`4 * 5 = ${multiply(4, 5)}`);
console.log(`დღეს: ${formatDate(new Date())}`);
```

## ამოცანა 3: npm Scripts

დაამატეთ package.json-ში:

| სკრიპტი | ბრძანება |
|----------|----------|
| build | npx tsc |
| start | node js/index.js |
| dev | npx tsc -w |
| clean | Remove-Item -Recurse -Force js |

## ამოცანა 4: sourceMap-ის გამოყენება

sourceMap-ის წყალობით, ბრაუზერში debugging-ის დროს ნახავთ TypeScript კოდს, არა JavaScript-ს. შეამოწმეთ როგორ მუშაობს.

## ჩაბარების პირობები

1. პროექტი წარმატებით კომპილირდება (`npm run build`)
2. კოდი გამოიმუშავებს სწორ შედეგს (`npm run start`)
3. `js/` საქაღალდეში გენერირებულია `.js` და `.js.map` ფაილები
4. tsconfig.json-ში sourceMap უნდა იყოს true

# ლექცია 01: TypeScript-ის დაყენება და კონფიგურაცია

## სასწავლო მიზნები

- გავიგოთ რა არის TypeScript და რატომ გამოვიყენოთ
- დავაყენოთ TypeScript გარემო
- გავეცნოთ tsconfig.json კონფიგურაციას
- ავაწყოთ პირველი TypeScript პროექტი
- ვისწავლოთ კომპილაცია და watch რეჟიმი

---

## სლაიდი 1: რა არის TypeScript?

**TypeScript** არის JavaScript-ის სუპერსეტი — ენა, რომელიც აფართოებს JavaScript-ს **სტატიკური ტიპების** მხარდაჭერით.

```
JavaScript  +  ტიპები  =  TypeScript
```

**რატომ არის საჭირო TypeScript?**

წარმოიდგინეთ, წერთ JavaScript კოდს და ხშირად ხვდებით შეცდომებს, რომლებიც მხოლოდ გაშვებისას ვლინდება. TypeScript ამ პრობლემას წყვეტს — ის შეცდომებს პოულობს **კოდის აწყობისას (compile-time)**, სანამ კოდი მომხმარებლამდე მივა.

**მთავარი უპირატესობები:**
- 🛡 **შეცდომების გამოვლენა** — ტიპების შემოწმება ხდება კომპილაციის დროს
- 💡 **უკეთესი IDE მხარდაჭერა** — ავტოშევსება, რეფაქტორინგი, IntelliSense
- 📖 **თვითდოკუმენტირება** — კოდის კითხვისას ტიპები გვეუბნება რას ელოდება ფუნქცია
- 🔒 **უფრო უსაფრთხო კოდი** — ნაკლები bug-ები, უფრო პროგნოზირებადი ქცევა

**TypeScript ≠ ახალი ენა!**
TypeScript კოდი კომპილირდება ჩვეულებრივ JavaScript-ში, რომელიც მუშაობს ნებისმიერ ბრაუზერსა და Node.js-ზე.

---

## სლაიდი 2: სცადე TypeScript ბრაუზერშივე — Playground

TypeScript-ის გასინჯვა არაფრის დაყენებას არ საჭიროებს! არსებობს ონლაინ ინსტრუმენტები:

### 🎮 TypeScript Playground (ოფიციალური)
[https://www.typescriptlang.org/play/](https://www.typescriptlang.org/play/)

- მაიკროსოფტის ოფიციალური ინსტრუმენტი
- რეალურ დროში აჩვენებს კომპილირებულ JavaScript-ს
- შეგიძლიათ სხვადასხვა tsconfig ოფციების ტესტირება
- გააზიარეთ კოდი ლინკით

### 🎮 PlayCode.io TypeScript
[https://playcode.io/typescript](https://playcode.io/typescript)

- მარტივი და სწრაფი ინტერფეისი
- ავტომატურად ასრულებს კოდს
- console.log-ის შედეგები მაშინვე ჩანს
- იდეალურია დამწყებებისთვის

**დავალება:** გახსენით ერთ-ერთი Playground და სცადეთ:
```ts
let message: string = "Hello TypeScript!";
console.log(message);
```

---

## სლაიდი 3: Node.js და npm-ის ინსტალაცია

**Node.js** — JavaScript-ის runtime გარემო, რომელიც საშუალებას გვაძლევს გავუშვათ JavaScript სერვერის გარეშე.
**npm (Node Package Manager)** — პაკეტების მენეჯერი, რომელსაც ვიყენებთ TypeScript-ის დასაყენებლად.

**ინსტალაცია:**

1. **გადადით** [https://nodejs.org](https://nodejs.org)
2. **ჩამოტვირთეთ** LTS ვერსია (რეკომენდებული)
3. **გაუშვით** ინსტალატორი — ის ავტომატურად დააყენებს `node`-საც და `npm`-საც
4. **ვერიფიკაცია** ტერმინალში:

```bash
node --version   # მაგ: v20.11.0
npm --version    # მაგ: 10.2.4
```

**Windows-ზე** შეგიძლიათ გამოიყენოთ `winget`:
```bash
winget install OpenJS.NodeJS.LTS
```

**macOS-ზე** Homebrew-ით:
```bash
brew install node
```

**Linux-ზე (Ubuntu/Debian):**
```bash
sudo apt update && sudo apt install nodejs npm
```

> **შენიშვნა:** ინსტალაციის შემდეგ გადატვირთეთ ტერმინალი.

---

## სლაიდი 4: TypeScript-ის ინსტალაცია

**წინაპირობა:** Node.js უნდა იყოს დაყენებული (წინა სლაიდი).

```bash
# Node.js ვერსიის შემოწმება
node --version
npm --version

# ახალი პროექტის შექმნა
mkdir my-ts-project
cd my-ts-project

# npm ინიციალიზაცია
npm init -y

# TypeScript-ის ინსტალაცია
npm install typescript --save-dev
```

---

## სლაიდი 5: tsconfig.json - კონფიგურაცია

```bash
# tsconfig.json-ის გენერაცია
npx tsc --init
```

**მთავარი ოფციები tsconfig.json-ში:**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

---

## სლაიდი 6: პროექტის სტრუქტურა

```
my-ts-project/
├── src/              # წყაროს კოდი (.ts ფაილები)
│   └── index.ts
├── dist/             # კომპილირებული კოდი (.js ფაილები)
│   └── index.js
├── node_modules/
├── package.json
└── tsconfig.json
```

`src/` — ვწერთ TypeScript კოდს
`dist/` — ავტომატურად გენერირებული JavaScript კოდი

---

## სლაიდი 7: პირველი TypeScript კოდი

**src/index.ts**

```ts
let message: string = "Hello TypeScript!";
console.log(message);

function greet(name: string): string {
  return `გამარჯობა, ${name}!`;
}

console.log(greet("ნინო"));
```

**კომპილაცია:**

```bash
# კომპილაცია
npx tsc

# გაშვება
node dist/index.js
```

---

## სლაიდი 8: HTML-თან ინტეგრაცია

```html
<!DOCTYPE html>
<html lang="ka">
<head>
  <meta charset="UTF-8" />
  <title>TypeScript App</title>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="dist/index.js"></script>
</body>
</html>
```

**tsconfig.json-ში:** დააკონფიგურირეთ `"module": "ESNext"` რომ `type="module"` იმუშაოს.

---

## სლაიდი 9: Watch რეჟიმი

ავტომატური კომპილაცია ფაილების ცვლილებისას:

```bash
npx tsc -w
```

Watch რეჟიმი გამუდმებით თვალყურს ადევნებს `.ts` ფაილებს და ცვლილებისთანავე ახდენს კომპილაციას.

---

## სლაიდი 10: npm Scripts

**package.json-ში სკრიპტების დამატება:**

```json
{
  "scripts": {
    "build": "npx tsc",
    "start": "node dist/index.js",
    "dev": "npx tsc -w",
    "build:start": "npx tsc && node dist/index.js"
  }
}
```

**გამოყენება:**

```bash
npm run build
npm run start
npm run dev
```

---

## სლაიდი 11: strict რეჟიმი

`strict: true` ჩართავს ყველა მკაცრი ტიპების შემოწმების ოფციას:

| ოფცია | აღწერა |
|--------|---------|
| `strictNullChecks` | null/undefined-ის მკაცრი შემოწმება |
| `noImplicitAny` | იმპლიციტური any-ს აკრძალვა |
| `strictFunctionTypes` | ფუნქციების ტიპების მკაცრი შემოწმება |
| `strictBindCallApply` | bind/call/apply-ს მკაცრი შემოწმება |

**რეკომენდაცია:** ყოველთვის გამოიყენეთ `strict: true`.

---

## სლაიდი 12: exclude / include

```json
{
  "exclude": ["node_modules", "dist", "**/*.test.ts"],
  "include": ["src/**/*.ts"]
}
```

- **include** — რომელი ფაილები ჩავრთოთ კომპილაციაში
- **exclude** — რომელი ფაილები გამოვრიცხოთ

---

## შეჯამება

- TypeScript არის JavaScript-ის სუპერსეტი ტიპებით
- ინსტალაცია: `npm install typescript`
- კონფიგურაცია: `npx tsc --init` → `tsconfig.json`
- კოდს ვწერთ `src/`-ში, კომპილირებული კოდი იდება `dist/`-ში
- კომპილაცია: `npx tsc`, watch: `npx tsc -w`
- npm scripts ამარტივებს მუშაობის პროცესს



https://docs.google.com/presentation/d/1ZJQOsNmdWgcx1y0jwUhHZa1X8tiQ8k1bJMaeJK-uXPQ/edit?usp=sharing
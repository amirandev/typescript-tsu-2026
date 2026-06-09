# ლექცია 06 — ციკლები, Iteration, ფუნქციების საფუძვლები

## სასწავლო მიზნები

- for ციკლის გამოყენება TypeScript-ში
- for-of და for-in ციკლების გაგება
- while ციკლი და მისი ვარიაციები
- map, forEach მეთოდები
- ფუნქციების შექმნა: named, anonymous, arrow

---

## 1. for ციკლი

`for` ციკლი გამოიყენება კოდის ბლოკის განმეორებითი შესრულებისთვის.

```ts
for (let i: number = 0; i < 5; i++) {
  console.log(`iteracja ${i}`);
}
```

**სტრუქტურა:** `for (initialization; condition; increment)`

---

## 2. TypeScript-ის როლი for ციკლში

ციკლის ცვლადს შეგვიძლია მივანიჭოთ ტიპი:

```ts
const names: string[] = ["გიორგი", "ნინო", "თამარი"];

for (let i: number = 0; i < names.length; i++) {
  console.log(names[i].toUpperCase());
}
```

---

## 3. for-of ციკლი

`for-of` გამოიყენება მასივების ელემენტებზე პირდაპირი წვდომისთვის.

```ts
const scores: number[] = [85, 92, 78, 94];

for (const score of scores) {
  console.log(`ქულა: ${score}`);
}
```

---

## 4. for-in ციკლი

`for-in` გამოიყენება ობიექტების გასაღებებზე საიტერაციოდ.

```ts
const user = { name: "გიორგი", age: 25, city: "თბილისი" };

for (const key in user) {
  console.log(`${key}: ${user[key as keyof typeof user]}`);
}
```

> **გაფრთხილება:** for-in მასივებთან სიფრთხილით გამოიყენეთ.

---

## 5. while ციკლი

`while` ციკლი სრულდება მანამ, სანამ პირობა ჭეშმარიტია.

```ts
let count: number = 0;

while (count < 3) {
  console.log(`count: ${count}`);
  count++;
}
```

---

## 6. do-while ციკლი

`do-while` ციკლი ერთხელ მაინც შესრულდება.

```ts
let input: string = "";
do {
  console.log("მცდელობა...");
} while (input !== "გასვლა");
```

---

## 7. Array.map() მეთოდი

`map()` ქმნის ახალ მასივს თითოეულ ელემენტზე ფუნქციის გამოყენებით.

```ts
const numbers: number[] = [1, 2, 3, 4];
const doubled: number[] = numbers.map((n) => n * 2);
console.log(doubled); // [2, 4, 6, 8]
```

---

## 8. Array.forEach() მეთოდი

`forEach()` ასრულებს ფუნქციას თითოეული ელემენტისთვის.

```ts
const fruits: string[] = ["ვაშლი", "მსხალი", "ბანანი"];

fruits.forEach((fruit, index) => {
  console.log(`${index + 1}. ${fruit}`);
});
```

---

## 9. map vs forEach

| map | forEach |
|-----|---------|
| აბრუნებს ახალ მასივს | არ აბრუნებს მასივს (`undefined`) |
| ჯაჭვური ოპერაციებისთვის ვარგისი | გვერდითი ეფექტებისთვის ვარგისი |
| იმიუტაბელური მიდგომა | მიუტაბელური შეიძლება იყოს |

```ts
// map - ტრანსფორმაცია
const squares = [1, 2, 3].map((x) => x * x);

// forEach - გვერდითი ეფექტი
[1, 2, 3].forEach((x) => console.log(x));
```

---

## 10. Named ფუნქციები

ფუნქცია სახელით, რომელიც შეიძლება გამოვიძახოთ სადმე სხვაგან.

```ts
function greet(name: string): string {
  return `გამარჯობა, ${name}!`;
}

console.log(greet("ნინო"));
```

---

## 11. Anonymous ფუნქციები

ფუნქცია სახელის გარეშე, ხშირად გამოიყენება კოლბექად.

```ts
const greet = function (name: string): string {
  return `გამარჯობა, ${name}!`;
};

console.log(greet("გიორგი"));
```

---

## 12. Arrow ფუნქციები

Arrow ფუნქციები — მოკლე სინტაქსი ფუნქციებისთვის.

```ts
const greet = (name: string): string => `გამარჯობა, ${name}!`;

const add = (a: number, b: number): number => a + b;

const logMessage = (msg: string): void => console.log(msg);
```

---

## 13. Arrow vs Regular ფუნქციები

```ts
// Regular ფუნქცია
function regular(a: number): number {
  return a * 2;
}

// Arrow ფუნქცია
const arrow = (a: number): number => a * 2;

// this კონტექსტი
const obj = {
  name: "ობიექტი",
  regular: function () { console.log(this.name); },
  arrow: () => console.log(this.name) // this არ ეკუთვნის ობიექტს
};
```

Arrow ფუნქციებს არ აქვთ საკუთარი `this` კონტექსტი.

---

## 14. ფუნქციების ტიპები

```ts
// ფუნქციის ტიპის განსაზღვრა
type MathOperation = (a: number, b: number) => number;

const multiply: MathOperation = (x, y) => x * y;
const divide: MathOperation = (x, y) => x / y;

console.log(multiply(4, 5)); // 20
```

---

## 15. Callback ფუნქციები

```ts
function processArray(
  arr: number[],
  callback: (item: number) => void
): void {
  for (const item of arr) {
    callback(item);
  }
}

processArray([1, 2, 3], (n) => console.log(n * 2));
```

---

## 16. ჩადგმული ციკლები

```ts
const matrix: number[][] = [
  [1, 2],
  [3, 4],
  [5, 6],
];

for (const row of matrix) {
  for (const cell of row) {
    console.log(cell);
  }
}
```

---

## Summary

- `for` — კლასიკური ციკლი counter-ით
- `for-of` — მასივის ელემენტებზე გადავლა
- `for-in` — ობიექტის გასაღებებზე გადავლა
- `while` / `do-while` — პირობითი ციკლები
- `map()` — ტრანსფორმაცია, აბრუნებს ახალ მასივს
- `forEach()` — გვერდითი ეფექტები, არ აბრუნებს არაფერს
- Named, anonymous, arrow ფუნქციები
- Arrow ფუნქციებს არ აქვთ საკუთარი `this`

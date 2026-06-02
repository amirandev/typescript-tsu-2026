# ლექცია 03: Arrays — სიღრმისეულად

## სასწავლო მიზნები

- გავიმეოროთ მასივების ტიპიზაციის ხერხები
- ვისწავლოთ მასივების მეთოდები (map, filter, reduce, find)
- განვიხილოთ spread/rest ოპერატორები მასივებთან
- ვიმუშაოთ მრავალგანზომილებიან მასივებთან
- გავეცნოთ Tuple-ებს სიღრმისეულად

---

## სლაიდი 1: მასივის ტიპიზაცია

```ts
// ძირითადი სინტაქსი
let nums: number[] = [1, 2, 3];
let names: Array<string> = ["ნინო", "გიორგი"];

// მრავალი ტიპი
let mixed: (string | number)[] = ["Hello", 42];

// ცარიელი მასივის ინიციალიზაცია
let data: number[] = [];
// data.push("str"); // ❌

let anything: any[] = [1, "str", true]; // თავიდან ავიცილოთ
```

---

## სლაიდი 2: მასივის მეთოდები — map / filter

```ts
const nums = [1, 2, 3, 4, 5];

// map — გარდაქმნა
const doubled = nums.map(n => n * 2);       // [2, 4, 6, 8, 10]
const strings = nums.map(n => `რიცხვი: ${n}`);

// filter — გაფილტვრა
const evens = nums.filter(n => n % 2 === 0); // [2, 4]
const big   = nums.filter(n => n > 3);        // [4, 5]
```

---

## სლაიდი 3: მასივის მეთოდები — reduce / find

```ts
const nums = [10, 20, 30, 40, 50];

// reduce — აგრეგაცია
const sum = nums.reduce((acc, n) => acc + n, 0);   // 150
const avg = nums.reduce((a, n, _, arr) => a + n / arr.length, 0);

// find — პირველი დასაბმალი
const found = nums.find(n => n > 25);   // 30

// findIndex
const idx = nums.findIndex(n => n > 25);  // 2
```

---

## სლაიდი 4: მასივის მეთოდები — some / every / includes

```ts
const nums = [1, 2, 3, 4, 5];

// some — თუ ერთი მაინც აკმაყოფილებს პირობას
const hasEven = nums.some(n => n % 2 === 0);   // true

// every — თუ ყველა აკმაყოფილებს
const allPositive = nums.every(n => n > 0);     // true

// includes — არსებობს თუ არა ელემენტი
const hasThree = nums.includes(3);               // true
```

---

## სლაიდი 5: Spread ოპერატორი მასივებთან

```ts
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// გაერთიანება
const merged = [...arr1, ...arr2];  // [1, 2, 3, 4, 5, 6]

// კოპირება
const copy = [...arr1];

// max/min
const max = Math.max(...arr1);  // 3

// ელემენტის ჩამატება შუაში
const updated = [...arr1.slice(0, 2), 99, ...arr1.slice(2)];
```

---

## სლაიდი 6: Rest პარამეტრები

```ts
// Rest პარამეტრები ფუნქციაში
function sumAll(...nums: number[]): number {
  return nums.reduce((a, b) => a + b, 0);
}

sumAll(1, 2, 3);        // 6
sumAll(10, 20, 30, 40); // 100

// დესტრუქტურიზაცია rest-თან
const [first, second, ...rest] = [1, 2, 3, 4, 5];
// first = 1, second = 2, rest = [3, 4, 5]
```

---

## სლაიდი 7: მრავალგანზომილებიანი მასივები

```ts
// 2D მასივი (მატრიცა)
let matrix: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

// ელემენტთან წვდომა
console.log(matrix[0][1]); // 2

// 3D მასივი
let cube: number[][][] = [[[1]]];

// გადავლა
for (const row of matrix) {
  for (const cell of row) {
    console.log(cell);
  }
}

// flatMap
const flat = matrix.flatMap(row => row.map(n => n * 2));
```

---

## სლაიდი 8: Tuples — სიღრმისეულად

```ts
// ძირითადი Tuple
let person: [string, number] = ["ნინო", 30];

// Labeled Tuples (TS 4.0+)
let point: [x: number, y: number, z?: number] = [10, 20];

// Tuple spread
type NumRange = [from: number, to: number];
type NumRangeWithStep = [...NumRange, step: number];

const range: NumRangeWithStep = [1, 10, 2];

// Tuple-ების მასივი
const pairs: [string, number][] = [
  ["a", 1],
  ["b", 2],
];
```

---

## სლაიდი 9: ReadonlyArray & Tuple

```ts
// Readonly მასივი
let colors: readonly string[] = ["წითელი", "მწვანე"];
// colors.push("ლურჯი"); // ❌

// Readonly Tuple
let point: readonly [number, number] = [10, 20];
// point[0] = 5; // ❌

// const assertion
const rgb = [255, 0, 0] as const;
// rgb[0] = 128; // ❌ — readonly

// as const Tuple-ად აქცევს
type RGB = typeof rgb; // readonly [255, 0, 0]
```

---

## შეჯამება

| მეთოდი / კონსტრუქცია | აღწერა |
|----------------------|--------|
| `map` | გარდაქმნის თითოეულ ელემენტს |
| `filter` | ტოვებს მხოლოდ პირობის დამაკმაყოფილებელს |
| `reduce` | აგრეგირებს მასივს ერთ მნიშვნელობად |
| `find` / `findIndex` | პოულობს პირველ ელემენტს/ინდექსს |
| `some` / `every` | ამოწმებს პირობებს |
| `includes` | ამოწმებს არსებობას |
| `[...spread]` | აერთიანებს/აკოპირებს მასივებს |
| `...rest` | აგროვებს დარჩენილ ელემენტებს |
| `matrix: number[][]` | 2D მასივი |
| `[string, number]` | Tuple |
| `readonly` | წაკითხვადი მასივი/Tuple |

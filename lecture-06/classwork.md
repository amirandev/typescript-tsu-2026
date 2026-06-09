# საკლასო დავალება — ლექცია 06

## დავალება 1: მასივებზე გადავლა ტიპებით

მოცემულია მასივები:

```ts
const students: string[] = ["გიორგი", "ნინო", "თამარი", "დავითი", "ანა"];
const grades: number[] = [85, 92, 78, 94, 88];
```

1. `for` ციკლის გამოყენებით გამოიტანეთ თითოეული სტუდენტის სახელი და ქულა.
2. `for-of` ციკლით გამოიტანეთ მხოლოდ ის სტუდენტები, რომელთა ქულაც 90-ზე მეტია.
3. `forEach`-ით გამოიტანეთ ყველა სტუდენტის ინფორმაცია.

## დავალება 2: Arrow ფუნქციები

შექმენით arrow ფუნქციები:

1. `calculateAverage` — იღებს `number[]` და აბრუნებს საშუალო მნიშვნელობას.
2. `filterPassing` — იღებს `number[]` და ზღვარს (`number`), აბრუნებს მხოლოდ იმ ელემენტებს, რომლებიც ზღვარს აჭარბებენ.
3. `toGrade` — იღებს `number`-ს (ქულას) და აბრუნებს `string`-ს (`"A"`, `"B"`, `"C"` და ა.შ.).

```ts
const calculateAverage = (scores: number[]): number => {
  // TODO
};

const filterPassing = (scores: number[], threshold: number): number[] => {
  // TODO
};

const toGrade = (score: number): string => {
  // TODO
};
```

## დავალება 3: map და forEach

```ts
const numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
```

1. `map`-ის გამოყენებით შექმენით ახალი მასივი, სადაც თითოეული რიცხვი გამრავლებულია 3-ზე.
2. `map`-ის გამოყენებით გადააქციეთ რიცხვები სტრიქონებად: `"რიცხვი: X"`.
3. `forEach`-ით გამოიტანეთ მხოლოდ ლუწი რიცხვები.

## დავალება 4: Callback ფუნქცია

შექმენით ფუნქცია `processStrings`, რომელიც იღებს `string[]`-ს და callback-ს. Callback-მა უნდა გადააკეთოს თითოეული სტრიქონი (მაგ. toUpperCase-ში).

```ts
function processStrings(
  arr: string[],
  callback: (item: string) => void
): void {
  // TODO
}
```

## დავალება 5: while ციკლი

```ts
const target: number = 50;
```

დაწერეთ while ციკლი, რომელიც აგროვებს 1-დან რიცხვებს, სანამ ჯამი არ გადააჭარბებს `target`-ს. გამოიტანეთ რამდენი იტერაცია დასჭირდა.

# ლექცია 03: საკლასო სამუშაო

## მიზანი

მასივების, Tuple-ების, Enums-ისა და Object-ების პრაქტიკა.

## ამოცანა 1: Arrays

```ts
// 1.1. რიცხვების მასივი
let scores: number[] = [88, 92, 75, 100, 63];

// 1.2. სტრიქონების მასივი
let cities: string[] = ["თბილისი", "ბათუმი", "ქუთაისი"];

// 1.3. დაბეჭდეთ:
// - პირველი ელემენტი
// - ბოლო ელემენტი
// - ახალი ელემენტის დამატება (push)
// - გაფილტვრა (filter) — 90-ზე მეტი ქულები
```

## ამოცანა 2: Tuples

```ts
// 2.1. Tuple: ქალაქი, მოსახლეობა
let cityInfo: [string, number] = ["თბილისი", 1100000];

// 2.2. Tuple: პროდუქტის სახელი, ფასი, რაოდენობა
let product: [string, number, number] = ["წიგნი", 25.99, 10];

// 2.3. Destructure:
const [item, price, quantity] = product;
console.log(`${item} — ${price}₾ x ${quantity}`);
```

## ამოცანა 3: Enums (Days / Status)

```ts
// 3.1. Numeric Enum — კვირის დღეები
enum WeekDay {
  Monday = 1,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

// 3.2. String Enum — შეკვეთის სტატუსები
enum OrderStatus {
  Pending = "მოლოდინში",
  Processing = "დამუშავების პროცესში",
  Shipped = "გაგზავნილი",
  Delivered = "მიწოდებული",
  Cancelled = "გაუქმებული",
}

// 3.3. გამოიყენეთ Enum:
let today: WeekDay = WeekDay.Tuesday;
let order: OrderStatus = OrderStatus.Shipped;

console.log(`დღე: ${today}`);        // 2
console.log(`შეკვეთა: ${order}`);    // "გაგზავნილი"
```

## ამოცანა 4: Object Types

```ts
// 4.1. Car ობიექტი
let car: {
  brand: string;
  model: string;
  year: number;
  isElectric?: boolean;
} = {
  brand: "Tesla",
  model: "Model 3",
  year: 2025,
  isElectric: true,
};

// 4.2. Book ობიექტი
let book: {
  title: string;
  author: string;
  pages: number;
  genres: string[];
} = {
  title: "TypeScript Handbook",
  author: "ნინო მჭედლიძე",
  pages: 350,
  genres: ["პროგრამირება", "ტექნოლოგია"],
};
```

## კითხვები

1. რა განსხვავებაა `number[]`-სა და `[number, number]`-ს შორის?
2. როდის გამოვიყენოთ Enum (რიცხვითი) და როდის — string Enum?
3. რას ნიშნავს `?` object type-ში?

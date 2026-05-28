# ლექცია 01: საშინაო დავალება

## ნაწილი 1: ითამაშეთ Playground-ზე

გახსენით [TypeScript Playground](https://www.typescriptlang.org/play/) ან [PlayCode.io](https://playcode.io/typescript) და შეასრულეთ ქვემოთ მოცემული ამოცანები. Playground-ში არაფრის დაყენება არ გჭირდებათ!

### ამოცანა 1: მომხმარებლის პროფილი

შექმენით ცვლადები:

- `username: string` — თქვენი სახელი
- `balance: number` — 100
- `isActive: boolean` — true
- `city: string` — თქვენი ქალაქი

დაბეჭდეთ ყველა console.log-ით.

### ამოცანა 2: ფასდაკლების კალკულატორი

```ts
function discountPrice(price: number, percent: number): number {
  return price - (price * percent) / 100;
}

console.log(discountPrice(300, 15));
```

შეცვალეთ ფუნქცია ისე, რომ დაამატოთ გადასახადიც (tax, მაგ: 0.18).

### ამოცანა 3: ამინდის შეტყობინება

```ts
function weatherMessage(temp: number, isRaining: boolean): void {
  console.log(`ტემპერატურა: ${temp}°C`);
  if (isRaining) {
    console.log("წაიღეთ ქოლგა ☂️");
  } else {
    console.log("ამინდი კარგია 🌤️");
  }
}

weatherMessage(25, false);
```

შეცვალეთ ისე, რომ temp < 0-ზე დაწეროს "ცივა 🥶".

---

## ნაწილი 2: Vite + React + TypeScript

### ამოცანა 4: ახალი პროექტი

1. შექმენით Vite + React + TS პროექტი:
   ```bash
   npx create-vite@latest ts-homework-1 --template react-ts
   cd ts-homework-1
   npm install
   npm run dev
   ```

2. **src/App.tsx** — პროდუქტის ბარათი:

```tsx
function App(): JSX.Element {
  const productName: string = "ყავა";
  const price: number = 15;
  const isAvailable: boolean = true;

  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>{productName}</h1>
      <p>ფასი: {price} ლარი</p>
      <p>{isAvailable ? "✅ ხელმისაწვდომია" : "❌ არ არის"}</p>
    </div>
  );
}

export default App;
```

3. შეცვალეთ `productName`, `price`, `isAvailable` თქვენი პროდუქტით.

### ამოცანა 5: Rating — ყველაფერი App.tsx-ში

```tsx
import { useState } from "react";

function App(): JSX.Element {
  const [stars, setStars] = useState(0);
  const productName: string = "ყავა";
  const price: number = 15;

  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>{productName}</h1>
      <p>ფასი: {price} ლარი</p>
      <h2>რეიტინგი: {"⭐".repeat(stars)}</h2>
      <p>{stars} / 5</p>
      <button onClick={() => stars < 5 && setStars(stars + 1)}>➕</button>
      <button onClick={() => stars > 0 && setStars(stars - 1)}>➖</button>
      <button onClick={() => setStars(0)}>განულება</button>
    </div>
  );
}

export default App;
```

---

## ნაწილი 3: Bonus (სურვილისამებრ)

### ამოცანა 6: წყლის ტემპერატურა (App.tsx-ში)

```tsx
import { useState } from "react";

function App(): JSX.Element {
  const [temp, setTemp] = useState(20);

  function waterState(t: number): string {
    if (t <= 0) return "ყინული 🧊";
    if (t >= 100) return "ორთქლი ♨️";
    return "წყალი 💧";
  }

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h2>🌡️ ტემპერატურა: {temp}°C</h2>
      <p>მდგომარეობა: {waterState(temp)}</p>
      <button onClick={() => setTemp(temp + 10)}>გაცხელება</button>
      <button onClick={() => setTemp(temp - 10)}>გაგრილება</button>
      <button onClick={() => setTemp(0)}>გაყინვა</button>
    </div>
  );
}

export default App;
```

---

## ჩაბარების პირობები

1. Playground-ის ამოცანების კოდი (ამოცანები 1-3)
2. Vite პროექტი — მხოლოდ App.tsx (დანარჩენი ფაილები არ შეეხოთ)
3. პროექტი გადის `npm run dev`-ს შეცდომების გარეშე

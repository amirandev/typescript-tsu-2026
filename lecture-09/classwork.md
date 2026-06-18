# საკლასო დავალება — ლექცია 09

## დავალება 1: Type-Safe Element Manipulation

```ts
// HTML: <div id="app">
//   <input id="email" type="email" />
//   <input id="age" type="number" />
//   <button id="submit">გაგზავნა</button>
// </div>
```

```ts
// 1.1. მოიპოვეთ ელემენტები as-ს გამოყენებით
const emailInput = document.querySelector("#email") as HTMLInputElement;
const ageInput: HTMLInputElement = document.querySelector("#age") as HTMLInputElement;
const submitBtn = document.querySelector("#submit") as HTMLButtonElement;

// 1.2. type assertion-ით წამოიღეთ მნიშვნელობები
const email: string = emailInput.value;
const age: number = Number(ageInput.value);

// 1.3. ჩაწერეთ ageInput-ში newValue
ageInput.value = "25";

// 1.4. submitBtn-ზე დაამატეთ click event
submitBtn.addEventListener("click", () => {
  console.log(`იმეილი: ${email}, ასაკი: ${age}`);
});
```

## დავალება 2: Type Narrowing

```ts
type InputValue = string | number | boolean | null;

function formatValue(value: InputValue): string {
  // typeof-ის გამოყენებით დააბრუნეთ:
  // string: "ტექსტი: [value]"
  // number: "რიცხვი: [value]"
  // boolean: "ლოგიკური: [value]"
  // null: "მნიშვნელობა არ არის"
  // TODO
}
```

## დავალება 3: instanceof

```ts
class AdminUser {
  constructor(
    public name: string,
    public permissions: string[]
  ) {}
}

class RegularUser {
  constructor(
    public name: string,
    public department: string
  ) {}
}

type UserType = AdminUser | RegularUser;

// 3.1. შექმენით custom type guard: isAdmin
function isAdmin(user: UserType): user is AdminUser {
  return user instanceof AdminUser;
}

// 3.2. ფუნქცია, რომელიც ამუშავებს ორივე ტიპს
function handleUser(user: UserType): void {
  // TODO: გამოიყენეთ isAdmin
}
```

## დავალება 4: Discriminated Union

```ts
type Result<T> =
  | { status: "success"; data: T }
  | { status: "error"; message: string }
  | { status: "loading" };

function handleResult<T>(result: Result<T>): string {
  // switch status-ის მიხედვით
  // success: "მონაცემები: [data]"
  // error: "შეცდომა: [message]"
  // loading: "იტვირთება..."
  // TODO
}
```

## დავალება 5: Custom Type Guard

```ts
interface Book {
  title: string;
  author: string;
  pages: number;
}

interface Movie {
  title: string;
  director: string;
  duration: number;
}

type Media = Book | Movie;

// 5.1. isBook type guard
function isBook(media: Media): media is Book {
  return "author" in media;
}

// 5.2. isMovie type guard
function isMovie(media: Media): media is Movie {
  return "director" in media;
}

// 5.3. describeMedia ფუნქცია
function describeMedia(media: Media): string {
  // TODO: isBook/isMovie გამოყენებით
  // Book: "წიგნი: [title], ავტორი: [author]"
  // Movie: "ფილმი: [title], რეჟისორი: [director]"
}
```

## დავალება 6: as const

```ts
// 6.1. განსაზღვრეთ statuses as const
const Statuses = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  PENDING: "pending",
} as const;

// 6.2. გამოიყენეთ Statuses-ის მნიშვნელობები
function setStatus(status: "active" | "inactive" | "pending"): void {
  console.log(`სტატუსი შეიცვალა: ${status}`);
}

setStatus(Statuses.ACTIVE); // OK
```

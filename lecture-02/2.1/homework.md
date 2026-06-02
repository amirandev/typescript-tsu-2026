# ლექცია 02: საშინაო დავალება

## ამოცანა 1: Type Annotations

გამოაცხადეთ შემდეგი ცვლადები ცხადი ტიპის ანოტაციებით:

1. `fullName` — string, მნიშვნელობა "გიორგი მაისურაძე"
2. `yearOfBirth` — number, 1998
3. `isEmployed` — boolean, true
4. `skills` — string[] (სტრიქონების მასივი), ["TypeScript", "React", "Node.js"]
5. `salary` — number | null, null

## ამოცანა 2: ფუნქციები ტიპებით

```ts
// 2.1. ფუნქცია, რომელიც იღებს ორ number-ს და აბრუნებს number-ს
function addNumbers(a: number, b: number): number {
  return a + b;
}

// 2.2. ფუნქცია, რომელიც იღებს string-ს და აბრუნებს void
function printMessage(msg: string): void {
  console.log(msg);
}

// 2.3. ფუნქცია, რომელიც იღებს string | string[]-ს
function printNames(names: string | string[]): void {
  if (Array.isArray(names)) {
    names.forEach(n => console.log(n));
  } else {
    console.log(names);
  }
}
```

შეამოწმეთ ყველა ფუნქცია სხვადასხვა არგუმენტებით.

## ამოცანა 3: Student Information System

შექმენით მარტივი სტუდენტის საინფორმაციო სისტემა:

```ts
// გამოაცხადეთ ცვლადები:
let studentName: string = "მარიამ ჭელიძე";
let studentAge: number = 21;
let studentGrades: number[] = [85, 92, 78, 95, 88];
let studentAddress: string | null = "რუსთაველი 12";
let isEnrolled: boolean = true;
let studentId: string | number = "STU-001";

// გამოთვალეთ საშუალო ქულა
let average =
  studentGrades.reduce((sum, grade) => sum + grade, 0) /
  studentGrades.length;

// ყველაფერი ერთად
console.log(`სტუდენტი: ${studentName}`);
console.log(`ასაკი: ${studentAge}`);
console.log(`საშუალო ქულა: ${average.toFixed(2)}`);
console.log(`ჩარიცხულია: ${isEnrolled ? "კი" : "არა"}`);
```

## ამოცანა 4: User Input Simulator

```ts
// სიმულაცია: მომხმარებლის შეყვანა
let userInput: unknown = "42";

// გადაიყვანეთ number-ად, თუ შესაძლებელია
if (typeof userInput === "string" && !isNaN(Number(userInput))) {
  const numericValue: number = Number(userInput);
  console.log(`რიცხვი: ${numericValue}, ტიპი: ${typeof numericValue}`);
} else {
  console.log("ვერ გადავიყვანეთ რიცხვში");
}
```

## ამოცანა 5: null/undefined-ის მართვა

```ts
let currentUser: string | null = null;

function login(username: string): void {
  currentUser = username;
}

function logout(): void {
  currentUser = null;
}

function getCurrentUser(): string {
  // Null check — გამოიყენეთ if
  if (currentUser === null) {
    return "მომხმარებელი არ არის შესული";
  }
  return `მომხმარებელი: ${currentUser}`;
}
```

## ჩაბარების პირობები

1. ყველა ცვლადს აქვს ტიპის ანოტაცია
2. ფუნქციებს აქვთ return ტიპი
3. Union ტიპები სწორად არის გამოყენებული
4. კოდი წარმატებით კომპილირდება (npx tsc)

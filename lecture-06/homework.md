# საშინაო დავალება — ლექცია 06

## მომხმარებლების მონაცემების დამუშავება

შექმენით ფაილი `homework-06.ts` და დაასრულეთ ქვემოთ მოცემული დავალებები.

### მოცემული მონაცემები

```ts
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  isActive: boolean;
  role: "admin" | "user" | "guest";
}

const users: User[] = [
  { id: 1, name: "გიორგი", email: "giorgi@mail.com", age: 25, isActive: true, role: "admin" },
  { id: 2, name: "ნინო", email: "nino@mail.com", age: 30, isActive: false, role: "user" },
  { id: 3, name: "თამარი", email: "tamari@mail.com", age: 22, isActive: true, role: "user" },
  { id: 4, name: "დავითი", email: "davit@mail.com", age: 35, isActive: true, role: "guest" },
  { id: 5, name: "ანა", email: "ana@mail.com", age: 28, isActive: false, role: "admin" },
  { id: 6, name: "ლევანი", email: "levani@mail.com", age: 19, isActive: true, role: "user" },
  { id: 7, name: "მარიამი", email: "mariami@mail.com", age: 45, isActive: true, role: "guest" },
  { id: 8, name: "ალექსი", email: "aleksi@mail.com", age: 33, isActive: false, role: "user" },
];
```

### დავალება 1: ანგარიშის გენერაცია

შექმენით arrow ფუნქცია `generateReport`, რომელიც იღებს `User[]`-ს და აბრუნებს ანგარიშის ტექსტს:

- სულ რამდენი მომხმარებელია
- რამდენია active (`isActive === true`)
- რამდენი admin, user, guest
- საშუალო ასაკი

### დავალება 2: ფილტრაცია

შექმენით ფუნქცია `filterUsers`, რომელიც იღებს `User[]`-ს და ობიექტს ფილტრაციის პარამეტრებით:

```ts
interface FilterOptions {
  minAge?: number;
  maxAge?: number;
  role?: "admin" | "user" | "guest";
  isActive?: boolean;
}
```

### დავალება 3: იმეილების ტრანსფორმაცია

`map`-ის გამოყენებით შექმენით `string[]`, რომელიც შეიცავს ყველა active მომხმარებლის იმეილებს გადიდებულ ასოებში (UPPERCASE).

### დავალება 4: წაშლის სიმულაცია

დაწერეთ ფუნქცია `deleteUser`, რომელიც იღებს `User[]`-ს და `id`-ს (number) და აბრუნებს ახალ მასივს, საიდანაც ამოშლილია შესაბამისი id-ს მომხმარებელი. ორიგინალი მასივი არ უნდა შეიცვალოს.

### დავალება 5: მომხმარებლის პოვნა

დაწერეთ ფუნქცია `findUserById`, რომელიც `for` ან `for-of` ციკლით პოულობს მომხმარებელს id-ს მიხედვით. თუ ვერ იპოვა, აბრუნებს `null`.

### დავალება 6: როლის მიხედვით დაჯგუფება

```ts
type GroupedUsers = Record<string, User[]>;
```

შექმენით ფუნქცია `groupByRole`, რომელიც აჯგუფებს მომხმარებლებს როლის მიხედვით (`forEach` ან `for-of` გამოყენებით).

### დავალება 7: parallelIteration

```ts
function displayUserSummary(users: User[]): void {
  // forEach-ით გამოიტანეთ:
  // "1. გიორგი (25) - admin - Active"
  // "2. ნინო (30) - user - Inactive"
  // ...
}
```

### *Bonus: მოწინავე ანგარიში*

```ts
interface DetailedReport {
  totalUsers: number;
  activeUsers: number;
  averageAge: number;
  roleCounts: Record<string, number>;
  averageAgeByRole: Record<string, number>;
  youngestUser: User | null;
  oldestUser: User | null;
}
```

შექმენით `generateDetailedReport` ფუნქცია, რომელიც აბრუნებს `DetailedReport`-ს.

# ლექცია 04: Type Aliases & Interfaces

## სასწავლო მიზნები

- გავეცნოთ `type`-ს — ტიპების სახელების მინიჭება
- ვისწავლოთ `interface`-ის გამოყენება
- Optional (`?`) და readonly თვისებები
- Type vs Interface — განსხვავებები

---

## სლაიდი 1: Type Aliases

**type** — ტიპისთვის სახელის მინიჭება:

```ts
type UserID = string | number;
type Status = "active" | "inactive" | "pending";
type Point = {
  x: number;
  y: number;
};

let id: UserID = "abc123";
let userStatus: Status = "active";
let origin: Point = { x: 0, y: 0 };
```

`type`-ს შეუძლია წარმოადგინოს **ნებისმიერი** ტიპი — პრიმიტივი, Union, Object, Tuple.

---

## სლაიდი 2: Union Types with `type`

```ts
type Result = "success" | "error" | "loading";
type ApiEntity =
  | { kind: "user"; id: number; name: string }
  | { kind: "post"; id: number; title: string }
  | { kind: "comment"; id: number; text: string };

function processResult(r: Result): void {
  if (r === "success") console.log("წარმატება!");
}

function getEntityName(entity: ApiEntity): string {
  if (entity.kind === "user") {
    return entity.name;
  }
  if (entity.kind === "post") {
    return entity.title;
  }
  return entity.text;
}
```

---

## სლაიდი 3: Interfaces — ძირითადები

**interface** — ობიექტების სტრუქტურის განსაზღვრა:

```ts
interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: "ნინო",
  email: "nino@mail.com",
};
```

Interface აღწერს მხოლოდ **ობიექტებს**.

---

## სლაიდი 4: Optional Properties (`?`)

```ts
interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;     // Optional
  discount?: number;        // Optional
  tags?: string[];          // Optional
}

const basic: Product = {
  id: 1,
  name: "Laptop",
  price: 2500,
  // description — არ არის სავალდებულო
};

const full: Product = {
  id: 2,
  name: "Mouse",
  price: 50,
  description: "უკაბელო მაუსი",
  tags: ["აქსესუარი", "კომპიუტერი"],
};
```

---

## სლაიდი 5: Readonly Properties

```ts
interface Config {
  readonly apiKey: string;
  readonly baseUrl: string;
  timeout: number;
}

const config: Config = {
  apiKey: "sk-123456",
  baseUrl: "https://api.example.com",
  timeout: 5000,
};

// config.apiKey = "new-key"; // ❌ — Readonly!
config.timeout = 10000; // ✅ — timeout readonly არაა
```

**ReadonlyArray-სთან ერთად:**

```ts
interface Course {
  readonly title: string;
  readonly students: readonly string[];
}
```

---

## სლაიდი 6: Interface Extension

```ts
interface BaseEntity {
  id: number;
  createdAt: Date;
}

interface User extends BaseEntity {
  name: string;
  email: string;
}

interface Admin extends User {
  role: "admin" | "superadmin";
  permissions: string[];
}

const admin: Admin = {
  id: 1,
  createdAt: new Date(),
  name: "გიორგი",
  email: "gio@admin.com",
  role: "admin",
  permissions: ["read", "write", "delete"],
};
```

---

## სლაიდი 7: Multiple Extension

```ts
interface Nameable {
  name: string;
}

interface Timestampable {
  createdAt: Date;
  updatedAt?: Date;
}

interface SoftDeletable {
  deletedAt?: Date;
  isDeleted: boolean;
}

// Multiple inheritance
interface Post extends Nameable, Timestampable, SoftDeletable {
  title: string;
  content: string;
  tags: string[];
}
```

---

## სლაიდი 8: Type vs Interface

| | **Type** | **Interface** |
|---|---|---|
| **ობიექტები** | ✅ | ✅ |
| **Union / Intersection** | ✅ `type A = B \| C` | ❌ |
| **Primitives** | ✅ `type ID = string` | ❌ |
| **Extension** | `&` (intersection) | `extends` |
| **Declaration merging** | ❌ | ✅ |

```ts
// Declaration merging — interface-ის ხელახლა გამოცხადება
interface User {
  name: string;
}
interface User {
  age: number;
}
// User-ს now ორივე თვისება აქვს: name & age
```

---

## სლაიდი 9: Intersection Types (`&`)

```ts
type HasName = { name: string };
type HasAge = { age: number };
type Person = HasName & HasAge & { email: string };

const person: Person = {
  name: "ნინო",
  age: 30,
  email: "nino@mail.com",
};
```

**Intersection (`&`)** — type-თან "extension"-ის ეკვივალენტი.

---

## სლაიდი 10: Index Signatures

```ts
interface Dictionary {
  [key: string]: string;
}

interface StudentGrades {
  [subject: string]: number;
  // 👆 ნებისმიერი საგანი → ქულა
}

const grades: StudentGrades = {
  მათემატიკა: 95,
  ფიზიკა: 88,
  ისტორია: 92,
};
```

Index signatures ძალიან სასარგებლოა დინამიკური მონაცემებისთვის.

---

## შეჯამება

- **type** — ნებისმიერი ტიპისთვის (primitives, union, object)
- **interface** — მხოლოდ ობიექტებისთვის
- `?` = optional, `readonly` = ცვლილების აკრძალვა
- `extends` = interface-ის გაფართოება
- `&` = type-ის გაერთიანება (intersection)
- Interface-ს აქვს declaration merging

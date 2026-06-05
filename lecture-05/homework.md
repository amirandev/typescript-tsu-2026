# ლექცია 05: საშინაო დავალება — Nested Objects

## ამოცანა 1: Company Directory System

შექმენით კომპანიის თანამშრომელთა დირექტორია.

### 1.1. ტიპები

```ts
// მისამართი
interface Address {
  city: string;
  street: string;
  zip: string;
  country: string;
}

// კონტაქტი
interface Contact {
  email: string;
  phone: string;
}

// განყოფილება
interface Department {
  name: string;
  floor: number;
  building: string;
}

// თანამშრომელი
interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  salary: number;
  address: Address;
  contact: Contact;
  department: Department;
  skills: string[];
  isFullTime: boolean;
  manager?: {
    id: number;
    name: string;
  };
}
```

### 1.2. მონაცემები

შექმენით მინიმუმ 5 თანამშრომლის მასივი (`Employee[]`). მაგალითი:

```ts
const employees: Employee[] = [
  {
    id: 1,
    firstName: "მარიამ",
    lastName: "ჭელიძე",
    position: "Senior Developer",
    salary: 5000,
    address: { city: "თბილისი", street: "ჭავჭავაძე 15", zip: "0179", country: "საქართველო" },
    contact: { email: "mariam@company.ge", phone: "+995 555 11 22 33" },
    department: { name: "IT", floor: 3, building: "A" },
    skills: ["TypeScript", "React", "Node.js"],
    isFullTime: true,
    manager: { id: 3, name: "გიორგი ბერიძე" },
  },
  // ... კიდევ 4 თანამშრომელი
];
```

### 1.3. ფუნქციები

```ts
// 1.3.1. იპოვეთ თანამშრომელი ID-ით
function findEmployeeById(id: number): Employee | undefined { /* ... */ }

// 1.3.2. გაფილტრეთ განყოფილების მიხედვით
function filterByDepartment(departmentName: string): Employee[] { /* ... */ }

// 1.3.3. იპოვეთ ყველა თანამშრომელი, ვისაც აქვს კონკრეტული skill
function filterBySkill(skill: string): Employee[] { /* ... */ }

// 1.3.4. გამოთვალეთ საშუალო ხელფასი განყოფილების მიხედვით
function averageSalaryByDepartment(): Record<string, number> { /* ... */ }

// 1.3.5. დააბრუნეთ თანამშრომლის სრული ინფორმაცია ფორმატირებული სტრიქონით
function getEmployeeSummary(employee: Employee): string {
  // მაგ: "მარიამ ჭელიძე — Senior Developer (IT), თბილისი, 5000₾"
}
```

---

## ამოცანა 2: Music Library

შექმენით მუსიკალური ბიბლიოთეკის სისტემა.

```ts
interface Song {
  id: number;
  title: string;
  duration: number; // seconds
  trackNumber: number;
}

interface Album {
  id: number;
  title: string;
  year: number;
  genre: string;
  artist: {
    name: string;
    country: string;
    formedYear: number;
  };
  tracks: Song[];
  rating?: number;  // 1-5
}

interface Playlist {
  id: number;
  name: string;
  description?: string;
  albums: Album[];
  createdAt: string;
  isPublic: boolean;
}
```

### 2.1. შექმენით:

- მინიმუმ 2 ალბომი თითო 3-4 სიმღერით
- 1 playlist, რომელიც შეიცავს ორივე ალბომს
- ფუნქცია, რომელიც ითვლის playlist-ის მთლიან ხანგრძლივობას
- ფუნქცია, რომელიც აბრუნებს ყველა უნიკალური ჟანრის სიას

### 2.2. წარმოადგინეთ მონაცემები:

```ts
// მაგ: "Playlist: Chill Vibes (2 albums, 45 min, 8 tracks)"
// "  Album: Jazz Evening — ჯაზი (2024)"
// "    1. Autumn Leaves (3:45)"
// "    2. Blue Moon (4:12)"
// "  Album: LoFi Beats — ლოფაი (2025)"
// "    1. Study Time (2:30)"
```

---

## ამოცანა 3: JSON Config Parser

```ts
// მოცემულია კონფიგურაციის ობიექტი:
type EnvMode = "development" | "staging" | "production";

interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  options?: {
    poolSize?: number;
    ssl?: boolean;
    timeout?: number;
  };
}

interface CacheConfig {
  provider: "redis" | "memory";
  host?: string;
  port?: number;
  ttl: number; // seconds
}

interface AppConfig {
  appName: string;
  version: string;
  env: EnvMode;
  debug: boolean;
  database: DatabaseConfig;
  cache: CacheConfig;
  features: {
    darkMode: boolean;
    notifications: boolean;
    analytics: boolean;
    experimental?: string[];
  };
}

// 3.1. შექმენით config ობიექტი development გარემოსთვის
const devConfig: AppConfig = {
  appName: "MyApp",
  version: "1.0.0",
  env: "development",
  debug: true,
  database: {
    host: "localhost",
    port: 5432,
    username: "admin",
    password: "secret",
    database: "myapp_dev",
    options: { poolSize: 5, ssl: false },
  },
  cache: { provider: "memory", ttl: 3600 },
  features: { darkMode: true, notifications: false, analytics: false, experimental: ["new-ui"] },
};

// 3.2. დაწერეთ ფუნქცია, რომელიც გადაიყვანს config-ს production-ად
// (ცვლის env-ს, debug-ს, database-ის პარამეტრებს, cache-ს)
function toProductionConfig(config: AppConfig): AppConfig {
  // დააბრუნეთ ახალი ობიექტი (არ შეცვალოთ ორიგინალი)
}

// 3.3. დაწერეთ ფუნქცია, რომელიც უსაფრთხოდ ამოიღებს მნიშვნელობებს
// მაგ: getNestedValue(config, "database.options.poolSize") -> 5
function getNestedValue<T>(obj: Record<string, any>, path: string): T | undefined {
  // გაყავით path წერტილებით და მიყევით თითოეულ key-ს
}
```

---

## ჩაბარების პირობები

1. ყველა interface/type გამოყენებულია nested objects-ისთვის
2. Optional properties და optional chaining სწორად არის გამოყენებული
3. Spread operator გამოყენებულია nested objects-ის განახლებისთვის
4. მინიმუმ 2 ფუნქცია იყენებს nested object-ს პარამეტრად
5. კოდი წარმატებით კომპილირდება (`tsc` შეცდომების გარეშე)

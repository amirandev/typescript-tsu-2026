# Static vs Non-Static (Instance) Members

---

## **სლაიდი 1: Start With A Question**

იფიქრეთ ამაზე:

```typescript
class Student {
  name: string;
  static collegeName: string = 'ინტერბიზნესის აკადემია';

  constructor(name: string) {
    this.name = name;
  }
}

const s1 = new Student('გიორგი');
const s2 = new Student('ნინო');
```

**კითხვა:**
- `s1.name` — გიორგი
- `s2.name` — ნინო
- `s1.collegeName` — ???
- `s2.collegeName` — ???

**პასუხი:** `static collegeName` — **საერთოა ყველასთვის**.
`Student.collegeName` — აი როგორ მივწვდეთ.

---

## **სლაიდი 2: მთავარი იდეა — "ვის ეკუთვნის?"**

**Instance members** ეკუთვნის **ინსტანციას** (კონკრეტულ ობიექტს).

**Static members** ეკუთვნის **კლასს** (თვითონ კლასს, არა ობიექტს).

```typescript
class Car {
  // Non-static (instance):
  licensePlate: string;

  // Static:
  static numberOfWheels: number = 4;

  constructor(plate: string) {
    this.licensePlate = plate;
    // this.licensePlate — იცვლება თითოეულ მანქანაზე
  }
}

const car1 = new Car('AB-123');
const car2 = new Car('CD-456');

console.log(car1.licensePlate); // "AB-123" — car1-ის საკუთარი
console.log(car2.licensePlate); // "CD-456" — car2-ის საკუთარი
console.log(Car.numberOfWheels); // 4 — ერთია ყველა მანქანისთვის
```

**რატომ?** იმიტომ რომ 4 ბორბალი ყველა მანქანას აქვს, მაგრამ სანომრე ნიშანი თითოეულს განსხვავებული.

---

## **სლაიდი 3: "რატომ არ შემიძლია static-დან instance-ზე წვდომა?"**

ეს არის ყველაზე ხშირი შეკითხვა.

```typescript
class Example {
  instanceValue: string = 'hello';
  static staticValue: string = 'world';

  // ✅ Instance method — იცის რომელ ინსტანციაზე მუშაობს
  instanceMethod(): void {
    console.log(this.instanceValue); // ✅ "hello"
    console.log(Example.staticValue); // ✅ "world"
  }

  // ❌ Static method — ვერ გეტყვით რომელ ინსტანციაზე
  static staticMethod(): void {
    console.log(Example.staticValue); // ✅ "world"
    // console.log(this.instanceValue); // ❌ — which instance??
  }
}
```

**ახსნა:**
- `instanceMethod()` იძახება **კონკრეტულ ინსტანციაზე**: `car1.instanceMethod()`
- `staticMethod()` იძახება **კლასზე**: `Example.staticMethod()`
- Static method-მა **არ იცის** არსებობს თუ არა ინსტანციები, რამდენია, რომელი გამოიყენოს.
- `this.instanceValue` static-ში — რომელ ინსტანციაზე უნდა მიუთითებდეს `this`? **არავინ იცის.**

**ანალოგია:** ეს იგივეა რომ ჰკითხოთ "რა ფერის თმა აქვს კაცობრიობას?" — კაცობრიობას როგორც მთლიანობას არ აქვს ერთი ფერი. ინდივიდუალურ ადამიანს აქვს.

---

## **სლაიდი 4: "რატომ გვჭირდება static? რა პრობლემას წყვეტს?"**

**პრობლემა:** ზოგი რამ არ უნდა იყოს დამოკიდებული კონკრეტულ ინსტანციაზე.

```typescript
// ❌ Static-ის გარეშე:
const config1 = new Config(); // new Config() — უაზრობაა
config1.apiUrl = 'https://api.example.com';
const config2 = new Config();
config2.apiUrl = 'https://api.other.com'; // 2 განსხვავებული config??

// ✅ Static-ით:
class Config {
  static apiUrl: string = 'https://api.example.com';
  static apiKey: string = '';
}

// Config.apiUrl — ერთი ადგილი, ერთი მნიშვნელობა
// new Config() — არ გვჭირდება
```

**Static-ის 3 მთავარი მიზეზი:**

| # | მიზეზი | მაგალითი |
|---|--------|----------|
| 1 | **State-ი (მდგომარეობა) რომელიც საერთოა** | `User.count` — სულ რამდენი მომხმარებელია |
| 2 | **კონფიგურაცია / გლობალური პარამეტრები** | `AppSettings.theme`, `Config.apiUrl` |
| 3 | **უტილიტარული ფუნქციები** | `MathUtils.round()`, `StringUtils.capitalize()` |

---

## **სლაიდი 5: "რატომ არ გამოვიყენო უბრალოდ const ცვლადი?"**

```typescript
// ❌ გლობალური ცვლადი — ყველგან წვდომა, არანაირი კონტროლი
let apiKey: string = '';

function setApiKey(key: string): void {
  apiKey = key;
}

// ✅ Static კლასში — ინკაფსულაცია, private, ლოგიკური დაჯგუფება
class ApiKeys {
  private static stripeKey: string = '';
  private static tbcKey: string = '';

  static configure(stripe: string, tbc: string): void {
    ApiKeys.stripeKey = stripe;
    ApiKeys.tbcKey = tbc;
  }

  static getStripeKey(): string {
    if (!ApiKeys.stripeKey) throw new Error('Stripe not configured');
    return ApiKeys.stripeKey;
  }
}
```

**რატომ ჯობს static გლობალურ ცვლადს?**
1. **Encapsulation** — `private static`-ით იცავთ მონაცემებს
2. **Namespacing** — `ApiKeys.getStripeKey()` — ნათელია საიდან მოდის
3. **Type safety** — TypeScript ამოწმებს ტიპებს
4. **Validation** — configure-ის გარეშე getStripeKey() აგდებს error-ს

**ანალოგია:** გლობალური ცვლადი ჰგავს ქუჩაში დადებულ ფულს — ვინც უნდა აიღებს. Static კლასში ჰგავს სეიფს — მხოლოდ გარკვეული მეთოდებით შეგიძლიათ წვდომა.

---

## **სლაიდი 6: "რატომ არ გავხადო ყველაფერი static?"**

```typescript
// ❌ ყველაფერი static
class UserStatic {
  static name: string = '';
  static email: string = '';

  static getInfo(): string {
    return `${UserStatic.name} (${UserStatic.email})`;
  }
}

UserStatic.name = 'გიორგი';
UserStatic.name = 'ნინო'; // წინა წაიშალა!

// ✅ Instance — თითოეულს თავისი მონაცემები
class User {
  constructor(public name: string, public email: string) {}

  getInfo(): string {
    return `${this.name} (${this.email})`;
  }
}

const u1 = new User('გიორგი', 'giorgi@example.com');
const u2 = new User('ნინო', 'nino@example.com');
```

**რატომ არ შეიძლება ყველაფერი static:**

| | Static (ერთი ასლი) | Instance (თითოეულს თავისი) |
|---|---|---|
| `new` | არ სჭირდება | **სჭირდება** |
| State | **ერთი გლობალური** | **თითოეულს საკუთარი** |
| `this` | ❌ | ✅ |
| Polymorphism | ❌ | ✅ |
| Inheritance | შეზღუდული | ✅ |

**მარტივი წესი:** If you need **multiple copies with different data** → instance. If you need **one shared thing** → static.

---

## **სლაიდი 7: "როდის მივწვდე static-ს ინსტანციიდან?"**

```typescript
class Product {
  private static nextId: number = 1;

  readonly id: number;
  constructor(public title: string, public price: number) {
    // ✅ ინსტანციიდან static-ზე — კლასის სახელით
    this.id = Product.nextId++;
  }

  static get currentNextId(): number {
    return Product.nextId;
  }
}

const p1 = new Product('Laptop', 2999);  // id = 1
const p2 = new Product('Mouse', 99);     // id = 2
const p3 = new Product('Keyboard', 199); // id = 3

console.log(p1.id); // 1
console.log(p2.id); // 2
console.log(p3.id); // 3
console.log(Product.currentNextId); // 4
```

**რატომ ვიყენებთ static-ს აქ?**

`nextId` — ეს არის **მრიცხველი** რომელიც **საერთოა** ყველა Product ინსტანციისთვის. თუ instance property იქნებოდა, თითოეულ პროდუქტს ექნებოდა თავისი `nextId` = 1, და ყველას ექნებოდა id = 1.

**ანალოგია:** ეს იგივეა რაც რიგის ნომერი ბანკში. აპარატს (static) ახსოვს ბოლო ნომერი. თითოეულ კლიენტს (instance) თავისი ნომერი აქვს.

---

## **სლაიდი 8: Summary — Grid For Decision**

კითხვა: "უნდა გავაკეთო static თუ instance?"

1. **სჭირდება თუ არა `new`?** — თუ კლასის გამოყენებამდე გჭირდებათ `new` → instance. თუ გსურთ პირდაპირი წვდომა → static.

2. **ერთია ყველასთვის თუ თითოეულს თავისი?** — თუ მნიშვნელობა ყველა შემთხვევაში ერთია → static. თუ თითოეულ ობიექტს განსხვავებული აქვს → instance.

3. **მეთოდი იყენებს `this`-ს?** — თუ `this.instanceProperty` გჭირდებათ → instance. თუ მეთოდი მუშაობს მხოლოდ მიღებულ პარამეტრებზე → static.

4. **მეთოდი ქმნის ან აბრუნებს ინსტანციას?** — Factory: `Product.fromJSON()` → static (class-level constructor).

```typescript
class MathHelper {
  // ✅ Static — არ სჭირდება this, ერთი ლოგიკა
  static average(a: number, b: number): number {
    return (a + b) / 2;
  }
}

class ShoppingCart {
  private items: { price: number; qty: number }[] = [];

  // ✅ Instance — თითოეულ კალათას თავისი items
  get total(): number {
    return this.items.reduce((s, i) => s + i.price * i.qty, 0);
  }

  addItem(price: number, qty: number): void {
    this.items.push({ price, qty });
  }
}
```

---

## **სლაიდი 9: Real Code — Static vs Instance In Action**

```typescript
class AuthService {
  // Static — კონფიგურაცია, ერთხელ დგება
  private static baseUrl: string = '';
  private static tokenKey: string = 'auth_token';

  static configure(baseUrl: string): void {
    AuthService.baseUrl = baseUrl;
  }

  static getToken(): string | null {
    return localStorage.getItem(AuthService.tokenKey);
  }

  static logout(): void {
    localStorage.removeItem(AuthService.tokenKey);
  }

  // Non-static — ინსტანცია მუშაობს კონკრეტულ მომხმარებელზე
  constructor(public userId: number) {}

  async login(email: string, password: string): Promise<boolean> {
    const res = await fetch(`${AuthService.baseUrl}/login`, {
      method: 'POST',
      body: JSON.stringify({ userId: this.userId, email, password })
    });
    const data = await res.json();
    localStorage.setItem(AuthService.tokenKey, data.token);
    return res.ok;
  }

  async getProfile(): Promise<any> {
    const res = await fetch(`${AuthService.baseUrl}/users/${this.userId}`, {
      headers: { Authorization: `Bearer ${AuthService.getToken()}` }
    });
    return res.json();
  }
}

// 1. Configuration — static
AuthService.configure('https://api.example.com');

// 2. Instance for each user
const adminSession = new AuthService(1);
const userSession = new AuthService(42);

// adminSession.userId = 1
// userSession.userId = 42 — different instances, different userIds
// AuthService.baseUrl — same for both
```

**რატომ არის ეს კარგი დიზაინი?**
- `baseUrl` — **static**: იგივე URL ყველასთვის, იცვლება მხოლოდ `configure()`-ით
- `userId` — **instance**: თითოეულ სესიას განსხვავებული მომხმარებელი
- `getToken()` — **static**: ტოკენი ერთია localStorage-ში
- `login()` — **instance**: login ხდება კონკრეტული მომხმარებლისთვის

---

## **სლაიდი 10: Practice**

**დავალება 1:**
```typescript
// წინასწარ უპასუხეთ: static თუ instance?
// 1. bankAccount.balance — ???
// 2. BankAccount.interestRate — ???
// 3. user.getName() — ???
// 4. User.getAllUsers() — ???
// 5. math.PI — ???
// 6. new Math() — გჭირდებათ? ???
```

**დავალება 2:**
```typescript
class Employee {
  // 1. static nextId — auto-increment
  // 2. instance: id, name, salary
  // 3. static getAvgSalary(): number — ყველა დასაქმებულის საშუალო
  // 4. constructor() — ანიჭებს id-ს, ამატებს static სიაში
}
```

**დავალება 3 (რატომ?):**
ახსენით თანაკლასელს, რატომ არის ეს static:
- `Math.max(1, 5)` — instance? static? რატომ?
- `"hello".toUpperCase()` — instance? static? რატომ?
- `Array.from([1, 2, 3])` — instance? static? რატომ?

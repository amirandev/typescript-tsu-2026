# ლექცია 05: Nested Objects (ჩადგმული ობიექტები)

## სასწავლო მიზნები

- გავიგოთ რა არის nested objects
- ვისწავლოთ nested ობიექტების ტიპიზაცია
- გავეცნოთ interface-ების გამოყენებას nested ობიექტებისთვის
- ვიმუშაოთ arrays of nested objects
- ვისწავლოთ optional და readonly ჩადგმულ თვისებებთან

---

## სლაიდი 1: რა არის Nested Objects?

ობიექტი, რომელიც შეიცავს სხვა ობიექტს თავის თვისებად:

```ts
// მარტივი ობიექტი
let user = {
  name: "მარიამ",
  age: 25,
};

// Nested object — ობიექტი ობიექტში
let profile = {
  username: "mariam1",
  address: {
    city: "თბილისი",
    street: "რუსთაველი",
  },
};

console.log(profile.address.city); // "თბილისი"
```

**რატომ ვიყენებთ?** რეალურ მონაცემებს ხчараად აქვს ჩადგმული სტრუქტურა (მომხმარებელი → მისამართი, პროდუქტი → კატეგორია, შეკვეთა → პროდუქტები).

---

## სლაიდი 2: Inline Nested Type Annotation

```ts
let employee: {
  id: number;
  name: string;
  position: {
    title: string;
    department: string;
    level: string;
  };
  skills: string[];
} = {
  id: 1,
  name: "გიორგი",
  position: {
    title: "დეველოპერი",
    department: "IT",
    level: "Senior",
  },
  skills: ["TypeScript", "React", "Node.js"],
};

// წვდომა ჩადგმულ თვისებებზე
console.log(employee.position.title);    // "დეველოპერი"
console.log(employee.position.level);    // "Senior"
```

**წერტილის ნოტაცია:** ჩადგმულ თვისებებზე წვდომა ხდება წერტილების მიყოლებით — `obj.prop.subprop`.

---

## სლაიდი 3: Interface Nested Objects-ისთვის

```ts
interface Address {
  city: string;
  street: string;
  zipCode?: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  address: Address;  // სხვა interface-ის გამოყენება
  isActive: boolean;
}

let user: User = {
  id: 1,
  name: "ნინო",
  email: "nino@mail.com",
  address: {
    city: "ბათუმი",
    street: "აღმაშენებელი 15",
    zipCode: 6010,
  },
  isActive: true,
};
```

**უპირატესობა:** Address interface შეიძლება გამოყენებულ იქნეს მრავალ ადგილას.

---

## სლაიდი 4: Type Alias Nested Objects-ისთვის

```ts
type Coordinates = {
  lat: number;
  lng: number;
};

type Location = {
  name: string;
  coords: Coordinates;
  country: string;
};

type Event = {
  title: string;
  date: string;
  location: Location;  // Type-ის ჩადგმა
};

const conference: Event = {
  title: "TypeScript Conference",
  date: "2025-09-15",
  location: {
    name: "თბილისი ოპერა",
    coords: { lat: 41.7012, lng: 44.7968 },
    country: "საქართველო",
  },
};

console.log(conference.location.coords.lat); // 41.7012
```

**Deep nesting:** შეგვიძლია რამდენიმე დონის ჩადგმა. მაგრამ ფრთხილად — ზედმეტად ღრმა ჩადგმა ართულებს კითხვას.

---

## სლაიდი 5: Arrays of Nested Objects

```ts
interface Product {
  id: number;
  name: string;
  price: number;
  category: {
    id: number;
    name: string;
    slug: string;
  };
  tags: string[];
  inStock: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: "ლეპტოპი",
    price: 2500,
    category: { id: 10, name: "ელექტრონიკა", slug: "electronics" },
    tags: ["კომპიუტერი", "სამუშაო"],
    inStock: true,
  },
  {
    id: 2,
    name: "წიგნი",
    price: 45,
    category: { id: 20, name: "წიგნები", slug: "books" },
    tags: ["საგანმანათლებლო"],
    inStock: true,
  },
];

// გაფილტვრა nested property-ით
const electronics = products.filter(p => p.category.slug === "electronics");
console.log(electronics.map(p => p.name)); // ["ლეპტოპი"]

// ყველა კატეგორიის სახელი
const categoryNames = products.map(p => p.category.name);
console.log(categoryNames); // ["ელექტრონიკა", "წიგნები"]
```

---

## სლაიდი 6: Deeply Nested Structures

```ts
interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
}

interface PaymentInfo {
  method: "card" | "cash" | "transfer";
  status: "paid" | "pending" | "failed";
  transactionId?: string;
}

interface Order {
  id: number;
  customer: {
    name: string;
    email: string;
    phone?: string;
  };
  items: OrderItem[];
  payment: PaymentInfo;
  shipping: {
    address: {
      city: string;
      street: string;
      zip: string;
    };
    courier: string;
    estimatedDays: number;
  };
  createdAt: string;
}

const sampleOrder: Order = {
  id: 1001,
  customer: { name: "დავითი", email: "davit@mail.com" },
  items: [
    { productId: 5, quantity: 2, price: 50 },
    { productId: 8, quantity: 1, price: 120 },
  ],
  payment: { method: "card", status: "paid", transactionId: "txn_123" },
  shipping: {
    address: { city: "ქუთაისი", street: "თამარ მეფის 10", zip: "4600" },
    courier: "Georgian Post",
    estimatedDays: 3,
  },
  createdAt: "2025-06-01",
};

// წვდომა ღრმა დონეზე
console.log(sampleOrder.shipping.address.city); // "ქუთაისი"
console.log(sampleOrder.payment.method);         // "card"
```

---

## სლაიდი 7: Optional Nested Properties

```ts
interface Company {
  name: string;
  website?: string;
  address?: {
    city: string;
    street?: string;    // Optional nested property
  };
}

const company1: Company = {
  name: "Tech Corp",
  website: "https://techcorp.com",
  address: {
    city: "თბილისი",
    // street — არ არის სავალდებულო
  },
};

const company2: Company = {
  name: "Startup Inc",
  // website — არ არის სავალდებულო
  // address — მთლიანად optional
};

// Optional chaining — უსაფრთხო წვდომა
console.log(company1.address?.city);    // "თბილისი"
console.log(company2.address?.city);    // undefined (შეცდომის გარეშე)
console.log(company1.address?.street?.toUpperCase()); // undefined (შეცდომის გარეშე)
```

**წესი:** Optional chaining (`?.`) გამოიყენეთ, როცა არ ხართ დარწმუნებული, რომ თვისება არსებობს.

---

## სლაიდი 8: Readonly Nested Properties

```ts
interface Config {
  readonly apiKey: string;
  readonly endpoints: {
    readonly users: string;
    readonly products: string;
    readonly orders?: string;
  };
  readonly retryPolicy: {
    maxRetries: number;    // იცვლება მხოლოდ ობიექტის დონეზე
    timeoutMs: number;
  };
}

const config: Config = {
  apiKey: "sk-abc123",
  endpoints: {
    users: "https://api.example.com/users",
    products: "https://api.example.com/products",
  },
  retryPolicy: {
    maxRetries: 3,
    timeoutMs: 5000,
  },
};

// config.apiKey = "new-key";              // ❌
// config.endpoints.users = "/new-url";    // ❌
config.retryPolicy.maxRetries = 5;         // ✅ (retryPolicy readonly არ არის)
```

**გავრცელებული პრაქტიკა:** Config, constants, fetched data — ამ მონაცემებს ხშირად ვინახავთ readonly-ად.

---

## სლაიდი 9: Nested Object-ის განახლება

```ts
interface User {
  name: string;
  address: {
    city: string;
    street: string;
  };
}

let user: User = {
  name: "მარიამ",
  address: { city: "თბილისი", street: "პეკინი 5" },
};

// Spread operator — ზედაპირული კოპირება
let updatedUser: User = {
  ...user,
  name: "მარიამ ჭელიძე",
  address: {
    ...user.address,
    street: "პეკინი 10",
  },
};

console.log(updatedUser.address.street); // "პეკინი 10"
console.log(user.address.street);        // "პეკინი 5" (ორიგინალი უცვლელი)

// Destructuring nested object-იდან
const { name, address: { city, street } } = user;
console.log(`${name} — ${city}, ${street}`);
// "მარიამ — თბილისი, პეკინი 5"
```

**მნიშვნელოვანი:** Spread operator აკეთებს shallow copy-ს. ღრმა ჩადგმისას თითოეული დონე ცალკე უნდა გავშალოთ.

---

## სლაიდი 10: Practical Example — API Response

```ts
interface ApiResponse<T> {
  status: "success" | "error";
  data: T;
  meta?: {
    total: number;
    page: number;
    pageSize: number;
  };
  error?: {
    code: string;
    message: string;
  };
}

interface BlogPost {
  id: number;
  title: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  tags: string[];
  publishedAt: string;
}

// API-დან მოსული მონაცემები
const response: ApiResponse<BlogPost[]> = {
  status: "success",
  data: [
    {
      id: 1,
      title: "TypeScript Nested Objects",
      author: { name: "ნინო", avatar: "avatar1.jpg" },
      content: "...",
      tags: ["typescript", "objects"],
      publishedAt: "2025-05-20",
    },
  ],
  meta: { total: 10, page: 1, pageSize: 5 },
};

// TypeScript უზრუნველყოფს, რომ სწორად მივწვდეთ
if (response.status === "success" && response.meta) {
  console.log(`ნაპოვნია ${response.meta.total} პოსტი`);
  response.data.forEach(post => {
    console.log(`${post.title} — ${post.author.name}`);
  });
}
```

**Generic-ები (`<T>`):** საშუალებას გვაძლევს, ApiResponse მრავალი ტიპის მონაცემთან გამოვიყენოთ.

---

## შეჯამება

| კონსტრუქცია | მაგალითი |
|-------------|----------|
| Inline nested type | `{ address: { city: string; street: string } }` |
| Interface nesting | `interface User { address: Address }` |
| Type nesting | `type Event = { location: Location }` |
| Arrays of nested | `Product[]` — where Product has nested fields |
| Optional nested | `address?: { city: string; street?: string }` |
| Readonly nested | `readonly endpoints: { readonly users: string }` |
| Optional chaining | `user.address?.city` |
| Spread update | `{ ...obj, nested: { ...obj.nested, prop: val } }` |

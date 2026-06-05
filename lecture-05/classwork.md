# ლექცია 05: საკლასო სამუშაო — Nested Objects

## მიზანი

Nested objects-ის ტიპიზაციის, წვდომისა და მანიპულაციის პრაქტიკა TypeScript-ში.

## ამოცანა 1: User Profile Nested Object

```ts
// 1.1. შექმენით interface-ები შემდეგი სტრუქტურით:
// - Profile: username, bio, avatarUrl
// - SocialLinks: twitter?, github?, linkedin?
// - User: id, name, email, profile: Profile, social?: SocialLinks

interface Profile {
  username: string;
  bio: string;
  avatarUrl: string;
}

interface SocialLinks {
  twitter?: string;
  github?: string;
  linkedin?: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  profile: Profile;
  social?: SocialLinks;
}

// 1.2. შექმენით ორი მომხმარებელი (ერთს social მიუთითეთ, მეორეს არა)
const user1: User = {
  id: 1,
  name: "ნინო მჭედლიძე",
  email: "nino@mail.com",
  profile: {
    username: "nino_dev",
    bio: "TypeScript developer",
    avatarUrl: "https://example.com/avatar1.jpg",
  },
  social: {
    twitter: "@nino_dev",
    github: "nino-dev",
  },
};

const user2: User = {
  id: 2,
  name: "გიორგი ბერიძე",
  email: "gio@mail.com",
  profile: {
    username: "gio_dev",
    bio: "Frontend developer",
    avatarUrl: "https://example.com/avatar2.jpg",
  },
  // social — optional, შეიძლება არ ჰქონდეს
};

// 1.3. დაბეჭდეთ თითოეულის username და bio (social-ზე გამოიყენეთ optional chaining)
console.log(user1.profile.username);
console.log(user2.social?.twitter ?? "არ მიუთითებია");
```

## ამოცანა 2: E-commerce Cart

```ts
interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
}

interface Cart {
  userId: number;
  items: CartItem[];
  shipping: {
    method: "standard" | "express";
    address: {
      city: string;
      street: string;
      zip: string;
    };
    cost: number;
  };
  appliedCoupon?: {
    code: string;
    discountPercent: number;
  };
}

// 2.1. შექმენით კალათი 2-3 პროდუქტით
const cart: Cart = {
  userId: 1,
  items: [
    { productId: 101, name: "მაისური", price: 35, quantity: 2 },
    { productId: 102, name: "ჯინსი", price: 120, quantity: 1 },
  ],
  shipping: {
    method: "express",
    address: {
      city: "თბილისი",
      street: "ვაჟა-ფშაველა 45",
      zip: "0186",
    },
    cost: 15,
  },
  appliedCoupon: { code: "SUMMER20", discountPercent: 20 },
};

// 2.2. გამოთვალეთ ჯამური ფასი (items + shipping - discount)
const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
const discount = cart.appliedCoupon
  ? (subtotal * cart.appliedCoupon.discountPercent) / 100
  : 0;
const total = subtotal + cart.shipping.cost - discount;

console.log(`ჯამი: ${total.toFixed(2)}₾`);

// 2.3. optional chaining-ით გამოიტანეთ coupon code ან "არ გამოყენებულა"
console.log(cart.appliedCoupon?.code ?? "არ გამოყენებულა");
```

## ამოცანა 3: Nested Destructuring

```ts
interface TeamMember {
  name: string;
  role: string;
  contact: {
    email: string;
    phone?: string;
  };
}

interface Project {
  title: string;
  lead: TeamMember;
  members: TeamMember[];
  repository: {
    url: string;
    branch: string;
    isPrivate: boolean;
  };
}

const project: Project = {
  title: "E-commerce App",
  lead: {
    name: "მარიამი",
    role: "Team Lead",
    contact: { email: "mariam@example.com", phone: "+995 555 11 22 33" },
  },
  members: [
    { name: "დავითი", role: "Developer", contact: { email: "davit@example.com" } },
    { name: "თეა", role: "Designer", contact: { email: "tea@example.com", phone: "+995 599 44 55 66" } },
  ],
  repository: { url: "https://github.com/team/ecommerce", branch: "main", isPrivate: true },
};

// Destructure lead-ის სახელი, როლი, email
const { lead: { name: leadName, role: leadRole, contact: { email: leadEmail } } } = project;
console.log(`Lead: ${leadName}, ${leadRole}, ${leadEmail}`);

// Destructure repository
const { repository: { url, branch } } = project;
console.log(`Repo: ${url}, Branch: ${branch}`);
```

## კითხვები

1. რა განსხვავებაა `address?: { city: string }`-სა და `address: { city?: string }`-ს შორის?
2. რატომ გვჭირდება optional chaining (`?.`) nested objects-თან მუშაობისას?
3. რა ხდება, თუ spread operator-ით ვაკოპირებთ nested object-ს და ვცვლით ჩადგმულ თვისებას?

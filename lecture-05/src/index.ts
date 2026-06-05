// ლექცია 05: Nested Objects — დემო კოდი

// --- მაგალითი 1: Inline Nested Type ---
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

console.log(employee.position.title);
console.log(employee.position.level);

// --- მაგალითი 2: Interface Nested ---
interface Address {
  city: string;
  street: string;
  zipCode?: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  address: Address;
  isActive: boolean;
}

let person: User = {
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

console.log(person.address.city);

// --- მაგალითი 3: Type Alias Nested ---
type Coordinates = {
  lat: number;
  lng: number;
};

type Place = {
  name: string;
  coords: Coordinates;
  country: string;
};

type Conference = {
  title: string;
  date: string;
  location: Place;
};

const conference: Conference = {
  title: "TypeScript Conference",
  date: "2025-09-15",
  location: {
    name: "თბილისი ოპერა",
    coords: { lat: 41.7012, lng: 44.7968 },
    country: "საქართველო",
  },
};

console.log(conference.location.coords.lat);

// --- მაგალითი 4: Arrays of Nested Objects ---
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

const electronics = products.filter(p => p.category.slug === "electronics");
console.log(electronics.map(p => p.name));

// --- მაგალითი 5: Optional Chaining ---
interface Company {
  name: string;
  website?: string;
  address?: {
    city: string;
    street?: string;
  };
}

const company1: Company = {
  name: "Tech Corp",
  address: { city: "თბილისი" },
};

console.log(company1.address?.city);
console.log(company1.address?.street?.toUpperCase());

// --- მაგალითი 6: Spread Operator Nested-თვის ---
let updatedPerson: User = {
  ...person,
  name: "ნინო მჭედლიძე",
  address: {
    ...person.address,
    street: "პეკინი 10",
  },
};

console.log(updatedPerson.address.street);

// --- მაგალითი 7: Destructuring ---
const { name: personName, address: { city: personCity, street: personStreet } } = person;
console.log(`${personName} — ${personCity}, ${personStreet}`);

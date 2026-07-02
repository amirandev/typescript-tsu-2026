# პრეზენტაცია: OOP in TypeScript & React

---

## **სლაიდი 1**
### **OOP in TypeScript & React**
- Classes, Interfaces & API Integration
<img width="1600" height="837" alt="image" src="https://github.com/user-attachments/assets/3f6c5660-ff92-479e-8b96-ee94fadfb8f0" />

---


---

## **სლაიდი 2: რა არის OOP?**
### **Object-Oriented Programming Principles**

**4 ძირითადი პრინციპი:**
1. **Encapsulation** - მონაცემთა დაფარვა
2. **Inheritance** - მემკვიდრეობა
3. **Polymorphism** - პოლიმორფიზმი
4. **Abstraction** - აბსტრაქცია

**ილუსტრაცია:** OOP-ს 4 სვეტი დიაგრამა

---

## **სლაიდი 3: TypeScript-ის OOP შესაძლებლობები**

```typescript
// კლასის შექმნა
class User {
  private id: number;
  public name: string;
  protected email: string;

  constructor(id: number, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  public getInfo(): string {
    return `${this.name} (${this.email})`;
  }
}
```

**TypeScript features:**
- Access modifiers (public/private/protected)
- Interfaces
- Abstract classes
- Generics

---

## **სლაიდი 4: Classes vs Interfaces**

```typescript
// Interface
interface IUser {
  id: number;
  name: string;
  getEmail(): string;
}

// Class implementing Interface
class User implements IUser {
  constructor(public id: number, public name: string, 
              private email: string) {}

  getEmail(): string {
    return this.email;
  }
}

// Usage
const user: IUser = new User(1, "გიორგი", "giorgi@example.com");
console.log(user.getEmail()); // "giorgi@example.com"
```

---

## **სლაიდი 5: Inheritance (მემკვიდრეობა)**

```typescript
// Base Class
class Animal {
  constructor(public name: string) {}

  move(distance: number): void {
    console.log(`${this.name} moved ${distance}m`);
  }
}

// Derived Class — extends
class Dog extends Animal {
  constructor(public name: string, public breed: string) {
    super(name); // მშობელი კლასის constructor-ის გამოძახება
  }

  bark(): void {
    console.log(`${this.name} says: Woof!`);
  }
}

// გამოყენება
const myDog = new Dog("რექსი", "German Shepherd");
myDog.move(10);  // "რექსი moved 10m"
myDog.bark();    // "რექსი says: Woof!"
console.log(myDog.breed); // "German Shepherd"
```

---

## **სლაიდი 6: OOP in React - Class Components**

```typescript
import React, { Component } from 'react';

interface Props {
  title: string;
}

interface State {
  count: number;
}

class Counter extends Component<Props, State> {
  state: State = {
    count: 0
  };

  increment = (): void => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>
          Increment
        </button>
      </div>
    );
  }
}

// გამოყენება App-ში:
// <Counter title="My Counter" />
```

---

## **სლაიდი 7: API Service Class - Basic Example**

```typescript
// api/UserService.ts
interface User {
  id: number;
  name: string;
  email: string;
}

class UserService {
  private baseUrl: string;

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
  }

  async getUsers(): Promise<User[]> {
    const response = await fetch(`${this.baseUrl}/users`);
    return await response.json();
  }

  async getUserById(id: number): Promise<User> {
    const response = await fetch(`${this.baseUrl}/users/${id}`);
    return await response.json();
  }

  async createUser(userData: Omit<User, 'id'>): Promise<User> {
    const response = await fetch(`${this.baseUrl}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return await response.json();
  }
}

// გამოყენება:
async function main() {
  const userService = new UserService('https://jsonplaceholder.typicode.com');

  // GET ყველა მომხმარებელი
  const users = await userService.getUsers();
  console.log(users); // User[]

  // GET ერთი მომხმარებელი
  const user = await userService.getUserById(1);
  console.log(user.name);

  // POST ახალი მომხმარებელი
  const newUser = await userService.createUser({
    name: 'ნინო',
    email: 'nino@example.com'
  });
  console.log(newUser.id); // 11 (მოჩვენებითი API)
}
```

---

## **სლაიდი 8: Advanced API Class with Error Handling**

```typescript
class ApiClient {
  private baseURL: string;
  private headers: HeadersInit;

  constructor(baseURL: string, token?: string) {
    this.baseURL = baseURL;
    this.headers = {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      headers: this.headers
    });
    return this.handleResponse<T>(response);
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data)
    });
    return this.handleResponse<T>(response);
  }
}

// გამოყენება:
const api = new ApiClient('https://jsonplaceholder.typicode.com', 'my-token-123');

// ტიპიზირებული GET მოთხოვნა
const posts = await api.get<Post[]>('/posts');
console.log(posts[0].title);

// POST მოთხოვნა
const newPost = await api.post<Post>('/posts', {
  title: 'New Post',
  body: 'Content here',
  userId: 1
});
console.log(newPost.id);
```

---

## **სლაიდი 9: Using API Class in React Component**

```typescript
// App.tsx-ში გამოყენება:
// <UserList />

import React, { Component } from 'react';
import { ApiClient } from '../services/ApiClient';

interface User {
  id: number;
  name: string;
  email: string;
}

interface Props {}

interface State {
  users: User[];
  loading: boolean;
  error: string | null;
}

class UserList extends Component<Props, State> {
  private apiClient: ApiClient;

  constructor(props: Props) {
    super(props);
    this.apiClient = new ApiClient('https://jsonplaceholder.typicode.com');
    this.state = {
      users: [],
      loading: false,
      error: null
    };
  }

  async componentDidMount(): Promise<void> {
    this.setState({ loading: true });
    try {
      const users = await this.apiClient.get<User[]>('/users');
      this.setState({ users, loading: false });
    } catch (error) {
      this.setState({ 
        error: 'Failed to fetch users', 
        loading: false 
      });
    }
  }

  render() {
    const { users, loading, error } = this.state;
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    );
  }
}
```

---

## **სლაიდი 10: Abstract Class for API Services**

```typescript
// Abstract base class
abstract class BaseApiService<T> {
  protected baseUrl: string;
  protected resourceName: string;

  constructor(baseUrl: string, resourceName: string) {
    this.baseUrl = baseUrl;
    this.resourceName = resourceName;
  }

  abstract transformData(data: any): T;

  async getAll(): Promise<T[]> {
    const response = await fetch(`${this.baseUrl}/${this.resourceName}`);
    const data = await response.json();
    return data.map((item: any) => this.transformData(item));
  }

  async getById(id: number): Promise<T> {
    const response = await fetch(
      `${this.baseUrl}/${this.resourceName}/${id}`
    );
    const data = await response.json();
    return this.transformData(data);
  }
}

// Concrete implementation
class PostService extends BaseApiService<Post> {
  constructor(baseUrl: string) {
    super(baseUrl, 'posts');
  }

  transformData(data: any): Post {
    return {
      id: data.id,
      title: data.title,
      body: data.body,
      userId: data.userId
    };
  }
}

// გამოყენება:
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const postService = new PostService('https://jsonplaceholder.typicode.com');

// getAll() იყენებს მშობელი BaseApiService-ის ლოგიკას
const allPosts = await postService.getAll();
console.log(allPosts[0].title);

// getById() ასევე მშობლიდან + transformData
const singlePost = await postService.getById(1);
console.log(singlePost.title);
```

---

## **სლაიდი 11: Generic Repository Pattern**

```typescript
interface IRepository<T> {
  getAll(): Promise<T[]>;
  getById(id: number): Promise<T>;
  create(item: Omit<T, 'id'>): Promise<T>;
  update(id: number, item: Partial<T>): Promise<T>;
  delete(id: number): Promise<void>;
}

class Repository<T extends { id: number }> 
  implements IRepository<T> {
  
  private baseUrl: string;
  private endpoint: string;

  constructor(baseUrl: string, endpoint: string) {
    this.baseUrl = baseUrl;
    this.endpoint = endpoint;
  }

  async getAll(): Promise<T[]> {
    const res = await fetch(`${this.baseUrl}/${this.endpoint}`);
    return await res.json();
  }

  async getById(id: number): Promise<T> {
    const res = await fetch(`${this.baseUrl}/${this.endpoint}/${id}`);
    return await res.json();
  }

  async create(item: Omit<T, 'id'>): Promise<T> {
    const res = await fetch(`${this.baseUrl}/${this.endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    });
    return await res.json();
  }

  async update(id: number, item: Partial<T>): Promise<T> {
    const res = await fetch(`${this.baseUrl}/${this.endpoint}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    });
    return await res.json();
  }

  async delete(id: number): Promise<void> {
    await fetch(`${this.baseUrl}/${this.endpoint}/${id}`, {
      method: 'DELETE'
    });
  }
}

// Usage — Generic Repository
interface User { id: number; name: string; email: string; }
interface Post { id: number; title: string; body: string; }

const userRepo = new Repository<User>('https://jsonplaceholder.typicode.com', 'users');
const postRepo = new Repository<Post>('https://jsonplaceholder.typicode.com', 'posts');

// TypeScript ამოწმებს ტიპებს Repository-ს მიხედვით
const users = await userRepo.getAll();     // User[]
const user = await userRepo.getById(1);    // User
const newUser = await userRepo.create({ name: 'თამარ', email: 'tamar@example.com' }); // User
await userRepo.update(1, { name: 'Updated' }); // Partial<User>
await userRepo.delete(1); // void

const posts = await postRepo.getAll();     // Post[]
```

---

## **სლაიდი 12: Real-World Example - E-Commerce**

```typescript
// Models
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  inStock: boolean;
}

interface CartItem {
  product: Product;
  quantity: number;
}

class ShoppingCart {
  private items: CartItem[] = [];
  private taxRate: number;

  constructor(taxRate: number = 0.18) {
    this.taxRate = taxRate;
  }

  addItem(product: Product, quantity: number = 1): void {
    const existingItem = this.items.find(
      item => item.product.id === product.id
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
  }

  removeItem(productId: number): void {
    this.items = this.items.filter(
      item => item.product.id !== productId
    );
  }

  getSubtotal(): number {
    return this.items.reduce(
      (sum, item) => sum + (item.product.price * item.quantity), 
      0
    );
  }

  getTotal(): number {
    return this.getSubtotal() * (1 + this.taxRate);
  }

  getItemCount(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }
}

### ShoppingCart-ის გამოყენების მაგალითი

```typescript
// 1. პროდუქტების შექმნა
const laptop: Product = { id: 1, title: 'MacBook Pro', price: 5999, category: 'electronics', image: 'laptop.jpg', inStock: true };
const mouse: Product = { id: 2, title: 'Magic Mouse', price: 129, category: 'electronics', image: 'mouse.jpg', inStock: true };
const ebook: Product = { id: 3, title: 'TypeScript Guide', price: 45, category: 'digital', image: 'ebook.jpg', inStock: true };

// 2. კალათის შექმნა 18% გადასახადით
const cart = new ShoppingCart(0.18);

// 3. პროდუქტების დამატება
cart.addItem(laptop, 1);
cart.addItem(mouse, 2);

// 4. იგივე პროდუქტის დამატება — quantity გაიზრდება
cart.addItem(mouse, 1); // mouse quantity ახლა = 3

// 5. გამოთვლები
console.log(cart.getSubtotal());    // 5999*1 + 129*3 = 6386
console.log(cart.getTotal());       // 6386 * 1.18 = 7535.48
console.log(cart.getItemCount());   // 1 + 3 = 4

// 6. პროდუქტის წაშლა
cart.removeItem(2);  // mouse წაიშლება

// 7. ციფრული პროდუქტის დამატება
cart.addItem(ebook, 2);

console.log(cart.getItemCount());   // 1 (laptop) + 2 (ebook) = 3
console.log(cart.getSubtotal());    // 5999 + 45*2 = 6089
console.log(cart.getTotal());       // 6089 * 1.18 = 7185.02
```

---

## **სლაიდი 13: Classwork - Exercise 1**

### **ავტომობილების მართვის სისტემა**

**დავალება:**
შექმენით კლასები მანქანებისთვის:

```typescript
// შექმენით:
1. აბსტრაქტული კლასი Vehicle
   - properties: brand, model, year, speed
   - methods: start(), stop(), accelerate()

2. კლასი Car extends Vehicle
   - დამატებითი property: numberOfDoors
   - override method: accelerate()

3. კლასი Motorcycle extends Vehicle
   - დამატებითი property: hasSidecar
   - override method: accelerate()

4. შექმენით 2 Car და 1 Motorcycle ინსტანცი
5. გამოიყენეთ ყველა მეთოდი
```

---

## **სლაიდი 14: Classwork - Exercise 2**

### **API Service for Blog Posts**

**დავალება:**
შექმენით API სერვისი ბლოგ პოსტებისთვის:

```typescript
interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  published: boolean;
}

// შექმენით:
1. კლასი PostService
   - მეთოდები:
     * getAllPosts(): Promise<Post[]>
     * getPublishedPosts(): Promise<Post[]>
     * getPostById(id: number): Promise<Post>
     * createPost(post: Omit<Post, 'id'>): Promise<Post>
     * updatePost(id: number, updates: Partial<Post>): Promise<Post>
     * deletePost(id: number): Promise<void>
     * searchPosts(query: string): Promise<Post[]>

2. დაამატეთ error handling
3. გამოიყენეთ fetch ან axios
4. test API: https://jsonplaceholder.typicode.com/posts
```

---

## **სლაიდი 15: Classwork - Exercise 3**

### **React Class Component with API**

**დავალება:**
შექმენით React კომპონენტი:

```typescript
// შექმენით:
1. TypeScript interface-ები:
   - Product { id, name, price, image, category }
   - Props {}
   - State { products, filteredProducts, loading, error, searchQuery }

2. Class Component ProductCatalog
   - გამოიყენეთ ApiClient კლასი
   - componentDidMount - ჩატვირთოს პროდუქტები
   - search functionality
   - filter by category
   - add to cart functionality
   - loading და error states

3. დამატებითი features:
   - pagination
   - sort by price/name
   - favorite products (localStorage)
```

---

## **სლაიდი 16: Best Practices**

### **OOP Best Practices in TypeScript/React**

✅ **Do's:**
- Use interfaces for type safety
- Implement dependency injection
- Follow Single Responsibility Principle
- Use composition over inheritance
- Make properties private/protected when needed
- Use abstract classes for shared functionality

❌ **Don'ts:**
- Avoid deep inheritance chains
- Don't expose mutable state directly
- Avoid god classes (too many responsibilities)
- Don't ignore error handling
- Avoid tight coupling between classes

---

## **სლაიდი 17: Class vs Functional Components**

```typescript
// Class Component
class Welcome extends Component<Props, State> {
  state = { count: 0 };

  componentDidMount() {
    // side effects — იტვირთება მხოლოდ ერთხელ
  }

  render() {
    return <div>{this.state.count}</div>;
  }
}

// გამოყენება:
// <Welcome title="Hello" />

// Functional Component (Modern React)
const Welcome: React.FC<Props> = (props) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // side effects
  }, []);

  return <div>{count}</div>;
};

// გამოყენება:
// <Welcome title="Hello" />
```

**როდის გამოვიყენოთ Class?**
- Legacy code
- Error boundaries
- When you need lifecycle methods
- Learning OOP concepts

---

## **სლაიდი 18: Resources & Next Steps**

**სასარგებლო რესურსები:**

📚 **Documentation:**
- TypeScript Handbook: https://www.typescriptlang.org/docs/
- React Docs: https://react.dev/

🎓 **Practice:**
- LeetCode - OOP problems
- Build a full CRUD app
- Contribute to open source

📖 **Books:**
- "Learning TypeScript" by Josh Goldberg
- "Clean Code" by Robert Martin


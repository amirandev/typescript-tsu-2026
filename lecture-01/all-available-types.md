# TypeScript-ში ხელმისაწვდომი ტიპები

## პრიმიტიული ტიპები
| ტიპი | აღწერა | მაგალითი |
|------|--------|----------|
| `string` | ტექსტური მონაცემები | `let name: string = "ნიკა"` |
| `number` | რიცხვითი მონაცემები | `let age: number = 25` |
| `boolean` | ლოგიკური მნიშვნელობა | `let isActive: boolean = true` |
| `null` | null მნიშვნელობა | `let data: null = null` |
| `undefined` | განუსაზღვრელი | `let value: undefined = undefined` |
| `symbol` | უნიკალური იდენტიფიკატორი | `let sym: symbol = Symbol("key")` |

## მასივები
| ტიპი | აღწერა | მაგალითი |
|------|--------|----------|
| `string[]` | სტრინგების მასივი | `let users: string[] = ["ნიკა", "ანა"]` |
| `Array<string>` | სტრინგების მასივი | `let items: Array<string> = ["a", "b"]` |

## Tuple (ფიქსირებული სიგრძის მასივი)
| ტიპი | აღწერა | მაგალითი |
|------|--------|----------|
| `[string, number]` | tuple | `let user: [string, number] = ["nika", 25]` |

## Enum
```ts
enum OrderStatus { Pending, Processing, Shipped, Delivered }
enum UserRole { Admin = "admin", User = "user", Guest = "guest" }
```

## სპეციალური ტიპები
| ტიპი | აღწერა |
|------|--------|
| `any` | ნებისმიერი ტიპი (თავიდან აიცილეთ) |
| `unknown` | უცნობი ტიპი (უსაფრთხო) |
| `void` | ცარიელი (ფუნქცია არ აბრუნებს) |
| `never` | არასდროს (შეცდომა/უსასრულო ციკლი) |

## Union & Intersection
| ტიპი | მაგალითი |
|------|----------|
| Union | `string \| number` |
| Intersection | `User & Admin` |

## Type Alias
```ts
type UserID = string | number;
type Status = "active" | "inactive" | "pending";
type Callback = (data: string) => void;
```

## Interface
```ts
interface User { id: number; name: string; email: string }
interface Product { id: number; title: string; price: number }
```

## Utility Types (ჩაშენებული)
| ტიპი | აღწერა |
|------|--------|
| `Partial<T>` | ყველა ველი optional |
| `Required<T>` | ყველა ველი სავალდებულო |
| `Readonly<T>` | ყველა ველი readonly |
| `Pick<T, K>` | ირჩევს მითითებულ ველებს |
| `Omit<T, K>` | შლის მითითებულ ველებს |
| `Record<K, V>` | ობიექტის ტიპი |
| `Exclude<T, U>` | გამორიცხავს ტიპებს |
| `Extract<T, U>` | იღებს მხოლოდ საერთო ტიპებს |
| `NonNullable<T>` | შლის null/undefined |
| `ReturnType<T>` | ფუნქციის დაბრუნების ტიპი |
| `Parameters<T>` | ფუნქციის პარამეტრების ტიპი |
| `Awaited<T>` | Promise-ის შედეგის ტიპი |

## DOM ტიპები (ბრაუზერში)
- `HTMLElement`, `HTMLDivElement`, `HTMLInputElement`, `HTMLButtonElement`
- `MouseEvent`, `KeyboardEvent`, `InputEvent`, `SubmitEvent`
- `NodeList`, `Document`, `Window`

## Generics
```ts
function getFirst<T>(arr: T[]): T { return arr[0]; }
interface ApiResponse<T> { data: T; status: number; message: string }
```

## Mapped & Conditional Types
```ts
type Nullable<T> = { [P in keyof T]: T[P] | null };
type IsString<T> = T extends string ? true : false;
```

## Function Types
```ts
type ClickHandler = (event: MouseEvent) => void;
type ApiCall = (url: string) => Promise<unknown>;
```

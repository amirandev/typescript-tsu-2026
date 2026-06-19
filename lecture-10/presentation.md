# ლექცია 10 — JSON მონაცემები, map(), Bootstrap 5 Table CRUD

## სასწავლო მიზნები

- JSON ფაილიდან მონაცემების ჩატვირთვა
- `map()` ფუნქციით სიის გამოტანა
- Bootstrap 5 Table-ის გამოყენება React-ში
- Delete ღილაკი და localStorage-ში წაშლილი ID-ების შენახვა
- Search/filter includes() მეთოდით

---

## 1. JSON მონაცემები React-ში

`data.json` — ჩვეულებრივი JSON ფაილი, რომელსაც პირდაპირ ვიმპორტირებთ.

```json
[
  { "id": 1, "name": "Laptop", "category": "Electronics", "price": 1200 },
  { "id": 2, "name": "Phone", "category": "Electronics", "price": 800 }
]
```

React-ში ჩატვირთვა:

```tsx
import productsData from "./data.json";
```

---

## 2. ტიპის განსაზღვრა (Interface)

მონაცემების ტიპს ვქმნით Interface-ით:

```tsx
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
}
```

შემდეგ ვიყენებთ: `useState<Product[]>(productsData)`

---

## 3. map() ფუნქცია

`map()` — მასივის თითოეულ ელემენტზე გადაურბენს და აბრუნებს ახალ მასივს.

```tsx
products.map((product) => (
  <tr key={product.id}>
    <td>{product.id}</td>
    <td>{product.name}</td>
    <td>{product.category}</td>
    <td>${product.price}</td>
  </tr>
))
```

> `key` აუცილებელია — React იყენებს ელემენტების იდენტიფიკაციისთვის.

---

## 4. Bootstrap 5 Table

Bootstrap 5-ის კლასები მაგიდისთვის:

```html
<table className="table table-striped table-hover">
  <thead className="table-dark">
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Category</th>
      <th>Price</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {products.map(p => (
      <tr key={p.id}>...</tr>
    ))}
  </tbody>
</table>
```

---

## 5. Delete ფუნქციონალი

```tsx
function handleDelete(id: number): void {
  const updated = products.filter(p => p.id !== id);
  setProducts(updated);
}
```

---

## 6. localStorage — წაშლილი ID-ების შენახვა

`localStorage` — ბრაუზერის მუდმივი მეხსიერება.

```tsx
// შენახვა
const deletedIds = JSON.parse(localStorage.getItem("deletedIds") || "[]");
deletedIds.push(id);
localStorage.setItem("deletedIds", JSON.stringify(deletedIds));

// წაკითხვა
const saved = JSON.parse(localStorage.getItem("deletedIds") || "[]");
```

> მონაცემები რჩება გვერდის განახლების შემდეგაც!

---

## 7. useEffect — localStorage-დან აღდგენა

```tsx
useEffect(() => {
  const saved = localStorage.getItem("deletedIds");
  if (saved) {
    setDeletedIds(JSON.parse(saved));
  }
}, []);
```

---

## 8. მონაცემების ფილტრაცია (Search)

JavaScript `includes()` — ამოწმებს, შეიცავს თუ არა სტრიქონი ქვესტრიქონს.

```tsx
const filtered = products.filter(p =>
  p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  p.category.toLowerCase().includes(searchTerm.toLowerCase())
);
```

---

## 9. სრული კომპონენტის სტრუქტურა

```tsx
export default function App() {
  const [products, setProducts] = useState<Product[]>(productsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletedIds, setDeletedIds] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("deletedIds");
    if (saved) setDeletedIds(JSON.parse(saved));
  }, []);

  const visible = products
    .filter(p => !deletedIds.includes(p.id))
    .filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

  function handleDelete(id: number) { ... }

  return ( ... );
}
```

---

## 10. useState vs useEffect — როდის რა გამოვიყენოთ

| Hook | როდის გამოვიყენოთ |
|------|-------------------|
| `useState` | კომპონენტის მონაცემების შესანახად |
| `useEffect` | გვერდის ჩატვირთვისას მოქმედებებისთვის (localStorage, API) |

---

## Summary

- **JSON import**: `import data from "./data.json"`
- **map()**: მასივის ელემენტებზე გადარბენა და JSX-ის დაბრუნება
- **Bootstrap 5 Table**: `table`, `table-striped`, `table-hover`
- **localStorage**: `getItem`, `setItem`, `JSON.parse`, `JSON.stringify`
- **includes()**: ტექსტის ძებნა სტრიქონში
- **Delete**: `filter()` + `useState`

# საკლასო დავალება — ლექცია 10

## დავალება 1: JSON მონაცემების ჩატვირთვა

შექმენით ფაილი `employees.json` შემდეგი მონაცემებით:

```json
[
  { "id": 1, "name": "ნინო", "position": "დეველოპერი", "salary": 3000 },
  { "id": 2, "name": "გიორგი", "position": "დიზაინერი", "salary": 2500 },
  { "id": 3, "name": "თამარი", "position": "მენეჯერი", "salary": 4000 },
  { "id": 4, "name": "დავითი", "position": "დეველოპერი", "salary": 3500 },
  { "id": 5, "name": "ანა", "position": "ტესტერი", "salary": 2200 }
]
```

```tsx
import employeesData from "./employees.json";

interface Employee {
  id: number;
  name: string;
  position: string;
  salary: number;
}
```

**ამოცანა:** გამოიტანეთ თანამშრომლების სია Bootstrap 5 table-ში `map()`-ის გამოყენებით.

---

## დავალება 2: Search ფილტრი

დაამატეთ საძიებო ველი, რომელიც ფილტრავს თანამშრომლებს `name` ან `position` მიხედვით.

```tsx
const [searchTerm, setSearchTerm] = useState("");

const filtered = employees.filter(emp =>
  emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  emp.position.toLowerCase().includes(searchTerm.toLowerCase())
);
```

---

## დავალება 3: Delete ღილაკი

დაამატეთ თითოეულ სტრიქონზე წაშლის ღილაკი (`btn btn-danger btn-sm`).

```tsx
<button
  className="btn btn-danger btn-sm"
  onClick={() => handleDelete(emp.id)}
>
  წაშლა
</button>
```

---

## დავალება 4: localStorage

წაშლილი ID-ები შეინახეთ localStorage-ში და აღადგინეთ გვერდის ჩატვირთვისას.

```tsx
useEffect(() => {
  const saved = localStorage.getItem("deletedEmployeeIds");
  if (saved) {
    setDeletedIds(JSON.parse(saved));
  }
}, []);

function handleDelete(id: number) {
  const updated = [...deletedIds, id];
  setDeletedIds(updated);
  localStorage.setItem("deletedEmployeeIds", JSON.stringify(updated));
}
```

---

## დავალება 5: Bootstrap 5 Styling

გამოიყენეთ Bootstrap 5 კლასები:

- `container my-4` — კონტეინერი
- `form-control mb-3` — საძიებო ველი
- `table table-striped table-hover` — მაგიდა
- `table-dark` — სათაურის სტრიქონი
- `btn btn-danger btn-sm` — წაშლის ღილაკი
- `badge bg-primary` — პოზიციისთვის

---

## მოსალოდნელი შედეგი

```
┌─────────────────────────────────────────────────────┐
│  🔍 [_________________________]                    │
│                                                     │
│  ID │ Name   │ Position    │ Salary  │ Actions     │
│  ───┼────────┼─────────────┼─────────┼──────────── │
│  1  │ ნინო   │ დეველოპერი │ $3000   │ [წაშლა]    │
│  2  │ გიორგი │ დიზაინერი  │ $2500   │ [წაშლა]    │
│  3  │ თამარი │ მენეჯერი   │ $4000   │ [წაშლა]    │
│  4  │ დავითი │ დეველოპერი │ $3500   │ [წაშლა]    │
│  5  │ ანა    │ ტესტერი    │ $2200   │ [წაშლა]    │
└─────────────────────────────────────────────────────┘
```

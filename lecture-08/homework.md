# საშინაო დავალება — ლექცია 08

## Todo List DOM-ით და ტიპებით

შექმენით ფაილი `homework-08.ts` (და `homework-08.html`) — სრულფასოვანი Todo აპლიკაცია DOM მანიპულაციით და TypeScript ტიპებით.

### მოთხოვნები

```ts
interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
  priority: "low" | "medium" | "high";
}
```

### დავალება 1: HTML სტრუქტურა

```html
<body>
  <h1>Todo სია</h1>

  <div id="todoForm">
    <input type="text" id="todoInput" placeholder="ახალი დავალება" />
    <select id="prioritySelect">
      <option value="low">დაბალი</option>
      <option value="medium">საშუალო</option>
      <option value="high">მაღალი</option>
    </select>
    <button id="addBtn">დამატება</button>
  </div>

  <div id="filters">
    <button data-filter="all">ყველა</button>
    <button data-filter="active">აქტიური</button>
    <button data-filter="completed">დასრულებული</button>
  </div>

  <ul id="todoList"></ul>
  <div id="stats"></div>
</body>
```

### დავალება 2: CRUD ოპერაციები

```ts
const todos: Todo[] = [];
let nextId: number = 1;

function addTodo(text: string, priority: Todo["priority"]): void {
  // შექმენით Todo ობიექტი
  // დაამატეთ todos მასივში
  // გამოიძახეთ renderTodos()
}

function toggleTodo(id: number): void {
  // შეცვალეთ completed სტატუსი
  // გამოიძახეთ renderTodos()
}

function deleteTodo(id: number): void {
  // წაშალეთ Todo მასივიდან
  // გამოიძახეთ renderTodos()
}

function clearCompleted(): void {
  // წაშალეთ ყველა დასრულებული
}
```

### დავალება 3: Rendering

```ts
type FilterType = "all" | "active" | "completed";
let currentFilter: FilterType = "all";

function renderTodos(): void {
  const list = document.querySelector("#todoList") as HTMLUListElement;
  list.innerHTML = "";

  // გაფილტრეთ currentFilter-ის მიხედვით
  // თითოეული Todo-სთვის შექმენით <li> ელემენტი:
  //   - checkbox (completed)
  //   - ტექსტი
  //   - priority ბეიჯი
  //   - წაშლის ღილაკი
  //   - თუ completed -> გადახაზული ტექსტი
}
```

### დავალება 4: Stats

```ts
function updateStats(): void {
  // გამოთვალეთ:
  //   - სულ დავალებები
  //   - დასრულებული
  //   - აქტიური
  //   - % შესრულება
  // გამოიტანეთ #stats div-ში
}
```

### დავალება 5: Keyboard Events

```ts
const todoInput = document.querySelector("#todoInput") as HTMLInputElement;

todoInput.addEventListener("keydown", (event: KeyboardEvent) => {
  // თუ Enter დაჭერილია -> addTodo()
});

// Escape ღილაკი ასუფთავებს ველს
```

### დავალება 6: Filter Buttons

```ts
document.querySelector("#filters")?.addEventListener("click", (e) => {
  // event delegation: target-ის data-filter-ის მიხედვით
  // შეცვალეთ currentFilter
  // active ღილაკს დაამატეთ "active-filter" კლასი
});
```

### Bonus: Local Storage

```ts
function saveTodos(): void {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos(): void {
  const data = localStorage.getItem("todos");
  if (data) {
    // აღადგინეთ todos (Date-ის ჩათვლით)
  }
}

// შეინახეთ ყოველი ცვლილების შემდეგ
// ჩატვირთეთ გვერდის ჩატვირთვისას
```

### Bonus Drag & Drop

```ts
// გადაათრიეთ Todo ელემენტები მათი რიგის შესაცვლელად
// გამოიყენეთ HTMLDragEvent
```

### Bonus: Double-click Edit

```ts
// ორმაგი დაჭერით ტექსტზე -> input ველი
// Enter-ით ან blur-ით შეინახეთ ცვლილება
```

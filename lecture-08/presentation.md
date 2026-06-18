# ლექცია 08 — DOM Typing & Event Handling

## სასწავლო მიზნები

- `querySelector` და `as HTMLInputElement`
- `HTMLElement` ტიპები
- Event Listeners ტიპებით
- Form handling ტიპებით
- TypeScript-ის როლი DOM მანიპულაციაში

---

## 1. DOM-ი TypeScript-ში

TypeScript უზრუნველყოფს DOM API-ს ტიპებს, მაგრამ ზოგიერთი მეთოდი ზუსტ ტიპს ვერ აბრუნებს.

```ts
// HTML-ის მაგალითი:
// <input id="username" type="text" />
// <button id="btn">დააჭირე</button>
```

---

## 2. querySelector — პრობლემა

`querySelector` აბრუნებს `Element | null`-ს, რაც ძალიან ზოგადია.

```ts
const input = document.querySelector("#username");
//  ^? const input: Element | null

// input.value  ← Error: 'value' არ არსებობს Element-ზე
```

---

## 3. as HTMLInputElement — Type Assertion

`as` გამოყენებით ვაკონკრეტებთ ელემენტის ტიპს.

```ts
const input = document.querySelector("#username") as HTMLInputElement;

// input.value → string (TypeScript-მა იცის)
// input.type  → string
// input.checked → boolean (თუ checkbox)
```

---

## 4. HTML ელემენტების ტიპები

```ts
HTMLInputElement    // <input>
HTMLButtonElement   // <button>
HTMLDivElement      // <div>
HTMLParagraphElement // <p>
HTMLAnchorElement   // <a>
HTMLFormElement     // <form>
HTMLSelectElement   // <select>
HTMLTextAreaElement // <textarea>
HTMLHeadingElement  // <h1>-<h6>
HTMLImageElement    // <img>
```

---

## 5. Non-null assertion (!)

თუ დარწმუნებული ხართ, რომ ელემენტი არსებობს — გამოიყენეთ `!`.

```ts
const input = document.querySelector("#username")!;
//  ^? const input: Element (null-ის გარეშე)

// ან assertion-თან ერთად:
const input = document.querySelector("#username") as HTMLInputElement;
```

> `!` — TypeScript-ს ეუბნება: "ნუ მეკითხები, დარწმუნებული ვარ".

---

## 6. Optional Chaining (?.)

თუ ელემენტი შეიძლება არ არსებობდეს:

```ts
const input = document.querySelector("#username");
input?.addEventListener("input", () => {}); // უსაფრთხო

const value = (input as HTMLInputElement | null)?.value;
```

---

## 7. Event Listeners

```ts
const button = document.querySelector("#btn") as HTMLButtonElement;

button.addEventListener("click", (event: MouseEvent) => {
  console.log(event.clientX, event.clientY);
});
```

---

## 8. Event ტიპები

```ts
MouseEvent     // click, dblclick, mouseover, mouseout
KeyboardEvent  // keydown, keyup, keypress
InputEvent     // input
FocusEvent     // focus, blur
SubmitEvent    // form submit
ChangeEvent    // change (input, select)
DragEvent      // drag & drop
TouchEvent     // touch events (მობილური)
```

---

## 9. Form Handling — მაგალითი

```ts
// HTML: <form id="loginForm">
//   <input id="email" type="email" />
//   <input id="password" type="password" />
// </form>

const form = document.querySelector("#loginForm") as HTMLFormElement;

form.addEventListener("submit", (event: SubmitEvent) => {
  event.preventDefault();

  const emailInput = document.querySelector("#email") as HTMLInputElement;
  const passwordInput = document.querySelector("#password") as HTMLInputElement;

  const formData = {
    email: emailInput.value,
    password: passwordInput.value,
  };

  console.log("ფორმის მონაცემები:", formData);
});
```

---

## 10. FormData API

```ts
form.addEventListener("submit", (event: SubmitEvent) => {
  event.preventDefault();

  const formData = new FormData(event.target as HTMLFormElement);

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  console.log({ email, password });
});
```

---

## 11. Input Events

```ts
const input = document.querySelector("#username") as HTMLInputElement;

input.addEventListener("input", (event: Event) => {
  const target = event.target as HTMLInputElement;
  console.log(`მომხმარებელი წერს: ${target.value}`);
});

input.addEventListener("change", (event: Event) => {
  console.log(`საბოლოო მნიშვნელობა: ${input.value}`);
});
```

---

## 12. Type-Safe Form Validation

```ts
interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

function validateForm(): ValidationResult {
  const email = document.querySelector("#email") as HTMLInputElement;
  const password = document.querySelector("#password") as HTMLInputElement;

  const errors: Record<string, string> = {};

  if (!email.value.includes("@")) {
    errors.email = "გთხოვთ, შეიყვანეთ ვალიდური იმეილი";
  }

  if (password.value.length < 6) {
    errors.password = "პაროლი უნდა შეიცავდეს მინიმუმ 6 სიმბოლოს";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
```

---

## 13. Styles and Classes

```ts
const div = document.querySelector("#myDiv") as HTMLDivElement;

// CSS კლასები
div.classList.add("active");
div.classList.remove("hidden");
div.classList.toggle("visible");
div.classList.contains("active"); // boolean

// ინლაინ სტილები
div.style.color = "red";
div.style.backgroundColor = "#f0f0f0";
div.style.display = "flex";
```

---

## 14. Element Creation

```ts
const list = document.querySelector("#userList") as HTMLUListElement;
const names: string[] = ["გიორგი", "ნინო", "თამარი"];

for (const name of names) {
  const li = document.createElement("li");       // HTMLLIElement
  li.textContent = name;
  li.className = "user-item";
  list.appendChild(li);
}
```

---

## 15. Dataset (data-* attributes)

```ts
// HTML: <div id="card" data-user-id="42" data-role="admin">...</div>

const card = document.querySelector("#card") as HTMLDivElement;

const userId = card.dataset.userId; // string | undefined
const role = card.dataset.role;     // string | undefined

console.log(`მომხმარებელი #${userId}, როლი: ${role}`);
```

---

## 16. Window Events

```ts
window.addEventListener("load", () => {
  console.log("გვერდი ჩაიტვირთა");
});

window.addEventListener("resize", (event: UIEvent) => {
  console.log(`ფანჯრის ზომა: ${window.innerWidth}x${window.innerHeight}`);
});

window.addEventListener("scroll", () => {
  console.log(`Scroll position: ${window.scrollY}`);
});
```

---

---

## 🧪 Project Example — User Directory

სრული პროექტის მაგალითი, რომელიც აერთიანებს ყველა ზემოთ ნახსენებ კონცეფციას:

**User Directory** — დინამიური მომხმარებელთა მართვის აპლიკაცია.

**ნახსენები კონცეფციები:**

| # | კონცეფცია | ფაილი |
|---|-----------|-------|
| 1 | `querySelector` + `as HTMLInputElement` — DOM ელემენტების ტიპიზირება | `src/index.ts:40-55` |
| 2 | `SubmitEvent`, `MouseEvent`, `Event` — Event Listeners | `src/index.ts:65-92` |
| 3 | Form validation `ValidationResult` — Type-Safe Validation | `src/index.ts:118-135` |
| 4 | `form.reset()`, `event.preventDefault()` — Form handling | `src/index.ts:97-116` |
| 5 | `document.createElement()` + `appendChild()` — Element creation | `src/index.ts:173-222` |
| 6 | `classList.add/remove` — Styles and classes | `src/index.ts:147-149` |
| 7 | `dataset.userId` / `dataset.role` — Data attributes | `src/index.ts:179-180` |
| 8 | `window.addEventListener("resize")` — Window events | `src/index.ts:90-92` |
| 9 | `event.target as HTMLInputElement` — Event target typing | `src/index.ts:76-77, 83-84` |
| 10 | `as HTMLButtonElement`, `as HTMLDivElement` — Type assertions | `src/index.ts:40-55` |
| 11 | Non-null assertion `!` — `document.querySelector(...)!` | implicit in constructor |

**გასაშვებად:**

```bash
npm run build    # კომპილაცია
npm start        # სერვერის გაშვება
```

## Summary

- **Type assertions**: `as HTMLInputElement`
- **HTML element types**: `HTMLDivElement`, `HTMLButtonElement` და ა.შ.
- **Non-null**: `document.querySelector("#id")!`
- **Event types**: `MouseEvent`, `KeyboardEvent`, `SubmitEvent`...
- **Form Handling**: `event.preventDefault()`, `FormData`
- **Element creation**: `document.createElement()`
- **Dataset**: `element.dataset`

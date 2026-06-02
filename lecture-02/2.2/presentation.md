# ლექცია 02.2: Forms & DOM TypeScript-ში

## სასწავლო მიზნები

- გავეცნოთ `querySelector`-ის ტიპებს TypeScript-ში
- ვისწავლოთ DOM ელემენტების ტიპიზაცია
- გავიგოთ ფორმების მოვლენების (events) დამუშავება
- ვნახოთ სხვადასხვა input ტიპების ვალიდაცია

---

## სლაიდი 1: querySelector — ტიპები

`querySelector` აბრუნებს `Element | null`:

```ts
const heading = document.querySelector("h1");
// ტიპი: Element | null
```

სპეციფიკური ელემენტისთვის — Type Assertion:

```ts
const input = document.querySelector("#email") as HTMLInputElement;
// ტიპი: HTMLInputElement
```

---

## სლაიდი 2: კონკრეტული HTML ელემენტების ტიპები

| ელემენტი | ტიპი |
|-----------|------|
| `<input>` | `HTMLInputElement` |
| `<button>` | `HTMLButtonElement` |
| `<form>` | `HTMLFormElement` |
| `<select>` | `HTMLSelectElement` |
| `<textarea>` | `HTMLTextAreaElement` |
| `<div>` | `HTMLDivElement` |
| `<a>` | `HTMLAnchorElement` |

```ts
const emailInput = document.querySelector('[type="email"]') as HTMLInputElement;
const submitBtn = document.querySelector("#submit") as HTMLButtonElement;
const form = document.querySelector("form") as HTMLFormElement;
```

---

## სლაიდი 3: Non-null Assertion (!)

როდესაც დარწმუნებული ხართ, რომ ელემენტი არსებობს:

```ts
const input = document.querySelector("#email")!;
// ! — ვამბობთ TypeScript-ს: "დამიჯერე, null არ არის"
```

ჯობს `as`-თან ერთად:

```ts
const input = document.querySelector("#email") as HTMLInputElement;
```

**სიფრთხილე:** `!` მხოლოდ TypeScript-ისთვისაა — Runtime-ში მაინც შეიძლება იყოს `null`.

---

## სლაიდი 4: Optional Chaining (?.)

უსაფრთხო წვდომა ელემენტებზე:

```ts
const input = document.querySelector("#email");
// input — HTMLInputElement | null

const value = input?.value;
// თუ input არის null, value იქნება undefined
// თუ input არსებობს, მიიღებს value-ს

// ძველი მიდგომა:
if (input) {
  console.log(input.value);
}
```

---

## სლაიდი 5: ფორმის მოვლენები (Events)

"submit" მოვლენის დამუშავება:

```ts
const form = document.querySelector("form") as HTMLFormElement;

form.addEventListener("submit", (event: SubmitEvent) => {
  event.preventDefault(); // გვერდის გადატვირთვის თავიდან აცილება

  const formData = new FormData(form);
  const email = formData.get("email") as string;
  const age = Number(formData.get("age"));
});
```

---

## სლაიდი 6: Input მოვლენები

```ts
const nameInput = document.querySelector("#name") as HTMLInputElement;

nameInput.addEventListener("input", (event: Event) => {
  const target = event.target as HTMLInputElement;
  console.log("მიმდინარე მნიშვნელობა:", target.value);
});

nameInput.addEventListener("change", (event: Event) => {
  console.log("მნიშვნელობა შეიცვალა:", (event.target as HTMLInputElement).value);
});
```

- `input` — ყოველი სიმბოლოს შეცვლაზე
- `change` — როდესაც ფოკუსი იკარგება და მნიშვნელობა შეცვლილია

---

## სლაიდი 7: Input ტიპები TypeScript-ში

```ts
// Text
const nameInput = document.querySelector("#name") as HTMLInputElement;
const name: string = nameInput.value;

// Number
const ageInput = document.querySelector("#age") as HTMLInputElement;
const age: number = Number(ageInput.value);

// Checkbox
const agreeInput = document.querySelector("#agree") as HTMLInputElement;
const isAgreed: boolean = agreeInput.checked;

// Radio
const genderInput = document.querySelector('input[name="gender"]:checked') as HTMLInputElement;
const gender: string = genderInput?.value ?? "";

// Select
const citySelect = document.querySelector("#city") as HTMLSelectElement;
const selectedCity: string = citySelect.value;

// Textarea
const bioTextarea = document.querySelector("#bio") as HTMLTextAreaElement;
const bio: string = bioTextarea.value;
```

---

## სლაიდი 8: ფორმის ვალიდაცია — პრიმიტივები

```ts
function validateName(value: string): string | null {
  if (value.trim().length < 2) {
    return "სახელი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს";
  }
  return null; // null = შეცდომა არ არის
}

function validateAge(value: string): string | null {
  const age = Number(value);
  if (isNaN(age) || age < 18 || age > 120) {
    return "ასაკი უნდა იყოს 18-120 წლის ფარგლებში";
  }
  return null;
}

function validateEmail(value: string): string | null {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return "გთხოვთ, შეიყვანოთ valid ელ-ფოსტა";
  }
  return null;
}
```

---

## სლაიდი 9: ტიპის შემოწმება (Type Guards)

```ts
function processFormValue(value: unknown): string {
  if (typeof value === "string") {
    return value.trim();
  }
  if (typeof value === "number") {
    return value.toString();
  }
  if (value instanceof File) {
    return value.name;
  }
  return "";
}

// instanceof — კლასების შესამოწმებლად
if (event.target instanceof HTMLInputElement) {
  console.log(event.target.value);
}
```

---

## სლაიდი 10: Complete Form Example

```ts
interface FormData {
  name: string;
  email: string;
  age: number;
  gender: string;
  city: string;
  agree: boolean;
  bio: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  age?: string;
  gender?: string;
  city?: string;
  agree?: string;
  bio?: string;
}
```

---

## სლაიდი 11: Form -> Object

```ts
function getFormData(form: HTMLFormElement): FormData {
  const data = new FormData(form);

  return {
    name: data.get("name") as string,
    email: data.get("email") as string,
    age: Number(data.get("age")),
    gender: data.get("gender") as string,
    city: data.get("city") as string,
    agree: data.get("agree") === "on",
    bio: data.get("bio") as string,
  };
}
```

---

## სლაიდი 12: ვალიდაციის ფუნქცია

```ts
function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (data.name.trim().length < 2) {
    errors.name = "სახელი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    errors.email = "არასწორი ელ-ფოსტის ფორმატი";
  }

  if (isNaN(data.age) || data.age < 18 || data.age > 120) {
    errors.age = "ასაკი უნდა იყოს 18-120";
  }

  if (!data.city) {
    errors.city = "გთხოვთ აირჩიოთ ქალაქი";
  }

  if (!data.agree) {
    errors.agree = "თანხმობა სავალდებულოა";
  }

  return errors;
}
```

---

## სლაიდი 13: შეცდომების ჩვენება

```ts
function showErrors(errors: FormErrors): void {
  // გავასუფთავოთ ძველი შეცდომები
  document.querySelectorAll(".error").forEach(el => el.remove());

  for (const [field, message] of Object.entries(errors)) {
    if (!message) continue;

    const input = document.querySelector(`[name="${field}"]`);
    const errorEl = document.createElement("p");
    errorEl.className = "error";
    errorEl.style.color = "red";
    errorEl.textContent = message;

    input?.insertAdjacentElement("afterend", errorEl);
  }
}
```

---

## სლაიდი 14: ყველაფერი ერთად

```ts
const form = document.querySelector("#registrationForm") as HTMLFormElement;

form.addEventListener("submit", (event: SubmitEvent) => {
  event.preventDefault();

  const data = getFormData(form);
  const errors = validateForm(data);

  if (Object.keys(errors).length > 0) {
    showErrors(errors);
    return;
  }

  console.log("გაგზავნილი მონაცემები:", data);
  alert("რეგისტრაცია წარმატებულია!");
  form.reset();
});
```

---

## შეჯამება

| საკითხი | აღწერა |
|---------|---------|
| `querySelector` | აბრუნებს `Element | null`-ს |
| Type Assertion | `as HTMLInputElement` — აზუსტებს ტიპს |
| `!` | Non-null assertion |
| `?.` | Optional chaining |
| Event types | `SubmitEvent`, `Event` |
| Validation | ტიპიზირებული შეცდომების ობიექტი |
| `FormData` | ფორმის მონაცემების წაკითხვა |

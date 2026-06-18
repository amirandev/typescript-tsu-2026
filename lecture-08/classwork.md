# საკლასო დავალება — ლექცია 08

## ინტერაქტიული ფორმა Type-Safe DOM-ით

შექმენით HTML ფაილი `classwork-08.html` და მასში TypeScript კოდი (შეგიძლიათ `<script>` ტეგში ან ცალკე `.ts` ფაილში, რომელიც კომპილირდება).

### HTML სტრუქტურა

```html
<!DOCTYPE html>
<html lang="ka">
<head>
  <title>რეგისტრაციის ფორმა</title>
</head>
<body>
  <h1>მომხმარებლის რეგისტრაცია</h1>

  <form id="registrationForm">
    <div>
      <label>სახელი:</label>
      <input type="text" id="name" />
    </div>
    <div>
      <label>იმეილი:</label>
      <input type="email" id="email" />
    </div>
    <div>
      <label>ასაკი:</label>
      <input type="number" id="age" />
    </div>
    <div>
      <label>როლი:</label>
      <select id="role">
        <option value="user">მომხმარებელი</option>
        <option value="admin">ადმინი</option>
        <option value="guest">სტუმარი</option>
      </select>
    </div>
    <button type="submit" id="submitBtn">რეგისტრაცია</button>
  </form>

  <div id="errorMessages"></div>
  <div id="userList"></div>

  <script src="classwork-08.js"></script>
</body>
</html>
```

### დავალება 1: Form Submit Handler

```ts
const form = document.querySelector("#registrationForm") as HTMLFormElement;
// 1. preventDefault()
// 2. წამოიღეთ ყველა ველის მნიშვნელობა
// 3. გამოიტანეთ კონსოლში
```

### დავალება 2: Input Validation

```ts
interface FormErrors {
  name?: string;
  email?: string;
  age?: string;
}

function validateForm(
  name: string,
  email: string,
  age: number
): FormErrors {
  // დააბრუნეთ შეცდომების ობიექტი
  // name: მინიმუმ 2 სიმბოლო
  // email: უნდა შეიცავდეს @
  // age: 18-დან 120-მდე
}
```

### დავალება 3: Error Display

```ts
const errorContainer = document.querySelector("#errorMessages") as HTMLDivElement;

function displayErrors(errors: FormErrors): void {
  // გაასუფთავეთ errorContainer
  // თუ არის შეცდომები, შექმენით <p> ელემენტები
  // თითოეული შეცდომისთვის დაამატეთ კლასი "error"
}
```

### დავალება 4: User List Display

```ts
interface UserData {
  name: string;
  email: string;
  age: number;
  role: string;
}

const users: UserData[] = [];

function addUserToList(user: UserData): void {
  // დაამატეთ user მასივში
  // გამოიტანეთ ყველა მომხმარებელი userList div-ში
  // თითოეულისთვის შექმენით <div class="user-card">
}
```

### დავალება 5: Real-time Validation

```ts
const nameInput = document.querySelector("#name") as HTMLInputElement;

nameInput.addEventListener("blur", () => {
  // როცა ველი კარგავს ფოკუსს, შეამოწმეთ
  // თუ ცარიელია, დაამატეთ "invalid" კლასი
  // თუ სწორია, დაამატეთ "valid" კლასი
});
```

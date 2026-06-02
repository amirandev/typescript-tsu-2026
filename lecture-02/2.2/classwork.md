# ლექცია 02.2: საკლასო სამუშაო

## მიზანი

DOM ელემენტების ტიპიზაციისა და ფორმების ვალიდაციის პრაქტიკა.

## ამოცანა 1: querySelector ტიპები

გახსენით ბრაუზერის კონსოლი (ან დაწერეთ TypeScript-ში) და განსაზღვრეთ შემდეგი ელემენტების ტიპები:

```ts
// 1. იპოვეთ h1 ელემენტი და მიანიჭეთ ტიპი
const title = document.querySelector("h1");
// რა ტიპი აქვს title-ს?

// 2. იპოვეთ #submit button და მიანიჭეთ სწორი ტიპი
const submitBtn = document.querySelector("#submit") as HTMLButtonElement;

// 3. იპოვეთ ინფუთი name="email" და მიანიჭეთ სწორი ტიპი
const emailInput = document.querySelector('[name="email"]') as HTMLInputElement;
```

**დავალება:** რა მოხდება, თუ `as`-ს არ გამოვიყენებთ? სცადეთ `emailInput.value`-ს წაკითხვა `as`-ის გარეშე.

---

## ამოცანა 2: Optional Chaining

```ts
const input = document.querySelector("#maybe-exists");
// input არის Element | null

// გამოიყენეთ optional chaining, რომ უსაფრთხოდ წაიკითხოთ value
const value = input?.value; // რატომ არ მუშაობს ეს?

// სწორი გზა:
const input2 = document.querySelector("#maybe-exists") as HTMLInputElement | null;
const value2 = input2?.value; // OK
```

**კითხვა:** რატომ სჭირდება `?.value`-ს `HTMLInputElement` ტიპი?

---

## ამოცანა 3: მარტივი ფორმის ვალიდაცია

დაწერეთ ფუნქცია `validateTextField`, რომელიც ამოწმებს ტექსტის ველს:

```ts
function validateTextField(value: string, minLength: number, maxLength: number): string | null {
  // დააბრუნეთ შეცდომის ტექსტი, თუ:
  // 1. value ცარიელია (ან მხოლოდ space-ები)
  // 2. value-ს სიგრძე < minLength
  // 3. value-ს სიგრძე > maxLength
  // თუ ყველაფერი OK — null
}

// ტესტები:
console.log(validateTextField("", 2, 50));    // "ველი სავალდებულოა"
console.log(validateTextField("A", 2, 50));   // "მინიმუმ 2 სიმბოლო"
console.log(validateTextField("Hello", 2, 50)); // null
```

---

## ამოცანა 4: Checkbox-ის შემოწმება

```ts
interface FormValues {
  username: string;
  agreeToTerms: boolean;
}

function getCheckboxValue(checkbox: HTMLInputElement): boolean {
  // დააბრუნეთ checkbox-ის მდგომარეობა
}

// გამოყენება:
const agreeInput = document.querySelector("#agree") as HTMLInputElement;
const isChecked = getCheckboxValue(agreeInput);
console.log(`მომხმარებელი ${isChecked ? "თანახმაა" : "არ არის თანახმა"}`);
```

---

## ამოცანა 5: ფორმის ობიექტად გადაყვანა

დაწერეთ ფუნქცია, რომელიც ფორმიდან კითხულობს მონაცემებს:

```ts
interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

function getLoginData(form: HTMLFormElement): LoginForm {
  // გამოიყენეთ FormData API
  // დააბრუნეთ LoginForm ტიპის ობიექტი
}
```

---

## ამოცანა 6 (საკლასო): Registration Form Validation

HTML სტრუქტურა:

```html
<form id="registerForm">
  <input name="fullName" placeholder="სრული სახელი" />
  <input name="email" type="email" placeholder="ელ-ფოსტა" />
  <input name="password" type="password" placeholder="პაროლი" />
  <input name="confirmPassword" type="password" placeholder="გაიმეორეთ პაროლი" />
  <input name="age" type="number" placeholder="ასაკი" />
  <select name="country">
    <option value="">აირჩიეთ ქვეყანა</option>
    <option value="ge">საქართველო</option>
    <option value="us">აშშ</option>
  </select>
  <label><input name="agree" type="checkbox" /> ვეთანხმები წესებს</label>
  <button type="submit">რეგისტრაცია</button>
</form>
```

**დაწერეთ TypeScript კოდი, რომელიც:**
1. კითხულობს ფორმის მონაცემებს
2. ამოწმებს: fullName (min 2), email (regex), password (min 6), confirmPassword (უნდა ემთხვეოდეს password-ს), age (18-120), country (არ იყოს ცარიელი), agree (true)
3. შეცდომების არსებობისას — აჩვენებს მათ
4. წარმატების შემთხვევაში — `console.log`-ში გამოაქვს მონაცემები

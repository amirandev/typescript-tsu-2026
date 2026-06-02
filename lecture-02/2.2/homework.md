# ლექცია 02.2: საშინაო დავალება

## ამოცანა 1: querySelector ტიპების განსაზღვრა

მოცემულია HTML კოდი. განსაზღვრეთ თითოეული ცვლადის ტიპი:

```ts
// HTML:
// <div id="app">
//   <form class="search-form">
//     <input type="text" name="query" id="searchInput" />
//     <button type="submit" class="btn">ძებნა</button>
//   </form>
//   <ul id="results"></ul>
//   <p class="status">მზადაა</p>
// </div>

const app = document.querySelector("#app");
const form = document.querySelector(".search-form");
const searchInput = document.querySelector("#searchInput");
const submitBtn = document.querySelector(".btn");
const resultsList = document.querySelector("#results");
const statusText = document.querySelector(".status");
const allButtons = document.querySelectorAll("button");
```

**დავალება:**
1. რა ტიპი აქვს თითოეულს `as`-ის გარეშე?
2. გადაწერეთ ყველა ცვლადი სწორი Type Assertion-ით (`as`)

---

## ამოცანა 2: User Profile Form

შექმენით ინტერფეისი `UserProfile` და ფუნქცია, რომელიც ფორმიდან კითხულობს მონაცემებს:

```ts
interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  gender: "male" | "female" | "other";
  newsletter: boolean;
  bio: string;
}

function getUserProfile(form: HTMLFormElement): UserProfile {
  // გამოიყენეთ FormData
  // ყველა field-ს აქვს name ატრიბუტი
  // gender — radio ღილაკების სახელი
  // newsletter — checkbox
  // bio — textarea
}

// ვალიდაცია:
function validateUserProfile(data: UserProfile): Record<string, string> {
  const errors: Record<string, string> = {};
  // დაამატეთ ვალიდაცია თითოეული ველისთვის
  return errors;
}
```

**მოთხოვნები:**
- `firstName`, `lastName` — min 2 სიმბოლო
- `email` — valid ფორმატი
- `phone` — მინიმუმ 9 ციფრი (მხოლოდ ციფრები)
- `age` — 18-დან 100-მდე
- `gender` — ერთ-ერთი უნდა იყოს არჩეული
- `newsletter` — boolean (არ არის სავალდებულო)
- `bio` — max 500 სიმბოლო

---

## ამოცანა 3: Dynamic Form Validation

შექმენით ფუნქცია, რომელიც ამოწმებს ველს რეალურ დროში (როგორც კი მომხმარებელი წერს):

```ts
// მიამაგრეთ "input" მოვენა თითოეულ ველზე
// როდესაც მომხმარებელი წერს, შეამოწმეთ ველი და:
// - თუ შეცდომაა: დაამატეთ კლასი "error" და აჩვენეთ შეცდომის ტექსტი
// - თუ არ არის შეცდომა: მოაშორეთ "error" კლასი და შეცდომის ტექსტი

function setupLiveValidation(form: HTMLFormElement): void {
  // 1. იპოვეთ ყველა input, select, textarea
  // 2. თითოეულს მიამაგრეთ "input" / "change" მოვენა
  // 3. მოვენაში გამოიძახეთ validateField
}

function validateField(input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement): string | null {
  // დააბრუნეთ შეცდომის ტექსტი ან null
  // გამოიყენეთ input.name, input.type, input.value
}
```

---

## ამოცანა 4 (Advanced): მრავალგვერდიანი ფორმა

შექმენით 3-გვერდიანი ფორმა (multi-step form), სადაც თითოეულ ეტაპზე ხდება ვალიდაცია:

```ts
interface Step1Data {
  fullName: string;
  email: string;
}

interface Step2Data {
  address: string;
  city: string;
  zipCode: string;
}

interface Step3Data {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

type FormStep = 1 | 2 | 3;

class MultiStepForm {
  private currentStep: FormStep = 1;
  private step1Data: Partial<Step1Data> = {};
  private step2Data: Partial<Step2Data> = {};
  private step3Data: Partial<Step3Data> = {};

  constructor(form: HTMLFormElement) {
    // 1. აჩვენეთ მხოლოდ მიმდინარე step-ის ველები
    // 2. "Next" ღილაკი — ამოწმებს მიმდინარე step-ს და გადადის შემდეგზე
    // 3. "Back" ღილაკი — უბრუნდება წინა step-ს
    // 4. "Submit" — ამოწმებს ყველა step-ს და აგზავნის
  }

  private validateCurrentStep(): boolean {
    // შეამოწმეთ მხოლოდ მიმდინარე step-ის ველები
  }

  private goToStep(step: FormStep): void {
    // დამალეთ ყველა step-ის კონტეინერი
    // აჩვენეთ მხოლოდ მოთხოვნილი step
  }

  submit(): void {
    // შეაერთეთ სამივე step-ის მონაცემები
    // და გამოიტანეთ console.log-ში
  }
}
```

**მოთხოვნები:**
- Step 1: fullName (min 3), email (valid)
- Step 2: address (არ იყოს ცარიელი), city (არ იყოს ცარიელი), zipCode (5 ციფრი)
- Step 3: cardNumber (16 ციფრი), expiryDate (MM/YY ფორმატი), cvv (3 ციფრი)
- ყოველ step-ზე ვალიდაციის გავლის გარეშე შემდეგზე გადასვლა არ შეიძლება

---

## ჩაბარების პირობები

1. ყველა ცვლადს აქვს სწორი ტიპი (DOM ელემენტების ჩათვლით)
2. ინტერფეისები სწორად არის განსაზღვრული
3. ვალიდაციის ფუნქციები მუშაობს სწორად
4. კოდი კომპილირდება შეცდომების გარეშე (`npx tsc`)
5. (სურვილისამებრ) HTML გვერდი მუშაობს ბრაუზერში

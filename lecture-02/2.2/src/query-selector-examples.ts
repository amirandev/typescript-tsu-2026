// querySelector-ის ტიპები

// 1. საბაზისო — Element | null
const heading = document.querySelector("h1");
// heading: Element | null

// 2. Type Assertion — კონკრეტული ტიპი
const nameInput = document.querySelector("#name") as HTMLInputElement;
// nameInput: HTMLInputElement

// 3. Non-null assertion (!)
const emailInput = document.querySelector("#email")!;
// emailInput: Element (არა null)

// 4. Type Assertion + Non-null
const passwordInput = document.querySelector("#password") as HTMLInputElement;
// passwordInput: HTMLInputElement

// 5. Optional Chaining — უსაფრთხო წვდომა
const maybeInput = document.querySelector("#maybe") as HTMLInputElement | null;
const value = maybeInput?.value;
// value: string | undefined

// 6. querySelectorAll — NodeList
const allInputs = document.querySelectorAll("input");
// allInputs: NodeListOf<HTMLInputElement>

allInputs.forEach((input: HTMLInputElement) => {
  console.log(input.name, input.value);
});

// 7. querySelectorAll generic-ით
const buttons = document.querySelectorAll<HTMLButtonElement>("button");
// buttons: NodeListOf<HTMLButtonElement>

// 8. Multiple ელემენტები
const form = document.querySelector("form") as HTMLFormElement;
const submitBtn = form?.querySelector('button[type="submit"]') as HTMLButtonElement | null;
const firstInput = form?.querySelector("input") as HTMLInputElement | null;

// 9. Type Guard-ით შემოწმება
const element = document.querySelector("#unknown");
if (element instanceof HTMLInputElement) {
  console.log(element.value); // TypeScript-მა იცის, რომ ეს HTMLInputElement-ია
} else if (element instanceof HTMLTextAreaElement) {
  console.log(element.value);
}

export {};

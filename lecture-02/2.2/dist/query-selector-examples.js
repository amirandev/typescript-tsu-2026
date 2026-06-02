// querySelector-ის ტიპები
// 1. საბაზისო — Element | null
const heading = document.querySelector("h1");
// heading: Element | null
// 2. Type Assertion — კონკრეტული ტიპი
const nameInput = document.querySelector("#name");
// nameInput: HTMLInputElement
// 3. Non-null assertion (!)
const emailInput = document.querySelector("#email");
// emailInput: Element (არა null)
// 4. Type Assertion + Non-null
const passwordInput = document.querySelector("#password");
// passwordInput: HTMLInputElement
// 5. Optional Chaining — უსაფრთხო წვდომა
const maybeInput = document.querySelector("#maybe");
const value = maybeInput === null || maybeInput === void 0 ? void 0 : maybeInput.value;
// value: string | undefined
// 6. querySelectorAll — NodeList
const allInputs = document.querySelectorAll("input");
// allInputs: NodeListOf<HTMLInputElement>
allInputs.forEach((input) => {
    console.log(input.name, input.value);
});
// 7. querySelectorAll generic-ით
const buttons = document.querySelectorAll("button");
// buttons: NodeListOf<HTMLButtonElement>
// 8. Multiple ელემენტები
const form = document.querySelector("form");
const submitBtn = form === null || form === void 0 ? void 0 : form.querySelector('button[type="submit"]');
const firstInput = form === null || form === void 0 ? void 0 : form.querySelector("input");
// 9. Type Guard-ით შემოწმება
const element = document.querySelector("#unknown");
if (element instanceof HTMLInputElement) {
    console.log(element.value); // TypeScript-მა იცის, რომ ეს HTMLInputElement-ია
}
else if (element instanceof HTMLTextAreaElement) {
    console.log(element.value);
}
export {};

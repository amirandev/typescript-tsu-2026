import { RegistrationFormData, RegistrationFormErrors } from "./interfaces";
import { validateRegistrationForm } from "./validation";

function getFormData(form: HTMLFormElement): RegistrationFormData {
  const data = new FormData(form);

  return {
    fullName: data.get("fullName") as string,
    email: data.get("email") as string,
    password: data.get("password") as string,
    confirmPassword: data.get("confirmPassword") as string,
    age: Number(data.get("age")),
    country: data.get("country") as string,
    agree: data.get("agree") === "on",
  };
}

function showErrors(errors: RegistrationFormErrors): void {
  document.querySelectorAll(".error-message").forEach(el => el.remove());

  for (const [field, message] of Object.entries(errors)) {
    if (!message) continue;

    const input = document.querySelector(`[name="${field}"]`);
    const errorEl = document.createElement("p");
    errorEl.className = "error-message";
    errorEl.style.color = "red";
    errorEl.style.fontSize = "14px";
    errorEl.style.margin = "4px 0";
    errorEl.textContent = message;

    input?.insertAdjacentElement("afterend", errorEl);
  }
}

function clearErrors(): void {
  document.querySelectorAll(".error-message").forEach(el => el.remove());
}

function getInputValue(input: HTMLInputElement): string | number | boolean {
  if (input.type === "checkbox") {
    return input.checked;
  }
  if (input.type === "number") {
    return Number(input.value);
  }
  return input.value;
}

const form = document.querySelector("#registrationForm") as HTMLFormElement;
const submitBtn = document.querySelector("#submitBtn") as HTMLButtonElement;

if (form) {
  form.addEventListener("submit", (event: SubmitEvent) => {
    event.preventDefault();

    clearErrors();

    const data = getFormData(form);
    const errors = validateRegistrationForm(data);

    if (Object.keys(errors).length > 0) {
      showErrors(errors);
      return;
    }

    console.log("გაგზავნილი მონაცემები:", data);
    alert("რეგისტრაცია წარმატებულია! 🎉");
    form.reset();
  });
}

if (submitBtn) {
  submitBtn.addEventListener("click", () => {
    const emailInput = document.querySelector('[name="email"]') as HTMLInputElement;
    if (emailInput) {
      console.log("Email value:", getInputValue(emailInput));
    }
  });
}

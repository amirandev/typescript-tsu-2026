import { validate } from "./validation.js";

const FIELDS = ["username", "email", "password", "confirmPassword", "acceptTerms"];

const defaultValues: Record<string, string | boolean> = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "user",
  acceptTerms: false,
};

function getInputValue(name: string): string | boolean {
  const el = document.querySelector(`[name="${name}"]`) as HTMLInputElement | HTMLSelectElement | null;
  if (!el) return "";
  if (el instanceof HTMLInputElement && el.type === "checkbox") return el.checked;
  return el.value;
}

function setInputValue(name: string, value: string | boolean): void {
  const el = document.querySelector(`[name="${name}"]`) as HTMLInputElement | HTMLSelectElement | null;
  if (!el) return;
  if (el instanceof HTMLInputElement && el.type === "checkbox") {
    el.checked = value as boolean;
  } else {
    (el as HTMLInputElement).value = value as string;
  }
}

function getAllValues(): Record<string, string | boolean> {
  const vals: Record<string, string | boolean> = {};
  for (const f of FIELDS) vals[f] = getInputValue(f);
  vals.role = getInputValue("role");
  return vals;
}

async function checkUsernameAvailable(username: string): Promise<string> {
  await new Promise((r) => setTimeout(r, 500));
  const taken = ["admin", "root", "test"];
  return taken.includes(username.toLowerCase()) ? "Username is already taken" : "";
}

function applyDefaults(): void {
  for (const [key, val] of Object.entries(defaultValues)) setInputValue(key, val);
}

function getContainer(): HTMLElement {
  return document.getElementById("register-form")!.parentElement!;
}

document.addEventListener("DOMContentLoaded", () => {
  applyDefaults();

  const pre = document.getElementById("defaults-display");
  if (pre) pre.textContent = JSON.stringify(defaultValues, null, 2);

  const form = document.getElementById("register-form") as HTMLFormElement;
  if (!form) return;

  let debounceTimer: ReturnType<typeof setTimeout>;

  function handleChange(): void {
    const values = getAllValues();

    for (const f of FIELDS) {
      const err = validate(f, values[f], values);
      (document.querySelector(`[data-error="${f}"]`) as HTMLElement).textContent = err;
      const inp = document.querySelector(`[name="${f}"]`) as HTMLElement;
      if (err) inp?.classList.add("field-error");
      else inp?.classList.remove("field-error");
    }

    const username = values.username as string;
    if (username.length >= 3) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(async () => {
        const result = await checkUsernameAvailable(username);
        const errEl = document.querySelector('[data-error="username"]') as HTMLElement;
        errEl.textContent = result;
        const inp = document.querySelector('[name="username"]') as HTMLElement;
        if (result) inp?.classList.add("field-error");
        else inp?.classList.remove("field-error");
      }, 600);
    }
  }

  for (const el of form.querySelectorAll<HTMLElement>("[name]")) {
    el.addEventListener("input", handleChange);
    el.addEventListener("change", handleChange);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    handleChange();
    const container = getContainer();
    const allErrors = container.querySelectorAll<HTMLElement>("[data-error]");
    let hasError = false;
    for (const el of allErrors) {
      if (el.textContent && el.textContent !== "") hasError = true;
    }
    if (!hasError) {
      alert("Registration successful! (simulated server redirect)");
      window.location.hash = "#/about";
    }
  });
});

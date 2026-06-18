import { validate, clearErrors, showError } from "./validation.js";

const FIELDS = ["name", "email", "message"];

function getFormValues(form: HTMLFormElement): Record<string, string> {
  const fd = new FormData(form);
  const vals: Record<string, string> = {};
  for (const f of FIELDS) vals[f] = (fd.get(f) as string) ?? "";
  return vals;
}

function handleSubmit(e: SubmitEvent): void {
  e.preventDefault();
  const form = e.currentTarget as HTMLFormElement;
  const container = form.parentElement!;
  const values = getFormValues(form);

  clearErrors(container, FIELDS);

  const errors: Record<string, string> = {};
  for (const f of FIELDS) {
    const err = validate(f, values[f]);
    if (err) errors[f] = err;
  }

  if (Object.keys(errors).length > 0) {
    for (const [f, msg] of Object.entries(errors)) showError(container, f, msg);
    return;
  }

  alert("Form submitted successfully! (simulated server redirect to /about)");
  window.location.hash = "#/about";
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form") as HTMLFormElement | null;
  if (form) form.addEventListener("submit", handleSubmit);
});

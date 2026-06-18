export function validate(field: string, value: string | boolean, allValues?: Record<string, string | boolean>): string {
  if (field === "name" && (value as string).length < 2)
    return "Name must be at least 2 characters";
  if (field === "email") {
    const v = value as string;
    if (!v.includes("@") || !v.includes("."))
      return "Please enter a valid email address";
  }
  if (field === "message" && (value as string).length < 10)
    return "Message must be at least 10 characters";
  if (field === "username") {
    const v = value as string;
    if (v.length < 3) return "Username must be at least 3 characters";
    if (!/^[a-zA-Z0-9_]+$/.test(v)) return "Only letters, numbers, and underscores";
  }
  if (field === "password" && (value as string).length < 6)
    return "Password must be at least 6 characters";
  if (field === "confirmPassword") {
    const v = value as string;
    if (v !== allValues?.password) return "Passwords do not match";
  }
  if (field === "acceptTerms" && !value) return "You must accept the terms";
  return "";
}

export function isFormValid(errors: Record<string, string>): boolean {
  return Object.values(errors).every((e) => e === "");
}

export function clearErrors(container: HTMLElement, fields: string[]): void {
  for (const f of fields) {
    const el = container.querySelector(`[data-error="${f}"]`);
    if (el) el.textContent = "";
    const input = container.querySelector(`[name="${f}"]`) as HTMLElement | null;
    if (input) input.classList.remove("field-error");
  }
}

export function showError(container: HTMLElement, field: string, msg: string): void {
  const el = container.querySelector(`[data-error="${field}"]`);
  if (el) el.textContent = msg;
  const input = container.querySelector(`[name="${field}"]`) as HTMLElement | null;
  if (input && msg) input.classList.add("field-error");
  else if (input) input.classList.remove("field-error");
}

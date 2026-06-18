export function validate(field, value, allValues) {
    if (field === "name" && value.length < 2)
        return "Name must be at least 2 characters";
    if (field === "email") {
        const v = value;
        if (!v.includes("@") || !v.includes("."))
            return "Please enter a valid email address";
    }
    if (field === "message" && value.length < 10)
        return "Message must be at least 10 characters";
    if (field === "username") {
        const v = value;
        if (v.length < 3)
            return "Username must be at least 3 characters";
        if (!/^[a-zA-Z0-9_]+$/.test(v))
            return "Only letters, numbers, and underscores";
    }
    if (field === "password" && value.length < 6)
        return "Password must be at least 6 characters";
    if (field === "confirmPassword") {
        const v = value;
        if (v !== allValues?.password)
            return "Passwords do not match";
    }
    if (field === "acceptTerms" && !value)
        return "You must accept the terms";
    return "";
}
export function isFormValid(errors) {
    return Object.values(errors).every((e) => e === "");
}
export function clearErrors(container, fields) {
    for (const f of fields) {
        const el = container.querySelector(`[data-error="${f}"]`);
        if (el)
            el.textContent = "";
        const input = container.querySelector(`[name="${f}"]`);
        if (input)
            input.classList.remove("field-error");
    }
}
export function showError(container, field, msg) {
    const el = container.querySelector(`[data-error="${field}"]`);
    if (el)
        el.textContent = msg;
    const input = container.querySelector(`[name="${field}"]`);
    if (input && msg)
        input.classList.add("field-error");
    else if (input)
        input.classList.remove("field-error");
}
//# sourceMappingURL=validation.js.map
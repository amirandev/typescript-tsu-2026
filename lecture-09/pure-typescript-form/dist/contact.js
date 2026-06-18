import { validate, clearErrors, showError } from "./validation.js";
const FIELDS = ["name", "email", "message"];
function getFormValues(form) {
    const fd = new FormData(form);
    const vals = {};
    for (const f of FIELDS)
        vals[f] = fd.get(f) ?? "";
    return vals;
}
function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const container = form.parentElement;
    const values = getFormValues(form);
    clearErrors(container, FIELDS);
    const errors = {};
    for (const f of FIELDS) {
        const err = validate(f, values[f]);
        if (err)
            errors[f] = err;
    }
    if (Object.keys(errors).length > 0) {
        for (const [f, msg] of Object.entries(errors))
            showError(container, f, msg);
        return;
    }
    alert("Form submitted successfully! (simulated server redirect to /about)");
    window.location.hash = "#/about";
}
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    if (form)
        form.addEventListener("submit", handleSubmit);
});
//# sourceMappingURL=contact.js.map
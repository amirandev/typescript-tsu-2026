import { validateRegistrationForm } from "./validation";
function getFormData(form) {
    const data = new FormData(form);
    return {
        fullName: data.get("fullName"),
        email: data.get("email"),
        password: data.get("password"),
        confirmPassword: data.get("confirmPassword"),
        age: Number(data.get("age")),
        country: data.get("country"),
        agree: data.get("agree") === "on",
    };
}
function showErrors(errors) {
    document.querySelectorAll(".error-message").forEach(el => el.remove());
    for (const [field, message] of Object.entries(errors)) {
        if (!message)
            continue;
        const input = document.querySelector(`[name="${field}"]`);
        const errorEl = document.createElement("p");
        errorEl.className = "error-message";
        errorEl.style.color = "red";
        errorEl.style.fontSize = "14px";
        errorEl.style.margin = "4px 0";
        errorEl.textContent = message;
        input === null || input === void 0 ? void 0 : input.insertAdjacentElement("afterend", errorEl);
    }
}
function clearErrors() {
    document.querySelectorAll(".error-message").forEach(el => el.remove());
}
function getInputValue(input) {
    if (input.type === "checkbox") {
        return input.checked;
    }
    if (input.type === "number") {
        return Number(input.value);
    }
    return input.value;
}
const form = document.querySelector("#registrationForm");
const submitBtn = document.querySelector("#submitBtn");
if (form) {
    form.addEventListener("submit", (event) => {
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
        const emailInput = document.querySelector('[name="email"]');
        if (emailInput) {
            console.log("Email value:", getInputValue(emailInput));
        }
    });
}

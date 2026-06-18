import { validate } from "./validation.js";
const FIELDS = ["username", "email", "password", "confirmPassword", "acceptTerms"];
const defaultValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
    acceptTerms: false,
};
function getInputValue(name) {
    const el = document.querySelector(`[name="${name}"]`);
    if (!el)
        return "";
    if (el instanceof HTMLInputElement && el.type === "checkbox")
        return el.checked;
    return el.value;
}
function setInputValue(name, value) {
    const el = document.querySelector(`[name="${name}"]`);
    if (!el)
        return;
    if (el instanceof HTMLInputElement && el.type === "checkbox") {
        el.checked = value;
    }
    else {
        el.value = value;
    }
}
function getAllValues() {
    const vals = {};
    for (const f of FIELDS)
        vals[f] = getInputValue(f);
    vals.role = getInputValue("role");
    return vals;
}
async function checkUsernameAvailable(username) {
    await new Promise((r) => setTimeout(r, 500));
    const taken = ["admin", "root", "test"];
    return taken.includes(username.toLowerCase()) ? "Username is already taken" : "";
}
function applyDefaults() {
    for (const [key, val] of Object.entries(defaultValues))
        setInputValue(key, val);
}
function getContainer() {
    return document.getElementById("register-form").parentElement;
}
document.addEventListener("DOMContentLoaded", () => {
    applyDefaults();
    const pre = document.getElementById("defaults-display");
    if (pre)
        pre.textContent = JSON.stringify(defaultValues, null, 2);
    const form = document.getElementById("register-form");
    if (!form)
        return;
    let debounceTimer;
    function handleChange() {
        const values = getAllValues();
        for (const f of FIELDS) {
            const err = validate(f, values[f], values);
            document.querySelector(`[data-error="${f}"]`).textContent = err;
            const inp = document.querySelector(`[name="${f}"]`);
            if (err)
                inp?.classList.add("field-error");
            else
                inp?.classList.remove("field-error");
        }
        const username = values.username;
        if (username.length >= 3) {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(async () => {
                const result = await checkUsernameAvailable(username);
                const errEl = document.querySelector('[data-error="username"]');
                errEl.textContent = result;
                const inp = document.querySelector('[name="username"]');
                if (result)
                    inp?.classList.add("field-error");
                else
                    inp?.classList.remove("field-error");
            }, 600);
        }
    }
    for (const el of form.querySelectorAll("[name]")) {
        el.addEventListener("input", handleChange);
        el.addEventListener("change", handleChange);
    }
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        handleChange();
        const container = getContainer();
        const allErrors = container.querySelectorAll("[data-error]");
        let hasError = false;
        for (const el of allErrors) {
            if (el.textContent && el.textContent !== "")
                hasError = true;
        }
        if (!hasError) {
            alert("Registration successful! (simulated server redirect)");
            window.location.hash = "#/about";
        }
    });
});
//# sourceMappingURL=register.js.map
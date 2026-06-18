class UserDirectory {
    users = [];
    nextId = 1;
    searchQuery = "";
    sortKey = "name";
    sortDirection = "asc";
    form;
    nameInput;
    emailInput;
    roleSelect;
    submitBtn;
    searchInput;
    sortSelect;
    sortDirBtn;
    userGrid;
    totalCount;
    adminCount;
    editorCount;
    viewerCount;
    toast;
    nameError;
    emailError;
    roleError;
    constructor() {
        this.form = document.querySelector("#userForm");
        this.nameInput = document.querySelector("#name");
        this.emailInput = document.querySelector("#email");
        this.roleSelect = document.querySelector("#role");
        this.submitBtn = document.querySelector("#submitBtn");
        this.searchInput = document.querySelector("#searchInput");
        this.sortSelect = document.querySelector("#sortSelect");
        this.sortDirBtn = document.querySelector("#sortDirBtn");
        this.userGrid = document.querySelector("#userGrid");
        this.totalCount = document.querySelector("#totalCount");
        this.adminCount = document.querySelector("#adminCount");
        this.editorCount = document.querySelector("#editorCount");
        this.viewerCount = document.querySelector("#viewerCount");
        this.toast = document.querySelector("#toast");
        this.nameError = document.querySelector("#nameError");
        this.emailError = document.querySelector("#emailError");
        this.roleError = document.querySelector("#roleError");
        this.bindEvents();
        this.updateUI();
    }
    bindEvents() {
        this.form.addEventListener("submit", (event) => {
            event.preventDefault();
            this.handleSubmit();
        });
        this.nameInput.addEventListener("input", () => {
            this.clearFieldError(this.nameInput, this.nameError);
        });
        this.emailInput.addEventListener("input", () => {
            this.clearFieldError(this.emailInput, this.emailError);
        });
        this.searchInput.addEventListener("input", (event) => {
            const target = event.target;
            this.searchQuery = target.value.toLowerCase();
            this.updateUI();
        });
        this.sortSelect.addEventListener("change", (event) => {
            const target = event.target;
            this.sortKey = target.value;
            this.updateUI();
        });
        this.sortDirBtn.addEventListener("click", (event) => {
            this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
            const btn = event.target;
            btn.dataset.direction = this.sortDirection;
            btn.textContent = this.sortDirection === "asc" ? "↑ Asc" : "↓ Desc";
            this.updateUI();
        });
        window.addEventListener("resize", () => {
            console.log(`Window resized: ${window.innerWidth}x${window.innerHeight}`);
        });
    }
    handleSubmit() {
        const fields = {
            name: this.nameInput,
            email: this.emailInput,
            role: this.roleSelect,
        };
        const validation = this.validate(fields);
        if (!validation.valid) {
            this.showErrors(validation.errors);
            return;
        }
        const user = {
            id: this.nextId++,
            name: this.nameInput.value.trim(),
            email: this.emailInput.value.trim(),
            role: this.roleSelect.value,
            createdAt: new Date(),
        };
        this.users.push(user);
        this.form.reset();
        this.clearAllErrors();
        this.updateUI();
        this.showToast(`User "${user.name}" added successfully`, "success");
    }
    validate(fields) {
        const errors = {};
        const name = fields.name.value.trim();
        const email = fields.email.value.trim();
        if (name.length < 2) {
            errors.name = "Name must be at least 2 characters";
        }
        if (!email.includes("@") || !email.includes(".")) {
            errors.email = "Please enter a valid email address";
        }
        return {
            valid: Object.keys(errors).length === 0,
            errors,
        };
    }
    showErrors(errors) {
        if (errors.name) {
            this.nameInput.classList.add("error");
            this.nameError.textContent = errors.name;
        }
        if (errors.email) {
            this.emailInput.classList.add("error");
            this.emailError.textContent = errors.email;
        }
        this.showToast("Please fix the form errors", "error");
    }
    clearFieldError(input, errorEl) {
        input.classList.remove("error");
        errorEl.textContent = "";
    }
    clearAllErrors() {
        this.clearFieldError(this.nameInput, this.nameError);
        this.clearFieldError(this.emailInput, this.emailError);
    }
    getFilteredAndSortedUsers() {
        let filtered = this.users;
        if (this.searchQuery) {
            filtered = this.users.filter((user) => {
                const searchText = `${user.name} ${user.email} ${user.role}`.toLowerCase();
                return searchText.includes(this.searchQuery);
            });
        }
        const sorted = [...filtered].sort((a, b) => {
            let comparison = 0;
            switch (this.sortKey) {
                case "name":
                    comparison = a.name.localeCompare(b.name);
                    break;
                case "email":
                    comparison = a.email.localeCompare(b.email);
                    break;
                case "role":
                    comparison = a.role.localeCompare(b.role);
                    break;
                case "createdAt":
                    comparison = a.createdAt.getTime() - b.createdAt.getTime();
                    break;
            }
            return this.sortDirection === "asc" ? comparison : -comparison;
        });
        return sorted;
    }
    renderUsers() {
        const filtered = this.getFilteredAndSortedUsers();
        this.userGrid.innerHTML = "";
        if (filtered.length === 0) {
            const empty = document.createElement("div");
            empty.className = "empty-state";
            const msg = this.users.length === 0
                ? "No users yet. Add one using the form above."
                : "No users match your search.";
            empty.innerHTML = `<p>${msg}</p>`;
            this.userGrid.appendChild(empty);
            return;
        }
        for (const user of filtered) {
            const card = document.createElement("div");
            card.className = "user-card";
            card.dataset.userId = String(user.id);
            card.dataset.role = user.role;
            const nameEl = document.createElement("div");
            nameEl.className = "name";
            nameEl.textContent = this.highlightMatch(user.name);
            const emailEl = document.createElement("div");
            emailEl.className = "email";
            emailEl.textContent = user.email;
            const badge = document.createElement("span");
            badge.className = `role-badge ${user.role}`;
            badge.textContent = user.role;
            const footer = document.createElement("div");
            footer.className = "card-footer";
            const dateEl = document.createElement("span");
            dateEl.textContent = user.createdAt.toLocaleDateString();
            const actions = document.createElement("div");
            actions.className = "card-actions";
            const deleteBtn = document.createElement("button");
            deleteBtn.className = "btn btn-sm btn-danger";
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", () => {
                this.deleteUser(user.id);
            });
            actions.appendChild(deleteBtn);
            footer.appendChild(dateEl);
            footer.appendChild(actions);
            card.appendChild(nameEl);
            card.appendChild(emailEl);
            card.appendChild(badge);
            card.appendChild(footer);
            this.userGrid.appendChild(card);
        }
    }
    highlightMatch(text) {
        if (!this.searchQuery)
            return text;
        const index = text.toLowerCase().indexOf(this.searchQuery);
        if (index === -1)
            return text;
        const before = text.slice(0, index);
        const match = text.slice(index, index + this.searchQuery.length);
        const after = text.slice(index + this.searchQuery.length);
        return `${before}<span class="highlight">${match}</span>${after}`;
    }
    updateStats() {
        const adminCount = this.users.filter((u) => u.role === "admin").length;
        const editorCount = this.users.filter((u) => u.role === "editor").length;
        const viewerCount = this.users.filter((u) => u.role === "viewer").length;
        this.totalCount.textContent = String(this.users.length);
        this.adminCount.textContent = String(adminCount);
        this.editorCount.textContent = String(editorCount);
        this.viewerCount.textContent = String(viewerCount);
    }
    updateUI() {
        this.renderUsers();
        this.updateStats();
    }
    deleteUser(id) {
        const user = this.users.find((u) => u.id === id);
        this.users = this.users.filter((u) => u.id !== id);
        this.updateUI();
        if (user) {
            this.showToast(`User "${user.name}" deleted`, "success");
        }
    }
    showToast(message, type) {
        this.toast.textContent = message;
        this.toast.className = `toast ${type}`;
        this.toast.classList.add("show");
        setTimeout(() => {
            this.toast.classList.remove("show");
        }, 3000);
    }
}
document.addEventListener("DOMContentLoaded", () => {
    new UserDirectory();
});
export {};

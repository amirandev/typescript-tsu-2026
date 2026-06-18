import { User, ValidationResult, FormFields, SortDirection, SortKey } from "./types.js";

class UserDirectory {
  private users: User[] = [];
  private nextId = 1;
  private searchQuery = "";
  private sortKey: SortKey = "name";
  private sortDirection: SortDirection = "asc";

  private readonly form: HTMLFormElement;
  private readonly nameInput: HTMLInputElement;
  private readonly emailInput: HTMLInputElement;
  private readonly roleSelect: HTMLSelectElement;
  private readonly submitBtn: HTMLButtonElement;
  private readonly searchInput: HTMLInputElement;
  private readonly sortSelect: HTMLSelectElement;
  private readonly sortDirBtn: HTMLButtonElement;
  private readonly userGrid: HTMLDivElement;
  private readonly totalCount: HTMLSpanElement;
  private readonly adminCount: HTMLSpanElement;
  private readonly editorCount: HTMLSpanElement;
  private readonly viewerCount: HTMLSpanElement;
  private readonly toast: HTMLDivElement;

  private readonly nameError: HTMLSpanElement;
  private readonly emailError: HTMLSpanElement;
  private readonly roleError: HTMLSpanElement;

  constructor() {
    this.form = document.querySelector("#userForm") as HTMLFormElement;
    this.nameInput = document.querySelector("#name") as HTMLInputElement;
    this.emailInput = document.querySelector("#email") as HTMLInputElement;
    this.roleSelect = document.querySelector("#role") as HTMLSelectElement;
    this.submitBtn = document.querySelector("#submitBtn") as HTMLButtonElement;
    this.searchInput = document.querySelector("#searchInput") as HTMLInputElement;
    this.sortSelect = document.querySelector("#sortSelect") as HTMLSelectElement;
    this.sortDirBtn = document.querySelector("#sortDirBtn") as HTMLButtonElement;
    this.userGrid = document.querySelector("#userGrid") as HTMLDivElement;
    this.totalCount = document.querySelector("#totalCount") as HTMLSpanElement;
    this.adminCount = document.querySelector("#adminCount") as HTMLSpanElement;
    this.editorCount = document.querySelector("#editorCount") as HTMLSpanElement;
    this.viewerCount = document.querySelector("#viewerCount") as HTMLSpanElement;
    this.toast = document.querySelector("#toast") as HTMLDivElement;
    this.nameError = document.querySelector("#nameError") as HTMLSpanElement;
    this.emailError = document.querySelector("#emailError") as HTMLSpanElement;
    this.roleError = document.querySelector("#roleError") as HTMLSpanElement;

    this.bindEvents();
    this.updateUI();
  }

  private bindEvents(): void {
    this.form.addEventListener("submit", (event: SubmitEvent) => {
      event.preventDefault();
      this.handleSubmit();
    });

    this.nameInput.addEventListener("input", () => {
      this.clearFieldError(this.nameInput, this.nameError);
    });

    this.emailInput.addEventListener("input", () => {
      this.clearFieldError(this.emailInput, this.emailError);
    });

    this.searchInput.addEventListener("input", (event: Event) => {
      const target = event.target as HTMLInputElement;
      this.searchQuery = target.value.toLowerCase();
      this.updateUI();
    });

    this.sortSelect.addEventListener("change", (event: Event) => {
      const target = event.target as HTMLSelectElement;
      this.sortKey = target.value as SortKey;
      this.updateUI();
    });

    this.sortDirBtn.addEventListener("click", (event: MouseEvent) => {
      this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
      const btn = event.target as HTMLButtonElement;
      btn.dataset.direction = this.sortDirection;
      btn.textContent = this.sortDirection === "asc" ? "↑ Asc" : "↓ Desc";
      this.updateUI();
    });

    window.addEventListener("resize", () => {
      console.log(`Window resized: ${window.innerWidth}x${window.innerHeight}`);
    });
  }

  private handleSubmit(): void {
    const fields: FormFields = {
      name: this.nameInput,
      email: this.emailInput,
      role: this.roleSelect,
    };

    const validation = this.validate(fields);

    if (!validation.valid) {
      this.showErrors(validation.errors);
      return;
    }

    const user: User = {
      id: this.nextId++,
      name: this.nameInput.value.trim(),
      email: this.emailInput.value.trim(),
      role: this.roleSelect.value as User["role"],
      createdAt: new Date(),
    };

    this.users.push(user);
    this.form.reset();
    this.clearAllErrors();
    this.updateUI();
    this.showToast(`User "${user.name}" added successfully`, "success");
  }

  private validate(fields: FormFields): ValidationResult {
    const errors: Record<string, string> = {};
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

  private showErrors(errors: Record<string, string>): void {
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

  private clearFieldError(input: HTMLInputElement, errorEl: HTMLSpanElement): void {
    input.classList.remove("error");
    errorEl.textContent = "";
  }

  private clearAllErrors(): void {
    this.clearFieldError(this.nameInput, this.nameError);
    this.clearFieldError(this.emailInput, this.emailError);
  }

  private getFilteredAndSortedUsers(): User[] {
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

  private renderUsers(): void {
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

  private highlightMatch(text: string): string {
    if (!this.searchQuery) return text;
    const index = text.toLowerCase().indexOf(this.searchQuery);
    if (index === -1) return text;
    const before = text.slice(0, index);
    const match = text.slice(index, index + this.searchQuery.length);
    const after = text.slice(index + this.searchQuery.length);
    return `${before}<span class="highlight">${match}</span>${after}`;
  }

  private updateStats(): void {
    const adminCount = this.users.filter((u) => u.role === "admin").length;
    const editorCount = this.users.filter((u) => u.role === "editor").length;
    const viewerCount = this.users.filter((u) => u.role === "viewer").length;

    this.totalCount.textContent = String(this.users.length);
    this.adminCount.textContent = String(adminCount);
    this.editorCount.textContent = String(editorCount);
    this.viewerCount.textContent = String(viewerCount);
  }

  private updateUI(): void {
    this.renderUsers();
    this.updateStats();
  }

  private deleteUser(id: number): void {
    const user = this.users.find((u) => u.id === id);
    this.users = this.users.filter((u) => u.id !== id);
    this.updateUI();
    if (user) {
      this.showToast(`User "${user.name}" deleted`, "success");
    }
  }

  private showToast(message: string, type: "success" | "error"): void {
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

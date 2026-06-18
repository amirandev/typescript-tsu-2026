export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  createdAt: Date;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

export interface FormFields {
  name: HTMLInputElement;
  email: HTMLInputElement;
  role: HTMLSelectElement;
}

export type SortDirection = "asc" | "desc";
export type SortKey = "name" | "email" | "role" | "createdAt";

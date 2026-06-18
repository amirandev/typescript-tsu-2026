import { Form, useActionData, redirect } from "react-router";
import { useState, useEffect, useRef } from "react";
import type { Route } from "./+types/register";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Register" },
    { name: "description", content: "Create an account" },
  ];
}

const defaultValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "user",
  acceptTerms: false,
};

function validate(field: string, value: string | boolean, allValues?: typeof defaultValues): string {
  if (field === "username") {
    const v = value as string;
    if (v.length < 3) return "Username must be at least 3 characters";
    if (!/^[a-zA-Z0-9_]+$/.test(v)) return "Only letters, numbers, and underscores";
  }
  if (field === "email") {
    const v = value as string;
    if (!v.includes("@") || !v.includes(".")) return "Invalid email address";
  }
  if (field === "password") {
    const v = value as string;
    if (v.length < 6) return "Password must be at least 6 characters";
  }
  if (field === "confirmPassword") {
    const v = value as string;
    if (v !== allValues?.password) return "Passwords do not match";
  }
  if (field === "acceptTerms" && !value) return "You must accept the terms";
  return "";
}

async function checkUsernameAvailable(username: string): Promise<string> {
  await new Promise((r) => setTimeout(r, 500));
  const taken = ["admin", "root", "test"];
  return taken.includes(username.toLowerCase()) ? "Username is already taken" : "";
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const values = {
    username: formData.get("username")?.toString() || "",
    email: formData.get("email")?.toString() || "",
    password: formData.get("password")?.toString() || "",
    confirmPassword: formData.get("confirmPassword")?.toString() || "",
    role: formData.get("role")?.toString() || "user",
    acceptTerms: formData.get("acceptTerms") === "on",
  };

  const errors: Record<string, string> = {};
  for (const key of Object.keys(values) as (keyof typeof values)[]) {
    const err = validate(key, values[key], values);
    if (err) errors[key] = err;
  }

  if (Object.keys(errors).length > 0) return { errors, values };

  return redirect("/about");
}

export default function Register() {
  const actionData = useActionData<typeof action>();
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [asyncErrors, setAsyncErrors] = useState<Record<string, string>>({});
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    return () => clearTimeout(debounceRef.current);
  }, []);

  function handleChange(field: string, value: string | boolean) {
    const next = { ...values, [field]: value };
    setValues(next);

    const err = validate(field, value, next);
    setErrors((prev) => ({ ...prev, [field]: err }));

    if (field === "username" && (value as string).length >= 3) {
      clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(async () => {
        const result = await checkUsernameAvailable(value as string);
        setAsyncErrors((prev) => ({ ...prev, username: result }));
      }, 600);
    } else if (field === "username") {
      setAsyncErrors((prev) => ({ ...prev, username: "" }));
    }
  }

  function getError(field: string): string {
    return errors[field] || asyncErrors[field] || actionData?.errors?.[field] || "";
  }

  function inputClass(field: string) {
    const hasError = !!getError(field);
    return `w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 ${
      hasError
        ? "border-red-500 dark:border-red-400"
        : "border-gray-300 dark:border-gray-600"
    }`;
  }

  return (
    <main className="pt-16 pb-4">
      <div className="max-w-lg mx-auto px-4">
        <h1 className="text-4xl font-bold mb-2">Register</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Live validation as you type &mdash; like <code>wire:live</code> in
          Livewire. Default values are shown below.
        </p>

        <div className="mb-6 p-3 bg-gray-100 dark:bg-gray-800 rounded text-sm">
          <p className="font-medium mb-1">Default values used:</p>
          <pre className="text-xs">{JSON.stringify(defaultValues, null, 2)}</pre>
        </div>

        <Form method="post" className="space-y-4" noValidate>
          <div>
            <label htmlFor="username" className="block mb-1 font-medium">
              Username
            </label>
            <input
              id="username"
              name="username"
              value={values.username}
              onChange={(e) => handleChange("username", e.target.value)}
              className={inputClass("username")}
            />
            {getError("username") && (
              <p className="text-red-500 text-sm mt-1">{getError("username")}</p>
            )}
            <p className="text-xs text-gray-400 mt-1">
              Live async check: "admin", "root", "test" are taken
            </p>
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={inputClass("email")}
            />
            {getError("email") && (
              <p className="text-red-500 text-sm mt-1">{getError("email")}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 font-medium">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={values.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className={inputClass("password")}
            />
            {getError("password") && (
              <p className="text-red-500 text-sm mt-1">{getError("password")}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block mb-1 font-medium">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={values.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              className={inputClass("confirmPassword")}
            />
            {getError("confirmPassword") && (
              <p className="text-red-500 text-sm mt-1">
                {getError("confirmPassword")}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="role" className="block mb-1 font-medium">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={values.role}
              onChange={(e) => handleChange("role", e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-800"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              id="acceptTerms"
              name="acceptTerms"
              type="checkbox"
              checked={values.acceptTerms}
              onChange={(e) => handleChange("acceptTerms", e.target.checked)}
              className="h-4 w-4"
            />
            <label htmlFor="acceptTerms" className="text-sm">
              I accept the terms and conditions
            </label>
            {getError("acceptTerms") && (
              <p className="text-red-500 text-sm ml-auto">
                {getError("acceptTerms")}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Register
          </button>
        </Form>
      </div>
    </main>
  );
}

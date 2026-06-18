import { Form, useActionData, redirect } from "react-router";
import { useState } from "react";
import type { Route } from "./+types/contact";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contact Us" },
    { name: "description", content: "Get in touch with us" },
  ];
}

function validate(field: string, value: string) {
  if (field === "name" && value.length < 2)
    return "Name must be at least 2 characters";
  if (field === "email" && (!value.includes("@") || !value.includes(".")))
    return "Please enter a valid email address";
  if (field === "message" && value.length < 10)
    return "Message must be at least 10 characters";
  return "";
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const name = formData.get("name")?.toString() || "";
  const email = formData.get("email")?.toString() || "";
  const message = formData.get("message")?.toString() || "";

  const errors: Record<string, string> = {};

  if (name.length < 2) errors.name = "Name must be at least 2 characters";
  if (!email.includes("@") || !email.includes("."))
    errors.email = "Please enter a valid email address";
  if (message.length < 10) errors.message = "Message must be at least 10 characters";

  if (Object.keys(errors).length > 0) return { errors };

  return redirect("/about");
}

export default function Contact() {
  const actionData = useActionData<typeof action>();
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleChange(field: string, value: string) {
    setErrors((prev) => ({ ...prev, [field]: validate(field, value) }));
  }

  return (
    <main className="pt-16 pb-4">
      <div className="max-w-lg mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>

        <Form method="post" className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1 font-medium">
              Name
            </label>
            <input
              id="name"
              name="name"
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-800"
            />
            {(errors.name || actionData?.errors?.name) && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name || actionData?.errors?.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={(e) => handleChange("email", e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-800"
            />
            {(errors.email || actionData?.errors?.email) && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email || actionData?.errors?.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="block mb-1 font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              onChange={(e) => handleChange("message", e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-800"
            />
            {(errors.message || actionData?.errors?.message) && (
              <p className="text-red-500 text-sm mt-1">
                {errors.message || actionData?.errors?.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Send
          </button>
        </Form>
      </div>
    </main>
  );
}

import type { Route } from "./+types/about";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About Us" },
    { name: "description", content: "Learn more about us" },
  ];
}

export default function About() {
  return (
    <main className="pt-16 pb-4">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6">About Us</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
          This is a simple React Router project built with Vite, TypeScript, and
          Tailwind CSS. It demonstrates routing, forms, and server-side
          validation using React Router v8 framework mode.
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          React Router v8 treats routing as a full-stack framework, meaning
          forms and data mutations happen via server actions — no client state
          management needed.
        </p>
      </div>
    </main>
  );
}

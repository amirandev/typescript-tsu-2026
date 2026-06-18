import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home" },
    { name: "description", content: "Welcome to our site" },
  ];
}

export default function Home() {
  return (
    <main className="pt-16 pb-4">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          A simple 3-page website built with React Router v8, Vite, and
          Tailwind CSS. Check out the About and Contact pages.
        </p>
      </div>
    </main>
  );
}

import { Link, useParams } from "react-router-dom";
import type { Locale, User, Translations } from "../types";
import data from "../translations.json";

const translations = data as unknown as {
  en: Translations;
  ge: Translations;
  users: User[];
};

const ALL_LOCALES: Locale[] = ["en", "ge"];

function UsersPage() {
  const { lang } = useParams<{ lang: string }>();
  const locale = ALL_LOCALES.includes(lang as Locale) ? (lang as Locale) : "en";
  const t = translations[locale];
  const users = translations.users;

  return (
    <div>
      <h1>{t.title}</h1>
      <p>
        <Link to="/">{t.back}</Link>
      </p>
      {users.map((user) => (
        <div key={user.id} style={{ border: "1px solid #ccc", margin: "1rem 0", padding: "1rem" }}>
          <p><strong>{t.labels.name}:</strong> {user.name}</p>
          <p><strong>{t.labels.email}:</strong> {user.email}</p>
          <p><strong>{t.labels.phone}:</strong> {user.phone}</p>
          <p><strong>{t.labels.address}:</strong> {user.address}</p>
          <p><strong>{t.labels.city}:</strong> {user.city}</p>
          <p><strong>{t.labels.company}:</strong> {user.company}</p>
          <p><strong>{t.labels.website}:</strong> {user.website}</p>
        </div>
      ))}
    </div>
  );
}

export default UsersPage;

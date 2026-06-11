export type Locale = "en" | "ge";

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  company: string;
  website: string;
}

export interface Translations {
  labels: Record<string, string>;
  title: string;
  back: string;
}

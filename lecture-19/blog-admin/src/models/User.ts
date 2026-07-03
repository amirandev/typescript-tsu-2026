export class User {
  readonly id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;

  constructor(id: number, name: string, username: string, email: string, phone: string = '', website: string = '') {
    this.id = id;
    this.name = name;
    this.username = username;
    this.email = email;
    this.phone = phone;
    this.website = website;
  }

  get initials(): string {
    return this.name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  get isValidEmail(): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
  }
}

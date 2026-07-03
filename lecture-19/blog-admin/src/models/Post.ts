export class Post {
  readonly id: number;
  title: string;
  body: string;
  userId: number;
  readonly createdAt: Date;

  constructor(id: number, title: string, body: string, userId: number, createdAt: Date = new Date()) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.userId = userId;
    this.createdAt = createdAt;
  }

  get excerpt(): string {
    return this.body.length > 120
      ? `${this.body.slice(0, 120)}...`
      : this.body;
  }

  get wordCount(): number {
    return this.body.split(/\s+/).filter(Boolean).length;
  }
}

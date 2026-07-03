export class Comment {
  readonly id: number;
  postId: number;
  name: string;
  email: string;
  body: string;

  constructor(id: number, postId: number, name: string, email: string, body: string) {
    this.id = id;
    this.postId = postId;
    this.name = name;
    this.email = email;
    this.body = body;
  }

  get excerpt(): string {
    return this.body.length > 100
      ? `${this.body.slice(0, 100)}...`
      : this.body;
  }
}

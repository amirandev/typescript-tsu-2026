import type { Post } from '../models/Post';

export class PostQuery {
  private posts: Post[];
  private filters: ((p: Post) => boolean)[];

  constructor(posts: Post[]) {
    this.posts = posts;
    this.filters = [];
  }

  whereTitleContains(query: string): this {
    const lower = query.toLowerCase();
    this.filters.push(p => p.title.toLowerCase().includes(lower));
    return this;
  }

  whereBodyContains(query: string): this {
    const lower = query.toLowerCase();
    this.filters.push(p => p.body.toLowerCase().includes(lower));
    return this;
  }

  whereUserId(userId: number): this {
    this.filters.push(p => p.userId === userId);
    return this;
  }

  whereMinLength(min: number): this {
    this.filters.push(p => p.body.length >= min);
    return this;
  }

  execute(): Post[] {
    return this.posts.filter(p => this.filters.every(f => f(p)));
  }
}

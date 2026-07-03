import { ApiClient } from './ApiClient';
import { Post } from '../models/Post';
import type { Comment } from '../models/Comment';
import { Comment as CommentModel } from '../models/Comment';
import { PostQuery } from './PostQuery';

interface PostApiResponse {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface CommentApiResponse {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export class PostRepository extends ApiClient {
  protected get resourcePath(): string {
    return 'posts';
  }

  async getAll(): Promise<Post[]> {
    const data = await this.request<PostApiResponse[]>('GET');
    return data.map(p => new Post(p.id, p.title, p.body, p.userId));
  }

  async getById(id: number): Promise<Post> {
    const p = await this.request<PostApiResponse>('GET', `/${id}`);
    return new Post(p.id, p.title, p.body, p.userId);
  }

  async create(data: { title: string; body: string; userId: number }): Promise<Post> {
    const p = await this.request<PostApiResponse>('POST', '', data);
    return new Post(p.id, p.title, p.body, p.userId);
  }

  async update(id: number, data: Partial<{ title: string; body: string; userId: number }>): Promise<Post> {
    const p = await this.request<PostApiResponse>('PATCH', `/${id}`, data);
    return new Post(p.id, p.title, p.body, p.userId);
  }

  async delete(id: number): Promise<void> {
    await this.request<void>('DELETE', `/${id}`);
  }

  async getComments(postId: number): Promise<Comment[]> {
    const data = await this.request<CommentApiResponse[]>('GET', `/${postId}/comments`);
    return data.map(c => new CommentModel(c.id, c.postId, c.name, c.email, c.body));
  }

  query(posts: Post[]): PostQuery {
    return new PostQuery(posts);
  }
}

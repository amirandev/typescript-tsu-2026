import { BaseApiClient } from './base-client'
import type { Post } from './types'

export class PostsApi extends BaseApiClient {
  getResourceName(): string {
    return 'posts'
  }

  async getAll(): Promise<Post[]> {
    return this.request<Post[]>('/posts')
  }

  async getById(id: number): Promise<Post> {
    return this.request<Post>(`/posts/${id}`)
  }

  async getByUser(userId: number): Promise<Post[]> {
    return this.request<Post[]>(`/posts?userId=${userId}`)
  }
}

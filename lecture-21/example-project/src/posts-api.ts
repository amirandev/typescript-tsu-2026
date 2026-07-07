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

  async create(data: Omit<Post, 'id'>): Promise<Post> {
    return this.request<Post>('/posts', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async update(id: number, data: Partial<Post>): Promise<Post> {
    return this.request<Post>(`/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async delete(id: number): Promise<void> {
    await this.request<{}>(`/posts/${id}`, { method: 'DELETE' })
  }

  async getByUser(userId: number): Promise<Post[]> {
    return this.request<Post[]>(`/posts?userId=${userId}`)
  }
}

import { BaseApiClient } from './base-client'
import type { Comment } from './types'

export class CommentsApi extends BaseApiClient {
  getResourceName(): string {
    return 'comments'
  }

  async getAll(): Promise<Comment[]> {
    return this.request<Comment[]>('/comments')
  }

  async getById(id: number): Promise<Comment> {
    return this.request<Comment>(`/comments/${id}`)
  }

  async getByPost(postId: number): Promise<Comment[]> {
    return this.request<Comment[]>(`/comments?postId=${postId}`)
  }
}

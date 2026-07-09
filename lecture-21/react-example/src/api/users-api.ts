import { BaseApiClient } from './base-client'
import type { User } from './types'

export class UsersApi extends BaseApiClient {
  getResourceName(): string {
    return 'users'
  }

  async getAll(): Promise<User[]> {
    return this.request<User[]>('/users')
  }

  async getById(id: number): Promise<User> {
    return this.request<User>(`/users/${id}`)
  }
}

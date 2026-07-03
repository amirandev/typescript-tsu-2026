import { ApiClient } from './ApiClient';
import { User } from '../models/User';

interface UserApiResponse {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

export class UserRepository extends ApiClient {
  protected get resourcePath(): string {
    return 'users';
  }

  async getAll(): Promise<User[]> {
    const data = await this.request<UserApiResponse[]>('GET');
    return data.map(u => new User(u.id, u.name, u.username, u.email, u.phone, u.website));
  }

  async getById(id: number): Promise<User> {
    const u = await this.request<UserApiResponse>('GET', `/${id}`);
    return new User(u.id, u.name, u.username, u.email, u.phone, u.website);
  }
}

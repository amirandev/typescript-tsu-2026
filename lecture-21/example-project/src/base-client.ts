import { ApiError } from './errors'

export abstract class BaseApiClient {
  protected readonly baseUrl = 'https://jsonplaceholder.typicode.com'

  abstract getResourceName(): string

  protected async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    })

    if (!response.ok) {
      throw new ApiError(`Request failed: ${response.statusText}`, response.status)
    }

    return response.json()
  }
}

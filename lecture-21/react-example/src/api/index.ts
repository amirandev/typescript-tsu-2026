import { PostsApi } from './posts-api'
import { UsersApi } from './users-api'
import { CommentsApi } from './comments-api'

export class JsonPlaceholderApi {
  private static instance: JsonPlaceholderApi

  public readonly posts: PostsApi
  public readonly users: UsersApi
  public readonly comments: CommentsApi

  private constructor() {
    this.posts = new PostsApi()
    this.users = new UsersApi()
    this.comments = new CommentsApi()
  }

  static getInstance(): JsonPlaceholderApi {
    if (!JsonPlaceholderApi.instance) {
      JsonPlaceholderApi.instance = new JsonPlaceholderApi()
    }
    return JsonPlaceholderApi.instance
  }
}

export type { Post, User, Comment } from './types'
export { ApiError } from './errors'

export class ApiError extends Error {
  public readonly statusCode: number
  public readonly timestamp: Date

  constructor(message: string, statusCode: number) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
    this.timestamp = new Date()
  }

  get isNotFound(): boolean {
    return this.statusCode === 404
  }

  get isServerError(): boolean {
    return this.statusCode >= 500
  }
}

import { Config } from './Config';

export class ApiError extends Error {
  status: number;
  statusText: string;

  constructor(message: string, status: number, statusText: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.statusText = statusText;
  }
}

export abstract class ApiClient {
  protected abstract get resourcePath(): string;

  protected async request<T>(
    method: string,
    path?: string,
    body?: unknown
  ): Promise<T> {
    const config = Config.getInstance();
    const url = `${config.apiBaseUrl}/${this.resourcePath}${path ?? ''}`;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), config.requestTimeout);

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      if (!res.ok) {
        throw new ApiError(
          `Request failed: ${res.status} ${res.statusText}`,
          res.status,
          res.statusText
        );
      }

      return res.json() as Promise<T>;
    } finally {
      clearTimeout(timer);
    }
  }
}

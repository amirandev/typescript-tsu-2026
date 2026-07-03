export class Config {
  private static instance: Config | null = null;

  public apiBaseUrl: string = '';
  public requestTimeout: number = 5000;

  private constructor() {}

  static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }

  static configure(baseUrl: string, timeout?: number): void {
    const config = Config.getInstance();
    config.apiBaseUrl = baseUrl;
    if (timeout !== undefined) {
      config.requestTimeout = timeout;
    }
  }
}

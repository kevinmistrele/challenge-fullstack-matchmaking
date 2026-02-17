import type { LogProvider } from '@application/services/logger/types';

class LoggerService {
  private providers: LogProvider[] = [];

  // It can register a new Provider (Firebase, API, Sentry, etc.)
  addProvider(provider: LogProvider) {
    this.providers.push(provider);
  }

  log(level: 'info' | 'warn' | 'error', message: string, data?: unknown) {
    if (import.meta.env.PROD && level === 'info') return;

    this.providers.forEach((provider) => provider.send(level, message, data));
  }

  info(msg: string, data?: unknown) {
    this.log('info', msg, data);
  }
  warn(msg: string, data?: unknown) {
    this.log('warn', msg, data);
  }
  error(msg: string, data?: unknown) {
    this.log('error', msg, data);
  }
}

export const logger = new LoggerService();

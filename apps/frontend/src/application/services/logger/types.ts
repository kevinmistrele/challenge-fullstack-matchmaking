export interface LogProvider {
  send(level: 'info' | 'warn' | 'error', message: string, data?: unknown): void;
}

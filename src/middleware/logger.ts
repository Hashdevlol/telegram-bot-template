import type { Context, NextFunction } from 'grammy';
import { config } from '../config';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

function shouldLog(level: LogLevel): boolean {
  return LOG_LEVELS[level] >= LOG_LEVELS[config.logLevel];
}

function formatTimestamp(): string {
  return new Date().toISOString();
}

export function log(level: LogLevel, message: string, meta?: Record<string, unknown>): void {
  if (!shouldLog(level)) return;

  const timestamp = formatTimestamp();
  const prefix = `[${timestamp}] [${level.toUpperCase()}]`;

  if (meta) {
    console[level === 'debug' ? 'log' : level](`${prefix} ${message}`, meta);
  } else {
    console[level === 'debug' ? 'log' : level](`${prefix} ${message}`);
  }
}

/**
 * Middleware that logs all incoming updates
 */
export async function loggerMiddleware(ctx: Context, next: NextFunction): Promise<void> {
  const startTime = Date.now();
  const userId = ctx.from?.id;
  const username = ctx.from?.username;
  const messageText = ctx.message?.text;
  const updateType = ctx.update ? Object.keys(ctx.update).find((k) => k !== 'update_id') : 'unknown';

  log('info', `Incoming update`, {
    updateType,
    userId,
    username,
    text: messageText?.substring(0, 50),
  });

  try {
    await next();
  } catch (error) {
    log('error', `Error processing update`, {
      error: error instanceof Error ? error.message : String(error),
      userId,
    });
    throw error;
  }

  const duration = Date.now() - startTime;
  log('debug', `Update processed in ${duration}ms`);
}

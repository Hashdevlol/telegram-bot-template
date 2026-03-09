import 'dotenv/config';

interface Config {
  botToken: string;
  allowedUsers: number[];
  logLevel: 'debug' | 'info' | 'warn' | 'error';
}

function getEnvVar(name: string, required = true): string {
  const value = process.env[name];
  if (required && !value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value ?? '';
}

function parseAllowedUsers(value: string): number[] {
  if (!value.trim()) return [];
  return value
    .split(',')
    .map((id) => parseInt(id.trim(), 10))
    .filter((id) => !isNaN(id));
}

function parseLogLevel(value: string): Config['logLevel'] {
  const levels = ['debug', 'info', 'warn', 'error'] as const;
  const level = value.toLowerCase() as Config['logLevel'];
  return levels.includes(level) ? level : 'info';
}

export const config: Config = {
  botToken: getEnvVar('BOT_TOKEN'),
  allowedUsers: parseAllowedUsers(getEnvVar('ALLOWED_USERS', false)),
  logLevel: parseLogLevel(getEnvVar('LOG_LEVEL', false)),
};

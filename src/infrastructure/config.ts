import { Level } from 'pino';
import packageJson from '../../package.json' with { type: 'json' };

export enum Environment {
  Test = 'test',
  Production = 'production',
  Development = 'development'
}

export function getEnv<T extends string> (key: string): T | undefined {
  return process.env[key] as T;
}

export function getMandatoryEnv (key: string): string {
  const value = getEnv(key);
  if (typeof value === 'undefined') {
    throw new Error(`Unable to find env var with key: '${key}'`);
  }
  return value;
}

export function getConfig () {
  return {
    nodeEnv: Environment.Production,
    serviceName: getEnv('SERVICE_NAME') || packageJson.name,
    environment: getMandatoryEnv('APP_ENV') as Environment,
    port: Number(getEnv('PORT')) || 3000,
    logLevel: getEnv('LOG_LEVEL') as Level || 'info'
  };
}

export function getDatabaseConfig () {
  return {
    databaseURL: getMandatoryEnv('DATABASE_URL')
  };
}

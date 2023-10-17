// COMMON
const COMMON = {
  NODE_ENV: 'NODE_ENV',
  PORT: 'PORT',
} as const;

// RDB
const DATABASE = {
  DATABASE_HOST: 'DATABASE_HOST',
  DATABASE_PORT: 'DATABASE_PORT',
  DATABASE_USERNAME: 'DATABASE_USERNAME',
  DATABASE_PASSWORD: 'DATABASE_PASSWORD',
  DATABASE_DATABASE: 'DATABASE_DATABASE',
} as const;

export const ENV_KEY = {
  ...COMMON,
  ...DATABASE,
} as const;

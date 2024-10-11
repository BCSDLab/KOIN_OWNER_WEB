import { z } from 'zod';

const envVar = z.object({
  NODE_ENV: z.enum(['development', 'production']),
  VITE_API_PATH: z.string(),
});

export type EnvVar = z.infer<typeof envVar>;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvVar { }
  }
}

const number = (value: string) => {
  const result = Number(value);
  if (!Number.isNaN(result)) {
    return result;
  }
  return null;
};

const string = (value: string) => value;

const typeConverter = { number, string };

function checkEnv(key: keyof EnvVar, type: 'string'): string;
function checkEnv(key: keyof EnvVar, type: 'number'): number;
function checkEnv(key: keyof EnvVar, type: 'number' | 'string') {
  const value = import.meta.env[key];
  if (value !== undefined) {
    const result = typeConverter[type](value);
    if (result !== undefined) {
      return result;
    }
    throw new Error(`import.meta.env.${key}에 적절한 값을 설정하지 않았습니다`);
  }
  throw new Error(`import.meta.env.${key}에 할당할 값이 없습니다`);
}

const API_PATH = checkEnv('VITE_API_PATH', 'string');

export default API_PATH;

import { Env } from 'react-app-env';

const number = (value: string) => {
  const result = Number(value);
  if (!Number.isNaN(result)) {
    return result;
  }
  return null;
};

const string = (value: string) => value;

const typeConverter = { number, string };

function checkEnv(key: keyof Env, type: 'string'): string;
function checkEnv(key: keyof Env, type: 'number'): number;
function checkEnv(key: keyof Env, type: 'number' | 'string') {
  const value = process.env[key];
  if (value !== undefined) {
    const result = typeConverter[type](value);
    if (result !== undefined) {
      return result;
    }
    throw new Error(`process.env.${key}에 적절한 값을 설정하지 않았습니다`);
  }
  throw new Error(`process.env.${key}에 할당할 값이 없습니다`);
}

const API_PATH = checkEnv('REACT_APP_API_PATH', 'string');

export default API_PATH;

/// <reference types="react-scripts" />

export interface Env {
  NODE_ENV: 'development' | 'production';
  REACT_APP_API_PATH: string;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env {}
  }
}

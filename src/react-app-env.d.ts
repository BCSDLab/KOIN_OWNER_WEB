/// <reference types="react-scripts" />

import { z } from 'zod';

const envVar = z.object({
  NODE_ENV: z.enum(['development', 'production']),
  REACT_APP_API_PATH: z.string(),
});

export type EnvVar = z.infer<typeof envVar>;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends EnvVar {}
  }
}

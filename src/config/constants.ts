import { z } from 'zod';

const Env = z.object({
  VITE_API_PATH: z.string(),
});

type EnvType = z.infer<typeof Env>;

declare global {
  interface ImportMetaEnv extends EnvType { }
}

function checkEnv(): EnvType {
  return Env.parse(import.meta.env);
}

const env = checkEnv();

export const API_PATH = env.VITE_API_PATH;

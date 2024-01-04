import { z } from 'zod';

interface Data {
  email: string,
  password: string,
  isAuthentication: boolean
}

export type User = Partial<Data>;

export const UserParam = z.object({
  email: z.string(),
  password: z.string(),
  isAuthentication: z.boolean(),
});

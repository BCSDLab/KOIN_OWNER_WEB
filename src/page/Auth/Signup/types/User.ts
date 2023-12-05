import { z } from 'zod';

export type User = {
  email?: string,
  password?: string,
  isAuthentication?: boolean
};

export const UserParam = z.object({
  email: z.string(),
  password: z.string(),
  isAuthentication: z.boolean(),
});

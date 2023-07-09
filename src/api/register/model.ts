import { z } from 'zod';

export const EmailParam = z.object({
  email: z.string(),
});

export type EmailParam = z.infer<typeof EmailParam>;

export const EmailDuplicateCheckResponse = z.object({});

export type EmailDuplicateCheckResponse = z.infer<typeof EmailDuplicateCheckResponse>;

export const RegisterParam = z.object({
  email: z.string(),
  password: z.string(),
  isAuthentication: z.boolean().refine((value) => value === true),
});

export type RegisterParam = z.infer<typeof RegisterParam>;

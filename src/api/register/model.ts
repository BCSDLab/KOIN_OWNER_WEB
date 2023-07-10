import { z } from 'zod';

export const EmailAuthParam = z.object({
  address: z.string().email(),
});
export type EmailAuthParam = z.infer<typeof EmailAuthParam>;

export const EmailAuthResponse = z.string();
export type EmailAuthResponse = z.infer<typeof EmailAuthResponse>;

export const AuthCodeParam = z.object({
  address: z.string().email(),
  certificatoin_code: z.string(),
});
export type AuthCodeParam = z.infer<typeof AuthCodeParam>;

export const AuthCodeResponse = z.object({
  token: z.string(),
});
export type AuthCodeResponse = z.infer<typeof AuthCodeResponse>;

export const RegisterParam = z.object({
  email: z.string(),
  password: z.string(),
  isAuthentication: z.boolean().refine((value) => value === true),
});

export type RegisterParam = z.infer<typeof RegisterParam>;

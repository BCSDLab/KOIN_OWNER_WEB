import { z } from 'zod';

export const EmailRegisterParam = z.object({
  address: z.string().email(),
});
export type EmailRegisterParam = z.infer<typeof EmailRegisterParam>;

export const EmailRegisterResponse = z.string();
export type EmailRegisterResponse = z.infer<typeof EmailRegisterResponse>;

export const AuthCodeParam = z.object({
  address: z.string().email(),
  certification_code: z.string(),
});
export type AuthCodeParam = z.infer<typeof AuthCodeParam>;

export const AuthCodeResponse = z.object({
  token: z.string(),
});
export type AuthCodeResponse = z.infer<typeof AuthCodeResponse>;

const fileSchema = z.object({
  name: z.string(),
  size: z.number(),
  type: z.string(),
});

export const RegisterParam = z.object({
  email: z.string(),
  password: z.string(),
  isAuthentication: z.boolean().refine((value) => value === true),
  phoneNumber: z.string(),
  ownerName: z.string(),
  shopName: z.string(),
  registrationNumber: z.string(),
  registerFiles: z.array(fileSchema),
});

export type RegisterParam = z.infer<typeof RegisterParam>;

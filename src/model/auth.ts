import z from 'zod';

export interface LoginParam {
  email?: string;
  password?: string;
}

export const LoginResponse = z.object({
  token: z.string(),
  user_type: z.string(),
});

export type LoginResponse = z.infer<typeof LoginResponse>;

export const UserFile = z.object({
  file_name: z.string(),
  file_url: z.string(),
  id: z.number(),
});

export type UserFile = z.infer<typeof UserFile>;

export const UserShop = z.object({
  id: z.number(),
  name: z.string(),
});

export type UserShop = z.infer<typeof UserShop>;

export const UserResponse = z.object({
  attachments: z.array(UserFile),
  company_number: z.string(),
  email: z.string(),
  name: z.string(),
  shops: z.array(UserShop),
});

export type UserResponse = z.infer<typeof UserResponse>;

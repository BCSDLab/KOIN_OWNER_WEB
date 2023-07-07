import z from 'zod';

export const LoginParams = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LoginParams = z.infer<typeof LoginParams>;

export const LoginResponse = z.object({
  refresh_token: z.string(),
  token: z.string(),
  user_type: z.string(),
});

export type LoginResponse = z.infer<typeof LoginResponse>;

export const RefreshParams = z.object({
  refresh_token: z.string(),
});

export type RefreshParams = z.infer<typeof RefreshParams>;

export const RefreshResponse = z.object({
  token: z.string(),
  refresh_token: z.string(),
});

export type RefreshResponse = z.infer<typeof RefreshResponse>;

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

export const RegisterParam = z.object({
  email: z.string(),
  password: z.string(),
  isAuthentication: z.boolean().refine((value) => value === true, {
    message: 'isAuth는 true여야 합니다.',
    path: ['isAuth'],
  }),
});

export type RegisterParam = z.infer<typeof RegisterParam>;

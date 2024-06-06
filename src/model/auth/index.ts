import z from 'zod';

export const LoginParams = z.object({
  email: z.string().email({ message: '이메일 형식이 아닙니다.' }),
  password: z.string(),
});

export type LoginParams = z.infer<typeof LoginParams>;

export const LoginResponse = z.object({
  refresh_token: z.string(),
  token: z.string(),
  user_type: z.union([
    z.literal('OWNER'),
    z.literal('COOP'),
    z.null(),
  ]),
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

export const OwnerShop = z.object({
  id: z.number(),
  name: z.string(),
});

export type OwnerShop = z.infer<typeof OwnerShop>;

export const OwnerResponse = z.object({
  attachments: z.array(UserFile),
  company_number: z.string(),
  email: z.string(),
  name: z.string(),
  shops: z.array(OwnerShop),
});

export type OwnerResponse = z.infer<typeof OwnerResponse>;

// 해당 주석 위 부분은 api> ayuto> model.ts 에서 가져 온 부분입니다.

export const User = z.nullable(OwnerResponse);

export const UserTypeResponse = z.object({
  user_type: z.union([
    z.literal('OWNER'),
    z.literal('COOP'),
  ]),
});

export type UserTypeResponse = z.infer<typeof UserTypeResponse>;

export type UserType = 'OWNER' | 'COOP' | null;

export type User = z.infer<typeof User>;

export interface LoginForm extends LoginParams {
  isAutoLogin: boolean;
}

export interface CertificationResponse {
  token: string;
}

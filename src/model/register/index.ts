import { z } from 'zod';

export const EmailRegisterParam = z.object({
  address: z.string().email(),
});
export type EmailRegisterParam = z.infer<typeof EmailRegisterParam>;

export const PhoneNumberRegisterParam = z.object({
  phone_number: z.string(),
});
export type PhoneNumberRegisterParam = z.infer<typeof PhoneNumberRegisterParam>;

export const EmailRegisterResponse = z.string();
export type EmailRegisterResponse = z.infer<typeof EmailRegisterResponse>;

export const PhoneNumberRegisterResponse = z.string();
export type PhoneNumberRegisterResponse = z.infer<typeof PhoneNumberRegisterResponse>;

export const AuthCodeParam = z.object({
  phone_number: z.string().email(),
  certification_code: z.string(),
});
export type AuthCodeParam = z.infer<typeof AuthCodeParam>;

export const AuthCodeResponse = z.object({
  token: z.string(),
});
export type AuthCodeResponse = z.infer<typeof AuthCodeResponse>;

export const RegisterParam = z.object({
  attachment_urls: z.array(z.object({
    file_url: z.string(),
  })),
  company_number: z.string(),
  shop_id: z.number().nullable(),
  email: z.string(),
  name: z.string(),
  password: z.string(),
  phone_number: z.string(),
  shop_name: z.string(),
});

export type RegisterParam = z.infer<typeof RegisterParam>;

export const PhoneRegisterParam = z.object({
  company_number: z.string(),
  name: z.string(),
  password: z.string(),
  phone_number: z.string(),
  shop_id: z.number().nullable(),
  shop_name: z.string(),
  attachment_urls: z.array(z.object({
    file_url: z.string(),
  })),
});
export type PhoneRegisterParam = z.infer<typeof PhoneRegisterParam>;

export const FilesResponse = z.object({
  file_urls: z.array(z.string()),
});

export type FilesResponse = z.infer<typeof FilesResponse>;

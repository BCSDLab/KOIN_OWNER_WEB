export const registerKeys = {
  all: ['register'] as const,
  emailCheck: (email: string) => [...registerKeys.all, 'emailDuplicateCheck', email] as const,
  authCode: (email: string) => [...registerKeys.all, 'generateEmailAuthCode', email] as const,
  verificationCode: (code: string, email: string) => [...registerKeys.all, 'verificationCode', code, email] as const,
  registerUser: ['registerUser'] as const,
  fileUrlList: ['fileUrlList'] as const,
};

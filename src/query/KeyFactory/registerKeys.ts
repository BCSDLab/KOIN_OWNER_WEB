export const registerKeys = {
  all: ['register'] as const,
  fileUrlList: ['fileUrlList'] as const,
  registerUser: ['registerUser'] as const,
  emailCheck: (email: string) => [...registerKeys.all, 'emailDuplicateCheck', email] as const,
  // authCode: (email: string) => [...registerKeys.all, 'generateEmailAuthCode', email] as const,
  phoneAuthCode: (phoneNumber: string) => [...registerKeys.all, 'generatePhoneAuthCode', phoneNumber] as const,
  verificationCode: (code: string, email: string) => [...registerKeys.all, 'verificationCode', code, email] as const,
  phoneVerificationCode: (code: string, phoneNumber: string) => [...registerKeys.all, 'phoneVerificationCode', code, phoneNumber] as const,

};

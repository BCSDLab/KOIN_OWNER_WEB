import { LoginParams, UserResponse } from 'api/auth/model';
import z from 'zod';

export const User = z.nullable(UserResponse);

export type User = z.infer<typeof User>;

export interface LoginForm extends LoginParams {
  isAutoLogin: boolean;
}

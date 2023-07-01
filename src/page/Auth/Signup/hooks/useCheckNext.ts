import { useState } from 'react';
import { z } from 'zod';
import { RegisterData } from 'page/Auth/Signup/types/RegisterData';

export default function useCheckNext() {
  const [isDone, setDone] = useState(false);

  const User = z.object({
    email: z.string(),
    password: z.string(),
    isAuthentication: z.boolean(),
  });

  const checkNext = (userData:RegisterData) => {
    if (User.safeParse(userData).success) {
      setDone(true);
    }
  };

  return { isDone, checkNext };
}

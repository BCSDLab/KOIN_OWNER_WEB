import { useState } from 'react';
import { RegisterData } from 'page/Auth/Signup/types/RegisterData';
import { RegisterParam } from 'api/auth/model';

export default function useCheckNextStep() {
  const [isDone, setDone] = useState(false);

  const checkNextStep = (userData:RegisterData) => {
    if (RegisterParam.safeParse(userData).success) {
      setDone(true);
    }
  };

  return { isDone, checkNextStep };
}

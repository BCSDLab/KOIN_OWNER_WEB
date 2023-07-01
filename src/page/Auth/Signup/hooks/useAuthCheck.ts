import { useRef } from 'react';

export default function useAuthCheck() {
  const authInput = useRef<HTMLInputElement>(null);

  const checkAuthNumber = (authNumber:string) => {
    if (authInput.current?.value === authNumber) {
      return true;
    }
    return false;
  };

  return { authInput, checkAuthNumber };
}

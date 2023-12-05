import { useVerificationAuthCode } from 'query/register';
import { useEffect, useRef, useState } from 'react';
import { User } from 'page/Auth/Signup/types/User';

export default function useVerification(
  eamil:string,
  setAuthenticate:(data:User) => void,
  userData:User,
) {
  const [code, setCode] = useState('');
  const [errorMessage, setMessage] = useState(null);
  const codeInput = useRef<HTMLInputElement>(null);
  const {
    status, refetch, isError, error,
  } = useVerificationAuthCode(code, eamil);

  const verificationCode = () => {
    if (codeInput.current) {
      setCode(codeInput.current.value);
    }
  };

  useEffect(() => {
    if (code !== '') {
      refetch();
    }
  }, [code, refetch]);

  useEffect(() => {
    if (status === 'success' && !userData.isAuthentication) {
      setAuthenticate({ ...userData, isAuthentication: true });
      setMessage(null);
    } else if (isError) {
      setMessage(Object(error).response.data.violations[0]);
    }
  }, [status, userData, setAuthenticate, error, isError]);
  return {
    isError, error, verificationCode, status, codeInput, errorMessage,
  };
}

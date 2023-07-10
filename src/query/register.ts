import { useQuery } from '@tanstack/react-query';
import { getEmailAuthCode, getEmailDuplicate, verificationAuthCode } from 'api/register';

export const useCheckDuplicate = (email:string) => {
  const { status, refetch } = useQuery(['emailDuplicateCheck', email], () => getEmailDuplicate(email), { enabled: false });
  return { status, refetch };
};

export const useGenerateAuthCode = (email:string) => {
  const {
    status, refetch, isError, error,
  } = useQuery(
    ['genrateEmailAuthCode', email],
    () => getEmailAuthCode({ address: email }),
    {
      enabled: false,
    },
  );
  return {
    status, refetch, isError, error,
  };
};

export const useVerificationAuthCode = (code:string, email:string) => {
  const {
    status, refetch, isError, error,
  } = useQuery(
    ['verificationCode', code],
    () => verificationAuthCode({ certification_code: code, address: email }),
    {
      enabled: false,
      onSuccess: (response) => {
        if (response.token) { sessionStorage.setItem('upload_token', response.token); }
      },
    },
  );
  return {
    status, refetch, isError, error,
  };
};
